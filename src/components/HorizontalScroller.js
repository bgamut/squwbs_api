import React,{memo, Component} from 'react'
import {StyleSheet, Text, View, ScrollView, Dimensions} from 'react-native'
import {WholeContext} from "../WholeContext"

class HorizontalScroller extends Component{
    static contextType = WholeContext;
    state = {
        width:0
      };
    // styles = StyleSheet.create({
    //     contentContainer:{
    //         backgroundColor:'#F5FCFF',
    //         width:100%
    //     },
    //     container:{
    //         flex:1,
    //         backgroundColor:'#F5F5F5',
    //         width:this.state.width
    //     },
    //     contentBox:{
    //         flex:1,
    //         margin:20,
    //         backgroundColor:'orange',
    //         margin:10,
    //         textAlign:'center',
    //         fontSize:20,
    //         padding:100
    //     }
    // })
    componentDidMount(){
         
    }
    updateDimensions =(e) =>{
        this.setState(
            {
                width: Dimensions.get('window').width
            }
        )
    }
    componentDidMount=()=>{
        window.addEventListener("resize", this.updateDimensions);
    }
    componentWillMount=()=>{
        this.updateDimensions();
    }
    componentWillUnmount=()=>{
        window.removeEventListener("resize", this.updateDimensions);
    }
    render(){
        
        return(
            
            <ScrollView horizontal={true} style ={{...styles.contentContainer,width:this.state.width}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View style={{...styles.container,width:this.state.width}}> 
                    <Text style={styles.contentBox}> sample text 1 </Text>
                </View>
                <View style={{...styles.container,width:this.state.width}}> 
                    <Text style={styles.contentBox}> sample text 2 </Text>
                </View>
                <View style={{...styles.container,width:this.state.width}}> 
                    <Text style={styles.contentBox}> sample text 3 </Text>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    contentContainer:{    
        backgroundColor:'#F5FCFF'
    },
    container:{
        flex:1,
        backgroundColor:'#F5F5F5'
    },
    contentBox:{
        flex:1,
        margin:20,
        color:'white',
        backgroundColor:"rgb(30, 30, 30)",
        margin:10,
        textAlign:'center',
        fontSize:20,
        padding:100
    }
})
export default memo(HorizontalScroller)