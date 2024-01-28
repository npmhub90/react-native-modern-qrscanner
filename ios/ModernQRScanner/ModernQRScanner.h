#import <React/RCTBridgeModule.h>


@interface ModernQRScanner : NSObject <RCTBridgeModule>

- (void)getOrientation:(RCTResponseSenderBlock)callback;
- (void)lockToPortrait;
- (void)lockToLandscape;
- (void)unlockAllOrientations;

@end
  
