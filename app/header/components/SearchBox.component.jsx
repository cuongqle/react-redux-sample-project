import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import config from 'config';
import {SEARCH_HASHTAG_CHANGE, searchDomain} from '../../home/search/SearchPage.reducer';

const SearchBoxStateToPropsBinding = (state, ownProps) =>{
    return {
        clearSearch: state.search.clearSearch
    }
};

const SearchBoxDispatchToPropsBinding = (dispatch, ownProps) =>{
    return {
        onHashtagChange: (hashtags) => {dispatch({
            type: SEARCH_HASHTAG_CHANGE,
            domain: searchDomain,
            hashtags: hashtags.join(" ")
        })}
    }
};

@connect(SearchBoxStateToPropsBinding, SearchBoxDispatchToPropsBinding)
export default class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hashtags: []
        };
        this.isOnSearchPage = () => window.location.pathname.indexOf('/search') > -1;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clearSearch) {
            this.setState({
                hashtags: []
            });
        }
    }

    componentDidMount() {
        this.isOnSearchPage()
        && !this.props.isWallSearch
        && this.inputSearch
        && this.inputSearch.focus();
    }

    gotoSearch() {
        if (this.props.isWallSearch) return;
        browserHistory.push(process.env.PUBLIC_PATH + 'search/');
    }

    toggleFocus(e) {
        let _target = e.target;
        let canActive =
            e.type == "click" // redirect to search page
                || e.type == "focus" // redirect to search page
                    || this.state.hashtags.length > 0 // has at least 1 hashtags => redirect to search page
                        || this.isOnSearchPage(); // always active on /search/

        canActive
            && _target.placeholder ?
                (_target.placeholder = "") : (_target.placeholder = "Search by user, tag, requests...");

        if (this.search && this.search.contains(_target)) {
            canActive ? this.search.classList.add("active") : this.search.classList.remove("active");
        }
    }

    onValidateSpecialCharacter(trimed) {
        /*
         * Not allowed: punctuation and special characters
         * Allowed: underscore
         * */
        return trimed !== "" ? config.uploads.tagRegex.test(trimed) : true;
    }

    onInputKeyDown(e) {
        let code = e && e.keyCode || "";
        let val = e && e.target && e.target.value;
        if (!this.onValidateSpecialCharacter(val.trim())) throw Error("Hashtag special characters validation failed!");
        /* code=13: ENTER */
        if ((code == 13) && val.trim() !== "") {
            let hashtags = this.state.hashtags;
            let duplicated = hashtags.filter(tag => tag == val.trim());
            if (duplicated.length == 0) {
                hashtags.unshift(val.trim());
                this.setState({
                    hashtags: hashtags
                });
                this.props.onHashtagChange(hashtags);
            }
            e.target.value = ""
        }
    }

    onRemoveTag(value) {
        let hashtags = this.state.hashtags;
        hashtags = hashtags.filter(tag => tag !== value);
        this.setState({hashtags: hashtags});
        this.props.onHashtagChange(hashtags)
    }

    onBoxAction(e) {
        !this.isOnSearchPage() && this.gotoSearch();
        this.toggleFocus(e)
    }

    render() {
        return (
            <div
                className={`search-box${this.isOnSearchPage() && !this.props.isWallSearch ? ' active' : ''}`}
                ref={(e) => this.search = e}
                onBlur={::this.toggleFocus}
                onFocus={::this.onBoxAction}
                onClick={::this.onBoxAction}
            >
                <div className="search">
                    <button className="search-btn no-border no-background transition padding-right-20">
                        <i className="agr-search color-darkgrey"/>
                    </button>
                    <input ref={(e) => this.inputSearch = e}
                           type="text"
                           className="search-input no-border font-sm bold-600"
                           placeholder="Search by user, tag, request..."
                           onKeyDown={::this.onInputKeyDown}
                           style={{width: this.state.hashtags.length > 0 ? '118px' : '100%'}}
                           tabIndex="1"
                    />
                    <div className="tags-container hidden-xs">
                        {
                            this.state.hashtags.map((tag, i) =>
                                <div className="tag-item" key={i} tabIndex={i + 1}>
                                    <span className="tag">{tag}</span>
                                    <span className="remove" onClick={(e)=> this.onRemoveTag(tag)}>
                                    <i className="agr-delete"/>
                                </span>
                                </div>
                            )
                        }
                    </div>
                    <div className="tips padding-left-10 hidden-sm hidden-xs hidden-sm">PRESS ENTER</div>
                </div>
            </div>
        )
    }
}

SearchBox.propTypes = {
    isWallSearch: React.PropTypes.bool
};

SearchBox.defaultProps = {
    isWallSearch: false
};