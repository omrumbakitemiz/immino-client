import React, { Component } from 'react';

import axios from 'axios';

import { FormLabel, FormControl, FormGroup } from 'material-ui/Form';
import Button from 'material-ui/Button';

// import Dropzone from 'react-dropzone'

import MyMap from './Map/MyMap';
import './App.css';

// const url = 'http://49f12132.ngrok.io/simplify';
const url = 'http://localhost:8080/simplify';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: null,
      showMap: false,
      files: null,
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

    axios
      .post(url, json)
      .then((res) => {
        this.setState({
          coordinates: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
    });
  }

  clearJsonData() {
    document.getElementById('textArea').value = null;
    this.setState({
      json: null
    });
  }

  /* onDrop(files) {
    this.setState({
      files: files,
    })
  } */

  render() {
    return (
      <div>
        <h1 className="title">Send Data to Server</h1>

        <form className="upload-form" onSubmit={this.onFormSubmit}>
          <FormControl>
            <FormLabel className="form-label">File Upload</FormLabel>
            <FormGroup className="form-group">
              <Button onClick={this.showMap} variant="raised" id="upload-button" type="submit">Upload</Button>
            </FormGroup>
            <FormGroup>
              <textarea id="textArea" className="text-area form-group" placeholder="JSON veriyi buraya yapıştırın." onChange={this.onChange} />
            </FormGroup>
            <FormGroup className="form-group">
              <Button onClick={this.clearJsonData} variant="raised">Clear Data</Button>
            </FormGroup>
          </FormControl>
        </form>

        {this.state.showMap && this.state.coordinates && <MyMap coordinates={this.state.coordinates} />}
        
        {/*<Dropzone onDrop={(files) => this.onDrop(files)}>
          <div>Try dropping some files here, or click to select files to upload.</div>
        </Dropzone>*/}
      </div>
    );
  }
}

export default App;
