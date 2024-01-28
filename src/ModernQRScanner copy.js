import React, { PureComponent } from "react";
import { RNCamera } from "react-native-camera";
import PropTypes from "prop-types";

import {
  StyleSheet,
  View,
  Text,
  Image,
  Vibration,
  Platform,
  PixelRatio,
  StatusBar
} from "react-native";

import ModernQRScannerView from "./ModernQRScannerView";
const pixelRatio = PixelRatio.get();

/**
 * Scan interface
 */
export default class ModernQRScanner extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scanning: false,
      barCodeSize: {}
    };
  }

  static defaultProps = {
    onRead: () => {},
    renderTopView: () => {},
    renderBottomView: () => (
      <View style={{ flex: 1, backgroundColor: "#0000004D" }} />
    ),
    rectHeight: 200,
    rectWidth: 200,
    flashMode: false, // Flashlight mode
    finderX: 0, // Viewfinder X-axis offset
    finderY: 0, // Viewfinder Y-axis offset
    zoom: 0.2, // Zoom range 0 - 1
    translucent: false,
    isRepeatScan: false,
    cameraType: "back",
    notAuthorizedView: () => (
      <View style={styles.authorizationContainer}>
        <Text style={styles.notAuthorizedText}>Camera not authorized</Text>
      </View>
    ),
    vibrate: true,
  };

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <RNCamera
          style={{
            flex: 1
          }}
          captureAudio={false}
          onBarCodeRead={this._handleBarCodeRead}
          androidCameraPermissionOptions={null}
          androidRecordAudioPermissionOptions={null}
          notAuthorizedView={this.props.notAuthorizedView()}
          barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
          flashMode={
            !this.props.flashMode
              ? RNCamera.Constants.FlashMode.off
              : RNCamera.Constants.FlashMode.torch
          }
          zoom={this.props.zoom}
          type={this.props.cameraType}
        >
          <View style={[styles.topButtonsContainer, this.props.topViewStyle]}>
            {this.props.renderTopView()}
          </View>
          <ModernQRScannerView
            maskColor={this.props.maskColor}
            cornerColor={this.props.cornerColor}
            borderColor={this.props.borderColor}
            rectHeight={this.props.rectHeight}
            rectWidth={this.props.rectWidth}
            borderWidth={this.props.borderWidth}
            cornerBorderWidth={this.props.cornerBorderWidth}
            cornerBorderLength={this.props.cornerBorderLength}
            cornerOffsetSize={this.props.cornerOffsetSize}
            isCornerOffset={this.props.isCornerOffset}
            bottomHeight={this.props.bottomHeight}
            scanBarAnimateTime={this.props.scanBarAnimateTime}
            scanBarColor={this.props.scanBarColor}
            scanBarHeight={this.props.scanBarHeight}
            scanBarMargin={this.props.scanBarMargin}
            hintText={this.props.hintText}
            hintTextStyle={this.props.hintTextStyle}
            scanBarImage={this.props.scanBarImage}
            hintTextPosition={this.props.hintTextPosition}
            isShowScanBar={this.props.isShowScanBar}
            finderX={this.props.finderX}
            finderY={this.props.finderY}
            returnSize={this.barCodeSize}
          />
          <View
            style={[styles.bottomButtonsContainer, this.props.bottomViewStyle]}
          >
            {this.props.renderBottomView()}
          </View>
        </RNCamera>
      </View>
    );
  }

  isShowCode = false;

  barCodeSize = size => this.setState({ barCodeSize: size });

  returnMax = (a, b) => (a > b ? a : b);

  returnMin = (a, b) => (a < b ? a : b);

  iosBarCode = e => {
    let x = Number(e.bounds.origin.x);
    let y = Number(e.bounds.origin.y);
    let width = e.bounds.size.width;
    let height = e.bounds.size.height;
    let viewMinX = this.state.barCodeSize.x - this.props.finderX;
    let viewMinY = this.state.barCodeSize.y - this.props.finderY;
    let viewMaxX =
      this.state.barCodeSize.x +
      this.state.barCodeSize.width -
      width -
      this.props.finderX;
    let viewMaxY =
      this.state.barCodeSize.y +
      this.state.barCodeSize.height -
      height -
      this.props.finderY;
    if (x > viewMinX && y > viewMinY && x < viewMaxX && y < viewMaxY) {
      if (this.props.isRepeatScan) {
        if (this.props.vibrate) {
          Vibration.vibrate();
        }
        this.props.onRead(e);
      } else {
        if (!this.isShowCode) {
          this.isShowCode = true;
          if (this.props.vibrate) {
            Vibration.vibrate();
          }
          this.props.onRead(e);
        }
      }
    }
  };

  androidBarCode = e => {
  
    if (this.props.isRepeatScan) {
      Vibration.vibrate();
      this.props.onRead(e);
    } else {
      if (!this.isShowCode) {
        this.isShowCode = true;
        Vibration.vibrate();
        this.props.onRead(e);
      }
    }
  };

  _handleBarCodeRead = e => {
    switch (Platform.OS) {
      case "ios":
        this.iosBarCode(e);
        break;
      case "android":
        this.androidBarCode(e);
        break;
      default:
        break;
    }
  };
}

const styles = StyleSheet.create({
  topButtonsContainer: {
    position: "absolute",
    height: 100,
    top: 0,
    left: 0,
    right: 0
  },
  bottomButtonsContainer: {
    position: "absolute",
    height: 100,
    bottom: 0,
    left: 0,
    right: 0
  },
  authorizationContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  notAuthorizedText: {
    textAlign: "center",
    fontSize: 16
  }
});

ModernQRScanner.propTypes = {
  isRepeatScan: PropTypes.bool,
  onRead: PropTypes.func,
  maskColor: PropTypes.string,
  borderColor: PropTypes.string,
  cornerColor: PropTypes.string,
  borderWidth: PropTypes.number,
  cornerBorderWidth: PropTypes.number,
  cornerBorderLength: PropTypes.number,
  rectHeight: PropTypes.number,
  rectWidth: PropTypes.number,
  isCornerOffset: PropTypes.bool, //Whether the corners are offset
  cornerOffsetSize: PropTypes.number,
  bottomHeight: PropTypes.number,
  scanBarAnimateTime: PropTypes.number,
  scanBarColor: PropTypes.string,
  scanBarImage: PropTypes.any,
  scanBarHeight: PropTypes.number,
  scanBarMargin: PropTypes.number,
  hintText: PropTypes.string,
  hintTextStyle: PropTypes.object,
  hintTextPosition: PropTypes.number,
  renderTopView: PropTypes.func,
  renderBottomView: PropTypes.func,
  isShowScanBar: PropTypes.bool,
  topViewStyle: PropTypes.object,
  bottomViewStyle: PropTypes.object,
  flashMode: PropTypes.bool,
  finderX: PropTypes.number,
  finderY: PropTypes.number,
  zoom: PropTypes.number,
  translucent: PropTypes.bool,
  cameraType: PropTypes.string,
  vibrate: PropTypes.bool,
};