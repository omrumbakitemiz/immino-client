import React, { Component } from 'react';

import './App.css';

import axios from 'axios';

import Button from 'material-ui/Button';
import { FormLabel, FormControl, FormGroup } from 'material-ui/Form';

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

    axios
      .post('https://yazlab2proje1-server.herokuapp.com/simplify', json)
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
      </div>
    );
  }
}

export default App;
