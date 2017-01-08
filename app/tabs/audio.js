import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, Slider, TouchableHighlight } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TimeFormater from 'utils/time-formater.js'
import Streaming from 'react-native-video'
import { NoItem as NoAudio } from 'components/no-item.js'
import getIndexWithKeyValue from 'utils/get-index-with-key-value.js'

export class Audio extends Component {
	constructor() {
		super()
		this.state = {
			isPlaying: false,
			currentTime: 0,
			duration: 0,
			audioUrl: '',
			audioIndex: undefined
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
		//TODO
		this.pause()
	}

	setAudioIndexState(newIndex) {
		const {podcasts, audioUrl } = this.props
		this.setState({ audioIndex: newIndex || getIndexWithKeyValue(podcasts, 'audioUrl', audioUrl) })
	}

	componentWillUpdate(nextProps, nextStates) {
		if (nextProps.audioUrl !== this.props.audioUrl) {
			this.setState({ audioUrl: nextProps.audioUrl })
			this.setAudioIndexState()
		}
	}

	componentDidMount() {
		const {audioUrl} = this.props
		this.setAudioIndexState()
		this.setState({audioUrl})
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

	chooseOtherAudio(movement=0){
		const newIndex = this.state.audioIndex + movement
			, {audioUrl: newPodcastUrl} = this.props.podcasts[newIndex] || {}

		if (newPodcastUrl) {
			this.setState({ audioUrl: newPodcastUrl })
			this.setAudioIndexState(newIndex)
		}
		
	}

	next() {
		this.chooseOtherAudio(+1)
	}

	back() {
		this.chooseOtherAudio(-1)
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

	reset() {
		this.pause()
		this.setState({ currentTime: 0 })
	}

	onSlidingComplete(currentTime) {
		this.player.seek(currentTime)
	}



	childrenProps() {
		const self = this
			, {slider, playPause, audio, streaming} = styles
			, {duration, currentTime, isPlaying} = this.state



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

			audioFlowControlProps: {
				playPauseProps: {
					style: playPause,
					isPlaying,
					onPress: self.togglePlayPause.bind(self)
				},
				podcastControlProps: {
					nextProps: {
						type: 'next',
						action: self.next.bind(this)
					},
					backProps: {
						type: 'back',
						action: self.back.bind(this)
					}
				}
			},

			streamingProps: {
				ref: ref => self.player = ref,
				style: streaming,
				source: { uri: self.state.audioUrl  },
				volume: 1.0,
				rate: 1.0,
				paused: !isPlaying,
				repeat: false,
				playInBackground: true,
				onError: self.onError.bind(self),
				onLoad: self.startAudio.bind(self),
				onProgress: self.onProgress.bind(self),
				onEnd: ()=>{
					self.reset()
					self.next()					
				}
			}
		}
	}

	noAudio() {
		return <NoAudio message="Você ainda não selecionou nenhum podcast" icon="radio" />
	}

	audioController() {
		const {audioProps, sliderProps, timeProps, audioFlowControlProps, streamingProps} = this.childrenProps()

		return (
			<View {...audioProps}>
				<Slider {...sliderProps} />
				<Time  {...timeProps} />
				<AudioFlowControl {...audioFlowControlProps} />
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
	podcasts: PropTypes.array.isRequired
}

class AudioFlowControl extends Component {

	shouldComponentUpdate(nexProps){
		if(nexProps.playPauseProps.isPlaying !== this.props.playPauseProps.isPlaying){
			return true
		}
		return false
	}

	render() {
		const {playPauseProps, podcastControlProps} = this.props
			, {nextProps, backProps} = podcastControlProps


		return (
			<View>
				<PodcastSelector {...backProps} />
				<PlayPause {...playPauseProps} />
				<PodcastSelector {...nextProps} />
			</View>
		)
	}
}

class PodcastSelector extends Component {
	constructor(props) {
		super()
		this.setIcon(props)
	}

	setIcon(props) {
		const {type} = props
		if (type === 'back') this.icon = 'skip-previous'
		else if (type == 'next') this.icon = 'skip-next'
	}

	shouldComponentUpdate() {
		return false
	}

	render() {
		return (
			<TouchableHighlight onPress={this.props.action}>
				<Text style={this.props.style}>
					<MaterialIcons size={30} name={this.icon} />
				</Text>
			</TouchableHighlight>
		)
	}
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

