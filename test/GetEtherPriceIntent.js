var context = require('aws-lambda-mock-context');
var expect = require('chai').expect;
var index = require('../index');

var ctx = context();

describe('Testing a session with the GetEtherIntent', function () {
    var speechResponse = null
    var speechError = null

    before(function (done) {
        index.getEtherPrice({
            "session": {
                "sessionId": "SessionId.0c32ad39-31d5-43eb-8199-affd592e7a4a",
                "application": {
                    "applicationId": "amzn1.ask.skill.56dad83b-163c-4ef8-8448-b72f877801f7"
                },
                "attributes": {},
                "user": {
                    "userId": "amzn1.ask.account.AE65FV7VXYM6COPIGBPZPG3P7UVYJPDGSIJFFAVCNU4M3OILTYQAOENMTQI5MD7WQLRCS3NGIOJQHZZBKWY7ZYZSKW2AGQSQWLUFBRILSCA6OLBZBAPCKXF2C7MLY2D2MMMRWSHJYXUMM7NYZOV3NGY4GWD6GIX3XXMYHTSKLPGYNWBRYY3OHB73HRE2DXSIAY36CKZKO2QHCIQ"
                },
                "new": true
            },
            "request": {
                "type": "IntentRequest",
                "requestId": "EdwRequestId.00f080ba-9c46-4a7d-be3d-509f13d6f831",
                "locale": "de-DE",
                "timestamp": "2017-08-04T14:09:41Z",
                "intent": {
                    "name": "GetEtherPriceIntent",
                    "slots": {}
                }
            },
            "version": "1.0"
        }, ctx)

        ctx.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    }) 
        describe("The response is structurally correct for Alexa Speech Services", function() {
        it('should not have errored',function() {
            expect(speechError).to.be.null
        })
 
        it('should have a version', function() {
            expect(speechResponse.version).not.to.be.null
        })
 
        it('should have a speechlet response', function() {
            expect(speechResponse.response).not.to.be.null
        })
 
        it("should have a spoken response", () => {
            expect(speechResponse.response.outputSpeech).not.to.be.null
        })
 
        it("should end the alexa session", function() {
            expect(speechResponse.response.shouldEndSession).not.to.be.null
            expect(speechResponse.response.shouldEndSession).to.be.true
        })
    })
})