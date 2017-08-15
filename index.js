
var Alexa = require('alexa-sdk');
var coinTicker = require('coin-ticker');

exports.getEtherPrice = function (event, context, callback) {
    // Create an instance of the Alexa library and pass it the requested command.
    var alexa = Alexa.handler(event, context);

    //alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetEtherPriceIntent');
    },
    "AMAZON.StopIntent": function () {
        this.emit(':tell', "Goodbye!");
    },
    "AMAZON.CancelIntent": function () {
        this.emit(':tell', "Goodbye!");
    },
    'GetEtherPriceIntent': function () {
        //var exchange = 'coinbase';
        var exchange = this.event.request.intent.slots.marketPlace.value || 'coinbase' ;

        coinTicker(exchange, 'ETH_USD')
            .then(res => {
                let response = res.ask;
                this.emit(':tell', 'Der aktuelle Ether Preis auf ' + exchange + ' beträgt ' + roundToTwoDecimalPoints(response) + ' Dollar');
            });
    }
};

function roundToTwoDecimalPoints(num) {
    return Math.round(num * 100) / 100
}