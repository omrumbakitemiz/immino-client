import React, { Component } from 'react';

import './App.css';

import axios from 'axios';

import { FormLabel, FormControl, FormGroup } from 'material-ui/Form';
import Button from 'material-ui/Button';
import MyMap from "./Map/Map";

const url = "http://d8c7eb92.ngrok.io/simplify";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      coordinates: null,
      showMap: false
    };

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
      .then(res => {
        console.log("res:", res);
        this.setState({
          coordinates: res.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChange(e) {
    e.preventDefault();

    this.setState({
      json: e.target.value
    })
  }

  showMap() {
    this.setState({
      showMap: true
    });
  }

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
              <textarea className="text-area" placeholder="JSON veriyi buraya yapıştırın." onChange={this.onChange} />
            </FormGroup>
          </FormControl>
        </form>

        {this.state.showMap && this.state.coordinates && <MyMap />}
      </div>
    );
  }
}

export default App;
