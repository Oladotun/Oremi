import React, { Component, PropTypes } from 'react';
import { Image, Dimensions,Text,View,TouchableHighlight,StyleSheet,TouchableOpacity} from 'react-native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {database} from '../Config';
var {height, width} = Dimensions.get('window');

export default class EventBox extends Component {
  // Component prop types
  static propTypes = {
    eventObject: PropTypes.object.isRequired,
    openMenu: PropTypes.func.isRequired,
    closeMenu: PropTypes.func.isRequired
  }

  constructor(props){
    super(props);
    this.state = {
      currentEvent: null
    }

  }

  componentWillMount(){
    if(this.props.newMessage){
      console.log("trying to call notifCount");
      this.props.notifCount();
    }
  }


  loadValues =() =>{
    var self = this;
    // console(this.props);
    let eventObjectRef =  database.ref('events').child(this.props.dataLocation);
        eventObjectRef.once('value', function(snapshot) {
          // console('I am in console');
          // console(snapshot);
          // console(snapshot.val());
          self.setState({currentEvent:snapshot.val()}, () => {
              self.visitItem()
          });


        });

  }



  visitItem = () =>{
    // console("where is state");
    // console(this.state);
    if(this.state.currentEvent){
      // console(this.props);

      if (this.props.joinEvent){

        if(this.props.joinEvent === 'true'){
          this.props.navigator.push({
            name:'ViewEvent',
            title: 'Event Info',
            eventObject:this.state.currentEvent,
            openMenu: this.props.openMenu ,
            closeMenu: this.props.closeMenu,
            eventDataLocation: this.props.dataLocation,
            eventUserObject: this.props.eventObject,
            rightText: 'Join',
            leftIcon: <Icon name="ios-arrow-back" size={30} style={[{color:'#4A90E2'},{marginLeft:10}]}/>

        });
      } else {
        this.props.navigator.push({
          name:'ViewEvent',
          title: 'Event Info',
          eventObject:this.state.currentEvent,
          openMenu: this.props.openMenu ,
          closeMenu: this.props.closeMenu,
          eventDataLocation: this.props.dataLocation,
          eventUserObject: this.props.eventObject,
          rightText: 'Member Info',
          leftIcon: <Icon name="ios-arrow-back" size={30} style={[{color:'#4A90E2'},{marginLeft:10}]}/>

      });
      }




      } else {

        this.props.navigator.push({
          name:'ViewEvent',
          title: 'Event Info',
          eventObject:this.state.currentEvent,
          openMenu: this.props.openMenu ,
          closeMenu: this.props.closeMenu,
          eventDataLocation: this.props.dataLocation,
          userUid: this.props.userUid,
          photoURL: this.props.photoURL,
          displayName: this.props.displayName,
          rightText: 'Edit',
          leftIcon: <Icon name="ios-arrow-back" size={30} style={[{color:'#4A90E2'},{marginLeft:10}]}/>

      });

      }


    }

  }

  render() {
    const{eventObject,type} = this.props;
    var date = eventObject['event_time'];
    var imageUrl = eventObject['uploadURL'];
    var name = eventObject['event_title'];
    var formattedDate = moment(new Date(date)).format('DD MMM YYYY');
    return (
      <TouchableOpacity  onPress={() => this.loadValues()}>
      {
        (() => {
          try {
            if (!type){
            return(
              <View style={styles.touchContainer}>
                  <Image source={{uri:imageUrl}} style={styles.imageContainer}/>
                    <Text style = {styles.message}>{name}</Text>
                    <Text style={styles.dateMessage}>{formattedDate} </Text>
              </View>);

            }else {
              return(
                <View style={styles.searchTouchContainer}>
                    <Image source={{uri:imageUrl}} style={styles.imageSearchContainer}/>
                    <View style={styles.eventInfo}>
                      <Text style = {[styles.message, {width:width/1.27}]}>{name}</Text>
                      <View style={styles.dateAtEnd}>
                      <Text style={styles.dateMessage}>{formattedDate} </Text>
                      </View>

                    </View>

                </View>

              );
            }

          }catch(e){
            // console(e);
          }
        })()
      }
      </TouchableOpacity>




    );
}
}

const styles = StyleSheet.create({
  imageContainer: {
    width: width/2,
    height: height/8,
    backgroundColor: '#f0f8ff',


  },

  message: {
    fontSize: 20

  },
  dateMessage: {
    fontSize: 10

  },
  imageSearchContainer: {
    width: width/1.05,
    height: height/6,
    backgroundColor: '#f0f8ff',


  },
  touchContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginRight: 10,
    marginLeft: 10
  },
  searchTouchContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: '#ffffff',

  },
  eventInfo: {
    flexDirection: 'row'
  },
  dateAtEnd: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: '#ffffff',
  }

});
