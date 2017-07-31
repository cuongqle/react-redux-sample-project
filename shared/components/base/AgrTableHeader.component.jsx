import React, {Component, PropTypes} from 'react';

let Th = ({stateOrder, label, field, identity, toggleSort, center, disableSort}) => {

    const cap = (e) => e.toString().replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
    });

    function onSort() {
        !disableSort && toggleSort(field, identity)
    }

    return (
        <th
            className={`agora-header${stateOrder.field === field ? ' active' : ''}${center || typeof label !== 'string' ? ' middle' : ''}${typeof label == 'string' ? ' lb-' + label.trim().replace(" ", "") : ' lb-icon'}`}
            onClick={() => onSort()}
        >
            {label !== 'none' && (typeof label == 'string' ? cap(label) : label)}
            {
                stateOrder.field === field ?
                    <span>
                        <i className={`agr-full-arrow-${stateOrder.order ? 'up' : 'down'}`}/>
                    </span> : null
            }
        </th>
    );
};

export default class AgrTableHeader extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectAll: false
        };
    }

    componentWillReceiveProps(nextProps) {
        let _data = nextProps.body;
        if (!_data) return;
        _data = _data.filter((data) => !data.isChecked);

        if (_data.length > 0 && this.state.selectAll) {
            this.setState({
                selectAll: false
            })
        }
    }

    onSelectAll(e) {
        let _next = !this.state.selectAll;

        this.setState({
            selectAll: _next
        }, () => {
            this.props.onSelectAll(_next)
        })
    }

    render() {
        const {
            headers,
            sort,
            toggleSort,
            blockHeader
        } = this.props;

        const toField = (e) => e.toString().replace(" ", "_");

        return (
            <thead className="agora-thead">
            <tr>
                <th
                    className={`${sort.field === 'index' ? "agora-header active" : "agora-header"}`}
                    onClick={(e) => toggleSort('index', (e) => e.index)}
                >&nbsp;</th>
                <th className="middle">
                    <input
                        type="checkbox"
                        name="checkall"
                        className="check-all"
                        checked={this.state.selectAll}
                        onClick={::this.onSelectAll}
                    />
                </th>
                {blockHeader ? <th className="agora-header block-item"></th> : null}
                {
                    headers.map((header, i) =>
                        <Th
                            key={i}
                            stateOrder={sort}
                            label={header.label}
                            field={header.field ? header.field : toField(header.label)}
                            toggleSort={toggleSort}
                            identity={header.identity}
                            center={!!header.center}
                            disableSort={!!header.disableSort}
                        />)
                }
            </tr>
            </thead>

        );
    }
}

AgrTableHeader.propTypes = {
    onSelectAll: React.PropTypes.func
};

AgrTableHeader.defaultProps = {
    onSelectAll: (e) => e,
    blockHeader: true,
    toggleSort: (e) => e
};