import React, { Component } from 'react';
import { View } from 'react-native';
import { Router, Scene, Modal } from 'react-native-router-flux';
import NavigationDrawer from '../common/Drawer';
import Map from '../screens/Map'
import Account from '../screens/Account'
import Help from '../screens/Help'
import Search from '../screens/Search'
import Notify from '../screens/Notify'

const App = () => {
  return (
    <Router>
      <Scene key="modal" component={Modal}>
        <Scene key="drawer" component={NavigationDrawer} open={false} hideNavBar={true}>
          <Scene key="Map" component={Map} initial/>


        </Scene>
        <Scene key="Search" direction="vertical" duration="300" component={Search}/>
        <Scene key="Account" direction="horizontal" duration="300" component={Account}/>
        <Scene key="Help" direction="horizontal" duration="300" component={Help}/>
        <Scene key="Notify" component={Notify}/>
      </Scene>
    </Router>
  );
}

export default App;
