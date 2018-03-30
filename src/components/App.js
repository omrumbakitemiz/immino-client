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

  sampleCoordinates = `[{"lat":49.950832,"lng":-125.270833},{"lat":49.91,"lng":-99.951944},{"lat":69.108055,"lng":-105.138333},{"lat":49.052333,"lng":-123.870167},{"lat":49.296389,"lng":-117.6325},{"lat":47.007778,"lng":-65.449167},{"lat":47.990833,"lng":-66.330278},{"lat":67.816667,"lng":-115.143889},{"lat":52.075001,"lng":-111.445278},{"lat":49.152779,"lng":-121.93889},{"lat":70.486111,"lng":-68.516667},{"lat":64.193333,"lng":-83.359444},{"lat":64.043056,"lng":-139.127778},{"lat":61.371111,"lng":-139.040556},{"lat":49.468056,"lng":-120.511389},{"lat":49.210833,"lng":-57.391388},{"lat":58.422222,"lng":-130.032222},{"lat":51.100834,"lng":-100.0525},{"lat":55.742333,"lng":-120.183},{"lat":53.309723,"lng":-113.579722},{"lat":61.094166,"lng":-94.070833},{"lat":49.210278,"lng":-102.965833},{"lat":53.578888,"lng":-116.465},{"lat":79.994722,"lng":-85.814167},{"lat":68.304167,"lng":-133.482778},{"lat":63.75639,"lng":-68.555832},{"lat":45.868889,"lng":-66.537222},{"lat":48.746111,"lng":-69.097222},{"lat":54.678055,"lng":-101.681667},{"lat":61.180832,"lng":-113.689722},{"lat":61.760153,"lng":-121.236525},{"lat":44.225277,"lng":-76.596944},{"lat":53.625278,"lng":-77.704167},{"lat":48.775278,"lng":-64.478611},{"lat":49.778332,"lng":-86.939445},{"lat":47.424721,"lng":-61.778056},{"lat":52.816666,"lng":-102.31139},{"lat":49.831667,"lng":-92.744167},{"lat":70.762778,"lng":-117.806111},{"lat":68.635556,"lng":-95.849722},{"lat":43.173611,"lng":-79.935},{"lat":45.5175,"lng":-73.416944},{"lat":60.839722,"lng":-115.782778},{"lat":44.880833,"lng":-63.50861},{"lat":48.773888,"lng":-91.638611},{"lat":72.683334,"lng":-77.966667},{"lat":45.294445,"lng":-73.281111},{"lat":48.544167,"lng":-58.549999},{"lat":50.702222,"lng":-120.444444},{"lat":43.460833,"lng":-80.378611},{"lat":54.805278,"lng":-66.805278},{"lat":51.5175,"lng":-109.180833},{"lat":43.862221,"lng":-79.37},{"lat":47.82,"lng":-83.346667},{"lat":54.125278,"lng":-108.522778},{"lat":53.309166,"lng":-110.0725},{"lat":82.517778,"lng":-62.280556},{"lat":49.956112,"lng":-119.377778},{"lat":63.616389,"lng":-135.868333},{"lat":50.330278,"lng":-105.559167},{"lat":56.653333,"lng":-111.221944},{"lat":51.291111,"lng":-80.607778},{"lat":46.272778,"lng":-75.990556},{"lat":45.681944,"lng":-74.005278},{"lat":50.19,"lng":-61.789167},{"lat":45.521694,"lng":-75.563589},{"lat":49.761667,"lng":-77.802778},{"lat":67.570556,"lng":-139.839167},{"lat":54.404999,"lng":-110.279444},{"lat":58.621389,"lng":-117.164722},{"lat":45.3225,"lng":-75.669167},{"lat":53.214167,"lng":-105.672778},{"lat":56.226944,"lng":-117.447222},{"lat":49.903056,"lng":-98.273889},{"lat":49.21611,"lng":-122.71},{"lat":51.446388,"lng":-90.214167},{"lat":49.836389,"lng":-64.288611},{"lat":44.23,"lng":-78.363333},{"lat":54.28611,"lng":-130.444722},{"lat":58.767223,"lng":-111.117222},{"lat":44.974722,"lng":-79.303333},{"lat":46.791111,"lng":-71.393333},{"lat":52.182222,"lng":-113.894444},{"lat":42.275556,"lng":-82.955556},{"lat":60.116389,"lng":-128.8225},{"lat":49.788334,"lng":-94.363056},{"lat":49.630278,"lng":-112.799722},{"lat":46.112221,"lng":-64.678611},{"lat":49.710833,"lng":-124.886667},{"lat":50.431944,"lng":-104.665833},{"lat":48.371944,"lng":-89.323889},{"lat":55.179722,"lng":-118.885},{"lat":51.264721,"lng":-102.461667},{"lat":52.769167,"lng":-108.24361},{"lat":48.936944,"lng":-54.568056},{"lat":46.161388,"lng":-60.047779},{"lat":53.026112,"lng":-122.510278},{"lat":74.716944,"lng":-94.969444},{"lat":47.764444,"lng":-69.584722},{"lat":48.52,"lng":-72.265556},{"lat":52.429722,"lng":-114.904167},{"lat":62.81139,"lng":-92.115833},{"lat":46.625,"lng":-80.798889},{"lat":45.438611,"lng":-71.691389},{"lat":45.316111,"lng":-65.890278},{"lat":60.020278,"lng":-111.961944},{"lat":72.982222,"lng":-84.613611},{"lat":46.440556,"lng":-63.833611},{"lat":71.993889,"lng":-125.2425},{"lat":64.23,"lng":-76.526667},{"lat":55.801111,"lng":-97.864166},{"lat":44.118889,"lng":-77.528056},{"lat":48.569721,"lng":-81.376667},{"lat":43.627499,"lng":-79.396167},{"lat":69.433334,"lng":-133.026389},{"lat":45.470556,"lng":-73.740833},{"lat":66.521389,"lng":-86.224722},{"lat":68.776111,"lng":-81.243611},{"lat":48.206111,"lng":-78.835556},{"lat":55.15139,"lng":-105.261944},{"lat":53.355833,"lng":-110.82389},{"lat":67.545833,"lng":-64.031389},{"lat":48.053333,"lng":-77.782778},{"lat":58.096111,"lng":-68.426944},{"lat":65.281617,"lng":-126.798219},{"lat":49.193889,"lng":-123.184444},{"lat":55.841944,"lng":-108.4175},{"lat":44.745834,"lng":-81.107222},{"lat":45.952221,"lng":-77.319168},{"lat":49.910036,"lng":-97.239886},{"lat":52.921944,"lng":-66.864444},{"lat":52.183056,"lng":-122.054167},{"lat":63.209444,"lng":-123.436667},{"lat":49.612222,"lng":-115.781944},{"lat":53.5725,"lng":-113.520556},{"lat":52.170834,"lng":-106.699722},{"lat":50.01889,"lng":-110.720833},{"lat":56.238056,"lng":-120.740278},{"lat":50.113889,"lng":-91.905278},{"lat":66.145,"lng":-65.713611},{"lat":47.695,"lng":-79.848889},{"lat":53.889444,"lng":-122.678889},{"lat":54.468508,"lng":-128.576219},{"lat":43.033056,"lng":-81.151111},{"lat":49.025278,"lng":-122.360556},{"lat":60.709553,"lng":-135.067269},{"lat":46.363611,"lng":-79.422778},{"lat":51.113888,"lng":-114.020278},{"lat":54.824722,"lng":-127.182778},{"lat":58.836389,"lng":-122.596944}]`;

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
      json: this.sampleCoordinates,
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

  url = `https://immino-server.herokuapp.com`;

  onFormSubmit(e) {
    e.preventDefault();

    // text şeklinde olan json veri json objesine dönüştürüldü
    const json = JSON.parse(this.state.json);

    // const url = `https://immino-server.herokuapp.com/ramer?epsilon=${this.state.sliderValue}`;
    // const url = `${this.url}/ramer?epsilon=${this.state.sliderValue}`;

    this.setState({
      coordinates: json,
      sliderLock: true
    });

    this.makeRequest(this.url, json);

    this.toggleTextArea();
  }

  searchRectangle(rectangleBounds) {
    const { reducedCoordinates } = this.state;

    const { nw, se } = rectangleBounds;
    const url = `${this.url}/search?nwLat=${nw.lat}&nwLng=${nw.lng}&seLat=${se.lat}&seLng=${se.lng}`;

    axios
      .post(url, reducedCoordinates)
      .then((response) => {
        this.setState({
          searchResults: response.data
        });
      })
      .catch(error => console.log(error));
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
      json: this.sampleCoordinates,
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
