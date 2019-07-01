import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
class CategoryScreen extends Component {
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
                <div>
                    category
                </div>
                <Link id="Product" to="/Product">Product</Link><br/>
                <Link id="Catalouge" to="/Catalogue">Catalogue</Link><br/>
            </div>
        );
    }
}

CategoryScreen.propTypes = {

};

export default CategoryScreen;