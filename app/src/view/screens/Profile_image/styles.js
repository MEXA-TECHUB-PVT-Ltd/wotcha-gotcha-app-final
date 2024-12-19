import { StyleSheet } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const STYLES = StyleSheet.create({
    bg: {
        // height:800,
        backgroundColor: '#FACA4E'
    },
    mainv: {
        flex: 1,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        marginTop: '15%',
        backgroundColor: 'white'
    },

    txt: {
        color: '#333333',
        fontSize: wp(6),
        fontFamily: 'Inter-Bold',
        alignSelf: 'center',
        marginTop:'10%'
    },
    txt1: {
        color: '#9597A6',
        fontSize: wp(3.8),
        fontFamily: 'Inter-Regular',
        alignSelf: 'center',
        marginTop:'2%'
    },
    button: {
        // flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: '#FACA4E',
        borderRadius: 25,
        // width: 180,
        paddingHorizontal:hp(3),
        marginTop:hp(2),
        marginBottom: '5%',
    },
    circleBox: {
        width: wp(28),
        height: hp(14),
        borderWidth: 1,
        overflow:'hidden',
        borderColor: '#0000001F',
        borderRadius: wp(50),
        justifyContent: 'center',
        alignItems: 'center',
      }, ti: {
        marginTop: '5%',
        width: 300,
        backgroundColor: 'white',
        fontSize: wp(4),
        paddingLeft: '2%',
        borderRadius: 10,
      },
      textInputSelectedCategory: {
        borderWidth: 1,
        borderRadius: wp(3),
        width: '98%',
        borderColor: '#FACA4E',
    
        paddingHorizontal: 20,
        paddingVertical: 6.8,
        marginBottom: 20,
        marginTop: hp(3),
      },
      textInputCategoryNonSelected: {
        borderWidth: 1,
        borderRadius: wp(3),
        width: '98%',
        borderColor: '#E7EAF2',
        paddingHorizontal: 20,
        paddingVertical: 6.8,
        marginBottom: 20,
        marginTop: hp(3),
      },
      iconStyle: {
        color: '#C4C4C4',
        width: 20,
        height: 20,
      },
      iconStyleInactive: {
        color: '#FACA4E',
      },
      maintext: {
        fontSize: hp(2.3),
        color: '#303030',
        fontWeight: 'bold',
      },
      modaltextview: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: wp(90),
        borderRadius: 25,
        backgroundColor: 'white',
        paddingHorizontal: wp(15),
      },
      optiontext: {
        fontSize: hp(1.7),
        color: '#303030',
        marginLeft: wp(4),
      },
      nonselectedItems: {
        width: wp(35),
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: hp(14),
        borderRadius: wp(1.8),
        borderWidth: 1,
        borderColor: '#E7EAF2',
      },
      selectedItems: {
        width: wp(35),
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: hp(14),
        borderRadius: wp(1.8),
        borderWidth: 1,
        borderColor: '#FACA4E',
      },
      selectCheckBox:{
        width: 17,
        height: 17,
        borderRadius: wp(1),
        borderWidth: 1,
        alignItems:'center',
        justifyContent:'center',
        borderColor: '#FACA4E',
      },
      unSelectCheckBox:{
        width: 17,
        height: 17,
        borderRadius: wp(1),
        borderWidth: 1,
        alignItems:'center',
        justifyContent:'center',
        borderColor: '#C4C4C4',
      },
})

export default STYLES; 