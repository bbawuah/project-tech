const moment = require('moment');

const generateMessage = (text) => {
    return {
        text,
        createdAt: moment(new Date().getTime()).format('H:mm')
      }
}


module.exports = generateMessage;