import React, { Component } from 'react';

//eslint-disable-next-line
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';

import axios from 'axios';

import Button from 'material-ui/Button';
import { FormLabel, FormControl, FormGroup } from 'material-ui/Form';
import MyFancyComponent from "./MyFancyComponent";

const url = "http://7d43cdef.ngrok.io/simplify";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      coordinates: null
    };

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

  render() {

    let fancyCompoent;
    if(this.state.coordinates!== null){
      fancyCompoent = (
        <MyFancyComponent coordinates={this.state.coordinates}/>
      )
    }
    else {
      fancyCompoent = (
        <MyFancyComponent />
      )
    }

    return (
      <div>
        <h1 className="title">Send JSON Data to Server</h1>

        <form className="upload-form" onSubmit={this.onFormSubmit}>
          <FormControl>
            <FormLabel className="form-label">File Upload</FormLabel>
            <FormGroup className="form-group">
              <Button variant="raised" id="upload-button" type="submit">Upload</Button>
            </FormGroup>
            <FormGroup>
              <textarea className="text-area" placeholder="JSON veriyi buraya yapıştırın." onChange={this.onChange} />
            </FormGroup>
          </FormControl>
        </form>

        {fancyCompoent}
      </div>
    );
  }
}

export default App;
