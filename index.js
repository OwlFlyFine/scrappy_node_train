const async = require('async')
const request = require('request')
const fs = require('fs')

 const urls = ['http://apptitude.co.th/',
 'http://www.reg2.nu.ac.th/registrar/?avs936872688=1']
 

let i = 0

const queue = async.queue((url, callback) => {
    request(url, (error, response, body) => {
        i++
        fs.writeFile('web' + i +'.html' , body, (err) => {
            if(err){
                console.log(err)
                callback()
            }
            console.log('save file complete')
            callback()
        })
    })
}, 1)

queue.drain = () => {
    console.log('Complete')
}

queue.push(urls)