import React, { Component } from 'react'
import { StyleSheet, Text, View, Slider } from 'react-native'

export class Audio extends Component {
	constructor(){
		super()
		this.state = {
			isPlaying: false,
			currentTime: 0,
			duration: 0
		}
	}

	shouldComponentUpdate(nextProps, nextStates){
		if(this.props.audio !== nextProps.audio){
			return true
		}	
		return false
	}

	componentDidUpdate(){

	}

	setDuration(duration){
		this.setDuration({duration})
	}

	pause(){
		this.setState({isPlaying: false})
	}

	play(){
		this.setState({isPlaying: true})
	}

	changeTrackPositon(newTime){
		this.setState({currentTime: newTime})
	}

	render() {
		const {slider} = styles		
		return (
			<View style={styles.audio}>
				<Slider style={slider} minimumValue={0} maximumValue={this.duration}/>
				<PlayPause isPlaying={this.state.isPlaying}/>
			</View>
		);
	}
}



// <Streaming />

class PlayPause extends Component{
	render(){
		return (
			<View></View>
		)
	}
}

const styles = StyleSheet.create({
	audio: {
		flex: 1,
		justifyContent: 'center',
		alignSelf: 'stretch',
	},
	slider:{
		flex: 1,
	}
});

