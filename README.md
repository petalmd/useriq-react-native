# useriq-react-native

## Installing React-native SDK

`$ npm install @useriq/useriq-react-native --save`

> Note: Before `npm 5.0.0` the `--save` flag is required in this step. React Native will link modules based on dependencies in your package.json file.

In case you prefer yarn over npm, use the following command

`yarn add @useriq/useriq-react-native`

## Linking the project

### Automatic

`$ react-native link @useriq/useriq-react-native`


#### Additional Steps For iOS

1. [Download UserIQ framework via Cocoapods](#download-useriq-framework-via-cocoapods)

### Manual

#### iOS

1. [Download UserIQ framework via Cocoapods](#download-useriq-framework-via-cocoapods)

2. Open `<your-project-name>.xcworkspace` in Xcode.

3. Click on the `Schemes` list and click on `New Scheme`.

4. Under the `Target` list select `UseriqReactNative` and click `OK`.

5. Build the `UseriqReactNative` target.

6. Change your target to your app.

7. Run your project (`Cmd+R`)

> For further information visit [Manual Linking for iOS](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#manual-linking)

#### Android

1. Open up `android/app/src/main/java/[...]/MainApplication.java`

- Add `import com.useriq.rn.UserIQReactNativePackage;` to the imports at the top of the file
- Add `new UserIQReactNativePackage()` to the list returned by the `getPackages()` method

2. Append the following lines to `android/settings.gradle`:
   ```
   include ':@useriq_useriq-react-native'
   project(':@useriq_useriq-react-native').projectDir = new File(rootProject.projectDir, '../node_modules/@useriq/useriq-react-native/android')
   ```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
   ```
    implementation project(':@useriq_useriq-react-native')
   ```

### Download UserIQ Framework via Cocoapods

1. Go to the iOS folder inside your react-native project folder
2. Open `Podfile`. If `Podfile` is not present, create a `Podfile` from command line using the `pod init` command.
3. Under `target '<app-name>'`, add `pod 'UserIQ'`.
4. Open command line and go to the `iOS` folder inside your react-native project folder in terminal.
5. Run `pod install`. This will download the `UserIQ framework` via cocoapods.

> Make sure the `Podfile` is inside the `iOS` folder.

> The pod download should also be done in case of [manual linking](#Manual).

## Usage

### 1. Initialization

Initialize `UserIQ` sdk as eary as possible. `UserIQ.init()` method needs to be called atleast once after the root component / application is mounted

```javascript
import React from 'react';
import UserIQ from '@useriq/useriq-react-native'

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
import UserIQ from '@useriq/useriq-react-native'

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
import UserIQ from '@useriq/useriq-react-native'

class LoginComponent extends React.Component {
  onLoginSuccess(user) {
    UserIQ.setUser({
      id: user.id,
      name: user.name,
      email: user.email,
      accountId: user.accountId,
      accountName: user.accountName,
      signUpDate: user.signUpDate,
      "custom_parameter_1": "custom_value_1",
      "custom_parameter_2": "custom_value_2"
    })
  }
}
```

# API & USAGE

For more details on API & usage, please refer to [wiki page](https://github.com/useriq-com/useriq-react-native/wiki)
