import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Footer } from './Footer';
import { Header } from './Header';

class Breweries extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Breweries;
