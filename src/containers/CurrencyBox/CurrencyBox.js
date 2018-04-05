import React, { Component } from 'react';
import DropdownCurrency from '../../components/UI/DropdownCurrency';
import axios from '../../axios';
import Chart from '../../components/Chart/Chart';
import InputIcon from '../../components/UI/InputField';
import './CurrencyBox.css';
import { Button } from 'semantic-ui-react';
import ContentCard from '../../components/UI/ContentCard';


class CurrencyBox extends Component {
  state = { 
    cryptoList : ['ETH', 'BTC'],
    currentCoin : "",
    inputPrice: 0,
    coinsData: {},
    alerts : {},

  }

  componentWillMount () {

    
    //Setting coinsdata state based on this.state.cryptoList
    const coinData = {...this.state.coinsData};
    this.state.cryptoList.map(el => {  
      coinData[el] = {
        price : 0,
        historicData: null
      }
      return this.setState({coinsData: coinData})
    })
  }


  componentDidMount () {
    this.updateCoinsData()
    this.interval = setInterval(() => this.updateCoinsData(), 5000);
    //const myNotification = new Notification('test notifs')
  
  }

  // helper method to check if coin price reached alert price
  checkThresholdPriceAlert = () => {
    const {coinsData, alerts} = this.state;
  
    if (Object.entries(alerts).length !== 0) {
      Object.entries(alerts).map((alert, i) =>{

        // Setting variable to use
        const active = alert[1].active
        const coinChecked = alert[1].coin;
        const alertPriceChecked = alert[1].alertPrice;
        const varDirChecked = alert[1].varDir;
        const keyChecked = alert[0];

        if (active){
          if (varDirChecked === 'bullish'){
            // eslint-disable-next-line
          coinsData[coinChecked].price > alertPriceChecked ? this.AlertUserThresholdPrice(keyChecked, coinChecked,  alertPriceChecked, 'bullish') : null 
        } else {
           // eslint-disable-next-line
          coinsData[coinChecked].price < alertPriceChecked ? this.AlertUserThresholdPrice(keyChecked, coinChecked,  alertPriceChecked, 'bearish'): null
        }
        }
        return null
    })}
    
    //1522926392182: {coin: "ETH", alertPrice: 123, varDir: "bearish"}
    //BTC: {price: 6785.32, historicData: Array(12)}historicData: (12) 
    
  }
  AlertUserThresholdPrice = (key, coin, price, type) => {
    alert(`Alert price reached for ${coin} at ${price} for your ${type} alert ${key} `);
    const updatedAlerts = {...this.state.alerts}
    updatedAlerts[key].active = false
    this.setState({alerts : updatedAlerts })
  }
  updateCoinsData = () => {
    //Fetching coins data (price and historic in 2 nested requests)
    let nextCoinsData = {...this.state.coinsData};

      this.state.cryptoList.map(el => {
        return axios.get(`/price?fsym=${el}&tsyms=USD`).then(response => {
            nextCoinsData[el].price = response.data.USD})
          .then(axios.get(`/histohour?fsym=${el}&tsym=USD&limit=11`)
            .then(response => {
            nextCoinsData[el].historicData = response.data.Data;
            }).catch(err => console.log(err)))
          .catch(err => console.log(err));
      })
      this.setState({coinsData: nextCoinsData});
      return this.checkThresholdPriceAlert()
  }
 
  onCoinChangeHandler = (event) => {
    //setting current coin value
    this.setState({currentCoin: event.target.innerText})
  }
  onInputChangeHandler = (e, data) => {
    const { value } = data
    this.setState({inputPrice: parseFloat(value)})
  }
  onInputSubmitHandler = () => {
    // set alerts price with value + coin name 
    const newAlert = {...this.state.alerts}
    newAlert[(new Date()).getTime()] = {
      active : true,
      coin : this.state.currentCoin,
      alertPrice : this.state.inputPrice,
      varDir : this.state.coinsData[this.state.currentCoin].price > this.state.inputPrice ? 'bearish' : 'bullish'
    };
    this.setState({alerts: newAlert})
  }
  onDeleteAlertHandler = (key) => {
    const updatedAlerts = {...this.state.alerts};
    delete updatedAlerts[key];
    this.setState({alerts : updatedAlerts})
  }

  render() {

  let priceUI = null;
  let alertUI = (Object.keys(this.state.alerts).length !== 0) ? (
        <div className="ContentCard" style={{width : '300px'}} >
          <ContentCard  alertsData={this.state.alerts} deleteAlert={this.onDeleteAlertHandler} />
        </div>) : null;
  
  ;
  if (this.state.currentCoin){
    priceUI = (
      <div className="priceInf">
        <p>${this.state.coinsData[this.state.currentCoin].price}</p>
        <Chart props={this.state.coinsData[this.state.currentCoin].historicData} />
        <div className="InputIcon">
          <InputIcon changed={this.onInputChangeHandler} />
          <Button style={{margin : '5px'}} circular icon='checkmark' onClick={this.onInputSubmitHandler} />
        </div>
        {alertUI}
      </div>);
    }

    return (
      <div className="CurrencyBox">
        <p style={{width: '80%'}} >Get a Chrome notification whenever a coin reachs your alert price</p>
        <div className="DropDown">
          <DropdownCurrency clicked = {this.onCoinChangeHandler}/>
        </div>
          {priceUI}
          
      </div>
    );
  }
}

export default CurrencyBox;
