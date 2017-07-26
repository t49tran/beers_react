import React from 'react';
import {connect} from 'react-redux';
import {fetchCountriesIfNeeded} from '../../actions';

class CountrySelect extends React.Component{
    static get propTypes() {
        return {
            countries: React.PropTypes.array.isRequired,
            isFetching: React.PropTypes.bool.isRequired,
            lastUpdated: React.PropTypes.number,
            dispatch: React.PropTypes.func.isRequired
        };
    }

    constructor(props) {
        super(props);

        this.updateCountry = this.updateCountry.bind(this);
    }

    updateCountry(event) {
        if(this.props.countryChange === undefined) return;

        this.props.countryChange("country", event.target.value);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchCountriesIfNeeded());
    }

    render(){
        const { countries, isFetching, lastUpdated } = this.props;
        const isEmpty = countries.length === 0;

        return (
            <div className="select__wrapper--country">
                {isEmpty
                    ? <h3>Loading...</h3>
                    : <select onChange={this.updateCountry} className="select__country form-control" style={{ opacity: isFetching ? 0.5 : 1 }}>
                        <option value="">Countries</option>
                        {countries.map((country, i) =>
                            <option key={country.code} value={country.code}>{country.name}</option>
                        )}
                    </select>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { getCountries } = state;
    const {
        isFetching,
        lastUpdated,
        items: countries
    } = getCountries['default'] || {
        isFetching: true,
        items: []
    };
    
    return {
        countries,
        isFetching,
        lastUpdated
    }
};

export default connect(mapStateToProps)(CountrySelect);