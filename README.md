# useriq-react-native

## Getting started

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

- Add `import com.useriq.UseriqReactNativePackage;` to the imports at the top of the file
- Add `new UseriqReactNativePackage()` to the list returned by the `getPackages()` method

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

```javascript
import UserIQ from 'useriq-react-native'

// TODO: What to do with the module?
UserIQ
```
