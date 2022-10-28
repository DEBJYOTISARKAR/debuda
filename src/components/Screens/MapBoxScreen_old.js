import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapboxGL from '@react-native-mapbox-gl/maps';
import exampleIcon from '../../assets/example.png';

const MapBoxScreen = () => {
  MapboxGL.setAccessToken(
    'pk.eyJ1IjoiZGVianlvdGlzYXJrYXIiLCJhIjoiY2t2ZzVkN3dyN3BjZDMwczc4cmRhN2gydiJ9.IPTUGCLjBOMVoSqMgbSoXg',
  );

  const featureCollection = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
        properties: {
          icon: 'example',
        },
        geometry: {
          type: 'Point',
          coordinates: [-117.20611157485, 52.180961084261],
        },
      },
      {
        type: 'Feature',
        id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
        properties: {
          icon: 'airport-15',
        },
        geometry: {
          type: 'Point',
          coordinates: [-117.205908, 52.180843],
        },
      },
      {
        type: 'Feature',
        id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
        properties: {
          icon: 'pin',
        },
        geometry: {
          type: 'Point',
          coordinates: [-117.206562, 52.180797],
        },
      },
      {
        type: 'Feature',
        id: '9d10456e-bdda-4aa9-9269-04c1667d4553',
        properties: {
          icon: 'pin3',
        },
        geometry: {
          type: 'Point',
          coordinates: [-117.206862, 52.180897],
        },
      },
    ],
  };

  const [position, setPosition] = useState({
    coords: {
      accuracy: 682,
      altitude: -46.766686532320755,
      altitudeAccuracy: 3,
      heading: 0,
      latitude: -117.57910919189453,
      longitude: 34.15262985229492,
      speed: 0,
    },
    mocked: false,
    provider: 'fused',
    timestamp: 1633504817260,
  });
  useEffect(
    () =>
      Geolocation.getCurrentPosition(
        position => {
          setPosition(position);
          console.log(position);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        //{enableHighAccuracy: true, timeout: 3000, maximumAge: 10000},
      ),
    [],
  );
  const onSourceLayerPress = ({features, coordinates, point}) => {
    console.log(
      'You pressed a layer here are your features:',
      features,
      coordinates,
      point,
    );
  };
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map}>
          {/*  <MapboxGL.Camera
            zoomLevel={13}
            animationMode={'flyTo'}
            animationDuration={1100}
            centerCoordinate={[
              position.coords.latitude,
              position.coords.longitude,
            ]}
          />
          <MapboxGL.PointAnnotation
            coordinate={[position.coords.latitude, position.coords.longitude]}
            id="pt-ann"
          />*/}
          <MapboxGL.Camera
            zoomLevel={14}
            centerCoordinate={[
              position.coords.longitude,
              position.coords.latitude,
            ]}
          />
          <MapboxGL.ShapeSource
            id="exampleShapeSource"
            shape={featureCollection}
            onPress={onSourceLayerPress}>
            <MapboxGL.SymbolLayer
              id="exampleIconName"
              style={iconStyles.icon}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

const iconStyles = {
  icon: {
    iconImage: exampleIcon,
    iconAllowOverlap: true,
  },
};

export default MapBoxScreen;
