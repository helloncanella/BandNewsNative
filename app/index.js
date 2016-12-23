import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import Video from 'react-native-video'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Columnists } from 'tabs/columnists.js'
import { Audio } from 'tabs/audio.js'
import { Podcasts } from 'tabs/podcasts.js'

export class Index extends Component {

	constructor() {
		super()
		this.state = {
			selectedAudio: '',
			selectedColumnist: '',
			tab: 0
		}
	}

	selectColumnist(name) {
		this.setState({ selectedColumnist: name, tab: 1})
	}

	selectAudio(url) {
		this.setState({ selectedAudio: url, tab: 2 })
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
			<ScrollableTabView style={styles.container} page={this.state.tab}>
				<Columnists tabLabel="Colunistas" {...columnistProps} />
				<Podcasts tabLabel="Podcasts" {...podcastsProps} />
				<Audio tabLabel="Audio" {...audioProps} />
			</ScrollableTabView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});