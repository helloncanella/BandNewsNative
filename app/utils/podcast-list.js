import _ from 'lodash'
import printError from 'utils/onError.js'

const {parseString} = require('xml2js')
const {columnists} = require('data/columnists.json')

export default class PodcastList {

    constructor(columnist) {
        this.columnist = columnist
    }

    getXmlUrl() {
        const {columnist} = this
        return xmlUrl = columnists.find((o) => o.name === columnist)['xml']
    }

    fetchXml(xmlUrl) {
        return new Promise((resolve, reject) => {
            fetch(xmlUrl)
                .then(response => response.text())
                .then(xml => resolve(xml))
                .catch(error => reject(error))
        })
    }

    xmlToJson(xml) {
        return new Promise((resolve, reject) => {
            parseString(xml, (err, result) => {
                if (err) reject(err)
                resolve(result)
            })
        })
    }

    relevantPodcastData(json) {
        // debugger
        const itens = json.rss.channel[0].item
            , podcasts = itens.map((item, index) => {
                return {
                    description: item.title[0],
                    date: item.pubDate[0],
                    audioUrl: item.enclosure[0]['$'].url
                }
            })

        return podcasts
    }

    getPodcasts() {
        const xmlUrl = this.getXmlUrl()
            , {xmlToJson, relevantPodcastData} = this

        const task = this.fetchXml(xmlUrl)
            .then(xml => xmlToJson(xml))
            .then(json => {console.log(relevantPodcastData(json)[0].description); return relevantPodcastData(json)})
            .catch(printError)

        return task
    }

    fetch() {
        return this.getPodcasts()
    }
}