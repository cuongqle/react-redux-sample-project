import React, {Component} from 'react';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import AgrFormInput from 'shared/components/base/AgrFormInput.component';
import {reduxForm} from 'redux-form';
import config from 'config';
import {UploadImageStateToPropsBinding, UploadImageDispatchToPropsBinding} from 'app/users/private/uploads/UploadImage.bindings';

@reduxForm({
    form: 'profile',
    fields: ['name', 'username', 'signature', 'location', 'bio', 'email']
})
@connect(UploadImageStateToPropsBinding, UploadImageDispatchToPropsBinding)
export default class ProfileSettingsDetails extends Component {
    constructor() {
        super();

        this.defaults = {
            avatarUrl: require("assets/img/default_avatar.png"),
            coverUrl: require("assets/img/default_avatar.png"),
        };

        this.state = {
            avatarUrl: this.defaults.avatarUrl,
            coverUrl: this.defaults.coverUrl,
            bioCounter: 200
        };
    }

    componentWillUpdate() {
        if (this.props.profileImage) {
            if (this.state.avatarUrl === this.defaults.avatarUrl) {
                this.setState({avatarUrl: this.props.profileImage});
            }
        }
        if (this.props.coverImage) {
            if (this.state.coverUrl === this.defaults.coverUrl) {
                this.setState({coverUrl: this.props.coverImage});
            }
        }
    }

    componentWillMount() {
        if (this.props.profileImage) {
            this.setState({ avatarUrl: this.props.profileImage });
        }
        if (this.props.coverImage) {
            this.setState({ coverUrl: this.props.coverImage });
        }
    }

    componentWillReceiveProps(nextProps) {
        let numberCharactersLeft = 200 - nextProps.fields.bio.value.length;
        if (this.state.bioCounter != numberCharactersLeft) {
            this.setState({
                bioCounter: numberCharactersLeft,
            });
        }
    }

    onClickUploadAvatar(e) {
        this.openFileUploadAvatarDialog();
    }

    openFileUploadAvatarDialog() {
        if (this.uploadAvatarInput) {
            this.uploadAvatarInput.value = null;
            this.uploadAvatarInput.click();
        }
    }

    onClickUploadCover(e) {
        this.openFileUploadCoverDialog();
    }

    openFileUploadCoverDialog() {
        if (this.uploadCoverInput) {
            this.uploadCoverInput.value = null;
            this.uploadCoverInput.click();
        }
    }

    validateFiles(file) {
        let flag = true;
        if (file) {
            const acceptedFilesArray = (Array.isArray(this.props.validations.ext) ?
                this.props.validations.ext :
                this.props.validations.ext.split(','));
            const fileName = file.name || '';
            const mimeType = file.type || '';
            const baseMimeType = mimeType.replace(/\/.*$/, '');

            flag = acceptedFilesArray.some(type => {
                const validType = type.trim();
                if (validType.charAt(0) === '.') {
                    return fileName.toLowerCase().endsWith(validType.toLowerCase());
                } else if (/\/\*$/.test(validType)) {
                    // This is something like a image/* mime type
                    return baseMimeType === validType.replace(/\/.*$/, '');
                }

                return mimeType === validType;
            });
        }

        return flag;
    }

    onUploadAvatarImage(e) {
        e.preventDefault();
        this.handleFileUpload(e.dataTransfer ? e.dataTransfer.files : e.target.files, config.uploads.s3.prefix.profile);
    }

    onUploadCoverImage(e) {
        e.preventDefault();
        this.handleFileUpload(e.dataTransfer ? e.dataTransfer.files : e.target.files, config.uploads.s3.prefix.cover);
    }

    handleFileUpload(droppedFiles, type) {
        if (droppedFiles.length == 0) return;
        if (droppedFiles.length != 1) throw Error("Upload 1 file thoi thim'"); // never happens when multiple=false
        let file = droppedFiles[0];
        file.preview = window.URL.createObjectURL(file);
        this.fileMatchViewport(file, type);
    }

    handleValidateImageUpload(file, isPassedValidatePreview, typeImage) {
        if (isPassedValidatePreview) {
            if (this.validateFiles(file)
                && this.fileMatchSize(file)) {
                if (typeImage == config.uploads.s3.prefix.profile) {
                    this.setState({
                        avatarUrl: file.preview
                    });
                } else {
                    this.setState({
                        coverUrl: file.preview
                    });
                }
                // perform upload
                file.typeImage = typeImage;
                this.props.uploadProfileImage(this.props.token, this.props.authorId, this.props.credentials, file);
            } else {
                console.log('this image not match the conditions');
            }
        } else {
            console.log('this image not match the conditions about width height');
        }

    }

    fileMatchSize(file) {
        return file.size <= this.props.validations.maxSize && file.size >= this.props.validations.minSize;
    }

    fileMatchViewport(file, type) {
        let preview = file.preview;
        let img = new Image();
        let minWidth;
        let minHeight;
        if (type == config.uploads.s3.prefix.profile) {
            minWidth = this.props.validations.profile.minWidth;
            minHeight = this.props.validations.profile.minHeight;
        } else {
            minWidth = this.props.validations.cover.minWidth;
            minHeight = this.props.validations.cover.minHeight;
        }
        img.src = preview;
        let scope = this;
        img.onload = function () {
            file.widthSize = this.width;
            scope.handleValidateImageUpload(file, !(this.width < minWidth || this.height < minHeight), type);
        };
    }

