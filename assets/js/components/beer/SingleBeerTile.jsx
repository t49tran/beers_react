import React from 'react';
import styled from 'styled-components';

import PartialBorderBox from '../based_style_components/PartialBorderBox';
import PartialBorderButton from '../based_style_components/PartialBorderButton';
import ScrollTo from '../../services/ScrollTo';

class SingleBeerTile extends React.Component {
  handleQuoteClick = () => {
    const element = document.getElementById("quoteForm");
    if (element === undefined || element.getBoundingClientRect() === undefined) return;

    ScrollTo(element.getBoundingClientRect().top);
  };

  render() {
    const { beer } = this.props;

    const BeerTile__Right = styled.div`
      display: flex;
      align-items: center;
      background-image: url('http://lorempixel.com/450/600/food/');
      background-size: cover;
      background-position: 50% 50%;
      height: 100%;
      width: 100%;
    `;

    const PaddedTile = PartialBorderBox.extend`
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `;

    return (
      <div className="beer__tile container">
        <div className="row justify-content-between">
          <div className="col col-sm-5">
            <PaddedTile>
              <h1 className="beer__tile__heading">{beer.name}</h1>
              <p className="beer__tile__content">{beer.description}</p>
              <PartialBorderButton onClick={this.handleQuoteClick}>Ask for a quote</PartialBorderButton>
            </PaddedTile>
          </div>
          <div className="col col-sm-7">
            <BeerTile__Right></BeerTile__Right>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleBeerTile;
