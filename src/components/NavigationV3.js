import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
//import Icon from '@expo/vector-icons/Ionicons';
/**
 * - AppSwitchNavigator
 *    - WelcomeScreen
 *      - Login Button
 *      - Sign Up Button
 *    - AppDrawerNavigator
 *          - Dashboard - DashboardStackNavigator(needed for header and to change the header based on the                     tab)
 *            - DashboardTabNavigator
 *              - Tab 1 - FeedStack
 *              - Tab 2 - ProfileStack
 *              - Tab 3 - SettingsStack
 *            - Any files you don't want to be a part of the Tab Navigator can go here.
 */

import {
  createSwitchNavigator,
  createAppContainer,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';
class NavigationV3 extends Component {
  render() {
    return <AppContainer />;
  }
}
export default NavigationV3;

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Dashboard')}
        />
        <Button title="Sign Up" onPress={() => alert('button pressed')} />
      </View>
    );
  }
}

class DashboardScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>DashboardScreen</Text>
      </View>
    );
  }
}

class Feed extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Feed</Text>
      </View>
    );
  }
}

class Settings extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Settings</Text>
      </View>
    );
  }
}

class Profile extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile</Text>
      </View>
    );
  }
}

const DashboardTabNavigator = createBottomTabNavigator(
  {
    Feed,
    Profile,
    Settings
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  }
);
const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Button
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Dashboard: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});



        // <View style={{backgroundColor:'transparent',flexDirection:'column',margin:0,padding:0}}>
        //     <View>
              
        //       <SwipeableScroller>
        //       <View style={{backgroundColor:'transparent',flex:1,flexDirection:'column',margin:5,paddingRight:2,paddingLeft:2}}>

        //         <View  style={{height:Dimensions.get('window').height/6,backgroundColor:'transparent'}}>

        //           <Swiper buttonsEnabled={false} loop={true} autoplayTimeout={5}>
        //             <View style={{
        //               flex: 1,
        //               alignItems: "center",
        //               justifyContent: "center",
        //               backgroundColor: "rgb(20,20,20)"
        //               }}>
        //                 <Text>Slide 1</Text>
        //             </View>
        //             <View style={{
        //               flex: 1,
        //               alignItems: "center",
        //               justifyContent: "center",
        //               backgroundColor: "rgb(110,110,110)"
        //             }}>
        //                 <Text>Slide 2</Text>
        //             </View>
        //             <View style={{
        //               flex: 1,
        //               alignItems: "center",
        //               justifyContent: "center",
        //               backgroundColor: "rgb(200,200,200)"
        //             }}>
        //                 <Text>Slide 3</Text>
        //             </View>
        //           </Swiper>
        //         </View>

        //         </View>
        //         <View>
        //         <SwipeableList/>
        //         </View>
        //       </SwipeableScroller>
        //       <KeyboardAvoidingView style={{height:Dimensions.get('window').height/15+50,backgroundColor:'transparent',flexDirection:'column',margin:5}} behavior="padding" enabled>
        //         <View style={{backgroundColor:'transparent',height:30,felxDirection:'column',alignItems:'center',justifyContent:'center'}}>
        //           <AddPost style={{marginTop:15,marginRight:10,marginLeft:10}}/>
        //         </View>
     
        //         <ScrollView horizontal = {true} style={{height:Dimensions.get('window').height/15,backgroundColor:'transparent',flexDirection:'row',marginLeft:15,marginRight:15}}>
        //           <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'white',flex:1,flexDirection:'column',marginRight:2,marginLeft:3}}>
        //             <Text selectable={false}>one</Text>
        //           </View>
        //           <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'lightgrey',flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
        //             <Text selectable={false}>two</Text>
        //           </View>
        //           <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'darkgrey',flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
        //             <Text selectable={false}>three</Text>
        //           </View>
        //           <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'black',flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
        //             <Text selectable={false}>four</Text>
        //           </View>
        //           <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'white', flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
        //             <Text selectable={false}>one</Text>
        //           </View>
        //           <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'lightgrey',flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
        //             <Text selectable={false}>two</Text>
        //           </View>
        //           <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'darkgrey',flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
        //             <Text selectable={false}>three</Text>
        //           </View>
        //           <View style={{height:Dimensions.get('window').height/15,width:(Dimensions.get('window').height)/12,backgroundColor:'black',flex:1,flexDirection:'column',marginRight:2,marginLeft:2}}>
        //             <Text selectable={false}>four</Text>
        //           </View>
        //         </ScrollView>
               
        //       </KeyboardAvoidingView>
        //     </View> 
              
        //   </View>