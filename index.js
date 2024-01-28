import { NativeModules } from 'react-native';
import ModernQRScanner from './src/ModernQRScanner';

const QRReader = (fileUrl) => {
  const { QRScanReader } = NativeModules;
  return QRScanReader.readerQR(fileUrl);
};

export { ModernQRScanner, QRReader };
