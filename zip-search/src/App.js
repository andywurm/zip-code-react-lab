import React, { Component } from 'react';
import './App.css';


function City(props) {
  return (
    <div>
      <h3>{props.data.City}</h3>
      <ul>
        <li>Population: {props.data.EstimatedPopulation}</li>
      </ul>
    </div>
  );
}

function ZipSearchField(props) {
  return (
  <div>
    <input onChange={(e) => props.handleChange(e)} />
  </div>);
}


class App extends Component {
  state = {
    zipCode: '',
    cities: [],
  }

  zipChange = (event) => {

    console.log(event.target.value)

    this.setState({ zipCode: event.target.value })

    if(event.target.value.length === 5) {
      fetch('https://ctp-zip-api.herokuapp.com/zip/'+event.target.value)
        .then(res => res.json())
        .then(cities => {
          console.log(cities)
          this.setState( { cities } );
        })
        .catch(err => {
          this.setState({ cities: [] })
        })
    } else {
      this.setState({ cities: [] })
    }
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField handleChange={ (e) => this.zipChange(e) } />
        <div>Current Zip code is: { this.state.zipCode }</div>
        <div>

          { this.state.cities.map(city => <City data={city} />)}
        </div>
      </div>
    );
  }
}

export default App;
