# useriq-react-native

## Getting started

Go to the iOS folder and add `pod 'UserIQ'` to your `Podfile`.
Add run `pod install` inside the folder. This will download the `UserIQ framework` via cocoapods.

Go to back to the home folder in the command line and enter

`$ npm install useriq-react-native --save`

### Mostly automatic installation

`$ react-native link useriq-react-native`

### Manual installation

#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `useriq-react-native` and add `UseriqReactNative.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libUseriqReactNative.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`

- Add `import com.useriq.rn.UserIQReactNativePackage;` to the imports at the top of the file
- Add `new UserIQReactNativePackage()` to the list returned by the `getPackages()` method

2. Append the following lines to `android/settings.gradle`:
   ```
   include ':useriq-react-native'
   project(':useriq-react-native').projectDir = new File(rootProject.projectDir, 	'../node_modules/useriq-react-native/android')
   ```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
   ```
     compile project(':useriq-react-native')
   ```

## Usage

### 1. Initialization

Initialize `UserIQ` sdk as eary as possible. `UserIQ.init()` method needs to be called atleast once after the root component / application is mounted

```javascript
import React from 'react';
import UserIQ from 'useriq-react-native'

export class App extends React.Component {

  componentDidMount() {
    UserIQ.init('API_KEY')
  }
  ...
}
```

### 1a. Initialize for multiple platforms

If you have single code base for both iOS & Android & if you want to initialize SDK for both platforms, you can initialze using `Platform.select`. If not skip to step 2.

```javascript
import React from 'react';
import { Platform } from 'react-native';
import UserIQ from 'useriq-react-native'

export class App extends React.Component {

  componentDidMount() {
    Platform.select({
      ios: () => UserIQ.init('IOS_API_KEY'),
      android: () => UserIQ.init('ANDROID_API_KEY'),
    })()
  }
  ...
}
```

This will automatically choose the right `api_key` for the appropriate platform & initialize it.

### 2. Set loggedin user

SDK initialization itself doesnt send any data to UserIQ server until `setUser()` is called. So after user is sucessfully logged in, call `setUser()` with required params. `id`, `name`, `email`, `accountId`, `accountName` and `signUpDate` will be `String`

```javascript
import React from 'react'
import UserIQ from 'useriq-react-native'

class LoginComponent extends React.Component {
  onLoginSuccess(user) {
    UserIQ.setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      accountId: user.accountId,
      accountName: user.accountName,
      signUpDate: user.signUpDate,
    })
  }
}
```

## Misc

### Disable Fab

Floating Action Button (FAB) can be permanently disabled by calling the `disableFAB()` from the sdk.

```javascipt
UserIQ.disableFAB();
```

This can be called anytime before or after initializing the SDK. Once invoked, it will hide the FAB & also
overrides the enableFAB sent from the dashboard. (ie) if this method is called on the SDK, this will take precendence over
configuration from dashboard!

### Show Helpcenter

Helpcenter can be programatically invoked by calling `UserIQ.showHelpCentre()` which returns promise

```javascipt
UserIQ.showHelpCentre().then(function (status) {
      // status will be "true" or "false"
    });
```

When Modal window or popup is active, helpcenter can't be shown. In those cases, above API will return a promise with "false"

### Show Contextual help

Contextual help can be shown by calling `UserIQ.showCtxHelp()` which returns promise

```javascipt
UserIQ.showCtxHelp().then(function (status) {
      // status will be "true" or "false"
    });
```

Contextual help will only be shown when the current screen is tagged. If the current screen is not tagged then the above API will return a promise with "false"

#### InApp-Notification

![](images/inapp-default.gif)

#### NPS

![](images/nps.gif)

#### StarRating

![](images/star.gif)

#### Contexual Help

![](images/ctxHelp.gif)

#### HelpCentre

![](images/helpcenter.gif)
