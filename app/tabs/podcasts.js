import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { List } from 'components/list.js'
import PodcastList from 'utils/podcast-list.js'
import printError from 'utils/onError.js'
import {NoItem as NoPodcasts} from 'components/no-item.js'

export class Podcasts extends Component {
    constructor() {
        super()
        this.state = {
            podcasts: [],
            fetching: false
        }
    }

    //formating data to push to the List Component
    formatListData(podcasts) {
        return podcasts.map((podcast) => {
            const {date, description, audioUrl} = podcast
            return {
                primaryText: description,
                id: audioUrl,
                secondaryText: date
            }
        })
    }

    isFetching() {
        return this.state.fetching
    }

    startFetching() {
        this.setState({ fetching: true })
    }

    endFetching() {
        this.setState({ fetching: false })
    }

    fetchPodcasts() {
        const {columnist} = this.props

        if (columnist) {
            const {setState, formatListData, endFetching} = this
                , self = this

            this.startFetching()

            return new PodcastList(columnist)
                .fetch()
                .then(podcasts => formatListData(podcasts))
                .then(podcasts => self.setState({ podcasts, fetching: false }))
                .catch((error) => {
                    printError(error)
                    endFetching()
                })
        }

    }

    shouldComponentUpdate() {
        //TODO
        return true
    }

    componentDidUpdate(nexProps, nexState) {
        if (nexProps.columnist !== this.props.columnist) {
            this.fetchPodcasts()
        }
    }

    componentDidMount() {
        this.fetchPodcasts()
    }

    noPodcasts(){
        return <NoPodcasts message="Você ainda não selecionou nenhum colunista" icon="face" />
    }

    list(){
        return <List onSelectItem={this.props.selectAudio} data={this.state.podcasts} />
    }

    render() {      
        return !this.props.columnist ? this.noPodcasts() : (!this.isFetching() ? this.list() : <Text>Loading...</Text>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

Podcasts.propTypes = {
    columnist: PropTypes.string.isRequired,
    selectAudio: PropTypes.func.isRequired
}
