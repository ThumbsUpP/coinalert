import React, { Component } from 'react';
import classes from './AlertBox.module.css';
import FlatButton from 'material-ui/FlatButton';
import Modal from '../UI/modal/modal'
import AlertList from './AlertList/AlertList'


class AlertBox extends Component {
    state = {
        open: false,
        PriceInSlider: this.props.currentPrice
    };

    handleOpen = () => {
        this.setState({ open: true });
        this.setState({ PriceInSlider: this.props.currentPrice })
    };

    handleClose = () => {
        this.setState({ open: false });
        this.setState({ PriceInSlider: this.props.currentPrice })
    };
    handleSubmit = () => {
        this.setState({ open: false });
        this.props.onAlertSubmit(this.state.PriceInSlider)
    };

    handleSlider = (event, value) => {
        this.setState({ PriceInSlider: value });
    };


    render() {

        const styles = {
            flatButton: {
                backgroundColor: '#F57071',
                color: 'white',
                height: '52px',
                borderRadius: '5px'
            }
        }

        let AlertUI = null;
        if (!Object.values(this.props.alerts).length) {
            AlertUI = (<div className={classes.SetAlertButton} >
                <FlatButton label={'Set alert'}
                    style={styles.flatButton}
                    fullWidth={true}
                    onClick={this.handleOpen}
                />
            </div>)
        } else {
            AlertUI = (
                <div className={classes.SetAlertButton} >
                <FlatButton label={'Set alert'}
                    style={styles.flatButton}
                    fullWidth={true}
                    onClick={this.handleOpen}
                />
            <AlertList
                alerts={this.props.alerts}
                delete = {this.props.onDeleteAlert}
                onToggleHandler = {this.props.onToggleAlertHandler}
            /></div>
            )
        }

        return (
            <div>
                {AlertUI}
                <Modal
                    handleClose={this.handleClose}
                    handleOpen={this.handleOpen}
                    handleSubmit={this.handleSubmit}
                    handleSlider={this.handleSlider}
                    priceSlider={this.state.PriceInSlider}
                    open={this.state.open}
                    price={this.props.currentPrice}
                    coin={this.props.currentCoin}
                />
            </div>
        );
    }
}

export default AlertBox;