import React from 'react';
import CountrySelect from './CountrySelect';
import CategorySelect from './CategorySelect';
import StyleSelect from './StyleSelect';
import BeersSuggestionInput from './BeersSuggestionInput';
import { InputGroup, Input, Button, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { searchBeersIfNeeded } from '../../actions/beers';

class BeersSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: '',
      cat: '',
      style: '',
      country: '',
    };
    this.searchFieldUpdate = this.searchFieldUpdate.bind(this);
    this.search = this.search.bind(this);
  }

  searchFieldUpdate(field, value) {
    this.setState({[field]:value});
  }

  search() {
    const { dispatch } = this.props;

    dispatch(searchBeersIfNeeded(this.state));
  }

  render() {
    return (
       <div className="beer_search_form">
           <Row className="input-group--primary">
             <Col sm={{ size: 10 }}>
               <BeersSuggestionInput beerChange={this.searchFieldUpdate} />
             </Col>
             <Col sm={{ size: 2 }}>
               <Button onClick={this.search} className="beer_search_form__submit">Let's go</Button>
             </Col>
           </Row>
           <InputGroup className="input-group--secondary">
               <CountrySelect countryChange={this.searchFieldUpdate} />
               <CategorySelect categoryChange={this.searchFieldUpdate} />
               <StyleSelect styleChange={this.searchFieldUpdate} />
           </InputGroup>
       </div>
    );
  }
}

export default connect()(BeersSearchForm);
