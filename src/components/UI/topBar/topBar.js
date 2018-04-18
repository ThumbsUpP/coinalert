import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import HomeIconSwitch from '../../../utils/switchCurrencyIcon'

const iconStyles = {
    padding : 0,
};

const barStyles = {
    backgroundColor: '#F57071'
}
const SearchIcon = (props) => (
    <div style={iconStyles}>
        <IconMenu
            iconButtonElement={<IconButton style={{padding : 0}} ><HomeIconSwitch /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
            <MenuItem value="USD" primaryText="USD" onClick={props.click} />
            <MenuItem value="EUR" primaryText="EUR" onClick={props.click} />
        </IconMenu>
    </div>
);

class TopBar extends Component {

    render() {

        return (
            <AppBar
                title="CoinAlerts"
                style={barStyles}
                titleStyle={{ textTransform: 'uppercase', fontWeight: '500', fontSize: '20px' }}
                onLeftIconButtonClick={this.props.drawerToggle}
                iconElementRight={
                    <SearchIcon click={this.props.clicked} />}
            />
        );
    }
}

export default TopBar;