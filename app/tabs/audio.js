import React, { Component } from 'react'
import { StyleSheet, Text, View, Slider, TouchableHighlight } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TimeFormater from 'utils/time-formater.js'

export class Audio extends Component {
	constructor() {
		super()
		this.state = {
			isPlaying: false,
			currentTime: 0,
			duration: 3777788888
		}
	}

	componentWillUpdate(nextProps, nextStates){
		if(nextProps.audio !== this.props.audio){
			this.pause()
		}
	}

	setDuration(duration) {
		this.setDuration({ duration })
	}

	pause() {
		this.setState({ isPlaying: false })
	}

	togglePlayPause() {
		this.setState({ isPlaying: !this.state.isPlaying })
	}

	changeTrackPositon(newTime) {
		this.setState({ currentTime: newTime })
	}

	childrenProps(){
		const self = this
			, {slider, playPause, audio} = styles
			, {duration, currentTime, isPlaying} = this.state
		
		return{
			audioProps:{
				style: audio
			},
			sliderProps:{
				style: slider,
				minimumValue: 0,				
				maximumValue: duration,
				currentTime: currentTime 
			},
			timeProps: {
				duration,
				currentTime
			},
			playPauseProps:{
				style: playPause,
				isPlaying,
				onPress: self.togglePlayPause.bind(self)
			}
		}
	}

	render() {
		
		const {audioProps, sliderProps, timeProps, playPauseProps} = this.childrenProps()

		return (
			<View {...audioProps}>			
				<Slider {...sliderProps} />
				<Time  {...timeProps} />
				<PlayPause {...playPauseProps}  />
			</View>
		);
	}
}
				



class Time extends Component{
	constructor(){
		super()
		this.formater = new TimeFormater()
		this.state = {
			showDuration: true
		}
	}

	toggleDuration(){
		this.setState({showDuration: !this.state.showDuration})
	}

	duration(){
		const {duration} = this.props
		return this.state.showDuration ? <Text> - {this.formater.convert(duration)}</Text> : null
	}

	currentTime(){
		return <Text>{this.formater.convert(this.props.currentTime)}</Text>
	}

	render(){
		return (
			
			<TouchableHighlight onPress={this.toggleDuration.bind(this)}>
				<View style={styles.time}>
					{this.currentTime()}
					{this.duration()}
				</View>
			</TouchableHighlight>
		)
	}
}

// <Streaming />
class PlayPause extends Component {
	constructor() {
		super()
		const size = 200
		this.icons = {
			play: <MaterialIcons size={size} name="play-circle-outline" />,
			pause: <MaterialIcons size={size} name="pause-circle-outline" />
		}
	}
	render() {
		const {play, pause} = this.icons
			, Icon = () => this.props.isPlaying ? pause : play

		return (
			<TouchableHighlight onPress={this.props.onPress}>
				<Text style={this.props.style}> <Icon /> </Text>
			</TouchableHighlight>
		)

	}
}

const styles = StyleSheet.create({
	audio: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		paddingBottom: 130,
		paddingTop: 20,		
	},
	time:{
		flexDirection: 'row'
	},
	slider: {
		alignSelf: 'stretch',
	},
	playPause:{
		marginTop: 30
	}
});

