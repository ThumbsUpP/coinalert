import React from 'react';
import { List } from 'material-ui/List';
import AlertItem from './AlertItem/AlertItem'
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import classes from './AlertList.module.css'

const AlertList = (props) => {

    const styles = {
        list: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '5px',
            padding: '0px'
        },
        sub: {
            fontWeight: '500',
            color : 'white',
            textAlign: 'left',
            fontSize : '18px'
        },
        divider: {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
        },
    }
    console.log(props);

    const AlertListItem = Object.entries(props.alerts).map(alert => {
        return (<AlertItem 
            onToggle = {() => props.onToggleHandler(alert[0])}
            active = {alert[1].active}
            coin = {alert[1].coin} 
            price = {alert[1].alertPrice} 
            dir = {alert[1].varDir} 
            key = {alert[0]} 
            delete = {() => props.delete(alert[0])}
            time = {alert[0]} 
            />)
        
    })


    return (
        <div className={classes.List} >
            <List style = {styles.list} >
                <Subheader inset={true} style = {styles.sub}>Alerts</Subheader>
                <Divider style = {styles.divider}  />
                {AlertListItem}
    
            </List></div>

    )

}
    ;

export default AlertList;