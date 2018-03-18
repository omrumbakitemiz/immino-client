import React, { Component } from 'react';

import axios from 'axios';

import { FormLabel, FormControl, FormGroup } from 'material-ui/Form';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Button from 'material-ui/Button';

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
      uploadPressed: false,
      textAreaHide: false,
      json: "",
      searchResults: null
    };

    this.clearJsonData = this.clearJsonData.bind(this);
    this.showMap = this.showMap.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleTextArea = this.toggleTextArea.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.searchRectangle = this.searchRectangle.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();

    // text şeklinde olan json veri json objesine dönüştürüldü
    const json = JSON.parse(this.state.json);

    // const url = `https://immino-server.herokuapp.com/ramer?epsilon=${this.state.sliderValue}`;
    const url = `http://localhost:8080/ramer?epsilon=${this.state.sliderValue}`;

    this.setState({
      coordinates: json,
      sliderLock: true
    });

    this.makeRequest(url, json);

    this.toggleTextArea();
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
    this.setState({
      json: " ",
      searchResults: null
    });
  }

  handleSliderChange = value => {
    const url = `https://immino-server.herokuapp.com/ramer?epsilon=${this.state.sliderValue}`;
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
    this.setState({
      textAreaHide: true
    });
  }

  handleReset() {
    this.setState({
      textAreaHide: false,
      showMap: false
    });

    this.clearJsonData();
  }

  searchRectangle(rectangleBounds) {
    const { reducedCoordinates } = this.state;

    const { nw, se } = rectangleBounds;
    const url = `http://localhost:8080/search?nwLat=${nw.lat}&nwLng=${nw.lng}&seLat=${se.lat}&seLng=${se.lng}`;

    axios
      .post(url, reducedCoordinates)
      .then((response) => {
        this.setState({
          searchResults: response.data
        });
      })
      .catch(error => console.log(error));
  }

  render() {
    let mapShowCondition = this.state.showMap && this.state.reducedCoordinates && this.state.sliderValue;

    const { sliderValue, textAreaHide, json } = this.state;

    return (
      <div>
        <h1 className="title">immino</h1>

        <form className="upload-form" onSubmit={this.onFormSubmit}>
          <FormControl className="form-control">
            <FormLabel className="form-label">GPS Verisi İndirgeme</FormLabel>
            <FormGroup className="form-group-slider">
              <InputRange maxValue={35} minValue={1} value={sliderValue} onChange={this.handleSliderChange} />
            </FormGroup>
            <div style={{display: "flex", justifyContent: "space-between"}}>
              <FormGroup className="form-group">
                <Button onClick={this.showMap} variant="raised" color="primary" id="upload-button" type="submit">Upload</Button>
              </FormGroup>
              <FormGroup className="form-group">
                <Button onClick={this.handleReset} variant="raised" color="secondary">Clear</Button>
              </FormGroup>
            </div>
            {!textAreaHide &&
            <div>
              <FormGroup>
                <textarea id="text-area" className="text-area form-group" placeholder="JSON veriyi buraya yapıştırın."
                onChange={this.onChange} value={json} />
              </FormGroup>
              <FormGroup id="clear-data" className="form-group">
                <Button onClick={this.clearJsonData} variant="raised">Clear Data</Button>
              </FormGroup>
            </div>}
          </FormControl>
        </form>

        <div className="maps-flex">
        {/*TODO: reducedCoordinates iki kez props olarak gönderilmiş*/}
          {mapShowCondition && <MyMap searchRectangle={this.searchRectangle} reducedCoordinates={this.state.reducedCoordinates} className="map1" coordinates={this.state.reducedCoordinates} />}
          {mapShowCondition && <MyMap reducedCoordinates={this.state.reducedCoordinates} classNamr="map2" coordinates={this.state.coordinates} />}
        </div>

        {/*RectangleComplete fonksiyonu çalıştıktan sonra seçili alan
        içinde kalan noktaların koordinatları gösterilecek.*/}

        {this.state.searchResults &&
          <div className="table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{fontSize: 20, width: 150}}>Koordinatlar</TableCell>
                <TableCell style={{fontSize: 20}}>Latitude</TableCell>
                <TableCell style={{fontSize: 20}}>Longitude</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.searchResults.map((coordinate, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{coordinate.lat}</TableCell>
                    <TableCell>{coordinate.lng}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
        }
      </div>
    );
  }
}

export default App;
