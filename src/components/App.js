import React, { Component } from 'react';

import axios from 'axios';

import { FormLabel, FormControl, FormGroup, FormControlLabel } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Switch from 'material-ui/Switch';

import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';

import MyMap from './Map/MyMap';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: null,
      reducedCoordinates: null,
      showMap: false,
      responseHeaders: null,
      sliderValue: 8,
      uploadPressed: false
    };

    this.clearJsonData = this.clearJsonData.bind(this);
    this.showMap = this.showMap.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();

    // text şeklinde olan json veri json objesine dönüştürüldü
    const json = JSON.parse(this.state.json);

    const url = `http://localhost:8080/ramer?epsilon=${this.state.sliderValue}`;

    this.setState({
      coordinates: json,
      sliderLock: true
    });

    this.makeRequest(url, json);
  }

  onChange(e) {
    e.preventDefault();

    this.setState({
      json: e.target.value,
    });
  }

  showMap() {
    this.setState({
      showMap: true,
      uploadPressed: true
    });
  }

  clearJsonData() {
    document.getElementById('textArea').value = null;
    this.setState({
      json: null
    });
  }

  handleSliderChange = value => {
    const url = `http://localhost:8080/ramer?epsilon=${this.state.sliderValue}`;
    const { uploadPressed, coordinates } = this.state;

    if(uploadPressed) {
      this.setState({
        sliderValue: value
      });
      this.makeRequest(url, coordinates);
    }
    else {
      this.setState({
        sliderValue: value
      });
    }
  };

  makeRequest(url, data) {
    axios
      .post(url, data)
      .then((response) => {
        this.setState({
          reducedCoordinates: response.data,
          responseHeaders: response.headers
        });
      })
      .catch((error) => console.log(error));
  }

  toggleTextArea() {
    document.getElementById('textArea').hidden = !document.getElementById('textArea').hidden;
  }

  render() {
    let mapShowCondition = this.state.showMap && this.state.reducedCoordinates && this.state.sliderValue;

    const { sliderValue } = this.state;

    return (
      <div>
        <h1 className="title">immino</h1>

        <form className="upload-form" onSubmit={this.onFormSubmit}>
          <FormControl className="form-control">
            <FormLabel className="form-label">Veri İndirge</FormLabel>
            <FormGroup className="form-group-slider">
              {/* TODO: Epsilon değeri için değer kontrolü yapılmalı */}
              <InputRange maxValue={35} minValue={1} value={sliderValue} onChange={this.handleSliderChange} />
            </FormGroup>
            <FormGroup className="form-group">
              <Button onClick={this.showMap} variant="raised" id="upload-button" type="submit">Upload</Button>
              <FormControlLabel control={<Switch onChange={this.toggleTextArea} />} label="Gizle" />
            </FormGroup>
            <FormGroup>
              <textarea id="textArea" className="text-area form-group" placeholder="JSON veriyi buraya yapıştırın."
               onChange={this.onChange} />
            </FormGroup>
            <FormGroup className="form-group">
              <Button onClick={this.clearJsonData} variant="raised">Clear Data</Button>
            </FormGroup>
          </FormControl>
        </form>

        <div className="maps-flex">
          {mapShowCondition && <MyMap className="map1" coordinates={this.state.reducedCoordinates} />}
          {mapShowCondition && <MyMap classNamr="map2" coordinates={this.state.coordinates} />}
        </div>
      </div>
    );
  }
}

export default App;
