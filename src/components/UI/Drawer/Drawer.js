import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import fullCoinList from '../../../utils/fullCoinList';
import CoinChip from '../CoinChip/CoinChip';
import AppBar from 'material-ui/AppBar';
import Search from 'material-ui/svg-icons/action/search';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import AutocompleteCoin from './Autocomplete'

const iconStyles = {
};

const barStyles = {
    backgroundColor: '#CCC'
}

const SearchIcon = (props) => (
    <div style={iconStyles}>
        <IconMenu
            iconButtonElement={<IconButton><Search color="white" /></IconButton>}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
            <MenuItem> </MenuItem>
        </IconMenu>
    </div>
);


class DrawerUndockedExample extends React.Component {
    state = { open: false };

    handleToggle = () => this.setState({ open: !this.state.open });

    render() {

        const coinList = this.props.coinList
        let CoinChips = null;
        if (coinList.length > 0) {
            CoinChips = coinList.map(el => {
                return (<CoinChip
                    key={fullCoinList[el].id}
                    coin={fullCoinList[el].fullName}
                    sym={fullCoinList[el].symbol}
                    source={"https://www.cryptocompare.com" + fullCoinList[el].imageUrl}
                    onDeleteClick = {this.props.onCoinDel}
                />)
            })
        }

        return (
            <div>
                <Drawer
                    docked={false}
                    width={250}
                    open={this.props.open}
                    onRequestChange={this.props.onRequestChange}
                >
                    <AppBar
                        title={<AutocompleteCoin onCoinAdd = {this.props.onCoinAdd}/>}
                        style={barStyles}
                        titleStyle={{ fontWeight: '300', fontSize: '16px' }}
                        iconElementLeft={
                            <SearchIcon click={this.props.clicked} />}
                    />
                    <div style={{padding : '10px'}}>
                     {CoinChips}   
                    </div>
                    
                </Drawer>
            </div>
        );
    }
}
export default DrawerUndockedExample 