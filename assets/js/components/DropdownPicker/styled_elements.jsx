import styled from 'styled-components';

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownLabel = styled.div`
  font-family: 'Muli', sans-serif;
  padding-bottom: 10px;

  .fa {
    text-transform: uppercase;
    padding-left: 20px;
  }
`;

const DropdownList = styled.ul`
  position: absolute;
  list-style: none;
  display: ${props => props.show ? 'block' : 'none'};
  max-height: ${props => props.maxHeight ? props.maxHeight : 'none'};
  overflow: auto;
  background-color: ${props => props.backgroundColor ? props.backgroundColor : 'rgba(255, 255, 255, .5)'};
  padding: 10px;
  border-radius: 5px;
`;

const DropdownListElement = styled.li`
  position: relative;
  color: ${props => props.color ? props.color : 'black'};

  input {
    margin-right: 10px;
  }
`;

export { DropdownWrapper, DropdownLabel, DropdownList, DropdownListElement };
