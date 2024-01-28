import React, { PureComponent } from "react";
import { RNCamera } from "react-native-camera";
import { StyleSheet, View, Text, Image, Vibration, Platform, PixelRatio, StatusBar } from "react-native";
import ModernQRScannerView from "./ModernQRScannerView";

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
    flashMode: false, 
    finderX: 0,
    finderY: 0, 
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

  renderCamera = () => (
    <RNCamera
      style={styles.cameraStyle}
      captureAudio={false}
      onBarCodeRead={this._handleBarCodeRead}
      androidCameraPermissionOptions={null}
      androidRecordAudioPermissionOptions={null}
      notAuthorizedView={this.props.notAuthorizedView()}
      barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
      flashMode={this.props.flashMode ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
      zoom={this.props.zoom}
      type={this.props.cameraType}
    >
      {this.renderCameraContent()}
    </RNCamera>
  );

  renderCameraContent = () => (
    <>
      <View style={[styles.topButtonsContainer, this.props.topViewStyle]}>
        {this.props.renderTopView()}
      </View>
      <ModernQRScannerView {...this.props} returnSize={this.barCodeSize} />
      <View style={[styles.bottomButtonsContainer, this.props.bottomViewStyle]}>
        {this.props.renderBottomView()}
      </View>
    </>
  );

  render() {
    return <View style={styles.container}>{this.renderCamera()}</View>;
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
  container: {
    flex: 1,
  },
  cameraStyle: {
    flex: 1,
  },
  topButtonsContainer: {
    position: "absolute",
    height: 100,
    top: 0,
    left: 0,
    right: 0,
  },
  bottomButtonsContainer: {
    position: "absolute",
    height: 100,
    bottom: 0,
    left: 0,
    right: 0,
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
