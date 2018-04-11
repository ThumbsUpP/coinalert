import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import classes from './Tabs.module.css'

const styles = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    inkBar : {
        backgroundColor: '#52D3E7',
    },
    tabItemContainer : {
        backgroundColor: 'rgba(255, 255, 255, 0.1)'
    }
};

const TimeTabs = () => (
  <Tabs className = {classes.Tabs} inkBarStyle={styles.inkBar} tabTemplateStyle ={null} tabItemContainerStyle ={styles.tabItemContainer}  >
    <Tab label="daily" >
    </Tab>
    <Tab label="monthly"  >
    </Tab>
  </Tabs>
);

export default TimeTabs;