import React from 'react';
import shortid from 'shortid';
import {
  DropdownWrapper,
  DropdownLabel,
  DropdownList,
  DropdownListElement,
} from './styled_elements';

class DropdownPicker extends React.Component {
  static get propTypes() {
    return {
      placeholder: React.PropTypes.string,
      elements: React.PropTypes.array,
      updateSelectedList: React.PropTypes.func.isRequired,
      isSelected: React.PropTypes.func.isRequired,
    };
  }

  static get defaultProps() {
    return {
      placeholder: 'Select',
      elements: [],
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
    };
    this.toggleList = this.toggleList.bind(this);
  }

  toggleList() {
    const { showDropdown } = this.state;

    this.setState({
      showDropdown: !showDropdown,
    });
  }

  render() {
    const {
      placeholder,
      updateSelectedList,
      isSelected,
      elements,
      dropdownSettings = {},
    } = this.props;

    const { showDropdown } = this.state;
    const { maxHeight } = dropdownSettings;

    return (
      <DropdownWrapper>
        <DropdownLabel
          onClick={this.toggleList}
          role="button"
          tabIndex="-1"
        >
          {placeholder} <span className={`fa ${showDropdown ? 'fa-caret-up' : 'fa-caret-down'}`}></span>
        </DropdownLabel>

        <DropdownList
          show={ showDropdown }
          maxHeight= { maxHeight }
        >
          {elements.map(element =>
            <DropdownListElement key={shortid.generate()}>
              <label>
                <input
                  type="checkbox"
                  value={element.value}
                  onChange={updateSelectedList}
                  checked={isSelected(element.value)}
                />
                <span>{element.label}</span>
              </label>
            </DropdownListElement>
          )}
        </DropdownList>
      </DropdownWrapper>
    );
  }
}

export default DropdownPicker;