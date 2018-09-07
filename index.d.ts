declare module 'useriq-react-native' {

  /**
   * UserIQ SDK
   */
  interface UserIQ {
      /**
       * init initializes the sdk with API_KEY
       *
       * Initialization has to be done atleast once as early as possible.
       * It is recommend to call init in `componentDidMount` of main `App`.
       *
```javascript
class App extends React.Component {
  componentDidMount() {
    UserIQ.init("YOUR_API_KEY")
  }
}

```
       *
       */
      init(apiKey: string): void;

      /**
       * setUser sets the user on the sdk
```javascript
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
       */
      setUser(user: UIQUser): void;
  }

  export type UIQUser = {
    id: string
    name: string
    email: string
    accountId: string
    accountName: string
    signUpDate: string
  }

  export default UserIQ
}
