import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Slider from 'material-ui/Slider';



class modal extends Component {
	state = {
		alertSlider : this.props.price
	}

	handleSlider = (event, value) => {
		this.setState({alertSlider: value});
	  };

	render() {

		const styles = {
			sliderRoot : {
				marginBottom : 'Opx',
				color :'red'
			},
			sliderStyle : {
				marginBottom : 'Opx',
				color :'red'
			}
		}

		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={this.props.handleClose}
			/>,
			<FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={true}
				onClick={this.props.handleSubmit}
			/>,
		];
		return (
			<div>
				<Dialog
					title={`Set alert for ${this.props.coin}`}
					actions={actions}
					modal={false}
					open={this.props.open}
					onRequestClose={this.props.handleClose}
				>
					<TextField
						id="text-field-default"
						floatingLabelText="Alert price :"
						value={this.props.priceSlider}
						onChange={this.props.handleSlider}
					/>
					<Slider
						min={this.props.price * 0.9}
						max={this.props.price * 1.1}
						step={0.1}
						value={this.props.priceSlider}
						onChange={this.props.handleSlider}
						style = {styles.sliderRoot}
						sliderStyle = {styles.sliderStyle}
					/>
        		</Dialog>
			</div>
		);
	}
}

export default modal;
