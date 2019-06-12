import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import View from 'react-native'
class profile extends Component {
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
            <div class='container'>
                <style>{`
                                    .container{
                                    
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
                <a className='text' style = {{color:'black', textDecorationLine:'none',borderColor:'white',borderWidth:2,textShadowColor: 'rgba(1, 1, 1, 1)',textShadowOffset: {width: 0, height: 0},textShadowRadius: 5 }} href="/">
                    home
                </a>
                <br/>
                <a className='text'style = {{color:'black', textDecorationLine:'none',borderColor:'white',borderWidth:2,textShadowColor: 'rgba(1, 1, 1, 1)',textShadowOffset: {width: 0, height: 0},textShadowRadius: 5 }} href="/logout">
                    log out
                </a>
                <br/>
                <div className='container'>
                    <div className='text' style = {{color:'black', textDecorationLine:'none',borderColor:'white',borderWidth:2,textShadowColor: 'rgba(1, 1, 1, 1)',textShadowOffset: {width: 0, height: 0},textShadowRadius: 5 }}>
                        provider:{this.props.provider}
                    </div>
                    <br/>
                    <div className='text' style = {{color:'black', textDecorationLine:'none',borderColor:'white',borderWidth:2,textShadowColor: 'rgba(1, 1, 1, 1)',textShadowOffset: {width: 0, height: 0},textShadowRadius: 5 }}>
                        ID: {this.props.id}
                    </div>
                    <br/>
                    <div className='text' style = {{color:'black', textDecorationLine:'none',borderColor:'white',borderWidth:2,textShadowColor: 'rgba(1, 1, 1, 1)',textShadowOffset: {width: 0, height: 0},textShadowRadius: 5 }}>
                        Username: {this.props.displayName} 
                    </div>
                    <br/>
                
                </div>

            </div>
        );
    }
}

profile.propTypes = {

};
// const styles = StyleSheet.create({
//     container: {
//         margin:1,
//         borderColor:'#cfcfcf',
//         borderWidth:1,
//         shadowColor: 'rgba(1, 1, 1, 1)',
//         shadowOffset: {width: 0, height: 0},
//         shadowRadius: 1,
//         backgroundColor:'#ffffff',
//         alignItems:'center',
//         justifyContent:'space-evenly',
    
//     },
//     text: {
//         height:22,
//         flexDirection:'row',
//         flex:1,
//         fontSize:12,
//         color:'white',
//         textShadowColor: 'black',
//         textShadowOffset: {width: 0, height: 0},
//         textShadowRadius: 5
//     },
// });
export default profile;