import React from 'react'
import { Card} from 'semantic-ui-react';
import AlerItem from './alertItem'

const alertsCards = (props) => {
    const { alertsData } = props;

    let alertLists = null;
    //<AlerItem alerts = {props.alertsData} />
    console.log("Inside AlertsCadrs",Object.values(alertsData))

    if (Object.keys(props.alertsData).length !== 0){
        alertLists = Object.values(alertsData).map((el, i) => {
            return <AlerItem coin = {el.coin} price = {el.alertPrice} dir = {el.varDir} key = {i} onclick = {props.deleteAlert}/>
        }
        )
    }

    // 0: {coin: "ETH", alertPrice: 123, varDir: "bearish"}
    // 1: {coin: "ETH", alertPrice: 345, varDir: "bearish"}
    // 2: {coin: "ETH", alertPrice: 456, varDir: "bullish"}length: 3__proto__: Array(0)
    //1522877446882: {coin: "ETH", alertPrice: 123, varDir: "bearish"}__proto__: Object


return (
    <Card>
        <Card.Content>
          <Card.Header>
            Your alerts
          </Card.Header>
        </Card.Content>
        <Card.Content>
            {alertLists}
        </Card.Content>
    </Card>
)
}
  

export default alertsCards