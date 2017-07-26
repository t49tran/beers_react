import React from 'react';

export default class SuggestionBeersList extends React.Component{
    constructor(props) {
        super(props);
    }

    static get propTypes() {
        return {
            beers: React.PropTypes.array
        };
    }

    render(){
        let showClass = this.props.display ? "show" : "hide";
        return (
            <div className={showClass+" beersSuggestionList"}>
                {this.props.beers.map((beer, i) =>
                    <div onClick={() => this.props.beerSelect(beer)} className="beerSuggestionEntry" key={beer.id}>{beer.name}</div>
                )}
            </div>
        );
    }
}


