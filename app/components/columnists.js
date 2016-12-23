import React, { Component } from 'react'
import { StyleSheet, Text, View, ListView, Image, TouchableHighlight } from 'react-native'

const columnistsInfo = require('data/columnists.json').columnists
    , rowHasChanged = () => false
    , ds = new ListView.DataSource({ rowHasChanged })

export class Columnists extends Component {

    renderRow(data) {
        const {name, podcast, image} = data
            , {selectColumnist} = this.props
            , {thumbnail, row, container} = styles

        const Row = () => (
            <TouchableHighlight style={container} onPress={()=>selectColumnist(name)} underlayColor="white" activeOpacity={0.7}>
                <View style={row} onPress={selectColumnist}>
                    <Image style={thumbnail} source={{ uri: image }} />
                    <Text>{name}</Text>
                </View>
            </TouchableHighlight>
        )
 
        return <Row />
    }

    shouldComponentUpdate(){
        return false //the component is static
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
