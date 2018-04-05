import React from 'react'
import { Icon, Item } from 'semantic-ui-react'

const alertItem = (props) => (


  <Item.Group>
    <Item>
        <Icon name='alarm' />
      <Item.Content verticalAlign='middle'>
        <Item.Header>
          {props.coin}
        </Item.Header>
        <Item.Description>
            {props.price}
        </Item.Description>
         
      </Item.Content>
    </Item>
  </Item.Group>
)

export default alertItem

//{props.coinname}
//{props.alertPrice}