import React, { useRef, useEffect, useState } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import Input from "./Input";

import "@tomtom-international/web-sdk-maps/dist/maps.css";

const key = "bc9RDradIZtUXFzIDAN8mJT91zX0z8UP";
const MAX_ZOOM = 5;

function Map() {
  const [map, setMap] = useState(null);
  const [mapZoom, setMapZoom] = useState(13);
  const [mapLatitude, setMapLatitude] = useState(37.36765);
  const [mapLongitude, setMapLongitude] = useState(-121.91599);
  const [coord, setCoords] = useState(null);
  const mapElement = useRef();

  useEffect(() => {
    let lat;
    let long;
    const getLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        (e) => {
          setMapLatitude(e.coords.latitude);
          setMapLongitude(e.coords.longitude);
        },
        async (err) => {
          console.log(err);
        }
      );
    };
    getLocation();
    let map = tt.map({
      key: key,
      container: mapElement.current,
      center: [mapLongitude, mapLatitude],
      zoom: mapZoom,
    });
    setMap(map);

    return () => map.remove();
  }, []);

  useEffect(() => {
    map && updateMap();
  }, [mapLongitude, mapLatitude]);

  const increaseZoom = () => {
    if (mapZoom < MAX_ZOOM) {
      setMapZoom(mapZoom + 1);
    }
  };

  const decreaseZoom = () => {
    if (mapZoom > 1) {
      setMapZoom(mapZoom - 1);
    }
  };

  const updateMap = () => {
    map.setCenter([parseFloat(mapLongitude), parseFloat(mapLatitude)]);
    map.setZoom(mapZoom);
  };

  return (
    <div className="App">
      <Input
        type="text"
        name="longitude"
        value={mapLongitude}
        onChange={setMapLongitude}
      />
      <div className="mapDiv" ref={mapElement}></div>
    </div>
  );
}

export default Map;
