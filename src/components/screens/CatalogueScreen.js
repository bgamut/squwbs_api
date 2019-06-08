import React, {Button, Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
class CatalogueScreen extends Component {
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
                    catalogue
                </div>
                <Link id="linkCategory" to="/Category">Category</Link><br/>
                <Link id="linkProduct" to="/Product">Product</Link><br/>
                
            </div>
            
        );
    }
}

CatalogueScreen.propTypes = {

};

export default CatalogueScreen;