import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, Slider, TouchableHighlight } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TimeFormater from 'utils/time-formater.js'
import Streaming from 'react-native-video'
import { NoItem as NoAudio } from 'components/no-item.js'

export class Audio extends Component {
	constructor() {
		super()
		this.state = {
			isPlaying: false,
			currentTime: 0,
			duration: 0
		}
	}

	onError(error) {
		//TODO - adjust
		console.log(error)
	}

	shouldComponentUpdate(nextProps, nextStates) {
		// if(this.state.currentTime && nextStates.currentTime === this.state.currentTime) return false
		return true
	}

	reset() {
		this.pause()
	}

	componentWillUpdate(nextProps, nextStates) {
		if (nextProps.audio !== this.props.audio) {
			this.pause()
		}
	}

	setDuration(duration) {
		this.setState({ duration })
	}

	startAudio({duration}) {
		this.setDuration(duration)
		this.play()
	}

	pause() {
		this.setState({ isPlaying: false })
	}

	play() {
		this.setState({ isPlaying: true })
	}

	togglePlayPause() {
		this.setState({ isPlaying: !this.state.isPlaying })
	}

	onProgress({currentTime}) {
		if (currentTime !== this.state.currentTime) {
			this.changeTrackPositon(currentTime)
		}
	}

	changeTrackPositon(currentTime) {
		this.setState({ currentTime })
	}

	onSlidingComplete(currentTime) {
		this.player.seek(currentTime)
	}

	childrenProps() {
		const self = this
			, {slider, playPause, audio, streaming} = styles
			, {duration, currentTime, isPlaying} = this.state
			, {audioUrl} = this.props

		return {
			audioProps: {
				style: audio
			},
			sliderProps: {
				style: slider,
				minimumValue: 0,
				maximumValue: duration,
				value: currentTime,
				onSlidingComplete: self.onSlidingComplete.bind(self)
			},
			timeProps: {
				duration,
				currentTime
			},
			streamingProps: {
				ref: ref => self.player = ref,
				style: streaming,
				source: { uri: audioUrl },
				volume: 1.0,
				rate: 1.0,
				paused: !isPlaying,
				repeat: false,
				playInBackground: true,
				onError: self.onError.bind(self),
				onLoad: self.startAudio.bind(self),
				onProgress: self.onProgress.bind(self),
				onEnd: self.reset.bind(self)
			}
		}
	}

	noAudio() {
		return <NoAudio message="Você ainda não selecionou nenhum podcast" icon="radio" />
	}

	audioController() {
		const {audioProps, sliderProps, timeProps, playPauseProps, streamingProps} = this.childrenProps()

		return (
			<View {...audioProps}>
				<Slider {...sliderProps} />
				<Time  {...timeProps} />
				<AudioFlow />
				<Streaming {...streamingProps} />
			</View>
		)
	}

	render() {
		return !this.props.audioUrl ? this.noAudio() : this.audioController()
	}
}

Audio.propTypes = {
	audioUrl: PropTypes.string.isRequired,
}


class AudioFlow extends Compoment {

	childrenProps() {
		return {


			playPauseProps: {
				style: playPause,
				isPlaying,
				onPress: self.togglePlayPause.bind(self)
			},
		}
	}

	render() {
		const {playPauseProps} = this.childrenProps()

		return (
			<View style={}>
				<Back />
				<PlayPause {...playPauseProps} />
				<Forward />
			</View>
		)
	}
}

class Back extends Compoment {
	render() {

	}
}

class Forward extends Compoment {
	render() {
		<TouchableHighlight onPress={this.toggleDuration.bind(this)}>
			<View style={styles.time}>
				{this.currentTime()}
				{this.duration()}
			</View>
		</TouchableHighlight>
	}
}


class PodcastSelector extends Compoment{

}




class Time extends Component {
	constructor() {
		super()
		this.formater = new TimeFormater()
		this.state = {
			showDuration: true
		}
	}

	toggleDuration() {
		this.setState({ showDuration: !this.state.showDuration })
	}

	duration() {
		const {duration} = this.props
		return this.state.showDuration ? <Text style={styles.timeText}> | {this.formater.convert(duration)}</Text> : null
	}

	currentTime() {
		return <Text style={styles.timeText}>{this.formater.convert(this.props.currentTime)}</Text>
	}

	render() {
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
	time: {
		flexDirection: 'row',
	},
	timeText: {
		fontSize: 25
	},
	slider: {
		alignSelf: 'stretch',
	},
	playPause: {
		marginTop: 30
	},
	streamming: {
		height: 0,
		opacity: 0
	}
});

