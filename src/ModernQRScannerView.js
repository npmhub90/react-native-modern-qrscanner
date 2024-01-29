import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Animated,
  Easing,
} from 'react-native';

const calculateBorderSize = (props, isCornerOffset) => {
  if (isCornerOffset) {
    return {
      height: props.rectHeight - props.cornerOffsetSize * 2,
      width: props.rectWidth - props.cornerOffsetSize * 2
    };
  } else {
    return { height: props.rectHeight, width: props.rectWidth };
  }
};

export default class ModernQRScannerView extends Component {
  static defaultProps = {
    maskColor: '#0000004D',
    cornerColor: '#D3FF00',
    borderColor: '#000000',
    rectHeight: 200,
    rectWidth: 200,
    borderWidth: 0,
    cornerBorderWidth: 4,
    cornerBorderLength: 20,
    cornerOffsetSize: 1,
    isCornerOffset: true,
    bottomHeight: 100,
    scanBarAnimateTime: 2500,
    scanBarColor: '#D3FF00',
    scanBarImage: null,
    scanBarHeight: 1.5,
    scanBarMargin: 6,
    isShowScanBar: true
  };

  constructor(props) {
    super(props);
    this.state = {
      animatedValue: new Animated.Value(0),
    };
    this.isClosed = false;
  }

  componentDidMount() {
    this.startScannerLineMove();
  }

  componentWillUnmount() {
    this.isClosed = true;
  }


  startScannerLineMove = () => {
    if (this.isClosed) return;

    this.state.animatedValue.setValue(0);
    Animated.loop(
      Animated.timing(this.state.animatedValue, {
        toValue: this.props.rectHeight,
        duration: this.props.scanBarAnimateTime,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  renderScanBar = () => {
    if (!this.props.isShowScanBar) return null;

    const scanBarStyle = {
      backgroundColor: this.props.scanBarColor,
      height: this.props.scanBarHeight,
      marginHorizontal: this.props.scanBarMargin,
    };

    if (this.props.scanBarImage) {
      return (
        <Image
          style={{
            resizeMode: 'contain',
            width: this.props.rectWidth - this.props.scanBarMargin * 2,
          }}
          source={this.props.scanBarImage}
        />
      );
    } else {
      return <View style={scanBarStyle} />;
    }
  };

  render() {
    const { rectHeight, rectWidth } = this.props;
    const viewfinderStyle = {
      height: rectHeight,
      width: rectWidth,
      alignItems: 'center',
      justifyContent: 'center',
    };
    const borderSize = calculateBorderSize(this.props, this.props.isCornerOffset);

    return (
      <View style={styles.container}>
        <View style={viewfinderStyle}>
          <View style={[borderSize, styles.borderStyle, { borderColor: this.props.borderColor, borderWidth: this.props.borderWidth }]} />

          {/* Corner Styles */}
          <View style={[styles.cornerStyle, styles.topLeftCorner, { borderColor: this.props.cornerColor, borderLeftWidth: this.props.cornerBorderWidth, borderTopWidth: this.props.cornerBorderWidth }]} />
          <View style={[styles.cornerStyle, styles.topRightCorner, { borderColor: this.props.cornerColor, borderRightWidth: this.props.cornerBorderWidth, borderTopWidth: this.props.cornerBorderWidth }]} />
          <View style={[styles.cornerStyle, styles.bottomLeftCorner, { borderColor: this.props.cornerColor, borderLeftWidth: this.props.cornerBorderWidth, borderBottomWidth: this.props.cornerBorderWidth }]} />
          <View style={[styles.cornerStyle, styles.bottomRightCorner, { borderColor: this.props.cornerColor, borderRightWidth: this.props.cornerBorderWidth, borderBottomWidth: this.props.cornerBorderWidth }]} />
          
          {/* Scan Bar */}
          {this.renderScanBar()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewfinder: {
  },
  borderStyle: {
    position: 'absolute',
  },
  cornerStyle: {
    position: 'absolute',
    height: 20,
    width: 20,
    borderRadius: 5,
  },
  topLeftCorner: {
    top: 0,
    left: 0,
  },
  topRightCorner: {
    top: 0,
    right: 0,
  },
  bottomLeftCorner: {
    bottom: 0,
    left: 0,
  },
  bottomRightCorner: {
    bottom: 0,
    right: 0,
  },
});
