import React from 'react';
import { connect } from 'react-redux';
import { fetchStylesIfNeeded } from '../../actions/styles';

class StyleSelect extends React.Component {
  static get propTypes() {
    return {
      styles: React.PropTypes.array.isRequired,
      isFetching: React.PropTypes.bool.isRequired,
      dispatch: React.PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);

    this.updateStyle = this.updateStyle.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchStylesIfNeeded());
  }

  updateStyle(event) {
    this.props.styleChange(event.target.value);
  }

  render() {
    const {
      styles,
      isFetching,
    } = this.props;

    const isEmpty = styles.length === 0;

    return (
      <div className="select__wrapper--style">
        {isEmpty
          ? <h3>Loading...</h3>
          : <select {...this.props}onChange={this.updateStyle} style={{ opacity: isFetching ? 0.5 : 1 }}>
            <option value="">Styles</option>
            {styles.map(style =>
              <option key={style.id} value={style.id}>{style.name}</option>,
            )}
          </select>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { getStyles } = state;

  const {
    isFetching,
    items: styles,
  } = getStyles.default || {
    isFetching: true,
    items: [],
  };

  return {
    styles,
    isFetching,
  };
};

const mapDispatchToProps = (dispatch) => {

};

export default connect(mapStateToProps)(StyleSelect);
