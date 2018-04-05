import React from 'react'
import { Card } from 'semantic-ui-react';
import AlerItem from './alertItem'

const contentCard = (props) => {

    const { alertsData } = props;
    let alertLists = null;

    // Checking if price alert exist in the state, then maping the state to render alert item
    if (Object.keys(props.alertsData).length !== 0){
        alertLists = Object.entries(alertsData).map((alert, i) => {
            
            return (<AlerItem 
                coin = {alert[1].coin} 
                price = {alert[1].alertPrice} 
                dir = {alert[1].varDir} 
                key = {alert[0]} 
                removed = {() => props.deleteAlert(alert[0])}
                />)
        }
        )
    }

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
  

export default contentCard