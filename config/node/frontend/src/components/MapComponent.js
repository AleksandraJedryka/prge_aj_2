import React, {useEffect, useRef} from 'react';
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from 'ol/source/OSM';
import View from 'ol/View';
import {useGeographic} from "ol/proj";
import "ol/ol.css";
import {TileWMS} from 'ol/source';

function MapComponent(props) {
    const mapRef= useRef(null);

    useGeographic()
    useEffect(
        () => {
      const map = new Map({
          target: mapRef.current,
          layers: [
              new TileLayer({
                  source: new OSM(),
              }),
              new TileLayer({
                  source: new TileWMS({
                      url:'http://localhost:9000/geoserver/ne/wms?',
                      params: {
                          "LAYERS" : 'ne:countries',
                          "TITLED" : true
                      },
                      serverType: 'geoserver',
                      transition: 0
                  })
              }),
              new TileLayer({
                  source: new TileWMS({
                      url:'http://localhost:9000/geoserver/prge/wms?',
                      params: {
                          "LAYERS" : 'prge:polska',
                          "TITLED" : true
                      },
                      serverType: 'geoserver',
                      transition: 0
                  })
              }),
              new TileLayer({
                  source: new TileWMS({
                      url:'http://localhost:9000/geoserver/prge/wms?',
                      params: {
                          "LAYERS" : 'prge:users',
                          "TITLED" : true
                      },
                      serverType: 'geoserver',
                      transition: 0
                  })
              })
          ],
          view: new View({
              center: [21,52],
              zoom: 6,
          })
      });
      return () => map.setTarget(null)
    }, []);

return (
    <div className='MapComponent'ref={mapRef} ></div>
    );
}

export default MapComponent;