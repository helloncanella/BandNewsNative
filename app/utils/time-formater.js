export default class TimeFormater {
    convert(time){
        const hours = this.pad(Math.floor(time/3600))
            , restSeconds = time%3600
            , minutes = this.pad(Math.floor(restSeconds/60))
            , seconds = this.pad(restSeconds%60)
            
        return `${hours}:${minutes}:${seconds}`

    }

    pad(time){
        return ('00'+time).slice(-2)
    }
}
