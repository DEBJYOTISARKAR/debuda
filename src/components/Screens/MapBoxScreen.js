import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapboxGL from '@react-native-mapbox-gl/maps';
import pinIcon from '../../assets/pinIcon.png';

const MapBoxScreen = () => {
  MapboxGL.setAccessToken(
    'pk.eyJ1IjoibWFwLWJveC1hcGkiLCJhIjoiY2t2aHNhcXFiNGM5czJybHVmbzN2dTk0dSJ9.AwsYgh22iXX38hTO89hUXQ',
  );

  const [data, setData] = useState([]);

  const testData = [
    {
      BusinessDetailsID: 67983,
      BusinessName: 'AC Pro',
      BusinessDescription: '',
      BusinessPhoneNo: '(951) 360-7849',
      BusinessAddress: '9409 Charles Smith Ave, Rancho Cucamonga, CA, 91730',
      FiveStarCommentCount: 3,
      NonFiveStarCommentCount: 3,
      BusinessWebsiteURL: 'https://v2.acpro.com/location_details/9',
      BusinessType: 'None',
      BusinessLatitude: 34.0823860168457,
      BusinessLongitude: -117.54592895507812,
      Position: 1,
      Source: 'Excel',
      BusinessImageAutoName: 'OtherCat.png',
      IsGofbaAdsEditAdmin: false,
    },
    {
      BusinessDetailsID: 67984,
      BusinessName: 'AC Pro',
      BusinessDescription: '',
      BusinessPhoneNo: '(909) 267-1122',
      BusinessAddress: '12365 Central Ave, Chino, CA, 91710',
      FiveStarCommentCount: 2,
      NonFiveStarCommentCount: 2,
      BusinessWebsiteURL: 'https://www.store.acpro.com/chino',
      BusinessType: 'None',
      BusinessLatitude: 34.028404235839844,
      BusinessLongitude: -117.68830871582031,
      Position: 2,
      Source: 'Excel',
      BusinessImageAutoName: 'OtherCat.png',
      IsGofbaAdsEditAdmin: false,
    },
    {
      BusinessDetailsID: 67985,
      BusinessName: 'AC Pro',
      BusinessDescription: '',
      BusinessPhoneNo: '(800) 800-4121',
      BusinessAddress: '11700 Industry Ave, Fontana, CA, 92337',
      FiveStarCommentCount: 8,
      NonFiveStarCommentCount: 8,
      BusinessWebsiteURL: 'http://acpro.com/',
      BusinessType: 'None',
      BusinessLatitude: 34.03916931152344,
      BusinessLongitude: -117.5228042602539,
      Position: 3,
      Source: 'Excel',
      BusinessImageAutoName: 'OtherCat.png',
      IsGofbaAdsEditAdmin: false,
    },
    {
      BusinessDetailsID: 68068,
      BusinessName: 'Ace Pharmacy',
      BusinessDescription: '',
      BusinessPhoneNo: '(909) 946-9400',
      BusinessAddress: '886 W Foothill Blvd Ste D',
      FiveStarCommentCount: 3,
      NonFiveStarCommentCount: 3,
      BusinessWebsiteURL: '',
      BusinessType: 'None',
      BusinessLatitude: 34.10638,
      BusinessLongitude: -117.66288,
      Position: 4,
      Source: 'Excel',
      BusinessImageAutoName: 'OtherCat.png',
      IsGofbaAdsEditAdmin: false,
    },
    {
      BusinessDetailsID: 68070,
      BusinessName: 'Ace Evert',
      BusinessDescription: '',
      BusinessPhoneNo: '(909) 980-6900',
      BusinessAddress: '5576 Ontario Mills Pkwy Ste A',
      FiveStarCommentCount: 4,
      NonFiveStarCommentCount: 4,
      BusinessWebsiteURL: '',
      BusinessType: 'None',
      BusinessLatitude: 34.069044,
      BusinessLongitude: -117.5302312,
      Position: 5,
      Source: 'Excel',
      BusinessImageAutoName: 'OtherCat.png',
      IsGofbaAdsEditAdmin: false,
    },
  ];

  const testData2 = [
    {
      BusinessDetailsID: 68071,
      BusinessName: 'R C Labelle',
      BusinessDescription: '',
      BusinessPhoneNo: '(909) 945-4966',
      BusinessAddress: '8045 Archibald Ave Rancho Cucamonga, CA 91730',
      FiveStarCommentCount: 2,
      NonFiveStarCommentCount: 2,
      BusinessWebsiteURL: '',
      BusinessType: 'None',
      BusinessLatitude: 34.107444,
      BusinessLongitude: -117.592509,
      Position: 6,
      Source: 'Excel',
      BusinessImageAutoName: 'OtherCat.png',
      IsGofbaAdsEditAdmin: false,
    },
    {
      BusinessDetailsID: 68072,
      BusinessName: 'P C House Upland',
      BusinessDescription: '',
      BusinessPhoneNo: '(909) 982-2501',
      BusinessAddress: '273 N Mountain Ave Upland, CA 91786',
      FiveStarCommentCount: 4,
      NonFiveStarCommentCount: 4,
      BusinessWebsiteURL: '',
      BusinessType: 'None',
      BusinessLatitude: 34.09743,
      BusinessLongitude: -117.6706,
      Position: 7,
      Source: 'Excel',
      BusinessImageAutoName: 'OtherCat.png',
      IsGofbaAdsEditAdmin: false,
    },
    {
      BusinessDetailsID: 68074,
      BusinessName: 'ACE Bargain',
      BusinessDescription: '',
      BusinessPhoneNo: '',
      BusinessAddress: '5537 Philadelphia St Ste B',
      FiveStarCommentCount: 8,
      NonFiveStarCommentCount: 8,
      BusinessWebsiteURL: '',
      BusinessType: 'None',
      BusinessLatitude: 34.0312489325625,
      BusinessLongitude: -117.682436095152,
      Position: 8,
      Source: 'Excel',
      BusinessImageAutoName: 'OtherCat.png',
      IsGofbaAdsEditAdmin: false,
    },
    {
      BusinessDetailsID: 68075,
      BusinessName: 'C & E Lumber Co',
      BusinessDescription: '',
      BusinessPhoneNo: '(909) 626-3591',
      BusinessAddress: '2692 N Towne Ave Pomona, CA 91767',
      FiveStarCommentCount: 3,
      NonFiveStarCommentCount: 3,
      BusinessWebsiteURL: '',
      BusinessType: 'None',
      BusinessLatitude: 34.0934219360352,
      BusinessLongitude: -117.73543548584,
      Position: 9,
      Source: 'Excel',
      BusinessImageAutoName: 'OtherCat.png',
      IsGofbaAdsEditAdmin: false,
    },
    {
      BusinessDetailsID: 68076,
      BusinessName: 'AC Pacific Corporation',
      BusinessDescription: '',
      BusinessPhoneNo: '(909) 980-6262',
      BusinessAddress: '10661 Business Dr Fontana, CA 92337',
      FiveStarCommentCount: 3,
      NonFiveStarCommentCount: 3,
      BusinessWebsiteURL: '',
      BusinessType: 'None',
      BusinessLatitude: 34.059658,
      BusinessLongitude: -117.50859,
      Position: 10,
      Source: 'Excel',
      BusinessImageAutoName: 'OtherCat.png',
      IsGofbaAdsEditAdmin: false,
    },
  ];

  // const featureCollection = {
  //   type: 'FeatureCollection',
  //   features: data,
  //   //[
  //   //   {
  //   //     type: 'Feature',
  //   //     id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
  //   //     properties: {
  //   //       icon: 'example',
  //   //       name: 'Cogito',
  //   //     },
  //   //     geometry: {
  //   //       type: 'Point',
  //   //       coordinates: [-117.20611157485, 52.180961084261],
  //   //     },
  //   //   },
  //   //   {
  //   //     type: 'Feature',
  //   //     id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
  //   //     properties: {
  //   //       icon: 'airport-15',
  //   //       name: 'World',
  //   //     },
  //   //     geometry: {
  //   //       type: 'Point',
  //   //       coordinates: [-117.205908, 52.180843],
  //   //     },
  //   //   },
  //   //   {
  //   //     type: 'Feature',
  //   //     id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
  //   //     properties: {
  //   //       icon: 'pin',
  //   //       name: 'Hello',
  //   //     },
  //   //     geometry: {
  //   //       type: 'Point',
  //   //       coordinates: [-117.206562, 52.180797],
  //   //     },
  //   //   },
  //   //   {
  //   //     type: 'Feature',
  //   //     id: '9d10456e-bdda-4aa9-9269-04c1667d4553',
  //   //     properties: {
  //   //       icon: 'pin3',
  //   //       name: 'Test',
  //   //     },
  //   //     geometry: {
  //   //       type: 'Point',
  //   //       coordinates: [-117.206862, 52.180897],
  //   //     },
  //   //   },
  //   // ],
  // };

  const handleData = () => {
    const arr = testData.map(item => {
      return {
        type: 'Feature',
        id: item.BusinessDetailsID,
        properties: {
          icon: 'icon',
          name: item.BusinessName,
          address: item.BusinessAddress,
        },
        geometry: {
          type: 'Point',
          coordinates: [item.BusinessLongitude, item.BusinessLatitude],
        },
      };
    });
    console.log(arr);
    setData(arr);
  };
  const handleData2 = () => {
    const arr = testData2.map(item => {
      return {
        type: 'Feature',
        id: item.BusinessDetailsID,
        properties: {
          icon: 'icon',
          name: item.BusinessName,
          address: item.BusinessAddress,
        },
        geometry: {
          type: 'Point',
          coordinates: [item.BusinessLongitude, item.BusinessLatitude],
        },
      };
    });
    console.log(arr);
    setData(arr);
  };

  const [position, setPosition] = useState({
    coords: {
      accuracy: 682,
      altitude: -46.766686532320755,
      altitudeAccuracy: 3,
      heading: 0,
      longitude: -117.20611157485,
      latitude: 52.180961084261,
      speed: 0,
    },
    mocked: false,
    provider: 'fused',
    timestamp: 1633504817260,
  });
  // useEffect(
  //   () =>
  //     Geolocation.getCurrentPosition(
  //       position => {
  //         setPosition(position);
  //         console.log(position);
  //       },
  //       error => {
  //         // See error code charts below.
  //         console.log(error.code, error.message);
  //       },
  //       //{enableHighAccuracy: true, timeout: 3000, maximumAge: 10000},
  //     ),
  //   [],
  // );
  const onSourceLayerPress = ({features, coordinates, point}) => {
    console.log(
      'You pressed a layer here are your features:',
      features,
      coordinates,
      point,
    );
  };

  // useEffect(() => {
  //   //handleData();
  //   //console.log());
  // }, []);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView
          style={styles.map}
          zoomEnabled
          scrollEnabled
          compassEnabled
          logoEnabled>
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
            zoomLevel={18}
            centerCoordinate={[
              position.coords.longitude,
              position.coords.latitude,
            ]}
            //followUserLocation="compass"
          />
          <MapboxGL.ShapeSource
            id="exampleShapeSource"
            hitbox={{width: 20, height: 20}}
            shape={{type: 'FeatureCollection', features: data}}
            type="geojson"
            onPress={onSourceLayerPress}>
            <MapboxGL.SymbolLayer
              id="exampleIconName"
              style={iconStyles.icon}
            />
          </MapboxGL.ShapeSource>
        </MapboxGL.MapView>
      </View>
      <Pressable
        style={{backgroundColor: 'blue', padding: 10}}
        onPress={handleData2}>
        <Text style={{color: 'white'}}>Click</Text>
      </Pressable>
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
    height: 300,
    width: 300,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

const iconStyles = {
  icon: {
    iconImage: pinIcon,
    iconAllowOverlap: true,
    iconSize: 0.5,
    textField: ['get', 'name'],
    textOffset: [2.5, 0],
  },
};

export default MapBoxScreen;
