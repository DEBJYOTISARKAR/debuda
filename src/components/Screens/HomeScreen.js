import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
import {
  Button,
  Image,
  Linking,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NetworkInfo} from 'react-native-network-info';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';

const HomeScreen = props => {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [bannerData, setBannerData] = useState([{Path: '', URL: ''}]);
  // const {Path, URL} = bannerData[bannerIndex];

  // useEffect(() => {
  //   fetchBannerData();
  // }, []);

  // useEffect(() => {
  //   let timer = setInterval(() => nextBan(), 1000);
  //   return () => clearInterval(timer);
  // }, [bannerData]);

  // const nextBan = () => {
  //   setBannerIndex(bannerIndex => {
  //     let newIndex = bannerIndex + 1;
  //     return checkBannerIndex(newIndex);
  //   });
  // };

  // const fetchBannerData = async () => {
  //   const url =
  //     'http://mobile.gofba.com/api/LoginJson?ImageWidth=544&ImageHeight=122';
  //   const response = await fetch(url, {method: 'GET'});
  //   const res = await response.json();
  //   setBannerData(res);
  //   //console.log(data);
  // };

  // const checkBannerIndex = index => {
  //   if (index > bannerData.length - 1) {
  //     return 0;
  //   }
  //   return index;
  // };
  PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
    title: 'Contacts',
    message: 'This app would like to view your contacts.',
    buttonPositive: 'Please accept bare mortal',
  }).then(
    Contacts.getAll()
      .then(contacts => {
        // work with contacts
        console.log(contacts);
      })
      .catch(e => {
        console.log(e);
      }),
  );
  return (
    <View style={{flex: 1}}>
      {/* <Pressable onPress={() => Linking.openURL(URL)}>
        <Image
          style={{height: 100, width: '100%'}}
          source={{uri: `https://www.gofba.com/${Path.slice(2)}`}}
        />
      </Pressable> */}
      <View style={styles.button}>
        <Button
          title="Chat"
          onPress={() => {
            props.navigation.navigate('Chat');
          }}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="Map"
          onPress={() => {
            props.navigation.navigate('Map');
          }}
        />
      </View>
      {/* <View style={styles.button}>
        <Button
          title="Ip"
          onPress={() => {
            NetworkInfo.getIPV4Address().then(ipAddress => {
              console.log(ipAddress);
            });
          }}
        />
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
  },
});

export default HomeScreen;
