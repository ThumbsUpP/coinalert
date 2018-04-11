import React, { Component } from 'react';
import Chart from './Chart/chart';
import { Card, CardHeader, CardMedia } from 'material-ui/Card';
import classes from './CoinChart.module.css';
import TimeTabs from '../UI/Tabs/Tabs';
import Expand from 'material-ui/svg-icons/navigation/expand-more';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';


class CoinChart extends Component {
    state = {
        isLoaded: false
    }

    render() {

        let lastPrice = null;
        if (!this.state.isLoaded) {
            lastPrice = 0;
            setTimeout(() => { this.setState({ isLoaded: true }) }, 100)
        } else {
            lastPrice = this.props.coinsData[this.props.curCoin].price
        }

        const styles = {
            cardStyles: {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '5px'
            },
            titleStyles: {
                marginRight: '-80px',
                fontWeight: '300'
            },
            headerStyles: {
                display: 'flex',
                flexFlow: 'row-reverse',
                color: 'white',
                justifyContent: 'space-between',
                fontWeight: 'bolder',
                paddingRight: '0px',
                padding: '25px 0px 25px 16px'
            },
            containerStyle: {
                //borderRadius : '5px'
            }
        }
        const TimeNow = new Date();

        return (
            <div className={classes.Card} >
                <Card style={styles.cardStyles} containerStyle={styles.containerStyle}>
                    <CardHeader
                        title={lastPrice ? '$' + lastPrice.toLocaleString() : 'undefined'}
                        titleColor="white"
                        titleStyle={styles.titleStyles}
                        style={styles.headerStyles}
                    >
                        <div className={classes.CoinDisplayed}>
                            <div className={classes.CssDot} ></div>
                            <div className={classes.CoinInfo}>
                                <span className={classes.CoinSpan} >{this.props.curCoin}</span>
                                <p className={classes.HourSpan} >{TimeNow.getHours().toString() + ':' + ((TimeNow.getMinutes() < 10 ? '0' : '') + TimeNow.getMinutes()).toString()}</p>
                            </div>
                            <div style={{ alignSelf: 'flex-start' }}>
                                <IconMenu
                                    iconButtonElement={<IconButton style={{width: 'auto',
                                        height: '10px', padding: '0'}} ><Expand color="white" /></IconButton>}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                                >
                                    <MenuItem value="BTC" primaryText="BTC" onClick={this.props.click} />
                                    <MenuItem value="ETH" primaryText="ETH" onClick={this.props.click} />
                                </IconMenu>
                            </div>
                        </div>
                    </CardHeader>
                    <CardMedia>
                        <Chart cData={this.props.coinsData} coin={this.props.curCoin} price = {this.props.curPrice} />
                    </CardMedia>
                </Card>
                <TimeTabs />
            </div>

        );
    }
}

export default CoinChart;