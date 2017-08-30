import styled from 'styled-components';

const PartialBorderBox = styled.div`
  position: relative;
  &:before {
    content: '';
    height: 50%;
    width: 4px;
    position: absolute;
    top: 0;
    left: 0;
    background: #edb62b;
    transition: all 1s;
  }
  &:after {
    content: '';
    width: 50%;
    height: 4px;
    position: absolute;
    top: 0;
    left: 0;
    background: #edb62b;
    transition: all 1s;
  }
  &.ale {
    &:before,
    &:after {
      background: #f29e4e;
    }
  }
  &:hover {
    box-shadow: 0 0.6rem 4rem rgba(0, 0, 0, 0.08);
    background: rgba(255, 255, 255, .5);
    &:after {
      width: 75%;
    }
    &:before {
      height: 25%;
    }

  }
`;

export default PartialBorderBox;
