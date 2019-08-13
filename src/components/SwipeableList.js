//modified from
//https://medium.com/react-native-development/how-to-use-the-flatlist-component-react-native-basics-92c482816fe6
import React, { Component,pureComponent,memo ,useContext,useEffect} from "react";
import { View, Text, FlatList, ActivityIndicator ,Image, LayoutAnimation,UIManager} from "react-native";
import SwipeableCard from "./SwipeableCard";

//import { List, ListItem, SearchBar } from "react-native-elements";
import { Context } from "../context";
// import SortableListView from 'react-native-sortable-listview'

// class DefaultFlatList extends Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       loading: false,
//       data: [],
//       page: 1,
//       seed: 1,
//       error: null,
//       refreshing: false,
//       closedIndices:[],
//       index:0
//     };
//   }

//   componentDidMount() {
//     this.makeRemoteRequest();
//     UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  
//   }

//   makeRemoteRequest = () => {
//     const { page, seed } = this.state;
//     const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
//     this.setState({ loading: true });

//     fetch(url)
//       .then(res => res.json())
//       .then(res => {
//         //console.log(res.results)
//         var copy =[...res.results]
//         var indexed =[]
//         for (var i =0; i<copy.length;i++){
//           indexed[i]={...copy[i],index:i}
//         }
//         console.log(indexed)
//         this.setState({
//           //data: page === 1 ? res.results : [...this.state.data, ...res.results],
//           data:[...this.state.data,...indexed],
//           error: res.error || null,
//           loading: false,
//           refreshing: false
//         });
//       })
//       .catch(error => {
//         this.setState({ error, loading: false });
//       });
      
//   };

//   handleRefresh = () => {
//     this.setState(
//       {
//         page: 1,
//         seed: this.state.seed + 1,
//         refreshing: true
//       },
//       () => {
//         this.makeRemoteRequest();
//       }
//     );
//   };

//   handleLoadMore = () => {
//     this.setState(
//       {
//         page: this.state.page + 1
//       },
//       () => {
//         this.makeRemoteRequest();
//       }
//     );
//   };

//   renderSeparator = () => {
//     return (
//       <View
//         style={{
//           height: 1,
//           width: "86%",
//           backgroundColor: "#CED0CE",
//           marginLeft: "14%"
//         }}
//       />
//     );
//   };

//   renderHeader = () => {
//     return <View><Text> note </Text></View>;
//   };

//   renderFooter = () => {
//     if (!this.state.loading) return null;

//     return (
//       <View
//         style={{
//           paddingVertical: 20,
//           borderTopWidth: 1,
//           borderColor: "#CED0CE"
//         }}
//       >
//         <ActivityIndicator animating size="large" />
//       </View>
//     );
//   };
//   shouldRender(index) {
//     return this.state.closedIndices.indexOf(index) === -1
//     LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
//   }
  
//   render() {
//     // var filtered=[]
//     // for (var i = 0; i<this.state.data.length; i++){
//     //     filtered.push({...this.state.data[i],index:i})
//     // }
//     // this.setState({...this.state,data:filtered})
//     if(this.state.loading==true||this.state.refreshing){
//       return (
//         <ActivityIndicator animating size="large" color/>
//       )
//     }
//     else{
//       return (
        
//         <View style={{ 
//           borderTopWidth: 0, 
//           borderBottomWidth: 0, 
//           }}>
         
             
//               <FlatList
                
//                 data={this.state.data}
//                 renderItem={({ item }) => (
//                   // <View 
//                   //   style={{
//                   //     flex:1,
//                   //     flexDirection:'row'
//                   //   }}
//                   // >
//                   //   <View>
//                   //   <Image
//                   //     style={{width: 50, height: 50}}
//                   //     source={{uri: item.picture.thumbnail}}
//                   //   />
//                   //   </View>
//                   //   <View>
//                   //   <Text>
//                   //     {String(item.name.first) +" " +String(item.name.last)}
//                   //   </Text>
//                   //   <Text>
//                   //     {item.email}
//                   //   </Text>
//                   //   </View>
//                   // </View>
                  
                  
//                   //https://stackoverflow.com/questions/53655722/react-native-flatlist-conditional-rendering
//                   //flatlist seems to not support conditional rendering
  
//                   // <SwipeableCard title={String(item.name.first) +" " +String(item.name.last)} onDismiss={() => {
//                   <SwipeableCard index={item.index} name_first={String(item.name.first)} name_last = {String(item.name.last)} picture={item.picture.thumbnail} email={item.email}  onDismiss={() => { 
//                     // if ([...new Array(this.state.data.length)].slice(i + 1, this.state.data.length).some(this.shouldRender)) {
//                     //   LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
//                     // }
                    
