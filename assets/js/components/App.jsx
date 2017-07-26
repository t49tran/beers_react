import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Footer from './Footer';
import Header from './Header';
import {Banner} from './Banner';
import {FeaturedList} from './FeaturedList';
import SearchResults from './SearchResults';

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <Banner />
          <SearchResults />
          <FeaturedList />
          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;