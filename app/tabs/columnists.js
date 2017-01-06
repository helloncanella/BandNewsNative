import React, { Component } from 'react'
import {List} from 'components/list'

const columnistsInfo = require('data/columnists.json').columnists

export class Columnists extends Component {

    columnistsInfo() {
        return columnistsInfo.map((columinst) => {
            const {name, image, program} = columinst
            return { primaryText: name, image, payload:name, headerText: program } 
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

