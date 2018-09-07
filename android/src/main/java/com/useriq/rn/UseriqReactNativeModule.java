
package com.useriq.rn;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.useriq.sdk.UserIQSDK;
import com.useriq.sdk.UserIQSDKInternal;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UseriqReactNativeModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    private final LifecycleEventListener rnLifecycleListener = new LifecycleEventListener() {
        @Override
        public void onHostResume() {
            UserIQSDKInternal sdkInternal = UserIQSDKInternal.getInstance();
            if(sdkInternal != null)
                sdkInternal.onReactNativeResume();
        }

        @Override
        public void onHostPause() {
            UserIQSDKInternal sdkInternal = UserIQSDKInternal.getInstance();
            if(sdkInternal != null)
                sdkInternal.onReactNativePause();
        }

        @Override public void onHostDestroy() { }
    };

    public UseriqReactNativeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        reactContext.addLifecycleEventListener(rnLifecycleListener);
    }

    @Override
    public void onCatalystInstanceDestroy() {
        this.reactContext.removeLifecycleEventListener(rnLifecycleListener);
    }

    @Override
    public String getName() {
        return "UseriqReactNative";
    }

    @ReactMethod
    public void init(String apiKey) {
        UserIQSDK.init(getCurrentActivity().getApplication(), apiKey);
    }

    @ReactMethod
    public void setUser(ReadableMap readableMap) {
        UserIQSDK.UserBuilder userBuilder = new UserIQSDK.UserBuilder();

        HashMap<String, Object> map = convertReadableMapToHashMap(readableMap);

        userBuilder.setId(map.remove("id").toString()).setName(map.remove("name").toString())
                .setEmail(map.remove("email").toString()).setAccountId(map.remove("accountId").toString())
                .setAccountName(map.remove("accountName").toString())
                .setSignupDate(map.remove("signUpDate").toString());

        for (Map.Entry<String, Object> entry : map.entrySet()) {
            userBuilder.addParams(entry.getKey(), entry.getValue().toString());
        }

        UserIQSDK.User user = userBuilder.build();
        UserIQSDK.setUser(user);
    }

    private HashMap<String, Object> convertReadableMapToHashMap(ReadableMap readableMap) {
        ReadableMapKeySetIterator iterator = readableMap.keySetIterator();
        HashMap<String, Object> deconstructedMap = new HashMap<>();
        while (iterator.hasNextKey()) {
            String key = iterator.nextKey();
            ReadableType type = readableMap.getType(key);
            switch (type) {
            case Null:
                deconstructedMap.put(key, null);
                break;
            case Boolean:
                deconstructedMap.put(key, readableMap.getBoolean(key));
                break;
            case Number:
                deconstructedMap.put(key, readableMap.getDouble(key));
                break;
            case String:
                deconstructedMap.put(key, readableMap.getString(key));
                break;
            case Map:
                deconstructedMap.put(key, convertReadableMapToHashMap(readableMap.getMap(key)));
                break;
            case Array:
                deconstructedMap.put(key, getArray(readableMap.getArray(key)));
                break;
            default:
                throw new IllegalArgumentException("Could not convert object with key: " + key + ".");
            }

        }
        return deconstructedMap;
    }

    private List<Object> getArray(ReadableArray readableArray) {
        List<Object> deconstructedList = new ArrayList<>(readableArray.size());
        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType indexType = readableArray.getType(i);
            switch (indexType) {
            case Null:
                deconstructedList.add(i, null);
                break;
            case Boolean:
                deconstructedList.add(i, readableArray.getBoolean(i));
                break;
            case Number:
                deconstructedList.add(i, readableArray.getDouble(i));
                break;
            case String:
                deconstructedList.add(i, readableArray.getString(i));
                break;
            case Map:
                deconstructedList.add(i, convertReadableMapToHashMap(readableArray.getMap(i)));
                break;
            case Array:
                deconstructedList.add(i, getArray(readableArray.getArray(i)));
                break;
            default:
                throw new IllegalArgumentException("Could not convert object at index " + i + ".");
            }
        }
        return deconstructedList;
    }

}