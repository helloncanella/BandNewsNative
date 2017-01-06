import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { typography, color, grid } from 'styles/global.js'

export class Feedback extends Component {

    constructor(){
        super()
        this.iconSize = 150
    }

    render() {
        const {container, text} = styles
            , {message} = this.props
            , Icon = () => this.icon

        return (
            <View style={container}>
                <Icon />
                <Text style={text}>{message}</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 40
    },
    text: {
        marginTop: 0,
        fontSize: typography.big,
        textAlign: 'center',
        padding: grid.padding,
        color: color.silentText
    }
});


Feedback.propTypes = {
    message: PropTypes.string
}