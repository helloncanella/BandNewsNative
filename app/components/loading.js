import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { Feedback } from 'components/feedback.js'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export class Loading extends Feedback {
    constructor(props){
        super()
        this.icon =  <ActivityIndicator animating={true} size={100}/>
    }
}

const styles = StyleSheet.create({});


Loading.propTypes = {}