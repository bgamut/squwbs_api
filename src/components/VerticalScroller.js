import React , {Component, useContext} from 'react'
import {View, Text, FlatList,ActivityIndicator,StyleSheet,Dimensions} from 'react-native'
import {WholeContext} from "../WholeContext"
import HorizontalScroller from './HorizontalScroller'
//import {List,ListItem,SearchBar} from "react-native-elements"
var screenHeight=0
const styles = StyleSheet.create({
    container: {
    flex: 1,
    paddingTop: 22,
    borderTopWidth: 0, 
    borderBottomWidth: 0,
    width:'100vw',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  })
class VerticalScroller extends Component{
    

    static contextType = WholeContext;
    
    state = {
        loading:false,
        date:[],
        page:1,
        seed:1,
        error:null,
        refreshing:false,
        perpage:50,
        height:0,
        yScroll:0
    };

    makeRemoteRequest = ()=>{
        const {page, seed,perpage} = this.state
        const url=`https://randomuser.me/api/?seed=${seed}&page=${page}&results=${perpage}`
        this.setState({loading:true})
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
    }
    updateDimensions =(e) =>{
        this.setState(
            {
                height: Math.floor(
                    Dimensions.get('window').height-100
                )
            }
        )
    }
    UNSAFE_componentDidMount=()=>{
        this.makeRemoteRequest();
        //console.log('componenet mounted' +Math.floor(Dimensions.get('window').height/3))
        window.addEventListener("resize", this.updateDimensions);
        window.addEventListener("orientationchange",this.updateDimensions);
        //this.setState({ height: Math.floor(Dimensions.get('window').height/3)});
        
    }
    UNSAFE_componentWillMount=()=>{
        //this.setState({ screenHeight: Dimensions.get('window').height});
        //console.log('componenet updated' +this.state.screenHeight)
        this.updateDimensions();
    }
    UNSAFE_componentWillUnmount=()=>{
        window.removeEventListener("resize", this.updateDimensions);
        window.removeEventListener("orientationchange",this.updateDimensions);
    }
    handleRefresh=()=>{
        this.setState(
            {
                page:1,
                seed:this.state.seed+1,
                refreshing:true
            },
            ()=>{
                this.makeRemoteRequeset();
            }
        )
    }
    handleLoadMore=()=>{
        this.setState(
            {
                page:this.state.page+1

            },
            ()=>{
                this.makeRemoteRequest();
            }
        )
    }
    renderSeparator=()=>{
        return(
            <View
                style={{
                    height:1,
                    width:"86%",
                    backgroundColor:"#CED0CE",
                    marginLeft:"14%"
                }}
            />
        )
    }
    renderHeader = () =>{
        return < input value="Type Here..."/>
    }
    renderFooter = () => {
        if (!this.state.loading) return null;
    
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: "#CED0CE"
            }}
          >
            <ActivityIndicator animating size="large" />
          </View>
        );
      };
    handleScroll=(e)=>{
        const {obj, dispatch } = this.context;
        const { yScroll } = this.state
        //console.log(e.nativeEvent.contentOffset.y)
        this.setState({yScroll:e.nativeEvent.contentOffset.y})
        dispatch({yScroll,type: "Y_SCROLLED"} )
    }
    render=() =>{
    // return (
    //     <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
    //     <FlatList
    //         data={this.state.data}
    //         renderItem={({ item }) => (
    //         <ListItem
    //             roundAvatar
    //             title={`${item.name.first} ${item.name.last}`}
    //             subtitle={item.email}
    //             avatar={{ uri: item.picture.thumbnail }}
    //             containerStyle={{ borderBottomWidth: 0 }}
    //         />
    //         )}
    //         keyExtractor={item => item.email}
    //         ItemSeparatorComponent={this.renderSeparator}
    //         ListHeaderComponent={this.renderHeader}
    //         ListFooterComponent={this.renderFooter}
    //         onRefresh={this.handleRefresh}
    //         refreshing={this.state.refreshing}
    //         onEndReached={this.handleLoadMore}
    //         onEndReachedThreshold={50}
    //     />
    //     </List>
    // );
    //} 
        const { data } = this.state;
        
        //const {containerStyle ,itemStyle } = this.styles
        //screenHeight=Math.floor(Dimensions.get('window').height/2)
        //console.log(styles.container)
        
        return (
            
            <View style={{
                
                    ...styles.container,
                    height:this.state.height
    
                }}>
            <HorizontalScroller/>
            <FlatList
                data={data}
                showsHorizontalScrollIndicator={false}
                onScroll={
                    this.handleScroll
                    
                }
                renderItem={({ item }) => 
                    <div>
                        <Text style={styles.item}>{item.name.first} {item.name.last}</Text>
                        <Text style={styles.item}>{item.email}</Text>
                    </div>
                }
                
            />

            </View>
        )
    }  
}

export default React.memo(VerticalScroller)