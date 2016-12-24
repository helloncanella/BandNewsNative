import React, { Component } from 'react'
import { StyleSheet, Text, View, Slider } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export class Audio extends Component {
	constructor() {
		super()
		this.state = {
			isPlaying: false,
			currentTime: 0,
			duration: 1
		}
	}

	shouldComponentUpdate(nextProps, nextStates) {
		if (this.props.audio !== nextProps.audio) {
			return true
		}
		return false
	}

	componentDidUpdate() {

	}

	componentWillUpdate() {
		this.pause()
	}

	setDuration(duration) {
		this.setDuration({ duration })
	}

	pause() {
		this.setState({ isPlaying: false })
	}

	play() {
		this.setState({ isPlaying: true })
	}

	changeTrackPositon(newTime) {
		this.setState({ currentTime: newTime })
	}

	render() {
		const {slider, playPause} = styles
		return (
			<View style={styles.audio}>
				<Slider style={slider} minimumValue={0} maximumValue={this.state.duration} />
				<PlayPause style={playPause} isPlaying={this.state.isPlaying} play={this.play.bind(this)} pause={this.pause.bind(this)} />
			</View>
		);
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
			, Icon = () => this.props.isPlaying ? play : pause
		return <View style={this.props.style}><Icon /></View>
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
	slider: {
		alignSelf: 'stretch',
	},
	playPause:{
		marginTop: 30
	}
});

