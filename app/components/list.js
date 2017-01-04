import React, { Component, PropTypes } from 'react'
import { StyleSheet, Text, View, ListView, Image, TouchableHighlight } from 'react-native'

const rowHasChanged = (r1, r2) => r1 !== r2
    , ds = new ListView.DataSource({ rowHasChanged })

export class List extends Component {

    touchProps() {
        return {
            style: styles.container,
            underlayColor: "transparent",
            activeOpacity: 0.7
        }
    }

    renderRow({primaryText, headerText = '', secondaryText = '', image, id}) {

        const {thumbnail, row, secondaryTextStyle, headerStyle} = styles
            , touchProps = this.touchProps()
            , {onSelectItem} = this.props

        return (
            <TouchableHighlight {...touchProps} onPress={() => onSelectItem(id)}>
                <View style={row}>
                    {image ? <Image style={thumbnail} source={{ uri: image }} /> : null}
                    {headerText ? <Text style={headerStyle}>{headerText}</Text> : null}
                    <Text>{primaryText}</Text>
                    {secondaryText ? <Text style={secondaryTextStyle}>{secondaryText}</Text> : null}
                </View>
            </TouchableHighlight>
        )
    }

    render() {
        const {data} = this.props

        return (
            <ListView
                style={styles.container}
                dataSource={ds.cloneWithRows(data)}
                renderRow={this.renderRow.bind(this)}
                enableEmptySections={true}
                />
        )
    }
}

List.propTypes = {
    onSelectItem: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired
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
    },
    headerStyle: {

    },
    secondaryTextStyle: {

    }
});
