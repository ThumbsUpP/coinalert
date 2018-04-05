import React from 'react';
import { Icon, Item } from 'semantic-ui-react';
import Radium from 'radium';

const alertItem = (props) => {
  
  const style = { 
    delIcon : {
      position: 'absolute', 
      right: '0',
      ':hover': {
        color: '#555',
        transform: 'scale(1)',
        transition: 'opacity 0.2s, color 0.2s, transform 0.2s',
      },
    }
  }

  return(
    <Item>
        <Icon name={props.active ? 'alarm' : 'alarm mute'} color='red' size='large' circular/>
      <Item.Content >
        <Icon className='DelIcon' name='delete' color='grey' size='small' onClick={props.removed} style={style.delIcon} key={(new Date()).getTime()} />
        <Item.Header>
          {props.coin}
        </Item.Header>
        <Item.Description>
            ${props.price}
        </Item.Description>
        
      </Item.Content> 
    </Item>
    
)}

export default Radium(alertItem)
