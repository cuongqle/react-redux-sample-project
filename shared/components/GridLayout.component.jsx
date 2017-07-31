import React, {Component, PropTypes} from 'react';
import Masonry from 'react-masonry-component';

export default class GridLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    static propTypes = {
        items: PropTypes.array.isRequired,
        cards: PropTypes.objectOf(PropTypes.element).isRequired,
        arrangement: PropTypes.bool,
        containerName: PropTypes.string,
        options: PropTypes.object,
        onFinishLayout: PropTypes.func,
        onImageLoaded: PropTypes.func,
        gotoDetails: PropTypes.func,
        gotoProfile: PropTypes.func
    };

    static defaultProps = {
        items: [],
        containerName: "grid-wrapper",
        arrangement: true,
        options: {
            transitionDuration: 0,
            percentPosition: false,
            columnWidth: window.screen.width == 768 ? 246 : 278,
            // itemSelector: ".grid-item",
            // fitWidth: true,
            containerStyle: {
                position: "relative", // this is important
                paddingBottom: "100px"
            }
        },
        onFinishLayout () {},
        onImageLoaded () {},
        gotoDetails () {},
        gotoProfile () {}
    };

    componentDidMount() {
        this.masonry.on('layoutComplete', e => {
            this.props.onFinishLayout(this.masonry, e)
        });
    }

    handleImageLoaded(e) {
        this.props.onImageLoaded(e);
    }

    getImageCard(item = {}, i = 0, _items = []) { /* solve fkin hard-coded data error */
        let card = this.props.cards[item.kind || item.type];
        if (!card) card = this.props.cards.img;

        if (card) {
            return React.cloneElement(
                card,
                {
                    _item: item,
                    ...card.props,
                    ...item,
                    key: i,
                    index: i,
                    _items: _items,
                    _prev: _items[i - 1],
                    _next: _items[i + 1]
                }
            )
        }
    }

    render() {

        return (
            <Masonry
                ref={e => this.masonry = e && e.masonry}
                className={this.props.containerName}
                options={this.props.options}
                onImagesLoaded={::this.handleImageLoaded}
                updateOnEachImageLoad={true}
            >
                { this.props.items.map(::this.getImageCard) }
            </Masonry>
        )
    }
}
