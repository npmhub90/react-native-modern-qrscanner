import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';

class QrcodeScanner extends Component {
  onBarCodeRead = (e) => {
    if (this.props.onScan) {
      this.props.onScan(e);
    }
  };

  render() {
    const { style, cameraProps } = this.props;

    return (
      <View style={[styles.container, style]}>
        <RNCamera
          style={StyleSheet.absoluteFill}
          onBarCodeRead={this.onBarCodeRead}
          {...cameraProps}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

QrcodeScanner.propTypes = {
  onScan: PropTypes.func,
  style: PropTypes.object,
  cameraProps: PropTypes.object,
};

QrcodeScanner.defaultProps = {
  style: {},
  cameraProps: {},
};

export default QrcodeScanner;
