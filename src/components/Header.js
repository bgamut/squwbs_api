import React,{useContext, useEffect,memo,Component} from 'react';
import {SafeAreaView, View, Text, StyleSheet,Animated,Dimensions} from 'react-native';
//import '../css/header.css'
//import {WholeContext} from "../WholeContext"
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTitle, setTitleOnload, getYscrolled,updateDimensions } from '../actions/postActions';
import {bindActionCreators} from 'redux'
var {name} =require( '../../package.json')
var header_max_height = 22
var header_min_height = 22
var profile_max_height = 80
var profile_min_height = 13


class Header extends Component {

    // getYscrolled(e){
    //     this.setState({yScrollAnimation:e.target})
    // }
    
    // updateDimensions =(e) =>{
    //     this.setState(
    //         {
    //             width: Math.floor(
    //                 Dimensions.get('window').width
    //             )
    //         }
    //     )
    // }
    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        // if (nextProps.startTime !== this.state.startTime) {
        //     this.setState({ startTime: nextProps.startTime });
        // }
        console.log('this is from nextProps '+nextProps.title)
      }
    componentDidMount(){
        

        //console.log(name +"is from componenetDidMount")

        this.props.setTitleOnload(name)
        // window.addEventListener("resize", this.props.updateDimensions(Math.floor(Dimensions.get('window').width)));
        // window.addEventListener("orientationchange",this.props.updateDimensions(Math.floor(Dimensions.get('window').width)));
        //window.addEventListener("resize", this.props.updateDimensions(window.innerWidth));
        //window.addEventListener("orientationchange",this.props.updateDimensions(window.innerWidth));
        window.addEventListener("resize", this.props.updateDimensions);
        window.addEventListener("orientationchange",this.props.updateDimensions);
    }
    componentWillMount=()=>{
        //console.log(Math.floor(Dimensions.get('window').width))
        var tempObject = {target:window}
        this.props.updateDimensions(tempObject);
    }
    componentWillUnmount=()=>{
        //window.removeEventListener("resize", this.props.updateDimensions(Math.floor(Dimensions.get('window').width)));
        //window.removeEventListener("orientationchange",this.props.updateDimensions(Math.floor(Dimensions.get('window').width)));
        //window.removeEventListener("resize", this.props.updateDimensions(window.innerWidth));
        //window.removeEventListener("orientationchange",this.props.updateDimensions(window.innerWidth));
        window.removeEventListener("resize", this.props.updateDimensions);
        window.removeEventListener("orientationchange",this.props.updateDimensions);
    }
    render(){
        const title=String(this.props.title)
        return(
        <View accessibilityRole="heading" style={styles.headerContainer}>
            <div id='titleBar'>        
                <div id='title' >
                    {this.props.title}
                </div>
            </div>
            <style>{`
                #titleBar{
                

                    width:100vw;
                    height:22px;
                    -webkit-app-region:drag;
                }
                #title{
                    
                    text-shadow: 0px 0px 5px rgba(1, 1, 1, 1);
                    font-size:14px;
                    text-align: center;
                    color:rgb(256, 256, 256);
                    width:100vw;
                    height:50px;
                    padding-top:2px;
                    -webkit-app-region:drag;
                    -moz-user-select: -moz-none;
                    -khtml-user-select: none;
                    -webkit-user-select: none;
                    -ms-user-select: none;
                    user-select: none;

                }
            `}
            </style>
        </View>
        )
    }
    
};

const styles = StyleSheet.create({
    headerContainer: {
//     backgroundColor:'#ffffff',
//     width:'100vw',
//     height:header_max_height,
//     display:'flex',
// //    textAlign:'center',
//     alignItems:'center',
//     justifyContent:'center',
//     borderWidth:2,
//     //padding:1,
//     borderColor:'white',
//     margin:1,
//     // borderColor:'#cfcfcf',
//     // borderWidth:1,
//     shadowColor: 'rgba(1, 1, 1, 1)',
//     shadowOffset: {width: -1, height: 0},
//     shadowRadius: 2
    flex:1,
    margin:1,
    borderColor:'#cfcfcf',
    borderWidth:1,
    shadowColor: 'rgba(1, 1, 1, 1)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 1,
    backgroundColor:'#ffffff',
    alignItems:'center',
    justifyContent:'space-evenly',
    },
    // title: {
    // fontSize: 19,
    // fontWeight: '600',
    // textAlign: 'center',
    // color: 'white'
    // },
});
Header.propTypes={
    setTitleOnload:PropTypes.func.isRequired,
    title:PropTypes.string,
    width:PropTypes.number,
}
const mapStateToProps= state=>({
    title:state.posts.title,
    width:state.posts.width
})
const matchDispatchToProps=dispatch=>{
    return bindActionCreators({
        setTitleOnload:setTitleOnload,
        getYscrolled:getYscrolled,
        updateDimensions:updateDimensions
    
    },dispatch)
}
//export default memo(connect(mapStateToProps,{setTitle})(Header))
export default connect(mapStateToProps,matchDispatchToProps)(Header)