
#import "ModernQRScanner.h"
#import <UIKit/UIKit.h>

@implementation ModernQRScanner


RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getOrientation:(RCTResponseSenderBlock)callback) {
    UIDeviceOrientation orientation = [[UIDevice currentDevice] orientation];
    NSString *orientationString;

    switch (orientation) {
        case UIDeviceOrientationPortrait:
            orientationString = @"PORTRAIT";
            break;
        case UIDeviceOrientationLandscapeLeft:
        case UIDeviceOrientationLandscapeRight:
            orientationString = @"LANDSCAPE";
            break;
        default:
            orientationString = @"UNKNOWN";
            break;
    }

    callback(@[[NSNull null], orientationString]);
}

RCT_EXPORT_METHOD(lockToPortrait) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [[UIDevice currentDevice] setValue:@(UIInterfaceOrientationPortrait) forKey:@"orientation"];
    });
}

RCT_EXPORT_METHOD(lockToLandscape) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [[UIDevice currentDevice] setValue:@(UIInterfaceOrientationLandscapeRight) forKey:@"orientation"];
    });
}

RCT_EXPORT_METHOD(unlockAllOrientations) {
    dispatch_async(dispatch_get_main_queue(), ^{
        [[UIDevice currentDevice] setValue:@(UIInterfaceOrientationUnknown) forKey:@"orientation"];
    });
}

- (UIInterfaceOrientationMask)getOrientationMask {
    UIDeviceOrientation orientation = [[UIDevice currentDevice] orientation];
    switch (orientation) {
        case UIDeviceOrientationPortrait:
        case UIDeviceOrientationPortraitUpsideDown:
            return UIInterfaceOrientationMaskPortrait;
        case UIDeviceOrientationLandscapeLeft:
        case UIDeviceOrientationLandscapeRight:
            return UIInterfaceOrientationMaskLandscape;
        default:
            return UIInterfaceOrientationMaskAll;
    }
}


@end

  