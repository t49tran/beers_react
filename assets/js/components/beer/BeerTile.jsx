import React from 'react';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { Link }  from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class BeerTile extends React.Component {
    static get propTypes() {
        return {
            beers: React.PropTypes.array
        };
    }

    render() {
        const { beer } = this.props;
        const beer_url = encodeURI(`/beer/${beer.name}/${beer.id}`);
        return (
            <div className="beer-tile">
                <Card className="beer-tile__card" style={{height:'100%'}}>
                    <CardMedia className="beer-tile__card__img">
                        <img style={{width:'auto'}} src={beer.labels && beer.labels.large} />
                    </CardMedia>
                    <CardTitle title={beer.name} subtitle={beer.style.name} />
                    <CardText>
                        { beer.description && beer.description.substr(0, 150)+'...' }
                    </CardText>
                    <CardActions>
                        <FlatButton label="Buy this beer" />
                        <Link className="nav-link" to={beer_url}>Read More</Link>
                    </CardActions>
                </Card>
            </div>
        )
    }
}

export default BeerTile;
