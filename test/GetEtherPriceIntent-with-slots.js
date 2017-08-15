var context = require('aws-lambda-mock-context');
var expect = require('chai').expect;
var mlog = require('mocha-logger');


var index = require('../index');

var ctx = context();

describe('Testing a session with the GetEtherIntent and Coinbase Slot', function () {
    var speechResponse = null
    var speechError = null

    before(function (done) {
        index.getEtherPrice({
            "session": {
                "new": true,
                "sessionId": "SessionId.1f249e90-b5f9-4efe-9dfe-77b5fd4955e4",
                "application": {
                    "applicationId": "amzn1.ask.skill.56dad83b-163c-4ef8-8448-b72f877801f7"
                },
                "attributes": {},
                "user": {
                    "userId": "amzn1.ask.account.AE65FV7VXYM6COPIGBPZPG3P7UVYJPDGSIJFFAVCNU4M3OILTYQAOENMTQI5MD7WQLRCS3NGIOJQHZZBKWY7ZYZSKW2AGQSQWLUFBRILSCA6OLBZBAPCKXF2C7MLY2D2MMMRWSHJYXUMM7NYZOV3NGY4GWD6GIX3XXMYHTSKLPGYNWBRYY3OHB73HRE2DXSIAY36CKZKO2QHCIQ"
                }
            },
            "request": {
                "type": "IntentRequest",
                "requestId": "EdwRequestId.51b6b2c4-ec67-4495-b532-49476d67c78b",
                "intent": {
                    "name": "GetEtherPriceIntent",
                    "slots": {
                        "marketPlace": {
                            "name": "marketPlace",
                            "value": "kraken"
                        }
                    }
                },
                "locale": "de-DE",
                "timestamp": "2017-08-14T16:18:41Z"
            },
            "context": {
                "AudioPlayer": {
                    "playerActivity": "IDLE"
                },
                "System": {
                    "application": {
                        "applicationId": "amzn1.ask.skill.56dad83b-163c-4ef8-8448-b72f877801f7"
                    },
                    "user": {
                        "userId": "amzn1.ask.account.AE65FV7VXYM6COPIGBPZPG3P7UVYJPDGSIJFFAVCNU4M3OILTYQAOENMTQI5MD7WQLRCS3NGIOJQHZZBKWY7ZYZSKW2AGQSQWLUFBRILSCA6OLBZBAPCKXF2C7MLY2D2MMMRWSHJYXUMM7NYZOV3NGY4GWD6GIX3XXMYHTSKLPGYNWBRYY3OHB73HRE2DXSIAY36CKZKO2QHCIQ"
                    },
                    "device": {
                        "supportedInterfaces": {}
                    }
                }
            },
            "version": "1.0"
        }, ctx)

        ctx.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    })
    describe("The response is structurally correct for Alexa Speech Services", function () {
        it('should not have errored', function () {
            expect(speechError).to.be.null
        })

        it('should have a version', function () {
            expect(speechResponse.version).not.to.be.null
        })

        it('should have a speechlet response', function () {
            expect(speechResponse.response).not.to.be.null
        })

        it("should have a spoken response", () => {
            mlog.log(speechResponse.response.outputSpeech.ssml)
            expect(speechResponse.response.outputSpeech).not.to.be.null
        })

        it("should end the alexa session", function () {
            expect(speechResponse.response.shouldEndSession).not.to.be.null
            expect(speechResponse.response.shouldEndSession).to.be.true
        })
    })
})