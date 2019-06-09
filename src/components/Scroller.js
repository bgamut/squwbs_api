import React,{memo, Component} from 'react'
import {StyleSheet, Text, View, ScrollView,Dimensions} from 'react-native'
let screenWidth
class Scroller extends Component{
    render(){
        screenWidth=Dimensions.get('window').width;
        return(
            
            <ScrollView horizontal={true} style ={styles.contentContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View style={styles.container}> 
                    <Text style={styles.welcome}> sample text 1 </Text>
                </View>
                <View style={styles.container}> 
                    <Text style={styles.welcome}> sample text 2 </Text>
                </View>
                <View style={styles.container}> 
                    <Text style={styles.welcome}> sample text 3 </Text>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    contentContainer:{
        marginTop:50,
        paddingVertical:20,
        backgroundColor:'#F5FCFF'
    },
    container:{
        flex:1,
        marginTop:20,
        backgroundColor:'#F5F5F5',
        width:{screenWidth}
    },
    welcome:{
        flex:1,
        margin:20,
        backgroundColor:'orange',
        margin:10,
        textAlign:'center',
        fontSize:20,
        padding:100
    }
    


})
export default memo(Scroller)