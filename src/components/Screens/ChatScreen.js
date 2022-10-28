/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StatusBar,
  Keyboard,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

const NewChatScreen = props => {
  const textRef = useRef(null);

  const [chatData, setChatData] = useState('');

  useEffect(() => {
    getChatData();
    //const value = AsyncStorage.getItem('NAME');

    props.navigation.setOptions({
      headerBackTitle: 'Back',
      headerTitle: () => (
        <Text style={{color: 'white', fontWeight: 'bold'}} numberOfLines={2}>
          Chat Header
        </Text>
      ),
    });
  }, []);

  const getChatData = async () => {
    let response = await fetch(
      //'http://mobiletest.gofba.com/api/LoginJson?memberid=45312322&groupid=641&lastemsgid=123',
      'http://mobile.gofba.com/api/LoginJson?memberid=45312322&groupid=503&lastemsgid=123',
    );
    let json = await response.json();
    return setChatData(json);
  };

  //All Buttons
  const DeleteButton = ({item, props}) => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {item.Member_ID === 45311553 && (
          <TouchableOpacity onPress={() => onPressDelete(item, props)}>
            <Image
              style={{width: 40, height: 40}}
              source={require('../../assets/delete.png')}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const SpamButton = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <TouchableOpacity>
          <Image
            style={{width: 40, height: 40}}
            source={require('../../assets/spam.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const EditButton = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {item.Member_ID === 45311553 && (
          <TouchableOpacity
            onPress={() =>
              onClickEdit(item.Member_Message, item.ID, props, textRef)
            }>
            <Image
              style={{width: 40, height: 40}}
              source={require('../../assets/edit.png')}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  const DownloadButton = ({item}) => {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity onPress={() => alert('Download')}>
          <Image
            style={{width: 40, height: 40}}
            source={require('../../assets/download.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  // All Button Actions Here
  const FileActions = ({item, props}) => {
    return (
      <>
        <DownloadButton item={item} />

        <SpamButton item={item} />

        <DeleteButton item={item} />
      </>
    );
  };
  const ImageActions = ({item, props}) => {
    return (
      <>
        <SpamButton item={item} />
        <DeleteButton item={item} />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      </>
    );
  };
  const ChatActions = ({item, props}) => {
    return (
      <>
        <SpamButton item={item} />
        <EditButton item={item} />
        <DeleteButton item={item} props={props} />
      </>
    );
  };
  const Message = ({item, props}) => {
    let fileType = 'Chat';
    if (item.Chat_Type !== 'Text') {
      if (
        item.File_Extention === 'pdf' ||
        item.File_Extention === 'docx' ||
        item.File_Extention === 'txt' ||
        item.File_Extention === 'exe' ||
        item.File_Extention === 'csv' ||
        item.File_Extention === 'zip' ||
        item.File_Extention === 'mp4' ||
        item.File_Extention === 'avi' ||
        item.File_Extention === 'mkv' ||
        item.File_Extention === '3gp' ||
        item.File_Extention === 'flv' ||
        item.File_Extention === 'js'
      ) {
        fileType = 'File';
      } else {
        fileType = 'Image';
      }
    }
    return (
      <View>
        {/* Top Row Buttons here */}
        <View style={{flexDirection: 'row', marginVertical: '1%'}}>
          {/* For 4 buttons. The Spacing for the Buttons is kept even if Buttons are not present */}

          {/* Sender Image */}
          {item.Member_ID !== 45311553 && (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <FastImage
                source={{
                  uri: `https://www.gofba.com/UploadedImage/${item.Img_Auto_Name}`,
                  priority: FastImage.priority.normal,
                }}
                style={{height: 50, width: 50, borderRadius: 50}}
              />
            </View>
          )}

          {fileType === 'File' && <FileActions item={item} props={props} />}
          {fileType === 'Image' && <ImageActions item={item} props={props} />}
          {fileType === 'Chat' && <ChatActions item={item} props={props} />}

          {/* My Image */}
          {item.Member_ID === 45311553 && (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <FastImage
                source={{
                  uri: `https://www.gofba.com/UploadedImage/${item.Img_Auto_Name}`,
                  priority: FastImage.priority.normal,
                }}
                style={{height: 50, width: 50, borderRadius: 50}}
              />
            </View>
          )}
        </View>

        {/* Chat Message */}
        <View
          style={{
            backgroundColor: 'black',
            margin: 2,
            paddingVertical: 6,
            paddingHorizontal: 6,
            borderRadius: 4,
            flexDirection: 'column',
          }}>
          <Text
            style={{
              color: '#fc9a15',
              paddingLeft: '2%',
              paddingVertical: '2%',
              fontSize: 18,
            }}>
            {item.Display_Name}
          </Text>
          {item.Chat_Type === 'Text' && (
            <Text style={{color: 'white', paddingLeft: '2%'}}>
              {item.Member_Message}
            </Text>
          )}
          {item.Chat_Type === 'File' && fileType === 'Image' && (
            <FastImage
              style={{height: 50, width: 50, paddingLeft: '2%'}}
              source={{
                uri: `https://www.gofba.com/Chat/FileUpload/${item.File_Auto_Name}`,
              }}
            />
          )}
          {item.Chat_Type === 'File' && fileType === 'File' && (
            <Text style={{color: 'white', paddingLeft: '2%'}}>
              {item.File_Original_Name}
            </Text>
          )}
          <Text
            style={{
              color: '#fc9a15',
              paddingLeft: '2%',
              paddingVertical: '2%',
              fontSize: 18,
            }}>
            {item.Message_Date}
          </Text>
        </View>
      </View>
    );
  };

  //Functions here
  function onClickEdit(message, messageId, props, textRef) {
    //alert(messageId)
    textRef.current.focus();
    props.isEditableSendAction(true);
    props.handleChatTextAction(message);
    props.handleChatMessageIdAction(messageId);
  }
  // Opens modal for delete confirmation
  function onPressDelete(item, props) {
    alert(
      'Confirmation',
      'Are you sure want to  delete?',
      [
        {
          text: 'Yes',
          onPress: () => deleteChatMessage(item, props),
        },
        {
          text: 'No',
          //onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }
  // deletes message after confirmation
  function deleteChatMessage(item, props) {
    const url = `http://mobile.gofba.com/api/LoginJson?memberID=${props.memberid}&groupID=${props.groupId}&msgID=${item.ID}`;

    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responsehh => {
        if (responsehh.length === 0) {
          alert('Chat History Not Found');
        } else {
          const resp = JSON.stringify(responsehh);
          //alert(resp)
          fetchData(props);
        }
      })
      .catch(err => {
        ////console.log('fetch', err);
      });
  }

  // Chat FlatList render function here
  const RenderChatData = ({item}) => {
    return <Message item={item} />;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="black" barStyle="light-content" /> */}
      <FlatList
        data={chatData}
        renderItem={RenderChatData}
        keyExtractor={item => item.ID}
        inverted
        removeClippedSubviews={true}
        style={{marginTop: -40}}
        onEndReached={() => {
          alert('End');
        }}
      />
      <KeyboardAvoidingView
        keyboardVerticalOffset={90}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.footer}>
          <TouchableOpacity
            style={{
              flex: 1,
            }}>
            <Image
              style={{height: 50, width: 50}}
              source={require('../../assets/attachFile.png')}
            />
          </TouchableOpacity>
          <TextInput
            ref={textRef}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Type something nice"
          />
          <TouchableOpacity style={{flex: 1}}>
            <Image
              style={{height: 30, width: 30}}
              source={require('../../assets/sendicon.png')}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#231f20',
  },
  footer: {
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  input: {
    paddingHorizontal: 20,
    fontSize: 18,
    flex: 4,
    backgroundColor: 'white',
  },
});

export default NewChatScreen;
