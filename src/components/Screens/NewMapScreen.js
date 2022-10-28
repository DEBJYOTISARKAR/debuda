/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
//import SearchableDropdown from 'react-native-searchable-dropdown';
import Geolocation from 'react-native-geolocation-service';
import BingMapsView from 'react-native-bing-maps';
import {Image, Pressable, View, SafeAreaView} from 'react-native';

// var items = [
//   {
//     id: 1,
//     name: 'JavaScript',
//   },
//   {
//     id: 2,
//     name: 'Java',
//   },
//   {
//     id: 3,
//     name: 'Ruby',
//   },
//   {
//     id: 4,
//     name: 'React Native',
//   },
//   {
//     id: 5,
//     name: 'PHP',
//   },
//   {
//     id: 6,
//     name: 'Python',
//   },
//   {
//     id: 7,
//     name: 'Go',
//   },
//   {
//     id: 8,
//     name: 'Swift',
//   },
// ];
const MapScreen = () => {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  //const [items, setItems] = useState([]);
  const [locations, setLocations] = useState([]);
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
  //const [mapPins, setMapPins] = useState([{lat: 22.6268261, long: 88.3465825}]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationValue, setLocationValue] = useState(null);
  const [locationItems, setLocationItems] = useState([]);
  const [locationLoading, setLocationLoading] = useState(false);
  const pinIcon = `<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>`;
  const [pinItems, setPinItems] = useState([]);

  // useEffect(() => {
  //   //console.log(items);
  //   //setItems(items);
  //   //fetchKeywords();
  //   fetchLocations();
  // }, [query]);

  // useEffect(() => {
  //   //console.log(items);
  //   //setItems(items);
  //   fetchLocations();
  // }, [location]);

  Geolocation.getCurrentPosition(
    position => {
      //setPosition(position);
      console.log(position);
    },
    error => {
      // See error code charts below.
      console.log(error.code, error.message);
    },
    {enableHighAccuracy: true, timeout: 3000, maximumAge: 10000},
  );
  const fetchKeywords = async () => {
    if (query === '') {
      setItems([]);
      return;
    }
    const Keywords = await fetch(
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
    setItems(Keywords);
    //return Keywords;
  };

  const fetchLocations = async () => {
    if (query === '') {
      setItems([]);
      return;
    }
    await fetch(
      `https://dev.virtualearth.net/REST/v1/Locations/${query}?key=AhcXEZOtf7Fmvb6jR5q8R2sBOXvjPm0Yc0M5hRK_vesP7k7OV6uDsOXddpaJhQDI`,
    )
      .then(response => response.json())
      .then(res => {
        //console.log(res);
        const resourceSets = res.resourceSets;
        //console.log(resourceSets);
        const [resources] = resourceSets;
        console.log(resources);
        const [address] = resources.resources;
        //console.log(address);
        // return address.map(function (obj) {
        //   return {
        //     id: obj.SubCategoryDetailsID,
        //     name: obj.Keyword,
        //   };
        // });
      })
      .catch(error => console.log(error));
    //setLocations(Location);
    //return Location;
  };

  const fetchBusiness = async () => {
    if (locationValue === '' || value === '') {
      alert('Location or Keyword Cannot be Blank');
      return;
    }
    console.log('hh');
    const Business = await fetch(
      `http://mobiletest.gofba.com/api/LoginJson/GetKeywords?keyword=${encodeURIComponent(
        value,
      )}&strloc=${encodeURIComponent(
        locationValue,
      )}&strlati=${34.15262985229492}&strlongi=${-117.57910919189453}&userid=0`,
    )
      .then(response => response.json())
      .then(res => {
        //console.log(res);
        const pins = res.map(obj => {
          return {
            id: obj.BusinessDetailsID,
            name: obj.BusinessName,
            lat: obj.BusinessLatitude,
            long: obj.BusinessLongitude,
            icon: pinIcon,
          };
        });
        setPinItems(pins);
        console.log(pins);
        // const response = await fetch(url, {method: 'GET'});
        // const res = await response.json();
        // const resourceSets = res.resourceSets;
        // const [resources] = resourceSets;
        // const data = Business.map(function (obj) {
        //   return {
        //     id: obj.BusinessDetailsID,
        //     name: obj.BusinessName,
        //     lat: obj.BusinessLatitude,
        //     long: obj.BusinessLongitude,
        //   };
        // });

        //setBusinessData(res);
      })
      .catch(error => console.log(error));
    //setLocations(Loc);
    //return Location;
  };
  // const fetchLocations = async () => {
  //   if (locationQuery === '') {
  //     setLocations([]);
  //     return;
  //   }
  //   //console.log('hh');
  //   const Loc = await fetch(
  //     `https://dev.virtualearth.net/REST/v1/Locations/${locationQuery}?key=AhcXEZOtf7Fmvb6jR5q8R2sBOXvjPm0Yc0M5hRK_vesP7k7OV6uDsOXddpaJhQDI`,
  //   )
  //     .then(response => response.json())
  //     .then(res => {
  //       //console.log(res);
  //       // const response = await fetch(url, {method: 'GET'});
  //       // const res = await response.json();
  //       console.log(res.resourceSets);
  //       const resourceSets = res.resourceSets;
  //       const [resources] = resourceSets;
  //       return resources.resources.map(function (obj) {
  //         return {
  //           id: 1,
  //           name: obj.address.formattedAddress,
  //         };
  //       });
  //     })
  //     .catch(error => console.log(error));
  //   setLocations(Loc);
  //   //return Location;
  // };

  return (
    <SafeAreaView>
      {/* <SearchableDropdown
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
        itemsContainerStyle={{maxHeight: 140}}
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
      /> */}
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            searchable={true}
            disableLocalSearch
            placeholder="Select a Keyword"
            searchPlaceholder="Search Keyword..."
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            loading={loading}
            onChangeValue={value => {
              console.log(value);
            }}
            onChangeSearchText={text => {
              // Show the loading animation
              setLoading(true);
              // Get items from API
              fetch(
                `http://mobiletest.gofba.com/api/LoginJson/GetKeywords?keyword=${text}`,
              )
                .then(response => response.json())
                .then(res => {
                  return res.map(function (obj) {
                    return {
                      id: obj.SubCategoryDetailsID,
                      label: obj.Keyword,
                      value: obj.Keyword,
                    };
                  });
                })
                .then(items => {
                  setItems(items);
                })
                .catch(err => {
                  console.log(err);
                })
                .finally(() => {
                  // Hide the loading animation
                  setLoading(false);
                });
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <DropDownPicker
            open={locationOpen}
            value={locationValue}
            items={locationItems}
            searchable={true}
            disableLocalSearch
            placeholder="Select a Location"
            searchPlaceholder="Search Location..."
            setOpen={setLocationOpen}
            setValue={setLocationValue}
            setItems={setLocationItems}
            loading={locationLoading}
            onChangeValue={value => {
              console.log(value);
            }}
            onChangeSearchText={text => {
              if (text === '') {
                setLocationItems([]);
                return;
              }
              // Show the loading animation
              setLocationLoading(true);
              // Get items from API
              fetch(
                `https://dev.virtualearth.net/REST/v1/Locations/${text}?key=AhcXEZOtf7Fmvb6jR5q8R2sBOXvjPm0Yc0M5hRK_vesP7k7OV6uDsOXddpaJhQDI`,
              )
                .then(response => response.json())
                .then(res => {
                  const resourceSets = res.resourceSets;
                  const [resources] = resourceSets;
                  return resources.resources.map(function (obj, index) {
                    return {
                      id: index,
                      label: obj.name,
                      value: `${obj.name},${obj.address.countryRegion}`,
                    };
                  });
                })
                .then(items => {
                  setLocationItems(items);
                })
                .catch(err => {
                  console.log(err);
                })
                .finally(() => {
                  // Hide the loading animation
                  setLocationLoading(false);
                });
            }}
          />
        </View>
      </View>
      <Pressable onPress={() => fetchBusiness()}>
        <Image source={require('../../assets/MapSearch-95x95.png')} />
      </Pressable>
      <BingMapsView
        //credentialsKey="AhcXEZOtf7Fmvb6jR5q8R2sBOXvjPm0Yc0M5hRK_vesP7k7OV6uDsOXddpaJhQDI"
        mapLocation={{
          lat: 34.15262985229492,
          long: -117.57910919189453,
          zoom: 13,
        }}
        style={{backgroundColor: 'red', height: '100%', width: '100%'}}
        pins={pinItems}
      />
    </SafeAreaView>
  );
};

export default MapScreen;
