import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Heart from "../../../assets/svg/Heart.svg"
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Like from '../../../assets/svg/Like.svg';
const Live = ({ navigation, route }) => {
  const { thumbnailImageUri } = route.params;
  const [message, setMessage] = useState('');
  const [liked, setLiked] = useState(false);

  const sendMessage = () => {
    console.log('Message sent:', message);
    setMessage('');
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <ImageBackground
      source={{ uri: thumbnailImageUri }}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} />
        <View style={styles.topleftButtons}>
         <View style={{flexDirection:"column"}}>
         <TouchableOpacity>
        <View>
             <Ionicons name={'chevron-back'} color={"white"} size={25} />
        </View>
        </TouchableOpacity>
        <View style={{left:"10%", top:"30%", flexDirection:"row", backgroundColor:"grey", borderColor:"grey", padding:"3%", borderRadius:10, borderWidth:1, marginHorizontal:"2%"}}>
             <View>
                 <Heart height={20} width={20} />
             </View>
             <View>
                    <Text style={styles.iconText}>100</Text>
             </View>
         
          
        </View>
       </View>
      </View>
      
     
      <View style={styles.topRightButtons}>
        
       <View style={{flexDirection:"column"}}>
         <TouchableOpacity>
        <View>
             <Text style={styles.ENDText}>End Live</Text>
        </View>
        </TouchableOpacity>
        <View style={{left:"10%", top:"10%", flexDirection:"row", backgroundColor:"grey", padding:"1%", borderRadius:10, borderWidth:1, borderColor:"grey"}}>
             <View>
                 <Ionicons name="eye" size={20} color="white" />
             </View>
             <View>
                <Text style={styles.iconText}>100</Text>
             </View>
        </View>
       </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={{flexDirection:"row"}}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor={"white"}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
          </View>
            <View style={styles.containerofcircle}>
        <TouchableOpacity style={styles.circle}>
          <Heart height={20} width={20} />
        </TouchableOpacity>
        <Text style={styles.textoflike}>Like</Text>
      </View>
      </View>

    
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cancelButton: {
    position: 'absolute',
    bottom: 20,
    padding: 10,
    borderRadius: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    padding: '3%',
    marginHorizontal: '15%',
    justifyContent: 'center',
    textAlign: 'center',
  },
  topRightButtons: {
    position: 'absolute',
   top:"7%",
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
   topleftButtons: {
    top:"7%",
    position: 'absolute',
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomLeftButtons: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal:10,
  },
  iconButton: {
    marginRight: 5,
  },
  ENDText:{
    color:"white",
    backgroundColor:"red",
    borderRadius:10,
    borderWidth:1,
    padding:"2%",
    borderColor:"red"
  },
  iconText: {
    color: 'white',
    marginLeft: 5,
  },
 containerofcircle: {
    alignItems: 'center',
    right:"70%",
    top:"3%"
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: 'grey', // Set the background color of the circle
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoflike: {
    marginTop: 10, // Adjust as needed
    fontSize: 10,
    color: 'white', // Set the color of the text
  },
  input: {
    flex: 1,
    backgroundColor: '#666666',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    color:"white"
  },
  sendButton: {
    backgroundColor: '#FACA4E',
    borderRadius: 20,
    padding: 10,
    right:"80%"
  },
});

export default Live;
