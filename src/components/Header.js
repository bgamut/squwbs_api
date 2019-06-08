import React from 'react';
import {SafeAreaView, View, Text, StyleSheet,Animated} from 'react-native';
import '../css/header.css'

var header_max_height = 50
var header_min_height = 22
var profile_max_height = 80
var profile_min_height = 13
const Header = ({ onBack, title }) => (
    <Animated.View id='titleBar' style={styles.headerContainer}>        
        <Text accessibilityRole="heading" id='title' style={styles.title}>{title}</Text>
    </Animated.View>
);

const styles = StyleSheet.create({
    headerContainer: {
    backgroundColor:'#333333',
    width:'100vw',
    height:header_max_height,
    flex:1
    },
    title: {
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white'
    },
});

export default Header;
