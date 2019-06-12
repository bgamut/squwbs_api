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
            <div className='container'>
                    <div id='titleBar' style=
                        "margin:1;
                        borderColor:'#cfcfcf';
                        borderWidth:1;
                        shadowColor: 'rgba(1, 1, 1, 1)';
                        shadowOffset: {width: 0, height: 0};
                        shadowRadius: 1;
                        backgroundColor:'#ffffff';"
                    >        
                        <div id='title'>{name}</div>
                    </div>
                <style>{`
                                    .container{
                                        color:white
                                        margin:2px;
                                        width:100vw;
                                        height:22px;
                                        -webkit-app-region:drag;
                                        shadow: 0px 0px 5px rgba(1, 1, 1, 1)
                                    }
                                    #text{
                                        
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