const CONFIG = require('./configuration');
const five = require('johnny-five');
let intervalId = null;

function fireAlarm() {
    this.temperatureSensor = new five.Thermometer({
        controller: CONFIG.FIRE_ALARM.CONTROLLER,
        pin: CONFIG.FIRE_ALARM.PIN,
    });
}

class FireAlarm {
    constructor() {
        this.temperatureSensor = new five.Thermometer({
            controller: CONFIG.FIRE_ALARM.CONTROLLER,
            pin: CONFIG.FIRE_ALARM.PIN,
        });
        this.ledAllow = new five.Led(12);
        this.ledWarning = new five.Led(10);
    }

    stopPolling() {
        clearInterval(intervalId)
    };

    startPolling() {
        intervalId = setInterval(() => {
            const celsius = this.temperatureSensor.celsius;
            console.log("celsius: %d", this.temperatureSensor.celsius);
            if(celsius < 25){
                this.ledAllow.on();
                this.ledWarning.off();
            }else{
                this.ledAllow.off();
                this.ledWarning.on();
            }
        }, CONFIG.INTERVAL);
    }
}

module.exports = FireAlarm;
