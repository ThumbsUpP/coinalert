import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import { white } from 'material-ui/styles/colors';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';


const iconStyles = {
};

const barStyles = {
    backgroundColor: '#F57071'
}
const SearchIcon = (props) => (
    <div style={iconStyles}>
        <IconMenu
            iconButtonElement={<IconButton><Search color={white} /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
            <MenuItem value="BTC" primaryText="BTC" onClick={props.click} />
            <MenuItem value="ETH" primaryText="ETH" onClick={props.click} />
        </IconMenu>
    </div>
);

const TopBar = (props) => (
    <AppBar
        title="CoinAlerts"
        style={barStyles}
        titleStyle={{ textTransform: 'uppercase', fontWeight: '500', fontSize: '20px' }}
        iconElementRight={
            <SearchIcon click={props.clicked} />}
    />
);

export default TopBar;