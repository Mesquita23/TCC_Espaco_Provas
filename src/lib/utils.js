module.exports = {
    age(timestamp){ // = age: function (timestamp){}

        const today = new Date()
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()

    const month = today.getMonth() - birthDate.getMonth()
    if(month < 0 || month == 0 && today.getDate() < birthDate.getDate()){
        age = age -1
    }
    return age

    },
    date(timestamp) {// = data: function (timestamp){}

    const date = new Date(timestamp)

    //se precisa colocar o utc para transformar em universal time e não reduzir um dia a data

    //yyyy
    const year = date.getFullYear() //date.getUTCFullYear() utc serve para aumentar 3 horas em relação ao time zone 0
    //mm
    const month = `0${date.getMonth() + 1}`.slice(-2)
    //day
    const day = `0${date.getDate()}`.slice(-2)
    //hour
    let hour = date.getHours()
    //minutes
    let minutes = date.getMinutes()


    //tratando minutes
    minutes = minutes.toString()
    if(minutes.length == 1){ minutes = `0${minutes}`}
    
    //tratando houers
    hour = hour.toString()
    if(hour.length == 1){ hour = `0${hour}`}


    return {
        day,
        month,
        year,
        hour,
        minutes,
        iso: `${year}-${month}-${day}`, //iso 
        isot: `${year}-${month}-${day}T${hour}:${minutes}:00`,
        ptBR: `${day}/${month}/${year}`,
        ptBRT: `${day}/${month}/${year} ${hour}:${minutes}`,
        bithDay: `${day}/${month}`
    }

    }
}

