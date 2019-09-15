//modified from
//https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator ,Image} from "react-native";
//import { List, ListItem, SearchBar } from "react-native-elements";

class DefaultFlatList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      error: null,
      loading: false,
      page: 1,
      refreshing: false,
      seed: 1,
    };
  }

  UNSAFE_componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    const { page, seed } = this.state;
    const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: page === 1 ? res.results : [...this.state.data, ...res.results],
          error: res.error || null,
          loading: false,
          refreshing: false
        });
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  handleRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
        seed: this.state.seed + 1,
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          backgroundColor: "#CED0CE",
          height: 1,
          marginLeft: "14%",
          width: "86%",
        }}
      />
    );
  };

  renderHeader = () => {
    return <View><Text> note </Text></View>;
  };

  renderFooter = () => {
    if (!this.state.loading) {
      return null;
    }
    return (
      <View
        style={{
          borderColor: "#CED0CE",
          borderTopWidth: 1,
          paddingVertical: 20,
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <View style={{ 
        borderBottomWidth: 0, 
        borderTopWidth: 0, 
        }}>
        
           
            <FlatList
              
              data={this.state.data}
              renderItem={({ item }) => (
                <View 
                  style={{
                    flex:1,
                    flexDirection:'row'
                  }}
                >
                  <View>
                  <Image
                    style={{height: 50,width: 50}}
                    source={{uri: item.picture.thumbnail}}
                  />
                  </View>
                  <View>
                  <Text>
                    {String(item.name.first) +" " +String(item.name.last)}
                  </Text>
                  <Text>
                    {item.email}
                  </Text>
                  </View>
                </View>
              )}
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          //ListHeaderComponent={this.renderHeader}
          //ListFooterComponent={this.renderFooter}
          scrollEventThrottle={16}
          onRefresh={this.handleRefresh}
          refreshing={this.state.refreshing}
          //onEndReached={this.handleLoadMore}
          onEndReachedThreshold={50}
        />
      </View>
    );
  }
}

export default DefaultFlatList;
