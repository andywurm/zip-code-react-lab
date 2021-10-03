import React, { Component } from 'react';
import './App.css';

function CitySearchField(props) {

  return (
    <div>
      <input onChange={(e) => props.handleChange(e)} />
    </div>);

}

function Zipcodes(props) {

  return (
    <div>
      <ul>
        <li>Zip Codes: {props.data}</li>
      </ul>
    </div>
  );

}


class App extends Component {

  state = {
    cityName: '',
    zips: [],
  }

  cityChange = (event) => {

    console.log(event.target.value)

    this.setState({ zipCode: event.target.value })

    fetch('https://ctp-zip-api.herokuapp.com/city/' + event.target.value.toUpperCase())
      .then(res => res.json())
      .then(zips => {
        console.log(zips)
        this.setState({ zips });
      })
      .catch(err => {
        this.setState({ zips: [] })
      })

  }

  render() {

    return (
      <div className="App">
        <h1>Hello</h1>
        <CitySearchField handleChange={(e) => this.cityChange(e)} />
        <div>
          { this.state.zips.map(zip => <Zipcodes data={zip} />)}
        </div>
      </div>
      
    );
  }
  
}

export default App;
