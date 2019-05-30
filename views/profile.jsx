import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
            <div>
                <p>
                <a href="/">home</a><br/>
                <a href="/logout">log out</a><br/>
                <img src={this.props.picture}/><br/>
                provider:{this.props.provider}<br/>
                ID: {this.props.id}<br/>
                Username: {this.props.displayName} <br/>
                Email:{this.props.email} <br/>
                </p>

            </div>
        );
    }
}

profile.propTypes = {

};

export default profile;