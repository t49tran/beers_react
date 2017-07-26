import React from 'react';
import {fetchCategoriesIfNeeded} from '../../actions/categories';
import {fetchStylesIfNeeded} from '../../actions/styles';
import {connect} from 'react-redux';

class CategorySelect extends React.Component{
    static get propTypes() {
        return {
            categories: React.PropTypes.array.isRequired,
            isFetching: React.PropTypes.bool.isRequired,
            lastUpdated: React.PropTypes.number,
            dispatch: React.PropTypes.func.isRequired,
            selected_category: React.PropTypes.number
        };
    }

    constructor(props) {
        super(props);
        this.updateCategory = this.updateCategory.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchCategoriesIfNeeded());
    }

    updateCategory(event) {
        const { dispatch } = this.props;

        // Update category value of the parent component
        if(this.props.categoryChange) {
            this.props.categoryChange("category", event.target.value);
        }

        dispatch(fetchStylesIfNeeded(event.target.value));
    }

    render() {
        const { categories, isFetching, lastUpdated } = this.props;
        const isEmpty = categories.length === 0;
        
        return (
            <div className="select__wrapper--category">
                {isEmpty
                    ? <h3>Loading...</h3>
                    : <select onChange={this.updateCategory} className="select__category form-control" style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <option value="">Categories</option>
                    {categories.map((category, i) =>
                        <option key={category.id} value={category.id}>{category.name}</option>
                    )}
                </select>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { getCategories } = state;
    const {
        isFetching,
        lastUpdated,
        items: categories
    } = getCategories['default'] || {
        isFetching: true,
        items: []
    };

    return {
        categories,
        isFetching,
        lastUpdated
    }
};

export default connect(mapStateToProps)(CategorySelect);
