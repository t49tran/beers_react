import React from 'react';
import { Container, Row, Col } from 'reactstrap';

import BeersSearchForm from './form/BeersSearchForm';

export default function Banner() {
  const imgUrl = '/images/taps.jpg';
  const inlineBg = {
    backgroundImage: `url(${imgUrl})`,
  };

  return (
    <div className="banner banner__homepage__top">
      <div className="banner__under-bg" style={inlineBg} />
      <Container>
        <Row>
          <Col className="banner__content" sm="12" md={{ size: 10, offset: 1 }}>
            <h2 className="banner__content__title">Beers 4 Geeks</h2>
            <h4 className="banner__content__cta">Search for the beers you love</h4>
            <BeersSearchForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
