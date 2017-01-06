import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Feedback } from 'components/feedback.js'
import { typography, color} from 'styles/global.js'

export class NoItem extends Feedback {

    constructor(props) {
        super()
        const {icon} = props
        this.icon = <MaterialIcons name={icon} style={styles.font} />
    }

}

NoItem.propTypes = {
    message: PropTypes.string,
    icon: PropTypes.string
}

const styles = StyleSheet.create({
    font: {
        fontSize: typography.extremlyHuge,
        color: color.silentText
    }
})