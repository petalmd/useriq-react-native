
#if __has_include(<React/RCTBridgeModule.h>)
#import <React/RCTBridgeModule.h>
#else
#import "RCTBridgeModule.h"
#endif

@interface UseriqReactNative : NSObject <RCTBridgeModule>

@property (nonatomic) NSString *apiKey;
@property (nonatomic) BOOL isInitiated;
@end
  
