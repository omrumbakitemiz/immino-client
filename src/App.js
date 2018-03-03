import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onFormSubmit(e) {
    e.preventDefault();

    const file = this.state.file;

    /* fetch("https://yazlab2proje1-server.herokuapp.com/getReducedData", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(file)
    })
    .then(res => res.json())
    .then(res => {
      console.log("res: ", res);
    }); */

    axios
      .post('https://yazlab2proje1-server.herokuapp.com/getReducedData', file)
      .then(res => {
        console.log("res:", res);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChange(e) {
    this.setState({
      file:e.target.files[0]
    });
  }

  render() {
    return (
      <div>
        

        <form onSubmit={this.onFormSubmit}>
          <h1>File Upload</h1>
          <input type="file" onChange={this.onChange} />
          <button type="submit">Upload</button>
        </form>
      </div>
    );
  }
}

export default App;
