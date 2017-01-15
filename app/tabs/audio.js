import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, Slider, TouchableHighlight } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import TimeFormater from 'utils/time-formater.js'
import Streaming from 'react-native-video'
import { NoItem as NoAudio } from 'components/no-item.js'
import getIndexWithKeyValue from 'utils/get-index-with-key-value.js'
import { grid, color, typography } from 'styles/global.js'

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

	getAudioIndex(audioUrl, podcasts) {
		return getIndexWithKeyValue(podcasts||this.props.podcasts, 'audioUrl', audioUrl)
	}

	setAudioIndexState(newIndex) {
		this.setState({ audioIndex: newIndex })
	}

	componentWillUpdate(nextProps, nextStates) {
		if (nextProps.audioUrl !== this.props.audioUrl) {
			const {audioUrl, podcasts : newPodcasts}  = nextProps
			this.setState({ audioUrl: nextProps.audioUrl })
			this.setAudioIndexState(this.getAudioIndex(nextProps.audioUrl, newPodcasts))
		}
	}


	componentDidMount() {
		const {audioUrl} = this.props
		this.setAudioIndexState(this.getAudioIndex(audioUrl))
		this.setState({ audioUrl })
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

	chooseOtherAudio(movement = 0) {
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
		this.player.seek(0)
		this.setState({ currentTime: 0 })
	}

	onSlidingComplete(currentTime) {
		this.player.seek(currentTime)
	}



	childrenProps() {
		const self = this
			, {slider, playPause, audio, streaming} = styles
			, {duration, currentTime, isPlaying, audioIndex} = this.state
			, podcast = !isNaN(audioIndex) ? this.props.podcasts[audioIndex] : {}
			, {	description = '', date = '', columnTitle = ''} = podcast

		return {
			audioProps: {
				style: audio
			},

			timeFlowProps: {
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
			},

			podcastDetails: {
				description,
				date,
				columnTitle
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
				source: { uri: self.state.audioUrl },
				volume: 1.0,
				rate: 1.0,
				paused: !isPlaying,
				repeat: false,
				playInBackground: true,
				onError: self.onError.bind(self),
				onLoad: self.startAudio.bind(self),
				onProgress: self.onProgress.bind(self),
				onEnd: () => {					
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
		const {audioProps, timeFlowProps, audioFlowControlProps, streamingProps, podcastDetails} = this.childrenProps()
			, {stretch} = styles
		return (
			<View {...audioProps}>
				<PodcastDetails {...podcastDetails} />
				<View style={stretch}>
					<TimeFlow {...timeFlowProps} />
					<AudioFlowControl {...audioFlowControlProps} />
					<Streaming {...streamingProps} />
				</View>
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

class PodcastDetails extends Component {
	render() {
		const {description, columnTitle, date} = this.props
			, {podcastDetails, descriptionStyle, columnTitleStyle, dateStyle} = styles
		return (
			<View style={podcastDetails}>
				<Text style={columnTitleStyle}>{columnTitle}</Text>
				<Text style={descriptionStyle}>{description}</Text>
				<Text style={dateStyle}>{date}</Text>
			</View>
		)
	}
}


class AudioFlowControl extends Component {

	shouldComponentUpdate(nexProps) {
		if (nexProps.playPauseProps.isPlaying !== this.props.playPauseProps.isPlaying) {
			return true
		}
		return false
	}

	render() {
		const {playPauseProps, podcastControlProps} = this.props
			, {nextProps, backProps} = podcastControlProps
			, {audioFlowControl} = styles
			, iconSize = 50
			, colorStyle = { color: color.secondary }

		return (
			<View style={audioFlowControl}>
				<PodcastSelector {...backProps} size={iconSize} style={colorStyle} />
				<PlayPause {...playPauseProps} size={iconSize} style={colorStyle} />
				<PodcastSelector {...nextProps} size={iconSize} style={colorStyle} />
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
					<MaterialIcons size={this.props.size} name={this.icon} />
				</Text>
			</TouchableHighlight>
		)
	}
}

class TimeFlow extends Component {
	render() {
		const {sliderProps, timeProps} = this.props
			, {timeFlow} = styles
		return (
			<View style={timeFlow}>
				<Slider {...sliderProps} />
				<Time  {...timeProps} />
			</View>
		)
	}
}

class Time extends Component {
	constructor() {
		super()
		this.formater = new TimeFormater()
	}

	duration() {
		const {duration} = this.props
		return <Text style={styles.timeText}>{this.formater.convert(duration)} </Text>
	}

	currentTime() {
		return <Text style={styles.timeText}>{this.formater.convert(this.props.currentTime)}</Text>
	}

	render() {

		const Duration = () => this.duration()
			, CurrentTime = () => this.currentTime()

		return (
			<View style={styles.time}>
				<CurrentTime />
				<Duration />
			</View>
		)
	}
}

class PlayPause extends Component {
	constructor(props) {
		super()
		const size = props.size
		this.icons = {
			play: <MaterialIcons size={size} name="play-arrow" />,
			pause: <MaterialIcons size={size} name="pause" />
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
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 20,
	},
	stretch: {
		alignSelf: 'stretch'
	},
	podcastDetails: {
		paddingLeft: grid.padding,
		paddingRight: grid.padding
	},
	descriptionStyle: {
		fontSize: typography.big,
		color: color.primary,
		marginBottom: 5
	},
	columnTitleStyle: {
		fontSize: typography.normal,
		color: color.secondary,
		marginBottom: 5,
	},
	dateStyle: {
		fontSize: typography.normal,
		color: color.secondary,
	},
	timeFlow: {
		alignSelf: 'stretch',
		marginBottom: 3
	},
	time: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: grid.padding,
		paddingRight: grid.padding
	},
	timeText: {
		fontSize: 12.5,
		color: color.secondary
	},
	slider: {
		alignSelf: 'stretch',
	},
	playPause: {
		marginTop: 0
	},
	audioFlowControl: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 20,
	},
	streamming: {
		height: 0,
		opacity: 0
	}
});

