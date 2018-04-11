import React, { Component } from 'react';
import TopBar from '../components/UI/appBar/topBar';
import axios from '../utils/axios';
import CoinChart from '../components/Chart/CoinChart';
import classes from './CoinAlertApp.module.css';
import AlertBox from '../components/AlertBox/AlertBox';

class CoinAlertApp extends Component {
    state = {
        cryptoList: ['BTC', 'ETH'],
        currentCoin: 'BTC',
        currentPrice: null,
        inputPrice: 0,
        coinsData: {
            'BTC': {
                price: 0,
                historicData: [],
            },
            'ETH': {
                price: 0,
                historicData: [],
            },
        },
        alerts: {},
    }

    componentDidMount() {
        this.getAsyncData()
        this.interval = setInterval(() => { this.getAsyncData() }, 5000);
    }

    createCoinsDataState() {
        const coinsData = this.state.cryptoList.map(el => {
            coinsData[el] = {
                price: 0,
                historicData: null
            }
            return this.setState({ coinsData })
        })
    }

    getAsyncData = () => {

        async function asyncCall(coin) {
            try {
                const promises = await Promise.all([axios.get(`/price?fsym=${coin}&tsyms=USD`), axios.get(`/histohour?fsym=${coin}&tsym=USD&limit=11`)])
                return [promises[0].data.USD, promises[1].data.Data]
            } catch (err) {
                console.error(err);
            }
        }
        let data = this.state.cryptoList.map(crypto => {
            return asyncCall(crypto)
        })
        let nextCoinsData = { ...this.state.coinsData }

        data.map((promises, index) => {
            promises.then(dataCoin => {
                nextCoinsData[this.state.cryptoList[index]].price = dataCoin[0];
                nextCoinsData[this.state.cryptoList[index]].historicData = dataCoin[1];
            })
            return promises
        })
        setTimeout(() => { this.setState({ currentPrice: this.state.coinsData[this.state.currentCoin].price }) }, 200)
    }

    // helper method to check if coin price reached alert price

    checkThresholdPriceAlert = () => {
        const { coinsData, alerts } = this.state;

        if (Object.entries(alerts).length !== 0) {
            Object.entries(alerts).map((alert, i) => {

                // Setting variable to use
                const active = alert[1].active
                const coinChecked = alert[1].coin;
                const alertPriceChecked = alert[1].alertPrice;
                const varDirChecked = alert[1].varDir;
                const keyChecked = alert[0];

                if (active) {
                    if (varDirChecked === 'bullish') {
                        // eslint-disable-next-line
                        coinsData[coinChecked].price > alertPriceChecked ? this.AlertUserThresholdPrice(keyChecked, coinChecked, alertPriceChecked, 'bullish') : null
                    } else {
                        // eslint-disable-next-line
                        coinsData[coinChecked].price < alertPriceChecked ? this.AlertUserThresholdPrice(keyChecked, coinChecked, alertPriceChecked, 'bearish') : null
                    }
                }
                return null
            })
        }
    }
    AlertUserThresholdPrice = (key, coin, price, type) => {
        alert(`Alert price reached for ${coin} at ${price} for your ${type} alert ${key} `);
        const updatedAlerts = { ...this.state.alerts }
        updatedAlerts[key].active = false
        this.setState({ alerts: updatedAlerts })
    }

    onCoinChangeHandler = (event) => {
        //setting current coin value
        this.setState({ currentCoin: event.target.innerText })
    }
    onInputChangeHandler = (e, data) => {
        const { value } = data
        this.setState({ inputPrice: parseFloat(value) })
    }
    onInputSubmitHandler = (price) => {
        // set alerts price with value + coin name 
        const newAlert = { ...this.state.alerts }
        newAlert[(new Date()).getTime()] = {
            active: true,
            coin: this.state.currentCoin,
            alertPrice: price,
            varDir: this.state.coinsData[this.state.currentCoin].price > price ? 'bearish' : 'bullish'
        };
        this.setState({ alerts: newAlert })
    }
    onDeleteAlertHandler = (key) => {
        const updatedAlerts = { ...this.state.alerts };
        delete updatedAlerts[key];
        this.setState({ alerts: updatedAlerts })
    }

    onToggleAlertHandler = (key) => {
        const updatedAlerts = { ...this.state.alerts };
        updatedAlerts[key].active = !updatedAlerts[key].active;
        this.setState({ alerts: updatedAlerts })
    }

    render() {
        //console.log(this.state);

        const { coinsData, currentCoin, currentPrice, alerts } = this.state;
        let coinchart = null;
        let alertBox = null;

        //this.state.currentPrice !== null
        if (this.state.currentPrice !== null) {
            coinchart = (<CoinChart
                coinsData={coinsData}
                curCoin={currentCoin}
                curPrice={currentPrice}
                click={this.onCoinChangeHandler} />);
            alertBox = (<AlertBox
                alerts={alerts}
                currentCoin={this.state.currentCoin}
                currentPrice={this.state.coinsData[this.state.currentCoin].price}
                onAlertSubmit={this.onInputSubmitHandler}
                onDeleteAlert={this.onDeleteAlertHandler}
                onToggleAlertHandler={this.onToggleAlertHandler}
            />)
        }
        return (
            <div className={classes.CoinAlert} >
                <TopBar clicked={this.onCoinChangeHandler} />
                {coinchart}
                {alertBox}
            </div>
        );
    }
}

export default CoinAlertApp;