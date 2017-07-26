import React from 'react';
import ReactFauxDOM from 'react-faux-dom';
import _ from 'lodash';
import { connect } from 'react-redux';
import { registerBubble } from '../../actions/bubbles';

class BeerBubble extends React.Component {
  static defaultProps = {
    speed: _.random(5, 25), // set speed equal to
  };

  constructor(props) {
    super(props);
    const {x = 0, y = 0} = props;

    this.state = { x, y };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.move();
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentDidUpdate() {
    const { visible } = this.props;
    if (!visible) clearInterval(this.timer);
  }

  move() {
    const {speed} = this.props;
    const {x, y} = this.state;

    const vectorSine = _.random(0.1, 0.9);
    const vectorDirection = Math.round(Math.random()) * 2 - 1; // get 1 or -1

    const xNext = x + (vectorSine * speed) * vectorDirection;
    const yNext = y + Math.sqrt(speed * speed - (vectorSine * speed) * (vectorSine * speed)) * vectorDirection;

    this.setState({
      x: xNext,
      y: yNext,
    });
  }

  render() {
    const { x, y } = this.state;
    const { radius, visible } = this.props;
    const display = visible ? 'block' : 'none';
    const color = '#feff77';

    this.bubble = ReactFauxDOM.createElement('div');
    this.bubble.setAttribute('class', 'bubble__container');

    const svg = ReactFauxDOM.createElement('svg');

    svg.setAttribute('width', radius * 2);
    svg.setAttribute('height', radius * 2);

    svg.style.setProperty('transform', `translateX(${x}px) translateY(${y}px)`);
    svg.style.setProperty('transition', 'all 1.2s');
    svg.style.setProperty('display', display);

    const circle = ReactFauxDOM.createElement('circle');

    circle.setAttribute('cx', radius);
    circle.setAttribute('cy', radius);
    circle.setAttribute('r', radius);
    circle.setAttribute('fill', color);

    svg.appendChild(circle);
    this.bubble.appendChild(svg);

    return this.bubble.toReact();
  }
}

const mapStateToProps = (state, ownProps) => {
  const { bubbles } = state;
  const { bubbleId } = ownProps;

  const {
    visible,
  } = bubbles[bubbleId] || { visible: true };

  return { visible };
};

export default connect(mapStateToProps)(BeerBubble);
