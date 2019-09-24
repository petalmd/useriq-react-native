
#import "UseriqReactNative.h"
#if __has_include(<React/RCTLog.h>)
#import <React/RCTLog.h>
#else
#import "RCTLog.h"
#endif
#import <UserIQ/UserIQ.h>

@implementation UseriqReactNative

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

RCT_EXPORT_MODULE(UseriqReactNative);

RCT_EXPORT_METHOD(init:(NSString *)apiKey){
    RCTLogInfo(@"\n*****SDK initialized with apiKey: %@*****",apiKey);
    [[UserIQSDK sharedInstance] initWithAPIKey:apiKey];
}

RCT_EXPORT_METHOD(setUser:(NSDictionary *)user){
    RCTLogInfo(@"%@",user);
    NSString *userId, *name, *email, *accountName, *signupDate, *accId;
    NSMutableDictionary *parameters = [[NSMutableDictionary alloc] init];
    for (NSString *key in [user allKeys]) {
        NSString *valueAsString;
        if ([[user valueForKey:key] isKindOfClass:[NSNumber class]]) {
            NSNumber *value = [user valueForKey:key];
            valueAsString = [value stringValue];
        } else if ([[user valueForKey:key] isKindOfClass:[NSString class]]){
            valueAsString = [user valueForKey:key];
        }
        if ([key isEqualToString:@"id"]) {
            userId = valueAsString;
        } else if([key isEqualToString:@"name"]) {
            name = valueAsString;
        } else if([key isEqualToString:@"email"]) {
            email = valueAsString;
        } else if([key isEqualToString:@"accountId"]) {
            accId = valueAsString;
        } else if([key isEqualToString:@"accountName"]) {
            accountName = [user valueForKey:@"accountName"];
        } else if([key isEqualToString:@"signUpDate"]) {
            signupDate = [user valueForKey:@"signUpDate"];
        } else {
            [parameters setObject:[user valueForKey:key] forKey:key];
        }
    }
    [[UserIQSDK sharedInstance] setUserId:userId name:name email:email accountId:accId accountName:accountName signupDate:signupDate andParameters:parameters];
}

RCT_EXPORT_METHOD(disableFAB) {
    [[UserIQSDK sharedInstance] disableFAB];
}

RCT_REMAP_METHOD(showHelpCentre,
                 resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject){
    [[UserIQSDK sharedInstance] showHelpCentre];
    resolve(@"true");
}

RCT_EXPORT_METHOD(setHost:(NSString *)host) {
    [[UserIQSDK sharedInstance] setHost:host];
}

RCT_REMAP_METHOD(showCtxHelp,
                 resolver:(RCTPromiseResolveBlock)resolver
                 rejecter:(RCTPromiseRejectBlock)rejecter) {
    BOOL shown = [[UserIQSDK sharedInstance] showCtxHelp];
    resolver((shown?@"true":@"false"));
}

@end

