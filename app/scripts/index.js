var CsvToJson = require('./csv-to-json.js')

const csv = './columnists.csv'
    , imageUrl = 'http://imagem.band.com.br/COL_FT1_CODE.jpg'
    , podcastUrl = 'http://www.band.uol.com.br/rss/colunista_CODE.xml'
    , pathToSave = '../data/columnists.json'

new CsvToJson({csv, imageUrl, podcastUrl, pathToSave}).process()