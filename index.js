const five = require('johnny-five');
const FireAlarm = require('./src/fireAlarm');
const board = new five.Board();

board.on('ready', () => {
    const fireAlarm = new FireAlarm();
    fireAlarm.startPolling();
});
