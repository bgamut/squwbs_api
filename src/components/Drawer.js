import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity , Image, Platform, Animated} from 'react-native'
const Sliding_Drawer_Width =300;
class Drawer extends Component{
    constructor(props){
        super(props)
        this.Animation = new Animated.Value(0)
        this.Sliding_Drawer_Toggle = true;
    }
    ShowSlidingDrawer = ()=>
    {
        if(this.Sliding_Drawer_Toggle===true)
        {
            Animated.timing(
                this.Animation,
                {
                    toValue:1,
                    duration:500
                }
            ).start(()=>
            {
                this.Sliding_Drawer_Toggle=false;
            })
        }
        else
        {
            Animated.timing(
                this.Animation,
                {
                    toValue:0,
                    duration:500
                }
            ).start(()=>
            {
                this.Sliding_Drawer_Toggle=true;
            })
        }
    }
    render(){
        const Animation_Interpolate =this.Animation.interpolate(
            {
                inputRange:[0,1],
                outputRange:[-(Sliding_Drawer_Width+5),0]
            }
        )
        return(
            <View style={StyleSheet.MainContainer}>
                
                <View>
                <TouchableOpacity onPress = {this.ShowSlidingDrawer} style={{padding:0}}>
                    <Image source={require('../icons/24x24.png')} style={{resizeMode:'contain',width:22,height:22}}/>
                </TouchableOpacity>
                    {this.props.children}
                </View>
                
                <Animated.View style={[styles.Root_Sliding_Drawer_Container, {transform:[{translateX:Animation_Interpolate},{translateY:22}]}]}>
                    <View style = {styles.Main_Sliding_Drawer_Container}>
                    {/* this is where the children are supposed to be */}
                        <Text style ={styles.TextStyle}>another put stuff here placeholder </Text>
                    </View>
                </Animated.View>
            </View>
        )

        
    }
} 
export default Drawer
const styles=StyleSheet.create(
    {
        MainContainer:
        {
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        },
        Root_Sliding_Drawer_Container:
        {
            position:'absolute',
            flexDirection:'row',
            left:0,
            bottom:0,
            top:(Platform.OS=='ios')? 20:0,
            width:Sliding_Drawer_Width,
            
            // margin:4,
            // padding:1,
        },
        Main_Sliding_Drawer_Container:
        {
            flex:1,
            backgroundColor:'#ffffff',
            paddingHorizontal:10,
            justifyContent: 'center',
            alignItems:'center',
            borderRadius:2,
            borderColor:"#cacaca",
            borderWidth:1
        }
    }
)