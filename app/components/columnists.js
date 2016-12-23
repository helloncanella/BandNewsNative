import React, { Component } from 'react'
import { StyleSheet, Text, View, ListView, Image } from 'react-native'

const columnistsInfo = require('data/columnists.json').columnists
    , rowHasChanged = () => false
    , ds = new ListView.DataSource({rowHasChanged})

export class Columnists extends Component {

    renderRow(data) {
        const {name, podcast, image} = data
            , {selectColumnist} = this.props
            , {thumbnail, row} = styles

        const Row = () => (
            <View style={row}>
                <Image style={thumbnail} source={{uri:image}} />
                <Text>{name}</Text>
            </View>
        )

        return <Row />
    }

    render() {
        return (
            <ListView
                style={styles.container}
                dataSource={ds.cloneWithRows(columnistsInfo)}
                renderRow={this.renderRow.bind(this)}
                />
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        padding: 10,
        alignItems: 'center' 
    },
    thumbnail: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10
    }
});
