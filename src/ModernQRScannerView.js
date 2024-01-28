import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Easing,
  Image
} from 'react-native';

// 별도의 유틸리티 파일로 이동 가능한 스타일 계산 함수들
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
    cornerColor: 'red',
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
    scanBarColor: 'red',
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
    const animatedStyle = {
      transform: [{ translateY: this.state.animatedValue }],
    };

    const borderSize = calculateBorderSize(this.props, this.props.isCornerOffset);

    return (
      <View style={styles.container}>
        <View style={[styles.viewfinder, this.props.rectHeight, this.props.rectWidth]}>
          <View style={[borderSize, styles.borderStyle, { borderColor: this.props.borderColor, borderWidth: this.props.borderWidth }]} />

          {/* Corner Styles */}
          <View style={[styles.cornerStyle, styles.topLeftCorner, { borderColor: this.props.cornerColor, borderLeftWidth: this.props.cornerBorderWidth, borderTopWidth: this.props.cornerBorderWidth }]} />
          <View style={[styles.cornerStyle, styles.topRightCorner, { borderColor: this.props.cornerColor, borderRightWidth: this.props.cornerBorderWidth, borderTopWidth: this.props.cornerBorderWidth }]} />
          <View style={[styles.cornerStyle, styles.bottomLeftCorner, { borderColor: this.props.cornerColor, borderLeftWidth: this.props.cornerBorderWidth, borderBottomWidth: this.props.cornerBorderWidth }]} />
          <View style={[styles.cornerStyle, styles.bottomRightCorner, { borderColor: this.props.cornerColor, borderRightWidth: this.props.cornerBorderWidth, borderBottomWidth: this.props.cornerBorderWidth }]} />
          
          {/* Scan Bar */}
          <View>
            {this.renderScanBar()}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
  },
  viewfinder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  borderStyle: {
    // Border style properties
  },
  cornerStyle: {
    position: 'absolute',
    height: 20, // 예시 값, 실제로는 props로부터 받은 값을 사용
    width: 20,  // 예시 값, 실제로는 props로부터 받은 값을 사용
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
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0
  },
  viewfinder: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  topLeftCorner: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  topRightCorner: {
    position: 'absolute',
    top: 0,
    right: 0
  },
  bottomLeftCorner: {
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  bottomRightCorner: {
    position: 'absolute',
    bottom: 0,
    right: 0
  },
  topMask: {
    position: 'absolute',
    top: 0
  },
  leftMask: {
    position: 'absolute',
    left: 0
  },
  rightMask: {
    position: 'absolute',
    right: 0
  },
  bottomMask: {
    position: 'absolute',
    bottom: 0
  }
});
