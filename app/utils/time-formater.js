import moment, * as moments from 'moment';
import 'moment/locale/pt-br';

export default class TimeFormater {
    constructor(){        
        moment.locale('pt-BR');
    }
    
    convert(time){
        const hours = this.pad(Math.floor(time/3600))
            , restSeconds = time%3600
            , minutes = this.pad(Math.floor(restSeconds/60))
            , seconds = this.pad(Math.floor(restSeconds%60))
            
        return `${hours}:${minutes}:${seconds}`

    }

    pad(time){
        return ('00'+time).slice(-2)
    }

    filterString(string){
        return string.match(/\w+, (.*)\s\d+.*/)[1]
    }    

    portugueseDate(date){
        date = new Date(this.filterString(date))       
        return moment(date).format('LL')
    }
}
