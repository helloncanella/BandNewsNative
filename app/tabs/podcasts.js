import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { List } from 'components/list.js'
import PodcastList from 'utils/podcast-list.js'
import printError from 'utils/onError.js'

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

    endFetching() {
        this.setState({ fetching: false })
    }

    fetchPodcasts() {
        const {setState, formatListData} = this
            , {columnist} = this.props
            , self = this

            console.log(columnist)

       return new PodcastList(columnist)
            .fetch()
            .then(podcasts => formatListData(podcasts))
            .then(podcasts => self.setState({ podcasts, fetching: false  }))            
            .catch(printError)
    }

    componentWillUpdate(nexProps, nexState) {
        console.log({nexState})

        const endFetching = this.endFetching.bind(this)
        if (nexProps.columnist !== this.props.columnist) {
            this.setState({ fetching: true })
            this.fetchPodcasts().then(endFetching)
        }
    }

    render() {
        const list = <List onSelectItem={this.props.selectAudio} data={this.state.podcasts} />
            , component = !this.isFetching() ? list : <Text>Loading...</Text>

        return component
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
