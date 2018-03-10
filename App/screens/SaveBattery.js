import React, { Component } from 'react';
import { Switch, Text, View } from 'react-native';

// components
import Gyro from '../components/Gyro';

// TODO functionality so the keyboard never covers the input.

class SaveBattery extends Component {
  constructor(props) {
    super(props);
    // console.log('hello');

    this.state = {
      saveBattery: false,
    };

    this.onSwitch = this.onSwitch.bind(this);
    this.onGyroUpdate = this.onGyroUpdate.bind(this);
  }

  onSwitch(){
    // console.log('SaveBattery :: onSwitch()');
    this.setState({
      saveBattery: !this.state.saveBattery
    }, () => {
      if (this.state.saveBattery) {
        // console.log('on');
      } else {
        // console.log('off');
      }
    });
  }

  onGyroUpdate(x){
    console.log('SaveBattery :: onGyroUpdate()');
    console.log(x);
    console.log('--------------');
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Switch
          onValueChange={this.onSwitch}
          value={this.state.saveBattery}
        />
        <Gyro
          active={this.state.saveBattery}
          onUpdate={this.onGyroUpdate}
        />
      </View>
    );
  }
}

export default SaveBattery;