    submit(data) {
        this.props.updateProfile(data);
    }

    onChangeBio(value) {
        let lengthBio = value.length;
        this.setState({
            bioCounter: 200 - lengthBio
        });
    }

    render() {
        const inputAvatarAttributes = {
            type: "file",
            ref: (e) => this.uploadAvatarInput = e,
            onChange: ::this.onUploadAvatarImage
        };

        const inputCoverAttributes = {
            type: "file",
            ref: (e) => this.uploadCoverInput = e,
            onChange: ::this.onUploadCoverImage
        };

        const {
            fields: {name, username, signature, location, bio, email},
            handleSubmit
        } = this.props;

        return (<div className="profile-settings-details">
                <form onSubmit={handleSubmit(::this.submit)}>
                    <div className="main-title">PUBLIC INFORMATION</div>
                    <div className="main-info col-md-12">
                        <div className="item-block col-md-6 left col-sm-6">
                            <div className="title">NAME</div>
                            <div className="content">
                                <div className="icon-container inline-block "><i className="agr-profile-user"/></div>
                                <AgrFormInput {...name} maxLength={50} className="inline-block"/>
                            </div>
                        </div>
                        <div className="item-block col-md-6 right col-sm-6">
                            <div className="title">USERNAME</div>
                            <div className="content">
                                <div className="icon-container inline-block"><i className="agr-user"/></div>
                                <AgrFormInput {...username} className="inline-block blur" disabled={"disabled"}/>
                            </div>
                        </div>
                        <div className="item-block col-md-6 left col-sm-6">
                            <div className="title">SIGNATURE</div>
                            <div className="content">
                                <div className="icon-container inline-block"><i className="agr-page"/></div>
                                <AgrFormInput {...signature} maxLength={50} className="inline-block"/>
                            </div>
                        </div>
                        <div className="item-block col-md-6 right col-sm-6">
                            <div className="title">LOCATION</div>
                            <div className="content">
                                <div className="icon-container inline-block"><i className="agr-unfill-location"/></div>
                                <AgrFormInput {...location} maxLength={100} className="inline-block"/>
                            </div>
                        </div>
                        <div className="item-block bio col-md-12 right col-sm-12">
                            <div className="title">BIO</div>
                            <div className="content">
                                <div className="icon-container inline-block"><i className="agr-blog"/></div>
                                <AgrFormInput {...bio} maxLength={200} className="inline-block" valueChange={::this.onChangeBio}/>
                            </div>
                            <div className="character-counter">{this.state.bioCounter} characters</div>
                        </div>
                    </div>
                    <div className="style">
                        <div className="title">WHAT STYLE DEFINES YOU THE BEST?</div>
                        <div className="main-block pointer">
                            <i className="agr-paint-brush"/><span>Select</span><i className="agr-arrow-down"/>
                        </div>
                        <ul className="list-block" style={{'display': 'none'}}>
                            <li>what ever</li>
                        </ul>
                    </div>
                    <div className="image col-md-12 col-sm-12">
                        <div className="image-item profile-image col-md-6 col-sm-6">
                            <div className="title-block">
                                <span className="big-title">AVATAR</span>
                                <span className="small-title">250px x 250px minimum</span>
                            </div>
                            <div className="avatar image-content">
                                <img src={this.state.avatarUrl} alt=""/>
                            </div>
                            <div className="section-uploads-selection-file" onClick={::this.onClickUploadAvatar}>
                                Browse an image
                                <label htmlFor="avatar" className="label-uploads"
                                       onClick={(e)=>e.preventDefault()}>SELECT</label>
                                <input {...inputAvatarAttributes} name="avatar" className="input-uploads"
                                       multiple={false}/>
                            </div>
                        </div>
                        <div className="image-item cover-image col-md-6 col-sm-6">
                            <div className="title-block">
                                <span className="big-title">COVER</span>
                                <span className="small-title">600px x 850px minimum</span>
                            </div>
                            <div className="cover image-content">
                                <img src={this.state.coverUrl} alt=""/>
                            </div>
                            <div className="section-uploads-selection-file" onClick={::this.onClickUploadCover}>
                                Browse an image
                                <label htmlFor="cover" className="label-uploads"
                                       onClick={(e)=>e.preventDefault()}>SELECT</label>
                                <input {...inputCoverAttributes} name="cover" className="input-uploads" type="file"
                                       multiple={false}/>
                            </div>
                        </div>
                    </div>
                    <div className="private-info">
                        <div className="main-title">PRIVATE INFORMATION</div>
                        <div className="item-block">
                            <div className="title">EMAIL</div>
                            <div className="content">
                                <i className="agr-mail"/>
                                <AgrFormInput {...email} className="inline-block blur"/>
                                <span className="pointer">EDIT EMAIL</span>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <div className="inline-block cancel pointer" onClick={() => this.props.resetForm()}>CANCEL</div>
                        <div className="inline-block save pointer" onClick={handleSubmit(::this.submit)}>SAVE</div>
                    </div>
                </form>
            </div>
        )
    }
}

ProfileSettingsDetails.propTypes = {
    validations: React.PropTypes.object
};

ProfileSettingsDetails.defaultProps = {
    validations: config.uploads
}
