import React,{memo, Component,useContext} from 'react'
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
    // componentDidMount(){
         
    // }
    updateDimensions =(e) =>{
        this.setState(
            {
                width: Dimensions.get('window').width
            }
        )
    }
    componentDidMount=()=>{
        window.addEventListener("resize", this.updateDimensions);
        window.addEventListener("orientationchange",this.updateDimensions);
    }
    UNSAFE_componentWillMount=()=>{
        this.updateDimensions();
    }
    UNSAFE_componentWillUnmount=()=>{
        window.removeEventListener("resize", this.updateDimensions);
        window.removeEventListener("orientationchange",this.updateDimensions);
    }
    render(){
        
        return(
            <View id = 'outerContainer1' >

                <ScrollView id='outerContainer2'horizontal={true}  showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                    <div className='container'> 
                        <p className='contentBox'> sample text 1 </p>
                    </div>
                    <div className='container'> 
                        <p className='contentBox'> sample text 2 </p>
                    </div>
                    <div className='container'> 
                        <p className='contentBox'> sample text 3 </p>
                    </div>
                </ScrollView>
                <style>{`
                    .container{
                    
                        background-color:#ffffff;
                        width:100vw;
                        -webkit-app-region:drag;
                    }
                    #outerContainer1{

                        background-color:white;
                        width:100vw;
                        
                    }
                    #outerContainer2{

                        background-color:white;
                        width:100vw;
                        
                    }
                    .contentBox{
                        background-color:#333333;
                        color:black;
                        display:flex;
                        height:25vw;
                        margin:2px;
                        text-align: center; 
                    }
                `}
                </style>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor:'#F5F5F5',
        flex:1,
    },
    contentBox:{
        backgroundColor:"rgb(30, 30, 30)",
        color:'black',
        flex:1,
        fontSize:20,
        margin:10,
        padding:100,
        textAlign:'center',
    },
    contentContainer:{    
        alignItems:'center',
        backgroundColor:'#F5FCFF',
        display:'flex',
        justifyContent:'center',
        textAlign:'center',
        width:'100vw',
    },
})
export default memo(HorizontalScroller)