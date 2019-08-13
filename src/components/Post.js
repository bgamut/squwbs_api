import React from 'react';
import {View,Text} from 'react-native'
//import Swiper from 'react-native-swiper'
//import Swiper from 'react-native-web-swiper'
//import Swiper from './Swiper'
const Post = props => {
  const { post } = props;
  return (
    //<Swiper showsButtons={true}>
    //<Swiper>
    <View style={{
        flex:1,
        flexDirection:'row'
    }}>
       
            <View style={{

                        borderColor:'#cfcfcf',
                        borderRadius:2,
                        alignItems:'center',
                        borderWidth:1,
                        flex:1,
                        flexDirection:'row',
                        height:22,
                        justifyContent:'center',
                        marginLeft:2,
                        //marginRight:2,
                        marginTop:2,
                        //padding:1,
                        paddingBottom:2,
                        backgroundColor:'#ffffff',
                        outlineColor:'aaaaaa',
                        
                        }}>
                            
                <Text>
                    {post}
                </Text>
            </View>
            <View style={{
                        marginTop:2,
                        marginLeft:2,
                        //marginRight:2,
                        //padding:1,
                        paddingBottom:2,
                        height:22,
                        width:22,
                        backgroundColor:'#ffffff',
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'row',
                        //flex:1,
                       
                        borderColor:'#cfcfcf',
                        borderRadius:2,
                        outlineColor:'black',
                        borderWidth:1,
                        //textAlign:'center',
                        }}>
                <Text>
                    O
                </Text>
            </View>
            <View style={{
                        marginTop:2,
                        marginLeft:2,
                        marginRight:2,
                        //padding:1,
                        paddingBottom:2,
                        height:22,
                        width:22,
                        backgroundColor:'#ffffff',
                        alignItems:'center',
                        justifyContent:'center',
                        flexDirection:'row',
                        //flex:1,
                       
                        borderColor:'#cfcfcf',
                        borderRadius:2,
                        outlineColor:'black',
                        borderWidth:1,
                        //textAlign:'center',
                        }}>
                <Text>
                    X
                </Text>
            </View>
      
    </View>
    //</Swiper>
  );
};

export default Post;