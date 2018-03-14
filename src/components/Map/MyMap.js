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
    return (
      <div>
        <GoogleMap
          defaultZoom={2}
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