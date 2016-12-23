import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import Video from 'react-native-video'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Columnists } from 'components/columnists.js'
import { Audio } from 'components/audio.js'
import { Podcasts } from 'components/podcasts.js'

export class Index extends Component {
	constructor() {
		super()
		this.state = {
			selectedAudio: '',
			selectedColumnist: ''
		}
	}

	// shouldComponentUpdate(){
	// 	let shouldUpdate = false

	// 	return shouldUpdate
	// }

	selectColumnist(name) {
		this.setState({ selectedColumnist: name })
	}

	selectAudio(url) {
		this.setState({ selectedAudio: url })
	}

	childrenProps() {
		const self = this

		return {
			columnistProps: { 
				selectColumnist: self.selectColumnist.bind(self) 
			},
			podcastsProps: {
				columinist: self.state.selectedColumnist,
				selectAudio: self.selectAudio.bind(self)
			},
			audioProps: {
				audio: self.state.selectedAudio
			}
		}

	}

	render() {
		const {columnistProps, podcastsProps, audioProps} = this.childrenProps()

		return (
			<ScrollableTabView style={styles.container}>
				<Columnists tabLabel="Colunistas" {...columnistProps} />
			</ScrollableTabView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

				// <Podcasts tabLabel="Podcasts" {...podcastsProps} />
				// <Audio tabLabel="Audio" {...audioProps} />
