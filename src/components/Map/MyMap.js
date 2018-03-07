/* eslint-disable no-undef */
import React, { PureComponent } from "react";

import { compose, withProps } from "recompose";

import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Rectangle } from "react-google-maps";
import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";

import Button from 'material-ui/Button';

const url = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD4E9oJs20gMki5uB3uRmp05v-gpCG7h0c";

class MyMap extends PureComponent {

  state = {
    bounds: new google.maps.LatLngBounds()
  }

  handleRectangleComplete = rectangle => {
    google.maps.event.clearInstanceListeners(rectangle);
    rectangle.setMap(null);
    
    const bounds = rectangle.getBounds();
    
    this.setState({
      bounds: bounds,

      rectangleBounds: {
        nw: {
          ltd: bounds.f.f,
          lng: bounds.b.b
        },
        se: {
          ltd: bounds.f.b,
          lng: bounds.b.f
        }
      }
    });
    
    console.log(`KB (ltd - lng): ${bounds.f.f}, ${bounds.b.b}`);
    console.log(`GD (ltd - lng): ${bounds.f.b}, ${bounds.b.f}`);
  };

  handleDeleteRectangle = e => {
    this.setState({
      bounds: new google.maps.LatLngBounds(),
      rectangleBounds: null
    });
  }

  render() {
    
    const pathCoordinates=[ 
      {lat:39.984702, lng: 116.318417},
      {lat:40.984702, lng: 116.418417},
      {lat:40.284702, lng: 116.518417},
      {lat:40.384702, lng: 116.618417},
      {lat:40.484702, lng: 116.718417}
    ];

    const coordinates = [
      { "lat": 39.984702, "lng": 116.318417 },
      { "lat": 39.984683, "lng": 116.31845 },
      { "lat": 39.984686, "lng": 116.318417 },
      { "lat": 39.984688, "lng": 116.318385 },
      { "lat": 39.984655, "lng": 116.318263 },
      { "lat": 39.984611, "lng": 116.318026 },
      { "lat": 39.984608, "lng": 116.317761 },
      { "lat": 39.984563, "lng": 116.317517 },
      { "lat": 39.984539, "lng": 116.317294 },
      { "lat": 39.984606, "lng": 116.317065 },
      { "lat": 39.984568, "lng": 116.316911 },
      { "lat": 39.984586, "lng": 116.316716 },
      { "lat": 39.984561, "lng": 116.316527 },
      { "lat": 39.984536, "lng": 116.316354 },
      { "lat": 39.984523, "lng": 116.316188 },
      { "lat": 39.984516, "lng": 116.315963 },
      { "lat": 39.984523, "lng": 116.315823 },
      { "lat": 39.984574, "lng": 116.315611 },
      { "lat": 39.984568, "lng": 116.315407 },
      { "lat": 39.984538, "lng": 116.315148 },
      { "lat": 39.984501, "lng": 116.314907 },
      { "lat": 39.984532, "lng": 116.314808 },
      { "lat": 39.984504, "lng": 116.314625 },
      { "lat": 39.984485, "lng": 116.314426 },
      { "lat": 39.984427, "lng": 116.314242 },
      { "lat": 39.984485, "lng": 116.314042 },
      { "lat": 39.984484, "lng": 116.313818 },
      { "lat": 39.984501, "lng": 116.313659 },
      { "lat": 39.984618, "lng": 116.314323 },
      { "lat": 39.984649, "lng": 116.314107 },
      { "lat": 39.984621, "lng": 116.313941 },
      { "lat": 39.984655, "lng": 116.313724 },
      { "lat": 39.984681, "lng": 116.313521 },
      { "lat": 39.984708, "lng": 116.313311 },
      { "lat": 39.984708, "lng": 116.313099 },
      { "lat": 39.984696, "lng": 116.312921 },
      { "lat": 39.984677, "lng": 116.312746 },
      { "lat": 39.984682, "lng": 116.312525 },
      { "lat": 39.984649, "lng": 116.312332 },
      { "lat": 39.984641, "lng": 116.312123 },
      { "lat": 39.984647, "lng": 116.311917 },
      { "lat": 39.984654, "lng": 116.311723 },
      { "lat": 39.984631, "lng": 116.311569 },
      { "lat": 39.984647, "lng": 116.311382 }
    ];

    return (
      <div>
        <GoogleMap
          defaultZoom={15}
          // defaultCenter={{ lat: 39.984702, lng: 116.318417 }}
          defaultCenter={{lat: this.props.coordinates[0].lat, lng: this.props.coordinates[0].lng}}
        >
          <DrawingManager
            onRectangleComplete={this.handleRectangleComplete}
            defaultDrawingMode={google.maps.drawing.OverlayType.RECTANGLE}
            defaultOptions={{
              drawingControl: true,
              drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                  google.maps.drawing.OverlayType.CIRCLE,
                  google.maps.drawing.OverlayType.POLYGON,
                  google.maps.drawing.OverlayType.POLYLINE,
                  google.maps.drawing.OverlayType.RECTANGLE,
                ],
              },
              circleOptions: {
                fillColor: `#ffff00`,
                fillOpacity: 0.2,
                strokeWeight: 5,
                clickable: true,
                editable: true,
                deletable: true,
                zIndex: 1,
              },
              rectangleOptions: {
                fillColor: `#ffff00`,
                fillOpacity: 0.2,
                strokeWeight: 5,
                clickable: true,
                editable: true,
                deletable: true,
                zIndex: 1,
              }
            }}
          />
          {!this.state.bounds.isEmpty() ? (
            <Rectangle
              bounds={this.state.bounds}
            />
          ) : null}
          <Polyline
            editable= {false}
            path={this.props.coordinates}
            geodesic={true}
            options= {{
              strokeColor: '#FF0000',
              strokeOpacity: 1.0,
              strokeWeight: 2
            }}
          />
        </GoogleMap>
        <Button variant="raised" onClick={this.handleDeleteRectangle}>Clear Map</Button>
      </div>
    )
  }
}

export default compose(withProps({
  googleMapURL: url,
  loadingElement: <div style={{ height: `100%` }} />,
  containerElement: <div style={{ height: `400px` }} />,
  mapElement: <div style={{ height: `100%` }} />,
}),
  withScriptjs,
  withGoogleMap)(MyMap);