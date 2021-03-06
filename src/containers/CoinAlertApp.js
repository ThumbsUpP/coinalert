import React, { Component } from 'react';
import TopBar from '../components/UI/topBar/topBar';
import axios from '../utils/axios';
import CoinChart from '../components/Chart/CoinChart';
import classes from './CoinAlertApp.module.css';
import AlertBox from '../components/AlertBox/AlertBox';
import Loading from '../components/UI/Loading/Loading';
import DrawerCoin from '../components/UI/Drawer/Drawer';

class CoinAlertApp extends Component {
    state = {
        cryptoList: ['BTC', 'ETH'],
        currentCoin: 'BTC',
        currentPrice: null,
        inputPrice: 0,
        coinsData: null,
        alerts: {},
        drawer: false,
        currency: ['USD', '$']
    }

    componentDidMount() {
        this.createCoinsDataState();
        this.interval = setInterval(() => {
            if (this.state.coinsData) {
                this.getAsyncData();
                this.checkThresholdPriceAlert()
            }
        }, 2000);
    }

    createCoinsDataState() {

        let firstCoinsDataState = {};
        this.state.cryptoList.map(el => {
            firstCoinsDataState[el] = {
                price: 0,
                historicData: {
                    daily: [],
                    weekly: [],
                }
            }
            return el
        })
        this.setState({ coinsData: firstCoinsDataState })
    }

    getAsyncData = () => {

        async function asyncCall(coin, currency) {
            try {
                const promises = await Promise.all([axios.get(`/price?fsym=${coin}&tsyms=${currency}`), axios.get(`/histohour?fsym=${coin}&tsym=${currency}&limit=11`), axios.get(`/histoday?fsym=${coin}&tsym=${currency}&limit=6`)])
                return [promises[0].data[currency], promises[1].data.Data, promises[2].data.Data]
            } catch (err) {
                console.error(`${coin} fetch led to error `);
            }
        }
        
        try {
            let data = this.state.cryptoList.map(crypto => {
            return asyncCall(crypto, this.state.currency[0])
            })
            let nextCoinsData = { ...this.state.coinsData }
            data.map((promises, index) => {
                promises.then(dataCoin => {
                    nextCoinsData[this.state.cryptoList[index]].price = dataCoin[0];
                    nextCoinsData[this.state.cryptoList[index]].historicData.daily = dataCoin[1];
                    nextCoinsData[this.state.cryptoList[index]].historicData.weekly = dataCoin[2];
                })
                return promises
            })
            setTimeout(() => { this.setState({ currentPrice: this.state.coinsData[this.state.currentCoin].price }) }, 200)
        } catch (err) {
            console.error('trying to null the current price')
            this.setState({ currentPrice: null })
        }

    }

    checkThresholdPriceAlert = () => {

        const { coinsData, alerts } = this.state;

        if (Object.entries(alerts).length !== 0) {
            Object.entries(alerts).map((alert, i) => {

                // Setting variable to use
                let active = alert[1].active
                const coinChecked = alert[1].coin;
                const alertPriceChecked = alert[1].alertPrice;
                const varDirChecked = alert[1].varDir;
                const keyChecked = alert[0];
                
                if (active && alert[1].currency === this.state.currency[1]) {
                    if (varDirChecked === 'bullish') {
                        // eslint-disable-next-line
                        if (coinsData[coinChecked].price > alertPriceChecked) {
                            this.AlertUserThresholdPrice(keyChecked, coinChecked, alertPriceChecked, 'bullish')
                            let updatedAlerts = { ...this.state.alerts };
                            updatedAlerts[keyChecked].reached = true;
                            this.setState({ alerts: updatedAlerts })
                        }
                    } else {
                        // eslint-disable-next-line
                        if (coinsData[coinChecked].price < alertPriceChecked) {
                            this.AlertUserThresholdPrice(keyChecked, coinChecked, alertPriceChecked, 'bearish')
                            let updatedAlerts = { ...this.state.alerts };
                            updatedAlerts[keyChecked].reached = true;
                            this.setState({ alerts: updatedAlerts })
                        }
                    }
                } else if (active && alert[1].currency !== this.state.currency[1]) { //check if currency has changed
                    let updatedAlerts = { ...this.state.alerts };
                    updatedAlerts[keyChecked].active = false;
                    this.setState({ alerts: updatedAlerts })
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
            varDir: this.state.coinsData[this.state.currentCoin].price > price ? 'bearish' : 'bullish',
            currency: this.state.currency[1],
            reached: false
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

    drawerToggle = () => { this.setState({ drawer: !this.state.drawer }) };

    onCoinAddToList = (e) => {
        let cryptoListCopy = [...this.state.cryptoList];
        cryptoListCopy.push(e)
        this.setState({ cryptoList: cryptoListCopy })
        this.createCoinsDataState()
    }

    onCoinDelFromList = (targetCoin) => {
        console.log(targetCoin);
        let updatedCryptoList = [...this.state.cryptoList];
        let coinsData = { ...this.state.coinsData };
        delete coinsData[targetCoin];
        updatedCryptoList = updatedCryptoList.filter(coin => coin !== targetCoin);
        this.setState({ coinsData, cryptoList: updatedCryptoList });
        this.createCoinsDataState();

        if (targetCoin === this.state.currentCoin) {
            this.setState({ currentCoin: 'BTC' })
        }
    }

    onCurrencyChangeHandler = (event) => {

        switch (event.target.innerText) {
            case 'USD':
                return this.setState({ currency: ['USD', '$'] })
            case 'EUR':
                return this.setState({ currency: ['EUR', '€'] })
            default:
                break;
        }
    }


    render() {

        const { coinsData, currentCoin, currentPrice, alerts } = this.state;
        let coinchart = null;
        let alertBox = null;
        let drawer = null;

        if (this.state.drawer) {
            drawer = (<DrawerCoin
                open={this.state.drawer}
                onRequestChange={(drawer) => this.setState({ drawer })}
                coinList={this.state.cryptoList}
                onCoinAdd={this.onCoinAddToList}
                onCoinDel={this.onCoinDelFromList}
            />)
        }

        if (this.state.currentPrice !== null) {
            coinchart = (<CoinChart
                coinsData={coinsData}
                curCoin={currentCoin}
                curPrice={currentPrice}
                coinList={this.state.cryptoList}
                click={this.onCoinChangeHandler}
                currency={this.state.currency} />);
            alertBox = (<AlertBox
                alerts={alerts}
                currentCoin={this.state.currentCoin}
                currentPrice={this.state.coinsData[this.state.currentCoin].price}
                onAlertSubmit={this.onInputSubmitHandler}
                onDeleteAlert={this.onDeleteAlertHandler}
                onToggleAlertHandler={this.onToggleAlertHandler}
            />)
        } else {
            coinchart = <Loading />
        }

        return (
            <div className={classes.CoinAlert} >
                <TopBar clicked={this.onCurrencyChangeHandler} drawerToggle={this.drawerToggle} />
                {drawer}
                {coinchart}
                {alertBox}
            </div>
        );
    }
}

export default CoinAlertApp;