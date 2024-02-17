
# React Native Modern QR Scanner

[![npm version](https://img.shields.io/npm/v/react-native-modern-qrscanner)](https://www.npmjs.com/package/react-native-modern-qrscanner)
[![npm downloads](https://img.shields.io/npm/dw/react-native-modern-qrscanner)](https://www.npmjs.com/package/react-native-modern-qrscanner)
[![Coverage Status](https://coveralls.io/repos/github/calintamas/react-native-modern-qrscanner/badge.svg?branch=master)](https://coveralls.io/github/calintamas/react-native-modern-qrscanner?branch=main)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

A powerful and customizable QR code scanner component for React Native applications. Designed to provide advanced QR code scanning capabilities with a modern and customizable interface.

## Quick Start

Get up and running with just a few lines of code:

## Demo


![toast gif](./docs/demo.gif)



```bash
npm install react-native-modern-qrscanner
```

Or

```bash
yarn add react-native-modern-qrscanner
```

## Usage

```javascript
import { ModernQRScanner } from 'react-native-modern-qrscanner';

// Example usage
<ModernQRScanner
  onRead={(e) => console.log('QR code detected:', e)}
/>
```


## Props

- `onRead`: Callback function invoked when a QR code is detected.
- `renderTopView`: Custom render function for the top overlay view.
- `renderBottomView`: Custom render function for the bottom overlay view.
- `rectHeight`, `rectWidth`: Dimensions for the scanning area.
- `flashMode`: Enable or disable the camera flash.
- `finderX`, `finderY`: Position offsets for the scanning viewfinder.
- ...and more.

## Features

- Advanced QR code scanning using React Native Camera.
- Customizable scanning viewfinder and overlay for a seamless integration.
- Full support for iOS and Android platforms.
- Comprehensive hooks for QR code scanning events.

## Customization

Tailor the scanner to fit your app’s look and feel. Adjust viewfinder size, overlay elements, and more with extensive customization options.

## API Documentation

For a detailed list of props and customization options, check out the [API Documentation](#).

## FAQ

Find answers to common questions and troubleshooting tips in our [FAQ section](#).

## Community and Support

Join our community forum or chat channel to get help, share ideas, and collaborate. [Community Forum](#) | [Chat Channel](#)

## Performance Benchmarks

See how React Native Modern QR Scanner stacks up against other QR scanning solutions. [View Benchmarks](#)

## Contributing

We welcome contributions! Please read our [contributing guide](#) to get started.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
