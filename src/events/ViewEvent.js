import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  Dimensions,
  ScrollView
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import FontIcon from 'react-native-vector-icons/FontAwesome';
import Colors from '../styles/colors';
import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import {database} from '../Config';
import ChatGroupInfo from '../chat/ChatGroupInfo'

var {height, width} = Dimensions.get('window');

export default class ViewEvent extends Component{
  static propTypes = {
    eventObject:  PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
    this.state = {
      attending: 'Going',
      color: '#a9a9a9',
      websiteColor: '#a9a9a9',
      goingColor: '#a9a9a9',
      shareColor: '#a9a9a9',
      index: 0,
      routes: [
      { key: '1', title: 'Chat' },
      { key: '2', title: 'Attending (' + this.props.eventObject.attendingCount + ')'},
      ],
      chatgroup: []

    }
  }

  componentWillMount(){
    // this.getChatInfo();
  }

  // getChatInfo = () => {
  //   var self = this;
  //   if (this.props.eventObject.subgroup){
  //       var chatRef = database.ref('eventSubGroup').child(this.props.eventObject.subgroup);
  //       var chatgrouplist = [];
  //       chatgrouplist.push(  <ChatGroupInfo key={this.props.eventDataLocation} style={[ styles.page, { backgroundColor: '#ff4081' } ]} channel={this.props.eventObject}/>);
  //
  //       chatRef.once('value', function(snapshot){
  //         var channel = snapshot.val();
  //         chatgrouplist.push(<ChatGroupInfo key={self.props.eventObject.subgroup} style={[ styles.page, { backgroundColor: '#ff4081' } ]} channel={channel} >);
  //           self.setState({chatgroup : chatgrouplist});
  //
  //           return chatgrouplist;
  //       });
  //   } else {
  //     var chatgrouplist = [];
  //     chatgrouplist.push(<ChatGroupInfo key={this.props.eventDataLocation} style={[ styles.page, { backgroundColor: '#ff4081' } ]} channel={this.props.eventObject}/>);
  //     self.setState({chatgroup: chatgrouplist});
  //     return chatgrouplist;
  //   }
  //
  //
  //
  //
  // }


