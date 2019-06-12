import React,{memo }from 'react'
import {Text,View} from 'react-native'
const NoMatch = () => (
  <View style={{
    margin:1,
    borderColor:'#cfcfcf',
    borderWidth:5,
    // shadowColor: 'rgba(1, 1, 1, 1)',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 20,
    backgroundColor:'#ffffff',
    alignItems:'center',
    justifyContent:'space-evenly',
    height:22
  }}>
  <Text style={{          
  
      height:50,
 
      flexDirection:'row',
      flex:1,
      fontSize:12,
 
      color:'black',
      // textShadowColor: 'black',
      // textShadowOffset: {width: 0, height: 0},
      // textShadowRadius: 20
    }}>
    No Match
  </Text>
  </View>
)

export default memo(NoMatch)
