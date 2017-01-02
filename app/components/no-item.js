import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Feedback } from 'components/feedback.js'

export class NoItem extends Feedback {

    constructor(props) {
        super()
        const {icon} = props
        this.icon = <MaterialIcons size={this.iconSize} name={icon} />
    }

}

NoItem.propTypes = {
    message: PropTypes.string,
    icon: PropTypes.string
}