import React, { Component } from 'react'
import {List} from 'components/list'

const columnistsInfo = require('data/columnists.json').columnists

export class Columnists extends Component {

    columnistsInfo() {
        return columnistsInfo.map((columinst) => {
            const {name, image} = columinst
            return { primaryText: name, image, id:name }
        })
    }

    shouldComponentUpdate() {
        return false //the component is static
    }

    render() {
        return (
            <List
                onSelectItem={this.props.selectColumnist}
                data={this.columnistsInfo()}
                />
        )
    }
}

