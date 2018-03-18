/* eslint-disable no-undef */
import React, { PureComponent } from "react";

import { compose, withProps } from "recompose";

import { withScriptjs, withGoogleMap, GoogleMap, Polyline, Rectangle } from "react-google-maps";
import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";

import Button from 'material-ui/Button';

import './MyMap.css';

const url = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD4E9oJs20gMki5uB3uRmp05v-gpCG7h0c";

class MyMap extends PureComponent {

  state = {
    bounds: new google.maps.LatLngBounds(),
    rectangleBounds: null
  }

  handleRectangleComplete = rectangle => {
    google.maps.event.clearInstanceListeners(rectangle);
    rectangle.setMap(null);

    const bounds = rectangle.getBounds();

    this.setState({
      bounds: bounds,

      rectangleBounds: {
        nw: {
          lat: bounds.f.f,
          lng: bounds.b.b
        },
        se: {
          lat: bounds.f.b,
          lng: bounds.b.f
        }
      }
    });

    console.log(`KB (lat - lng): ${bounds.f.f}, ${bounds.b.b}`);
    console.log(`GD (lat - lng): ${bounds.f.b}, ${bounds.b.f}`);

    this.props.searchRectangle(this.state.rectangleBounds);
  };

  handleDeleteRectangle = e => {
    this.setState({
      bounds: new google.maps.LatLngBounds(),
      rectangleBounds: null
    });
  }

  render() {
    return (
      <div>
        <GoogleMap
          defaultZoom={2}
          defaultCenter={{lat: this.props.coordinates[0].lat, lng: this.props.coordinates[0].lng}}>
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
              strokeWeight: 1.5,
              geodesic: true
            }}
          />
        </GoogleMap>
        <div style={{display: "flex", justifyContent: "center"}}>
          <Button style={{marginLeft: 20}} variant="raised" color="default" onClick={this.handleDeleteRectangle}>Clear Map</Button>
        </div>
      </div>
    )
  }
}

export default compose(withProps({
  googleMapURL: url,
  loadingElement: <div style={{ height: `350px`, width: `700px` }} />,
  containerElement: <div style={{ height: `350px`, width: `700px` }} />,
  mapElement: <div style={{ height: `350px`, margin: 10 }} />,
}),
  withScriptjs,
  withGoogleMap)(MyMap);