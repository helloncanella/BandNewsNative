import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export class NoItem extends Component {
    render() {
        const {container, text} = styles
            , {message, icon} = this.props

        return (
            <View style={container}>
                <MaterialIcons size={150} name={icon} />
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


NoItem.propTypes = {
    text: PropTypes.string,
    icon: PropTypes.string
}