/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';

import SearchableDropdown from '../utils/SearchableDropdown';
import Geolocation from 'react-native-geolocation-service';
import {SafeAreaView} from 'react-native-safe-area-context';
import BingMapsView from 'react-native-bing-maps';

var items = [
  {
    id: 1,
    name: 'JavaScript',
  },
  {
    id: 2,
    name: 'Java',
  },
  {
    id: 3,
    name: 'Ruby',
  },
  {
    id: 4,
    name: 'React Native',
  },
  {
    id: 5,
    name: 'PHP',
  },
  {
    id: 6,
    name: 'Python',
  },
  {
    id: 7,
    name: 'Go',
  },
  {
    id: 8,
    name: 'Swift',
  },
];
const MapScreen = () => {
  const fetchKeywords = async query => {
    if (query === '') {
      return {};
    }
    return fetch(
      `http://mobiletest.gofba.com/api/LoginJson/GetKeywords?keyword=${query}`,
    )
      .then(response => response.json())
      .then(res => {
        return res.map(function (obj) {
          return {
            id: obj.SubCategoryDetailsID,
            name: obj.Keyword,
          };
        });
      })
      .catch(error => console.log(error));
  };

  const [query, setQuery] = useState('');
  const [position, setPosition] = useState({
    coords: {
      accuracy: 682,
      altitude: -46.766686532320755,
      altitudeAccuracy: 3,
      heading: 0,
      latitude: 22.6268261,
      longitude: 88.3465825,
      speed: 0,
    },
    mocked: false,
    provider: 'fused',
    timestamp: 1633504817260,
  });
  const [mapPins, setMapPins] = useState([{lat: 22.6268261, long: 88.3465825}]);
  const fetchLocation = async () => {
    //const url = `http://dev.virtualearth.net/REST/v1/Locations/${position.coords.latitude},${position.coords.longitude}?key=AhcXEZOtf7Fmvb6jR5q8R2sBOXvjPm0Yc0M5hRK_vesP7k7OV6uDsOXddpaJhQDI`;
    const url = `http://dev.virtualearth.net/REST/v1/Locations/34.15262985229492,-117.57910919189453?key=AhcXEZOtf7Fmvb6jR5q8R2sBOXvjPm0Yc0M5hRK_vesP7k7OV6uDsOXddpaJhQDI`;
    const response = await fetch(url, {method: 'GET'});
    const res = await response.json();
    const resourceSets = await res.resourceSets;
    const [resources] = resourceSets;
    const [address] = resources.resources;
    // const {
    //   resources: [{address}],
    // } = resourceSets;

    //console.log(address.address);
  };

  useEffect(() => {
    //alert(query);
    //items = fetchKeywords();
    //setItems(fetchKeywords);
  }, [query]);
  Geolocation.getCurrentPosition(
    position => {
      fetchLocation();
      //console.log(position);
    },
    error => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    {enableHighAccuracy: true, timeout: 3000, maximumAge: 10000},
  );

  return (
    <SafeAreaView>
      <SearchableDropdown
        onItemSelect={item => {
          setQuery(item.name);
        }}
        containerStyle={{padding: 5}}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#ddd',
          borderColor: '#bbb',
          borderWidth: 1,
          borderRadius: 5,
        }}
        itemTextStyle={{color: '#222'}}
        itemsContainerStyle={{maxHeight: 140, zIndex: 10, elevation: 10}}
        items={items}
        defaultIndex={2}
        resetValue={false}
        textInputProps={{
          placeholder: 'Enter Search Text Here',
          placeholderTextColor: 'black',
          underlineColorAndroid: 'transparent',
          value: `${query}`,
          style: {
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            color: 'black',
          },
          onTextChange: e => setQuery(e),
        }}
        listProps={{
          nestedScrollEnabled: true,
        }}
      />
      <BingMapsView
        credentialsKey="AhcXEZOtf7Fmvb6jR5q8R2sBOXvjPm0Yc0M5hRK_vesP7k7OV6uDsOXddpaJhQDI"
        mapLocation={{
          lat: position.coords.latitude,
          long: position.coords.longitude,
          zoom: 15,
        }}
        onMapPinClicked={e => console.log(e.index)}
        style={{backgroundColor: 'red', height: '100%', width: '100%'}}
        pins={[
          {
            lat: 22.6268261,
            long: 88.3465825,
            icon: `<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
        </svg>`,
            title: 'Home',
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default MapScreen;
