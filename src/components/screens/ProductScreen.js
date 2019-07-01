import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class ProductScreen extends Component {
    render() {
        return (
            <div>
                <div>product</div>
                <Link id="Catalouge" to="/Catalogue">Catalogue</Link><br/>
                <Link id="Category" to="/Category">Category</Link><br/>
            </div>
        );
    }
}

export default ProductScreen;