//                     //LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
//                     // var filtered=this.state.data.filter(function(value, index, arr){
//                     //   console.log(value)
//                     //   return value.index != index;
//                     // });
//                     this.setState({
//                       ...this.state,
//                       refreshing:true
//                     })
//                     var filtered= []
                    
//                     for (var i = 0; i<this.state.data.length; i++){
//                       if(item.index!=i){
//                         filtered.push({...this.state.data[i],index:i})
//                       }
         
//                     }
//                     this.setState({
//                       //closedIndices: [...this.state.closedIndices, i]
//                       ...this.state,
//                       data:[...filtered]
//                     })
//                     this.setState({
//                       ...this.state,
//                       refreshing:false
//                     })
//                     // filtered=[]
//                     // for (var i = 0; i<this.state.data.length; i++){
                      
//                     //   filtered.push(this.state.data[i].name.first)
                      
//                     // }
//                     //console.log(filtered)
//                     //this.forceUpdate()
//                     //console.log(this.state.data)
//                   }}/>
//                 )}
//             keyExtractor={item => item.index}
//             //ItemSeparatorComponent={this.renderSeparator}
//             //ListHeaderComponent={this.renderHeader}
//             //ListFooterComponent={this.renderFooter}
//             scrollEventThrottle={16}
//             onRefresh={this.handleRefresh}
//             refreshing={this.state.refreshing}
//             //onEndReached={this.handleLoadMore}
//             onEndReachedThreshold={50}
//           />
//         </View>
//       );
//     }
    
//   }
// }

// export default DefaultFlatList;



const DefaultFlatList =(props)=> {
  const [state, setState] = useContext(Context);

  useEffect(()=>{
    
    const makeRemoteRequest = (seed,page) => {
        const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        //setState({ loading: true });
    
        fetch(url)
          .then(res => res.json())
          .then(res => {
            //console.log(res.results)
            var copy =[...res.results]
            var indexed =[]
            for (var i =0; i<copy.length;i++){
              indexed[i]={...copy[i],index:i}
            }
          
            setState({
              //data: page === 1 ? res.results : [...state.data, ...res.results],
              ...state,
              data:[...state.data,...indexed],
              filteredData:[...state.data,...indexed],
              error: false,
              loading: false,
              refreshing: false
            });
          })
          .catch(error => {
            setState({ ...state,error:true, loading: false });
          });
        console.log(state.data)    
    };
    // console.log('useEffect fired in defaultFlatlist')
    const { seed, page } = state;
    if(state.loading==true){
      var data = makeRemoteRequest(seed,page)
      setState({...state,data:data})
      console.log('if part fired')
    }
    else{
      console.log(state.data)
      console.log('else part is fired')
    }
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
  },[])
  
  

  

  const handleRefresh = () => {
    // setState(
    //   {
    //     ...state,
    //     page: 1,
    //     seed: state.seed + 1,
    //     refreshing: true
    //   },
    //   () => {
    //     //makeRemoteRequest();
    //   }
    // );
    console.log('refresh fired')
  };

  const handleLoadMore = () => {
    setState(
      {
        page: state.page + 1
      },
      () => {
        //makeRemoteRequest();
      }
    );
  };

  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  const renderHeader = () => {
    return <View><Text> note </Text></View>;
  };

  const renderFooter = () => {
    if (!state.loading) return null;

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
  const shouldRender=(index)=> {
    return state.closedIndices.indexOf(index) === -1
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }
  
  
    // var filtered=[]
    // for (var i = 0; i<state.data.length; i++){
    //     filtered.push({...state.data[i],index:i})
    // }
    // setState({...state,data:filtered})
  // if(state.loading==true||state.refreshing){
  //     return (
  //       <ActivityIndicator animating size="large" color/>
  //     )
  //   }
  
  // else{
    
      return (
        <View style={{ 
          borderTopWidth: 0, 
          borderBottomWidth: 0, 
          margin:0
          }}>
              <FlatList 
                data={state.data}
                renderItem={({ item }) => (
                  // <SwipeableCard index={item.index} name_first={String(item.name.first)} name_last = {String(item.name.last)} picture={item.picture.thumbnail} email={item.email} onDismiss={dismiss(item.index)}/>
                  <View>
                    <SwipeableCard index={String(item.index)} name_first={String(item.name.first)} name_last = {String(item.name.last)} picture={item.picture.large} email={item.email}/>
                  </View>
                )}
              keyExtractor={item => item.index}
              //ItemSeparatorComponent={renderSeparator}
              //ListHeaderComponent={renderHeader}
              //ListFooterComponent={renderFooter}
              
              scrollEventThrottle={1}
              //onRefresh={handleRefresh}
              //refreshing={state.refreshing}
              //onEndReached={handleLoadMore}
              onEndReachedThreshold={20}
              scrollEnabled={true}
              
              scrollEventThrottle={16}
              showsVerticalScrollIndicator={false}
          />
        </View>
      );
    //}
    
  
}


export default DefaultFlatList