import React, {memo} from 'react'
import {Text,View} from 'react-native'
const Home = () => (
  <View style={{
    margin:1,
    borderColor:'#cfcfcf',
    borderWidth:1,
    shadowColor: 'rgba(1, 1, 1, 1)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 1,
    backgroundColor:'#ffffff',
    alignItems:'center',
    justifyContent:'space-evenly',
  }}>
  <Text style={{          
  
      height:22,
 
      flexDirection:'row',
      flex:1,
      fontSize:12,
 
      color:'white',
      textShadowColor: 'black',
      textShadowOffset: {width: 0, height: 0},
      textShadowRadius: 5
    }}>
    Home
  </Text>
  </View>
)

export default memo(Home)