  goingToggle = () => {
    // console("going");
    // this.setState({attending: })
    this.setState({shareColor:'#a9a9a9',goingColor:'#488CE2',websiteColor:'#a9a9a9'});
  }
  websiteToggle =() => {
    this.setState({shareColor:'#a9a9a9',goingColor:'#a9a9a9',websiteColor:'#488CE2'});

  }
  shareToggle = () => {
    this.setState({shareColor:'#488CE2',goingColor:'#a9a9a9',websiteColor:'#a9a9a9'});

  }

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return <TabBar scrollEnabled={true} {...props} />;
  };

  _renderScene = ({ route }) => {
    switch (route.key) {
    case '1':
    return <ChatGroupInfo key={this.props.eventDataLocation} navigator={this.props.navigator}
    route={this.props.route} eventUid={this.props.eventDataLocation}
    userUid= {this.props.userUid} callingFrom = {'viewPage'}
    displayName={this.props.displayName} photoURL={this.props.photoURL}
    style={[ styles.page, { backgroundColor: '#ff4081' } ]} channel={this.props.eventObject}/>;

      // return this.state.chatgrouplist;
    case '2':
      return <View style={[ styles.page, { backgroundColor: '#673ab7' } ]} />;
    default:
      return null;
    }
  };

  render(){
    var eventObject = null;
    eventObject = this.props.eventObject;


    // const{eventObject} = this.props;
    var newObject = {
      event_title: '',
      event_time : '',
      event_website : '',
     is_event_private: false,
     place :{name:'TBD',address:''},
     uploadURL : '',
     user_per_groupchat : '',
     event_category : '',
     event_description : '',
     hosted_name: 'unknown'

   };
    // var event_title = '';
    // var event_time = '';
    // var is_event_private = false;
    // var place = null;
    // var uploadURL = '';
    // var user_per_groupchat = '';
    // var event_category = '';
    // var event_description = '';

    Object.keys(eventObject).forEach(function(key) {
      newObject[key] = eventObject[key];
      // console("I am copying");
      // console(newObject[key]);
    });
    var date = newObject['event_time'];
    var formattedDate = moment(new Date(date)).format('DD MMM YYYY');


    return (
      <View style={styles.container}>
      <Image
      style={styles.imageContainer}
        source={{ uri: newObject['uploadURL'] }}>

      </Image>
      <View style={styles.goingViewInfo}>
      </View>



      <View style = {styles.infoView}>
      <Icon name="ios-pricetag" size={20} style={{color:this.state.color}}/>
      <View style ={[styles.subViewInfo, {marginLeft:30}]}>
        <Text style={styles.titleMessage}>{newObject['event_title']}</Text>
        <Text style={[styles.message,{color:'#a9a9a9'}]}>Hosted by {newObject['host_name']}</Text>
      </View>

      </View>

      <View style = {styles.infoView}>
      <Icon name="ios-calendar-outline" size={20} style={{color:this.state.color}}/>
      <View style ={[styles.subViewInfo, {marginLeft:30}]}>
        <Text style={{fontSize: 15}}>{formattedDate}</Text>

      </View>

      </View>


      <View style = {styles.infoView}>
      <FontIcon name="map-marker" size={20} style={{color:this.state.color}}/>
      <View style ={[styles.subViewInfo, {marginLeft:30}]}>
        <Text style={{fontSize: 15}}>{newObject['place'].name}</Text>
        <Text style={[{fontSize: 10},{color:'#a9a9a9'}]}>{newObject['place'].address}</Text>

      </View>

      </View>









      </View>

    );

    // {
    //   (() => {
    //     if(this.props.joinEvent === 'true') {
    //       <TabViewAnimated
    //         style={{flex:1}}
    //         navigationState={this.state}
    //         renderScene={this._renderScene}
    //         renderHeader={this._renderHeader}
    //         onRequestChangeTab={this._handleChangeTab}
    //       />
    //     }
    //
    //   })()
    // }
    // Todo going info and stuffs
    // <View style={styles.iconView}>
    //   <View style={styles.goingViewInfo}>
    //   <TouchableOpacity style={[{alignItems: 'center'},{justifyContent: 'center'}]}
    //   onPress={ () => this.goingToggle()}
    //   >
    //     <View style={[{flexDirection: 'row'},{alignItems: 'center'} ,{justifyContent:'space-between'}]}>
    //       <Icon name="md-checkmark" size={30} style={{color:this.state.goingColor}}/>
    //       <Icon name="ios-arrow-dropdown" size={15} style={{marginTop:5},{color:this.state.goingColor}}/>
    //     </View>
    //       <Text style={[styles.message,{color:this.state.goingColor}]}>{this.state.attending}</Text>
    //   </TouchableOpacity>
    //
    //   </View>
    //
    //   <View style={styles.goingViewInfo}>
    //     <TouchableOpacity style={[{alignItems: 'center'},{justifyContent: 'center'}]}
    //     onPress={ () => this.websiteToggle()}>
    //       <Icon name="ios-globe-outline" size={30} style={{color:this.state.websiteColor}}/>
    //       <Text style={[styles.message,{color:this.state.websiteColor}]}>Website</Text>
    //     </TouchableOpacity>
    //   </View>
    //
    //   <View style={styles.goingViewInfo}>
    //     <TouchableOpacity style={[{alignItems: 'center'},{justifyContent: 'center'}]}
    //     onPress={ () => this.shareToggle()}>
    //       <Icon name="ios-share" size={30} style={{color:this.state.shareColor}}/>
    //       <Text style={[styles.message,{color:this.state.shareColor}]}>Share</Text>
    //     </TouchableOpacity>
    //   </View>
    //
    // </View>
  }
}



const styles = StyleSheet.create({
  message: {
    fontSize: 15

  },
  titleMessage:{
    fontSize: 25,
  }
  ,
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  }
  ,
  iconView:{
    flexDirection: 'row',
    justifyContent: 'space-between',


  },
  container: {
    flex:1,

  },
  page: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  subViewInfo: {
    flexDirection: 'column',
    justifyContent: 'center'
  }
  ,
  goingViewInfo: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15

  }
  ,
  imageContainer: {
    backgroundColor: Colors.blue,
    width: width,
    height: height/5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
