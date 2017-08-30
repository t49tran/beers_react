import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Footer from './Footer';
import Header from './Header';
import Banner from './Banner';
import FeaturedList from './FeaturedList';
import SearchResults from './SearchResults';

export default function App() {
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
