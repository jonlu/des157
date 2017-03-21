import React, {Component} from 'react';
import Drawer from 'react-native-drawer';
import {Actions, DefaultRenderer} from 'react-native-router-flux';
import MenuContent from '../content/MenuContent';



export default class NavigationDrawer extends Component {
    render(){
        const state = this.props.navigationState;
        const children = state.children;
        return (
            <Drawer
                ref="navigation"
                open={state.open}
                onOpen={()=>Actions.refresh({key:state.key, open: true})}
                onClose={()=>Actions.refresh({key:state.key, open: false})}
                type="static"
                side="right"
                content={<MenuContent />}
                tapToClose={true}
                openDrawerOffset={(viewport) => viewport.width - 300}
                negotiatePan={true}
                tweenEasing="easeInCubic"
                tweenHandler={Drawer.tweenPresets.parallax}>
                <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
            </Drawer>
        );
    }
}
