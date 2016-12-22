import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export class Columnists extends Component {

    constructor(){
        super()
        this.state = {
            text: ''
        }
    }

    componentDidMount(){
        var self = this
        fetch('http://www.band.uol.com.br/rss/colunista_13.xml')
            .then((response)=>response.text())
            .then((text)=>this.setState({text}))
            .catch((error)=>console.error(error))
    }

    render() {
        return (
            <View style={{}}>
                <Text>
                    {this.state.text}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({});

