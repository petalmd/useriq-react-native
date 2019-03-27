
package com.useriq.rn;

import android.util.Log;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.ReadableMapKeySetIterator;
import com.facebook.react.bridge.ReadableType;
import com.facebook.react.uimanager.UIManagerModule;
import com.facebook.react.uimanager.events.Event;
import com.facebook.react.uimanager.events.EventDispatcherListener;
import com.useriq.sdk.UserIQSDK;
import com.useriq.sdk.UserIQSDKInternal;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class UserIQReactNativeModule extends ReactContextBaseJavaModule {

    private static final String TAG = "UseriqRNModule";
    private final ReactApplicationContext reactContext;

    private final LifecycleEventListener rnLifecycleListener = new LifecycleEventListener() {
        @Override
        public void onHostResume() {
            reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher()
                    .addListener(eventDispatcherListener);


            UserIQSDKInternal sdkInternal = UserIQSDKInternal.getInstance();
            if(sdkInternal != null)
                sdkInternal.onReactNativeResume();
        }

        @Override
        public void onHostPause() {
            reactContext.getNativeModule(UIManagerModule.class).getEventDispatcher()
                    .removeListener(eventDispatcherListener);

            UserIQSDKInternal sdkInternal = UserIQSDKInternal.getInstance();
            if(sdkInternal != null)
                sdkInternal.onReactNativePause();
        }

        @Override public void onHostDestroy() { }
    };

    private final EventDispatcherListener eventDispatcherListener = new EventDispatcherListener() {
        @Override
        public void onEventDispatch(Event event) {
            UserIQSDKInternal sdkInternal = UserIQSDKInternal.getInstance();
            if(sdkInternal != null) {
                int viewTag = event.getViewTag();
                String eventName = event.getEventName();
                sdkInternal.onReactEvent(eventName, viewTag);
            }
        }
    };

    public UserIQReactNativeModule(ReactApplicationContext reactContext) {
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
    public void setHost(String host) {
        Log.d(TAG, "setHost: " + host);
        UserIQSDK.setHost(host);
    }

    @ReactMethod
    public void setUser(ReadableMap readableMap) {
        Log.d(TAG, "setUser: " + readableMap.toString());
        UserIQSDK.UserBuilder userBuilder = new UserIQSDK.UserBuilder();

        HashMap<String, Object> map = convertReadableMapToHashMap(readableMap);

        String id = (String) map.remove("id");
        String name = (String) map.remove("name");
        String email = (String) map.remove("email");
        String accountId = (String) map.remove("accountId");
        String accountName = (String) map.remove("accountName");
        String signUpDate = (String) map.remove("signUpDate");

        if (id == null) { id = ""; }
        if (name == null) { id = ""; }
        if (email == null) { id = ""; }
        if (accountId == null) { id = ""; }
        if (accountName == null) { id = ""; }
        if (signUpDate == null) { id = ""; }

        userBuilder.setId(id)
                .setName(name)
                .setEmail(email)
                .setAccountId(accountId)
                .setAccountName(accountName)
                .setSignupDate(signUpDate);

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

    @ReactMethod
    public void disableFAB() {
        UserIQSDK.disableFAB();
    }

    @ReactMethod
    public void showCtxHelp(final Promise promise) {
        boolean status = UserIQSDK.showCtxHelp();
        Log.d(TAG, "showCtxHelp: " + status);
        if (status) {
            promise.resolve("true");
        } else {
            promise.resolve("false");
        }
    }

    @ReactMethod
    public void showHelpCentre(final Promise promise) {
        boolean status = UserIQSDK.showHelpCentre();
        Log.d(TAG, "showHelpCentre: " + status);
        if (status) {
            promise.resolve("true");
        } else {
            promise.resolve("false");
        }
    }

}