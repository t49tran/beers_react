import React from 'react';
import {connect} from 'react-redux';
import {fetchStylesIfNeeded} from '../../actions/styles';

class StyleSelect extends React.Component{
    static get propTypes() {
        return {
            styles: React.PropTypes.array.isRequired,
            isFetching: React.PropTypes.bool.isRequired,
            lastUpdated: React.PropTypes.number,
            dispatch: React.PropTypes.func.isRequired
        };
    }

    constructor(props) {
        super(props);

        this.updateStyle = this.updateStyle.bind(this);
    }

    updateStyle(event){
        if(this.props.styleChange === undefined) return;

        this.props.styleChange("style", event.target.value);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchStylesIfNeeded());
    }

    render(){
        const { styles, isFetching, lastUpdated } = this.props;
        const isEmpty = styles.length === 0;

        return (
            <div className="select__wrapper--style">
                {isEmpty
                    ? <h3>Loading...</h3>
                    : <select onChange={this.updateStyle} className="select__style form-control" style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <option value="">Styles</option>
                    {styles.map((style, i) =>
                        <option key={style.id} value={style.id}>{style.name}</option>
                    )}
                </select>
                }
            </div>
        )
    }
}

let mapStateToProps = state => {
    const { getStyles } = state;

    const {
        isFetching,
        lastUpdated,
        items: styles
    } = getStyles['default'] || {
        isFetching: true,
        items: []
    };

    return {
        styles,
        isFetching,
        lastUpdated
    }
};

export default connect(mapStateToProps)(StyleSelect);