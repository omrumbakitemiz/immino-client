import React, { Component } from 'react';

//eslint-disable-next-line
//import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import './App.css';

import axios from 'axios';

import Button from 'material-ui/Button';
import { FormLabel, FormControl, FormGroup } from 'material-ui/Form';
import MyFancyComponent from "./MyFancyComponent";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      json: null
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();

    // text şeklinde olan json veri json objesine dönüştürüldü
    const json = JSON.parse(this.state.json);
    const url = 'http://6fc27ad9.ngrok.io/simplify';

    axios
      .post(url, json)
      .then(res => {
        console.log("res:", res);
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

        <MyFancyComponent/>
      </div>
    );
  }
}

export default App;
