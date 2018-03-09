import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Brightness, Gyroscope } from 'expo';

class Gyro extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gyroscopeData: {},
      thresholdPositive: 5,
      thresholdNegative: -5,
      hasDimmed: false,
      isDimmed: false,
    };
    // set this from props
    // const thresholdPositive = Math.abs(this.state.threshold);
    // console.log(thresholdPositive);
    // const thresholdNegative = -Math.abs(this.state.threshold);
    // console.log(thresholdNegative);

    // console.log('getBrightnessAsync()');
    // const getBrightness = Brightness.getBrightnessAsync().then((values) => {
    //   return values;
    // });
    // console.log('getBrightness');
    // console.log(getBrightness);
    // console.log('-----------');
    // console.log('getSystemBrightnessAsync()');
    // const br2 = await Brightness.getSystemBrightnessAsync();
    // const responses = async () => {
    //   // await Brightness.setBrightnessAsync(.6);
    //   // await Brightness.setSystemBrightnessAsync(.7);
    //   const br1 = await Brightness.getBrightnessAsync().then();
    //   const br2 = await Brightness.getSystemBrightnessAsync();
    //
    //   return {
    //     br1,
    //     br2
    //   }
    // };

    const makeRequest = async () => {
      const brightness = await Brightness.getBrightnessAsync();
      const initalBightness = await Brightness.getSystemBrightnessAsync();
      this.setState({
        brightness,
        initalBightness
      });
    }
    makeRequest();

    // console.log(this.state);
    // console.log(Brightness.getSystemBrightnessAsync());
    // var response = this._getSystem();
    // console.log(responses().br1);
    // console.log('++++++++++++++++++');
    // console.log('set Brightness to 0.2');
    // Brightness.setBrightnessAsync(0.2);
    // setTimeout(function(){
    //   console.log('set Brightness to 0.6');
    //   Brightness.setBrightnessAsync(0.6);
    // }, 2000);
    // setTimeout(function(){
    //   console.log('set Brightness to 1');
    //   Brightness.setBrightnessAsync(1);
    // }, 5000);
  }

  componentDidMount() {
    // this._toggle();
    this._unsubscribe();
    // console.log(this.props);
    Gyroscope.setUpdateInterval(1000);
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  componentWillReceiveProps() {
    console.log(this.props.active);
    Gyroscope.setUpdateInterval(1000);
    // if(this.props.active)
    if (this.props.active) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  }

  _toggle = () => {
    if (this._subscription) {
      this._unsubscribe();
    } else {
      this._subscribe();
    }
  }

  // _getSystem = () => {
  //   Brightness.getSystemBrightnessAsync().then((brightness) => {
  //     return brightness;
  //   });
  // }

  _slow = () => {
    Gyroscope.setUpdateInterval(1000);
  }

  _fast = () => {
    Gyroscope.setUpdateInterval(1000);
    // Gyroscope.setUpdateInterval(16);
  }

  _subscribe = () => {
    this._subscription = Gyroscope.addListener((result) => {
      this.setState({
        gyroscopeData: result
      });
      // let {
      //   x, y, z
      // } = this.state.gyroscopeData;
      // console.log(this.props.onUpdate(round(x)));
      // console.log(round(x));

      let { x } = this.state.gyroscopeData;

      // once we hit the threshold
      if (this.state.thresholdPositive < x) {
        // turn back on
        console.log(x);
        console.log('BRIGHT');
        console.log(this.state);
        Brightness.setBrightnessAsync(this.state.initalBightness);
        console.log('------------------');
      } else if (this.state.thresholdNegative > x) {
        // turn back on
        console.log(x);
        console.log('DIM');
        Brightness.setBrightnessAsync(0.1);
        console.log('------------------');
      }
    });
  }

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  }

  render() {
    let {
      x, y, z
    } = this.state.gyroscopeData;

    return (
      <View style={styles.sensor}>
        <Text>Gyroscope:</Text>
        <Text>x: {round(x)} y: {round(y)} z: {round(z)}</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._toggle} style={styles.button}>
            <Text>Toggle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._slow} style={[styles.button, styles.middleButton]}>
            <Text>Slow</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._fast} style={styles.button}>
            <Text>Fast</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function round(n) {
  if (!n) {
    return 0;
  }

  return Math.floor(n * 100) / 100;
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1
  // },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginTop: 15,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 10,
  },
  middleButton: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sensor: {
    // alignItems: 'stretch',
    // flex: 1,
    marginTop: 15,
    paddingHorizontal: 10,
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
  },
});

export default Gyro;
