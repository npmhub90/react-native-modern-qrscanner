
# react-native-modern-qrscanner

A modern-designed and powerful QR code scanner for React Native with advanced features.

## Features

- Modern and user-friendly interface
- Fast and efficient QR code scanning
- Customizable styles and themes
- Supports both Android and iOS devices
- Easy integration into React Native projects

## Installation

```bash
npm install react-native-modern-qrscanner
```

## Usage

Import the `QRScanner` component in your React Native application:

```javascript
import QRScanner from 'react-native-modern-qrscanner';
```

Then, use the component in your app:

```javascript
<QRScanner onScanSuccess={this.handleScanSuccess} />
```

Define the callback function for successful scans:

```javascript
handleScanSuccess = (data) => {
  // Process the scanned data
  console.log("Scanned QR Code:", data);
};
```

## Customization

You can customize the scanner's appearance and behavior using various props:

```javascript
<QRScanner
  onScanSuccess={this.handleScanSuccess}
  cameraStyle={{ ... }}
  scannerAreaStyle={{ ... }}
/>
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request with any improvements or suggestions.

## License

This project is licensed under the MIT License.
