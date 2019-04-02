import { createStackNavigator } from 'react-navigation';
import { SearchPage } from './SearchPage';
import { SearchResults } from './SearchResults';
import UserIQ from 'useriq-react-native';

export class App extends React.Component {
  componentDidMount() {
    Platform.select({
      android: () => UserIQ.init('ANDROID_API_KEY'),
      ios: () => UserIQ.init('IOS_API_KEY'),
    })()

    UserIQ.setUser({
      id: 101,
      name: "Test User",
      email: "user@test.com",
      accountId: "101",
      accountName: "Test account",
      signUpDate: "01/01/1900",
    })
  }
}

export const app = createStackNavigator({
  Home: { screen: SearchPage },
  Results: { screen: SearchResults },
});
