import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import {View} from 'react-native'

var {name} =require( '../../../package.json')
class login extends Component {
    constructor(props) {
        super(props);

    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    shouldComponentUpdate(nextProps, nextState) {

    }

    componentWillUpdate(nextProps, nextState) {

    }

    componentDidUpdate(prevProps, prevState) {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className='container' style={{
                orderColor:'#cfcfcf',
                borderWidth:5,
                borderColor:'#cfcfcf',
                // shadowColor: 'rgba(1, 1, 1, 1)',
                // shadowOffset: {width: 0, height: 0},
                // shadowRadius: 20,
                backgroundColor:'#ffffff',
                
            }}>
                    <div id='titleBar' style={{
                        margin:1,
                        borderColor:'#cfcfcf',
                        borderWidth:2,
                        backgroundColor:'#ffffff',
                        flexDirection:'column',
                        flex:1,
                        alignItems:'center',
                        justifyContent:'space-evenly',
                    }}>        
                        <div id='title'>{name}</div>
                    </div>
                <a style = {{color:'black', textDecorationLine:'none',borderColor:'white',borderWidth:2,textShadowColor: 'rgba(1, 1, 1, 1)',textShadowOffset: {width: 0, height: 0},textShadowRadius: 5 }} href="/login/facebook">Log In with Facebook</a><br/>
                <a style = {{color:'black', textDecorationLine:'none',borderColor:'white',borderWidth:2,textShadowColor: 'rgba(1, 1, 1, 1)',textShadowOffset: {width: 0, height: 0},textShadowRadius: 5 }} href="/login/google">Log In with Google</a><br/>
                <a style = {{color:'black', textDecorationLine:'none',borderColor:'white',borderWidth:2,textShadowColor: 'rgba(1, 1, 1, 1)',textShadowOffset: {width: 0, height: 0},textShadowRadius: 5 }} href="/login/twitter">Log In with Twitter</a><br/>
            </div>
        );
    }
}

login.propTypes = {

};

export default login;