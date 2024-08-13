import {
  StyleSheet,
  FlatList,
  Text,
  StatusBar,
  Image,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Back from '../../assets/svg/back.svg';
import {appImages} from '../../assets/utilities/index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useIsFocused} from '@react-navigation/native';

import Fontiso from 'react-native-vector-icons/Fontisto';
import SwitchSelector from 'react-native-switch-selector';
import Headers from '../../assets/Custom/Headers';

export default function ChatScreen({navigation}) {
  const isFocused = useIsFocused();
  const [check, setcheck] = useState(0);
  useEffect(() => {}, [isFocused]);

  const options = [
    {label: 'Chats', value: 0},
    {label: 'Groups', value: 1},
  ];
  const [signin_email, setsignin_email] = useState();
  const [signin_pass, setsignin_pass] = useState();
  const [signin_ShowPassword, setsignin_ShowPassword] = useState(true);
  const [signin_ShowPassword1, setsignin_ShowPassword1] = useState(true);
  const [signin_ShowPassword2, setsignin_ShowPassword2] = useState(true);

  const [username, setusername] = useState();
  const [signup_email, setsignup_email] = useState();
  const [signup_pass, setsignup_pass] = useState();
  const [signup_cpass, setsignup_cpass] = useState();

  const [isTextInputActive, setIsTextInputActive] = useState(false);
  const [isTextInputActive1, setIsTextInputActive1] = useState(false);
  const [isTextInputActive2, setIsTextInputActive2] = useState(false);
  const [isTextInputActive3, setIsTextInputActive3] = useState(false);
  const [isTextInputActive4, setIsTextInputActive4] = useState(false);
  const [isTextInputActive5, setIsTextInputActive5] = useState(false);

  const handleFocus = () => {
    setIsTextInputActive(true);
  };

  const handleBlur = () => {
    setIsTextInputActive(false);
  };
  const handleFocus1 = () => {
    setIsTextInputActive1(true);
  };

  const handleBlur1 = () => {
    setIsTextInputActive1(false);
  };
  const handleFocus2 = () => {
    setIsTextInputActive2(true);
  };

  const handleBlur2 = () => {
    setIsTextInputActive2(false);
  };
  const handleFocus3 = () => {
    setIsTextInputActive3(true);
  };

  const handleBlur3 = () => {
    setIsTextInputActive3(false);
  };
  const handleFocus4 = () => {
    setIsTextInputActive4(true);
  };

  const handleBlur4 = () => {
    setIsTextInputActive4(false);
  };
  const handleFocus5 = () => {
    setIsTextInputActive5(true);
  };

  const handleBlur5 = () => {
    setIsTextInputActive5(false);
  };

  const handleTogglePasswordVisibility = () => {
    setsignin_ShowPassword(!signin_ShowPassword);
  };
  const handleTogglePasswordVisibility1 = () => {
    setsignin_ShowPassword1(!signin_ShowPassword1);
  };
  const handleTogglePasswordVisibility2 = () => {
    setsignin_ShowPassword2(!signin_ShowPassword2);
  };


  const chats = [
    {id: 1, name: 'Fleece Marigold', message:'Quisque blandit arcu quis turpis tincidunt facilisis…', time:'15 min', messageNumber:'1', showMessageNumber:true},
    {id: 2, name: 'Gustav Purpleson', message:'Sed ligula erat, dignissim sit at amet dictum id, iaculis… ', time:'15 min', messageNumber:'2',showMessageNumber:true},
    {id: 3, name: 'Chauffina Carr', message:'Duis eget nibh tincidunt odio id venenatis ornare quis… ', time:'15 min', messageNumber:'2',showMessageNumber:false},
    {id: 4, name: 'Piff Jenkins', message:'Curabitur elementum orci vitae turpis vulputate…', time:'15 min', messageNumber:'2', showMessageNumber:false},
    {id: 5, name: 'Justin Case', message:'Donec ut lorem tristique dui sit faucibus tincidunt….', time:'15 min', messageNumber:'2', showMessageNumber:false},
    {id: 6, name: 'Justin Case', message:'Donec ut lorem tristique dui sit faucibus tincidunt….', time:'15 min', messageNumber:'2', showMessageNumber:false},
    {id: 7, name: 'Chauffina Carr', message:'Duis eget nibh tincidunt odio id venenatis ornare quis… ', time:'15 min', messageNumber:'2', showMessageNumber:false},
    {id: 8, name: 'Chauffina Carr', message:'Duis eget nibh tincidunt odio id venenatis ornare quis… ', time:'15 min', messageNumber:'2', showMessageNumber:false},

  ];

  const renderChats = item => {
    console.log('Items', item);
    return (
        <TouchableOpacity
        onPress={()=>navigation.navigate("Conversation")}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: hp(0.5),
          height: hp(10),
        }}>
        <View
          style={{
            width: wp(12),
            marginLeft: wp(2),
            height: wp(12),
            resizeMode: 'overflow',
            borderRadius: wp(12),
          }}>
          <Image
            source={appImages.profileImg}
            style={{height: '100%', width: '100%'}}
            //resizeMode="contain"
          />
        </View>
        <View
          style={{
            height: '100%',
            marginLeft:wp(5),
            justifyContent: 'space-evenly',
            flex: 1,
          }}>
          <Text style={{color: '#1E2022', fontFamily: 'Inter-Medium'}}>
            {item.name}
          </Text>

          <Text style={{color: '#77838F', fontSize:hp(1.6), fontFamily: 'Inter-Medium'}}>
          {item.message}
          </Text>
        </View>

        <View
          style={{
            height: '100%',
            alignItems:'center',
            justifyContent: 'space-around'
          }}>
          <Text style={{color: '#1E2022', fontFamily: 'Inter-Medium'}}>
            {item.time} 
          </Text>


          {item.showMessageNumber&&<View style={{height:hp(2.6), width:wp(5), justifyContent:'center',alignItems:'center', backgroundColor:'#FACA4E'}}>
          <Text style={{color: '#ffffff', fontSize:hp(1), fontFamily: 'Inter-Medium'}}>
            {item.messageNumber}
          </Text>
        </View>}

          
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>

        <View style={{marginTop:hp(5)}}>

      <Headers
        showBackIcon={true}
        onPress={() => navigation.goBack()}
        showText={true}
        text={'Chat'}
      />
        </View>

      <StatusBar barStyle={'dark-content'} backgroundColor={'#FACA4E'} />

      <View style={{marginTop: hp(3), width: '100%', height: hp(6)}}>
        <View style={styles.searchBar}>
          <Fontiso
            name={'search'}
            size={18}
            color={'#A8A8A8'}
            style={{marginLeft: wp(3)}}
          />
          <TextInput
            style={{flex: 1, marginLeft: wp(3)}}
            placeholder="Search Chat"
          />
        </View>
      </View>
      <View style={{flex: 1, alignSelf: 'center'}}>
        <SwitchSelector
          options={options}
          initial={0}
          hasPadding
          textColor={'#939393'}
          textStyle={{
            fontSize: 14,
            fontWeight: 'bold',
          }}
          buttonStyle={{
            height: 120, // Adjust the height of the switch button as needed
            borderRadius: 20, // Match the borderRadius with the container's borderRadius
          }}
          style={{
            marginTop: '8%',
            width: '90%',
            borderRadius: 20,
            fontWeight: 'bold',
          }} // Adjust the height value as needed
          selectedColor={'#232323'}
          buttonColor={'#FACA4E'}
          backgroundColor={'#F2F2F2'}
          borderColor={'#EEF1F6'}
          bold={true}
          height={50}
          valuePadding={5}
          onPress={value => {
            setcheck(value);
          }}
        />
        {/* {check == 0 ?
                    <Text style={{ color: '#9597A6', fontSize: wp(4), marginVertical: '5%', fontFamily: 'Inter-Medium' }}>Please sign in to access your account.</Text>
                    :
                    <Text style={{ color: '#9597A6', fontSize: wp(4), marginVertical: '5%', fontFamily: 'Inter-Medium' }}>Let's begin by creating your account.</Text>
                } */}

        {check == 0 ? (
          
           <View style={{marginTop: hp(1), height: '100%'}}>
             <FlatList
               style={{flex: 1}}
               showsVerticalScrollIndicator={false}
               data={chats}
               keyExtractor={item => item.id.toString()}
               renderItem={({item}) => renderChats(item)}
             />
         </View>
        ) : (
            <View style={{marginTop: hp(1), height: '100%'}}>
            <FlatList
              style={{flex: 1}}
              showsVerticalScrollIndicator={false}
              data={chats}
              keyExtractor={item => item.id.toString()}
              renderItem={({item}) => renderChats(item)}
            />
          
        </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    //alignItems: 'center'
  },
  bg: {
    // height:800,
    backgroundColor: '#FACA4E',
  },
  mainv: {
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    marginTop: '15%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  ti: {
    marginHorizontal: '7%',
    marginTop: '5%',
    width: 300,
    backgroundColor: 'white',
    fontSize: wp(4),
    paddingLeft: '2%',
    borderRadius: 10,
  },
  v1: {
    marginTop: '10%',
  },
  hs: {
    position: 'absolute',
    borderWidth: 1,
    borderRadius: 10,
    width: 60,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    right: 35,
    top: 31,
  },
  txt: {
    fontSize: wp(3.6),
    fontFamily: 'Inter-Medium',
  },
  searchBar: {
    height: hp(5),
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal:wp(5),
    borderRadius: wp(5),
    borderWidth: 0.5,
    borderColor: '#00000017',
  },
  profileImgs: {
    resizeMode: 'contain',
    //marginTop: hp(-2),
    //position: 'absolute',
    //right: -10,
    width: wp(30),
    height: hp(5),
  },
});
