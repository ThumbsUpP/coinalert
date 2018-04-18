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
        isLoaded: false,
        timeFrame: 'daily'
    }

    onTimeFrameChange = (e) => {
        this.setState({
          timeFrame: e.props.value,
        });
      };
    

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
        let menuItems = null;
        menuItems = this.props.coinList.map(el => {
            return (<MenuItem value={el} primaryText={el} onClick={this.props.click} key={el} />)
        })


        return (
            <div className={classes.Card} >
                <Card style={styles.cardStyles} containerStyle={styles.containerStyle}>
                    <CardHeader
                        title={lastPrice ? this.props.currency[1] + lastPrice.toLocaleString() : 'undefined'}
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
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                                >
                                    {menuItems}
                                </IconMenu>
                            </div>
                        </div>
                    </CardHeader>
                    <CardMedia>
                        <Chart cData={this.props.coinsData} coin={this.props.curCoin} price = {this.props.curPrice} time={this.state.timeFrame} />
                    </CardMedia>
                </Card>
                <TimeTabs onTimeFrameChange={this.onTimeFrameChange} />
            </div>

        );
    }
}

export default CoinChart;