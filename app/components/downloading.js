import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NoItem as Error } from 'components/no-item.js'
import {Loading} from 'components/loading.js'

export class Downloading extends Component {

    constructor() {
        super()
        this.state = {
            downloadFailed: false
        }
        this.clearTimeout = this.clearTimeout.bind(this)
    }

    error() {
        return <Error message="Problemas na sua conexão com a internet." icon="cancel" />
    }

    activityIndicator() {
        const {container} = styles
        return <Loading message="Carregando..."/>
    }

    componentDidMount(){
        const {clearTimeout} = this
        this.timer = setTimeout(clearTimeout,this.props.timeout)
    }

    clearTimeout(){
        //this.setState({downloadFailed:true})
    }

    render() {
        return !this.state.downloadFailed ? this.activityIndicator() : this.error()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});


Downloading.propTypes = {
    timeout: PropTypes.number
}