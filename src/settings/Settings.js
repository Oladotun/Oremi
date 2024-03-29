import React, {Component} from 'react';
import{
  Text,
  StyleSheet,
  View,
  Image
} from 'react-native';
import SettingsList from 'react-native-settings-list';

export default class Settings extends Component {

  constructor(){
    super();
    this.onValueChange = this.onValueChange.bind(this);
    this.state = {switchValue: false};
  }

goToNextProfile = () => {
  console.log(this.props);
  this.props.navigator.push({name:'EditProfile',
                      title: 'Edit Profile',
                      openMenu: this.props.openMenu ,
                      closeMenu: this.props.closeMenu,
                      rightText: 'Save',
                      leftText: 'Back',
                        displayName : this.props.displayName,
                        userUid : this.props.userUid,
                        photoURL: this.props.photoURL,
                        updateName: this.props.updateName,
                        updateImage: this.props.updateImage
                    });
}
render() {
  var bgColor = '#DCE3F4';

  return (
    <View style={{backgroundColor:'#EFEFF4',flex:1}}>

      <View style={{borderBottomWidth:1, backgroundColor:'#f7f7f8',borderColor:'#c8c7cc'}}>
        <Text style={{alignSelf:'center',marginTop:30,marginBottom:10,fontWeight:'bold',fontSize:16}}>Settings</Text>
      </View>

      <View style={{backgroundColor:'#EFEFF4',flex:1}}>
        <SettingsList borderColor='#c8c7cc' defaultItemSize={50}>
          <SettingsList.Header headerText='Profile Information' headerStyle={{marginTop:15}}/>
          <SettingsList.Item
            icon={<Image style={{alignSelf:'center',marginLeft:20,height:40, width:40}} source={{uri:this.props.photoURL}}/>}
            title={this.props.displayName}
            onPress={() => this.goToNextProfile()}
          />

          <SettingsList.Header headerText='User Settings' headerStyle={{marginTop:15}}/>
          <SettingsList.Item
            icon={<Image style={{alignSelf:'center',marginLeft:20,height:40, width:40}} source={require('../images/notifications.png')}/>}
            title='Notifications'
            onPress={() => {}}
          />

        </SettingsList>




      </View>


    </View>
  );
}
onValueChange(value){
  this.setState({switchValue: value});
}
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,

  },

});
