import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';
import '../css/header.css'

const Header = ({ onBack, title }) => (
    <div id='titleBar'>        
        <Text accessibilityRole="heading" id='title'>{title}</Text>
    </div>
);

const styles = StyleSheet.create({
    headerContainer: {
    backgroundColor:'#333333',
    width:'100vw',
    height:'22px',
    
    },
    header: {
    padding: 10,
    paddingVertical: 5,
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 50
    },
    headerCenter: {
    flex: 1,
    order: 2
    },
    headerLeft: {
    order: 1,
    width: 80
    },
    headerRight: {
    order: 3,
    width: 80
    },
    title: {
    fontSize: 19,
    fontWeight: '600',
    textAlign: 'center',
    color: 'white'
    },
});

export default Header;
