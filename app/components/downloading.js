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
        return <Error message="Erro na solicitação" icon="cancel" />
    }

    activityIndicatior() {
        const {container} = styles
        return <Loading animating={!this.state.downloadFailed} message="Carregando..."/>
    }

    componentDidMount(){
        const {clearTimeout} = this
        this.timer = setTimeout(clearTimeout,this.props.timeout)
    }

    clearTimeout(){
        this.setState({downloadFailed:true})
        clearTimeout(this.timer)
    }

    render() {
        return !this.state.downloadFailed ? this.activityIndicatior() : this.error()
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