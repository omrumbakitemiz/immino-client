/* eslint-disable no-undef */
import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import DrawingManager from "react-google-maps/lib/components/drawing/DrawingManager";
import { Polyline } from "react-google-maps";
import { Rectangle } from "react-google-maps";

const url = "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyD4E9oJs20gMki5uB3uRmp05v-gpCG7h0c";

const MyMapComponent = compose(
  withProps({
    googleMapURL: url,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    ref={(map) => {props.handleBoundsChange(map)}}
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    <DrawingManager onRectangleComplete={props.handleRectangleComplete} onMarkerComplete={props.handleMarkerClick}
      defaultDrawingMode={google.maps.drawing.OverlayType.MARKER}
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

);

class MyFancyComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
  };

  handleMarkerClick = () => {
    console.log("marker clicked")
  };

  handleRectangleComplete = (e) => {
    console.log(e.bounds);
  };

  handleBoundsChange = (e) => {
    console.log("fasfafas");
  };

  render() {
    return (
      <MyMapComponent
        handleBoundsChange = {this.handleBoundsChange}
        handleMarkerClick={this.handleMarkerClick}
        handleRectangleComplete={this.handleRectangleComplete}
      />
    )
  }
}

export default MyFancyComponent;