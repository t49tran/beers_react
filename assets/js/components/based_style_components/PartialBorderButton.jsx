import styled from 'styled-components';

const PartialBorderBox = styled.button`
  border-top: 2px solid #edb62b;
  border-left: 2px solid #edb62b;
  border-right: 0;
  border-bottom: 0;
  padding: 20px 40px;
  background-color: #fff;
  color: #edb62b;
  position: relative;
  text-transform: uppercase;
  font-family: "Josefin Slab", serif;

  &:before,
  &:after {
    content: "";
    position: absolute;
    background-color: #edb62b;
    transition: all 1s;
  }

  &:before {
    right: 0;
    top: 0;
    height: 50%;
    width: 2px;
  }
  &:after {
    left: 0;
    bottom: 0;
    width: 75%;
    height: 2px;
  }

  &:hover {
    &:before {
      height: 100%;
    }
    &:after {
      width: 100%;
    }
  }
`;

export default PartialBorderBox;