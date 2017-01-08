import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { List } from 'components/list.js'
import PodcastList from 'utils/podcast-list.js'
import printError from 'utils/onError.js'
import { NoItem as NoPodcasts } from 'components/no-item.js'
import { Downloading } from 'components/downloading.js'
import TimeFormater from 'utils/time-formater.js'

const timeFormater = new TimeFormater()

export class Podcasts extends Component {
    constructor() {
        super()
        this.state = {
            podcasts: [],
            fetching: false
        }
        this.endFetching = this.endFetching.bind(this)
        this.startFetching = this.startFetching.bind(this)
        this.handleError = this.handleError.bind(this)
        this.storePodcasts = this.storePodcasts.bind(this)
    }

    //formating data to push to the List Component
    formatPodcastsRawInfo(podcasts) {
        return podcasts.map((podcast) => {
            const {date, description, audioUrl} = podcast
            return {
                primaryText: description,
                payload: audioUrl,
                secondaryText: timeFormater.portugueseDate(date)
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

    storePodcasts(podcasts) {
        const {formatPodcastsRawInfo} = this
        this.props.setPodcasts(podcasts)
        this.setState({ podcasts: formatPodcastsRawInfo(podcasts)})
    }

    handleError(error) {
        printError(error)
        this.endFetching()
    }

    fetchPodcasts() {
        const {columnist} = this.props

        if (columnist) {
            const {handleError, storePodcasts, endFetching} = this

            this.startFetching()

            return new PodcastList(columnist)
                .fetch()               
                .then(storePodcasts)
                .then(endFetching)
                .catch(handleError)
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

    noPodcasts() {
        return <NoPodcasts message="Você ainda não selecionou nenhum colunista" icon="face" />
    }

    list() {
        return <List onSelectItem={this.props.selectAudio} data={this.state.podcasts} />
    }

    render() {
        return !this.props.columnist ? this.noPodcasts() : (!this.isFetching() ? this.list() : <Downloading timeout={20000} />)
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
