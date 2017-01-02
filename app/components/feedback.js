import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'

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
        fontSize: 25,
        textAlign: 'center'
    }
});


Feedback.propTypes = {
    message: PropTypes.string
}