import React, { Component } from 'react';
import PropTypes from 'prop-types';

class home extends Component {
    constructor(props) {
        super(props);
        this.state={
            
        }
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
        var redercomponent
        if(this.props.user!==undefined){
            return(
                <div>
                   
                    <p>Hello, {this.props.user}. View your <a href="/login">profile</a>.</p>
                    <a href="/logout">log out</a>
                </div>
            )

            
        }
        else{
            return (
                <div>
                   
                    <p>Welcome! Please <a href="/login">log in</a>.</p>
                </div>
            );
        }
    }
}

home.propTypes = {

};

export default home;