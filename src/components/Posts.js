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
  UNSAFE_componentWillMount() {
    //this.props.fetchPosts();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.newPost) {
      this.props.posts.unshift(nextProps.newPost);
    }
  }

  render() {
    
    const postItems = this.props.posts.map((post, i)=>
      <View key={i} style={{

      }}>
        <Text style={{
          color:'black',
          // textShadowColor: 'rgba(1, 1, 1, 1)',
          // textShadowOffset: {width: 0, height: 0},
          // textShadowRadius: 20
          }}>{post}</Text>
      </View>
    );
  
    return (
      <View style={{
        margin:1,
        borderColor:'#cfcfcf',
        borderWidth:1,
        // shadowColor: 'rgba(1, 1, 1, 1)',
        // shadowOffset: {width: 0, height: 0},
        // shadowRadius: 20,
        }}>
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