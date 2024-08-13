import {StyleSheet, Text, View} from 'react-native';
import React,{useState} from 'react';
import {DefaultTheme, TextInput as TextInputPaper,Provider as PaperProvider, Picker } from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { FontFamily } from '../consts/Fonts';


const CPaperInput = props => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedDropdownValue, setSelectedDropdownValue] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false); // State to show/hide the dropdown


  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown); // Toggle the dropdown state
  };

  const handleDropdownValueChange = (itemValue) => {
    setSelectedDropdownValue(itemValue); // Update the selected value for the dropdown
    props.setSelectedValue(itemValue); // Pass the selected value to the parent component
  };

  //   let isDarkMode = useSelector(state => state.theme.isDarkMode);
  let isDarkMode = false;

  const theme = {
    
    roundness: 10,
     // Adjust the border radius value as needed
  };
  const paperInputStyle = StyleSheet.create({
    heading: {
      color: '#0B0B0B',
      fontWeight:'bold',
      marginBottom:hp(2.3),
      fontSize: hp(2.1),
      fontFamily: 'Inter',
    },
    headingFocused:{
      marginBottom:hp(1.5),
      fontSize: hp(2.3),
      fontWeight:'bold',
      color: '#FACA4E',
      //fontSize: 13,
      fontFamily: 'Inter',
    },
    paperInputThemeColor: {
      primary: '#FACA4E',
      // surface: 'red',
      text: '#fff',


      // backgroundColor: 'red',
      onSurfaceVariant: '#000',
      // placeholder: 'red',
      //underlineColor: 'red',
    },
    paperInputContinaer: {
      width: props?.width ? props?.width : wp(85),
      backgroundColor: 'transparent',
      //overflow:'hidden',
      //borderRadius:50,
      height:props?.height?props?.height:hp(7.3),
      textAlignVertical:'top',
       
      
      
      
     
      color: '#fff',
      fontSize: 14,
      // marginVertical: 10,

      // paddingHorizontal: 10,
      // height: 30,
      // paddingHorizontal: 0,

    },
    underlineColor: '#E7EAF2',
    
    iconSize: 23,
    iconColor: 'gray',
  });
  return (
   
    <View style={{marginVertical: 12}}>
      

      {props?.heading && (
        <Text style={[
          paperInputStyle.heading,
          isFocused && paperInputStyle.headingFocused,
        ]}>{props?.heading}</Text>
      )}
      <TextInputPaper
      textAlignVertical="top"
      editable={props?.editable}
        // label={'Email'}
        {...props}
        //   placeholder="Password"
        //   secureTextEntry={!showPassword}
        //   value={password}
        //   onChangeText={text => setPassword(text)}
        //   left={props?.left}
        //   right={props?.right}

        onFocus={handleFocus}
        onBlur={handleBlur}
        //textAlignVertical="top" 

        mode='outlined'
        
        outlineColor={paperInputStyle.underlineColor}
        theme={{
          colors: paperInputStyle.paperInputThemeColor,
          roundness:wp(3)
          // fonts: {
          //   bodyLarge: {
          //     ...DefaultTheme.fonts.bodyLarge,
          //     // fontFamily: appFonts.Poppins_Light,
          //   },
          // },
        }}
        contentStyle={{
          // backgroundColor: 'red',
          // marginTop: 4,

         // paddingTop: responsiveHeight(-10),
          paddingVertical: 0, // Adjust this value as needed to control the vertical padding
          marginHorizontal: wp(1),
          marginVertical: -2,
          
        }}
        style={paperInputStyle.paperInputContinaer}
        /* textAlignVertical="center" */ // Set the cursor position to center
        

      />

       {/* Dropdown List */}
       {showDropdown && (
        <Picker
          visible={showDropdown}
          onDismiss={() => setShowDropdown(false)}
          selectedValue={selectedDropdownValue}
          onValueChange={handleDropdownValueChange}
          mode="dropdown"
        >
          {props.data.map((item) => (
            <Picker.Item label={item.label} value={item.value} key={item.value} />
          ))}
        </Picker>
      )}
      
    </View>
    
  );
};

export default CPaperInput;

const styles = StyleSheet.create({});
