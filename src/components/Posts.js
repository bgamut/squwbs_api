import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/postActions';
import {View,Text,StyleSheet} from 'react-native';


  
  const mapStateToProps = state => ({
    posts: state.posts.items,
    newPost: state.posts.item
  });

class Posts extends Component {
  componentWillMount() {
    //this.props.fetchPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }

  render() {
    
    const postItems = this.props.posts.map((post, i)=>
      <View key={i} style={{}}>
        <Text>{post}</Text>
      </View>
    );
  
    return (
      <View>
        {postItems}
      </View>
    );
    
  }
}

Posts.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  newPost: PropTypes.object
};

export default connect(mapStateToProps, { fetchPosts })(Posts);