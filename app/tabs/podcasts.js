import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export class Podcasts extends Component {
  constructor(){
        super()
        this.state = {
            text: ''
        }
    }

    componentDidMount(){
        var self = this
        // fetch('https://proxy-helloncanella.c9users.io')
        //     .then((response)=>response.text())
        //     .then((text)=>console.log(text))
        //     .catch((error)=>console.error(error))
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

