import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Loading} from 'components/loading.js'

export class Downloading extends Component {

    constructor() {
        super()
        this.state = {
            downloadFailed: false
        }
        this.clearTimeout = this.clearTimeout.bind(this)
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
        return this.activityIndicator() 
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