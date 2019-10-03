/**
 * @format
 * @flow
 */

import React, { Fragment } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  StatusBar
} from "react-native";
import UserIQ from 'useriq-react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from "react-native/Libraries/NewAppScreen";

import {
  Card,
  Icon,
  ListItem,
  Button,
  ThemeProvider,
  PricingCard
} from "react-native-elements";

const App = () => {
  //  Get your API key for the app in App Settings on http://mobile.useriq.com
  Platform.select({
    ios: () => UserIQ.init('05971256316f178e06cde5fdc7d57c18d8429079'),
    android: () => UserIQ.init('0cf5c469e362abad982139961b10607e7e8aefc2'),
  })()
  UserIQ.setUser({
    id: '1',
    name: 'Palkesh',
    email: 'email@email.com',
    accountId: '1',
    accountName: 'accname',
    signUpDate: '01/01/2019',
    "custom_param_1": "custom_value_1"
  })
  return (
    <ThemeProvider>
      <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <ScrollView
            contentInsetAdjustmentBehavior="always"
            style={styles.scrollView}
          >
            <Card title="HELLO WORLD" image={require("./images/op3.jpg")}>
              <Text style={{ marginBottom: 10 }}>
                The idea with React Native Elements is more about component
                structure than actual design.
              </Text>
              <Button
                icon={<Icon name="code" color="#ffffff" />}
                onPress = {()=>{
                    UserIQ.showHelpCentre()
                }}
                backgroundColor="#03A9F4"
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0
                }}
                title="Open Help Centre"
              />
            </Card>
            <PricingCard
              color="#4f9deb"
              onButtonPress={
                () => {
                  UserIQ.showCtxHelp()
                }
              }
              title="Free"
              price="$0"
              info={["1 User", "Basic Support", "All Core Features"]}
              button={{ title: "Open Ctx Help", icon: "flight-takeoff" }}
            />
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter
  },
  engine: {
    position: "absolute",
    right: 0
  },
  body: {
    backgroundColor: Colors.white
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: "400",
    color: Colors.dark
  },
  highlight: {
    fontWeight: "700"
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: "600",
    padding: 4,
    paddingRight: 12,
    textAlign: "right"
  }
});

export default App;
