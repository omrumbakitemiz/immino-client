/* eslint-disable no-undef */
import React, { PureComponent } from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";

const url = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD4E9oJs20gMki5uB3uRmp05v-gpCG7h0c";

class MyMap extends PureComponent {

  handleRectangleComplete = (e) => {
    /*
    e.bounds.b.b - e.bounds.b.f
    e.bounds.f.b - e.bounds.f.f
    */
    console.log(e.bounds.b.b);
    console.log(e.bounds.b.f);
    console.log(e.bounds.f.b);
    console.log(e.bounds.f.f);
  };

  render() {
    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: -34.397, lng: 150.644 }}
        // defaultCenter={{lat: props.coordinates[0].Latitude, lng: props.coordinates[0].Longitude}}
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
      </GoogleMap>
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