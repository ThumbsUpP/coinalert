import React from 'react';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle';
import classes from './AlertItem.module.css'
import Avatar from 'material-ui/Avatar';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-drop-up';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import DeleteSweep from 'material-ui/svg-icons/content/delete-sweep';

export default class CardExampleControlled extends React.Component {
    state = {
        expanded: false,
    };

    handleExpandChange = (expanded) => {
        this.setState({ expanded: expanded });
    };

    handleToggle = (event, toggle) => {
        this.setState({ expanded: toggle });
    };



/*  <AlertItem 
            active = {alert[1].active}
            coin = {alert[1].coin} 
            price = {alert[1].alertPrice} 
            dir = {alert[1].varDir} 
            key = {alert[0]} 
            delete = {() => props.delete(alert[0])}
            /> */

    render() {
        const styles = {
            header: {
                display: 'flex',
                justifyContent: 'space-around'
            },
            list: {
                backgroundColor: 'rgba(255, 255, 255, 0)',
                textAlign: 'left',
                color: 'white'
            },
            subtitleStyle: {
                width: '70px'
            },
            text: {
                display: 'flex',
                flexFlow: 'row-reverse',
                justifyContent: 'space-between',
                color: 'white'
            },
            icon: {
                color: 'white'
            },
            toggle: {
                alignSelf: 'center',
                right: 'Opx'
            },
            toggleLabel: {
                color: 'white'
            },
            deleteIcon: {
                mediumIcon: {
                    width: 36,
                    height: 36,
                },
                medium: {
                    width: 50,
                    height: 50,
                    alignSelf: 'flex-end',
                    padding: '0px'
                },
            },
            toggleStyle: {
                thumbSwitched: {
                    backgroundColor: '#59D3E5',
                },
                trackSwitched: {
                    backgroundColor: 'rgba(89, 210, 229, 0.5)',
                },
            }
        }

        return (
            <div className={classes.ListItem} >
                <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange} style={styles.list} >
                    <CardHeader
                        title={this.props.coin}
                        subtitleStyle={styles.subtitleStyle}
                        style={styles.header}
                        titleColor="white"
                        subtitleColor="white"
                        subtitle={'$' + this.props.price.toLocaleString()}
                        iconStyle={styles.icon}
                        avatar={this.props.dir === 'bullish' ? <Avatar backgroundColor='#59D3E5' icon={<ArrowUp />} /> : <Avatar backgroundColor='#F57071' icon={<ArrowDown />} />}
                        actAsExpander={true}
                        showExpandableButton={true}
                    >
                        <Toggle
                            toggled={this.props.active}
                            onToggle={this.props.onToggle}
                            labelPosition="right"
                            label={this.props.active ? "Active" : "Mute"}
                            labelStyle={styles.toggleLabel}
                            style={styles.toggle}
                            thumbSwitchedStyle={styles.toggleStyle.thumbSwitched}
                            trackSwitchedStyle={styles.toggleStyle.trackSwitched}
                        />
                    </CardHeader>
                    <CardText style={styles.text} expandable={true}>
                        <IconButton
                            tooltip="Delete alert"
                            onClick={this.props.delete}
                            iconStyle={styles.deleteIcon.mediumIcon}
                            style={styles.deleteIcon.medium} >
                            <DeleteSweep color='#F57071' />
                        </IconButton>
                        Lorem ipsum do
                    </CardText>
                </Card>
            </div >

        );
    }
}