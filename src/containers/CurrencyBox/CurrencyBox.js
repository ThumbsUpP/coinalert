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
    alerts : {}
  }

  componentWillMount () {
    //Setting coinsdata state based on this.state.cryptoList
    const coinData = {...this.state.coinsData};
    this.state.cryptoList.map(el => {  
      coinData[el] = {
        price : 0,
        historicData: null
      }
      this.setState({coinsData: coinData})
      return el
    })
  }

  componentDidMount () {
    //Fetching coins data (price and historic in 2 nested requests)
      this.state.cryptoList.map(el => {
        axios.get(`/price?fsym=${el}&tsyms=USD`).then(response => {
          let nextState = {...this.state};
          nextState.coinsData[el].price = response.data.USD;
        })
        .then(axios.get(`/histohour?fsym=${el}&tsym=USD&limit=11`).then(response => {
          let futureState = {...this.state};
          futureState.coinsData[el].historicData = response.data.Data;
          }).catch(err => console.log(err)))
        .catch(err => console.log(err));
        return el
      })
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
  // set alerts price with value + coinname 
  const newAlert = {...this.state.alerts}
  newAlert[(new Date()).getTime()] = {
    coin : this.state.currentCoin,
    alertPrice : this.state.inputPrice,
    varDir : this.state.coinsData[this.state.currentCoin].price > this.state.inputPrice ? 'bearish' : 'bullish'
  };
  this.setState({alerts: newAlert})
}
onDeleteAlertHandler = () => {
  
}

  render() {

  let priceInfo = null;
  if (this.state.currentCoin){
    priceInfo = (
      <div className="priceInf">
        <p>${this.state.coinsData[this.state.currentCoin].price}</p>
        <Chart props={this.state.coinsData[this.state.currentCoin].historicData} />
        <div className="InputIcon">
          <InputIcon changed={this.onInputChangeHandler} />
          <Button style={{margin : '5px'}} circular icon='checkmark' onClick={this.onInputSubmitHandler} />
        </div>
        <div className="ContentCard" style={{width : '300px'}} >
          <ContentCard  alertsData={this.state.alerts} deleteAlert = {this.onDeleteAlertHandler} />
        </div>
        
      </div>);
    }

    return (
      <div className="CurrencyBox">
        <p style={{width: '80%'}} >Get a Chrome notification whenever a coin reachs your alert price</p>
        <div className="DropDown">
          <DropdownCurrency clicked = {this.onCoinChangeHandler}/>
        </div>
          {priceInfo}
          
      </div>
    );
  }
}

export default CurrencyBox;
