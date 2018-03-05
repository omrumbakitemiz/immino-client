import React, { Component } from 'react';
import { GoogleApiWrapper} from 'google-maps-react';
import Map from './Map';

class MapContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      coordinates: null
    };
  }

  render() {
    const style = {
      width: '100vw',
      height: '100vh'
    };

    return (
      <div style={style}>
        <Map google={this.props.google}/>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyD4E9oJs20gMki5uB3uRmp05v-gpCG7h0c")
})(MapContainer);