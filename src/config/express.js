'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressRequestId = require('express-request-id');

var _expressRequestId2 = _interopRequireDefault(_expressRequestId);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _middlewares = require('../app/middlewares');

var _constants = require('../app/utils/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Express = function () {
    function Express(oauth, logger) {
        _classCallCheck(this, Express);

           this.logger = logger;
        this.express = (0, _express2.default)();
        this.setConfig = this.setConfig.bind(this);
        this.setLoging = this.setLoging.bind(this);         
        this.getCpid = this.getCpid.bind(this);
        this.getPlanStatus = this.getPlanStatus.bind(this);
        this.getPlanOffer = this.getPlanOffer.bind(this);
        this.getPurchasePlan = this.getPurchasePlan.bind(this);
        this.getEligibility = this.getEligibility.bind(this);
        this.getRegister = this.getRegister.bind(this);
        this.getDpaStatus = this.getDpaStatus.bind(this);
        this.listen = this.listen.bind(this);
    }

    _createClass(Express, [{
        key: 'setConfig',
        value: function setConfig() {
            // generate request id
            this.express.use((0, _expressRequestId2.default)());
            // parse body params and attache them to req.body
            this.express.use(_bodyParser2.default.json());
            // extract session
            this.express.use(_middlewares.extractSession);
        }
    },  {
        key: 'setLoging',
        value: function setLoging() {
            // logging
            this.logger.setCronJobLogRotate();
            this.express.use((0, _morgan2.default)(_constants.ENV.LOGS));
            this.express.use(this.logger.logRequest);
            this.express.use(this.logger.logResponse);
        }
    }, {
        key: 'getCpid',
        value: function getCpid() {
            // route to dialogflow
            this.express.get('/CPID_URL', function (req, res, next) {
            let app = req.query.app;
              console.log("cpid");
              res.send({ cpid: cpid });
              res.sendStatus(200);
            });
        }
    }, {
        key: 'ReceiveRequest',
        value: function ReceiveRequest() {
            // route to dialogflow
            this.express.post('/webhook', function (req, res, next) {
                       console.log("AAAAAAAAAAAAAAAAAAAAAa");
            let body = req.body;
            if (body.object === 'page') {

                    body.entry.forEach(entry => {
                        let webhook_event = entry.messaging[0];
                        console.log(webhook_event);
                        let sender_psid = webhook_event.sender.id;
                        console.log(`Sender PSID: ${sender_psid}`);
                        if (webhook_event.message) {
                            handleMessage(sender_psid, webhook_event.message);
                        } else if (webhook_event.postback) {
                            handlePostback(sender_psid, webhook_event.postback);
                        }

                    });
                    res.status(200).send('EVENT_RECEIVED');
                } else {
                    res.sendStatus(404);
                }
         });
        }
    }, {
        key: 'getPlanStatus',
        value: function getPlanStatus() {
            // route to dialogflow
            this.express.get('/DPA_URL/:userKey/planStatus', function (req, res, next) {
            let key_type = req.query.key_type;
            let userKey = req.params.userKey;
              console.log("planStatus");
              console.log("userKey:"+userKey);
              console.log("key_type:"+key_type);
             res.send({ userKey: userKey , key_type: key_type });
             res.sendStatus(200);
            });
        }
    }, {
        key: 'getPlanOffer',
        value: function getPlanOffer() {
            // route to dialogflow
            this.express.get('/DPA_URL/:userKey/planOffer', function (req, res, next) {
            let key_type = req.query.key_type;
            let context = req.query.context;
            let userKey = req.params.userKey;
              console.log("PlanOffer");
              console.log("userKey:"+userKey);
              console.log("key_type:"+key_type);
              console.log("context:"+context);
             res.send({ userKey: userKey , key_type: key_type , context: context });
             res.sendStatus(200);
            });
        }
    }, {
        key: 'getPurchasePlan',
        value: function getPurchasePlan() {

            // route to dialogflow
            this.express.post('/DPA_URL/:userKey/purchasePlan', function (req, res, next) {
            let key_type = req.query.key_type;
            let userKey = req.params.userKey;
              console.log("PurchasePlan");
              console.log("userKey:"+userKey);
              console.log("key_type:"+key_type);            
             res.send({ userKey: userKey , key_type: key_type});
             res.sendStatus(200);
            });
        }
    }, {
        key: 'getEligibility',
        value: function getEligibility() {
            // route to dialogflow
            this.express.get('/DPA/:userKey/Eligibility/:planId', function (req, res, next) {
            let key_type = req.query.key_type;
            let userKey = req.params.userKey;
            let planId = req.params.planId;
              console.log("eligibility");
              console.log("userKey:"+userKey);
              console.log("key_type:"+key_type);
              console.log("context:"+context);
             res.send({ userKey: userKey , key_type: key_type , context: context });
             res.sendStatus(200);
            });
        }
    }, {
        key: 'getRegister',
        value: function getRegister() {
            // route to dialogflow
            this.express.post('/DPA_URL/register', function (req, res, next) {
              console.log("register");
             res.send({ userKey: userKey , key_type: key_type , context: context });
             res.sendStatus(200);
            });
        }
    },  {
        key: 'getDpaStatus',
        value: function getDpaStatus() {
            // route to dialogflow
            this.express.get('/dpaStatus', function (req, res, next) {
              console.log("dpaStatus");
             res.sendStatus(200);
            });
        }
    }, {
        key: 'listen',
        value: function listen() {
            this.setConfig();
          if (_constants.ENV.SAVE_LOG) {
                this.setLoging();
            }
               console.log("AAAAAAAAAAAAAAAAAAAAAa");
            this.getCpid();
            this.getPlanStatus();
            this.getPlanOffer();
            this.getPurchasePlan();
            this.getEligibility();
            this.getRegister();
            this.getDpaStatus();
            if (_constants.ENV.ENV === 'production' && _constants.ENV.USE_HTTPS === true) {
                var privateKey = _fs2.default.readFileSync(_constants.ENV.SSL_KEY, 'utf8').toString();
                var certificate = _fs2.default.readFileSync(_constants.ENV.SSL_CERT, 'utf8').toString();
                var credentials = { key: privateKey, cert: certificate };
                if (_fs2.default.existsSync(_constants.ENV.SSL_CA)) {
                    var certificateAuthority = _fs2.default.readFileSync(_constants.ENV.SSL_CA, 'utf8').toString();
                    credentials.ca = certificateAuthority;
                }
            //
                _https2.default.createServer(credentials, this.express).listen(_constants.ENV.APP_PORT, function () {
                  
                    return console.info('server started on port ' + _constants.ENV.APP_PORT + ' (' + _constants.ENV.ENV + ')');
                });
            } else {
                this.express.listen(_constants.ENV.APP_PORT, function () {
                    return console.info('server started on port ' + _constants.ENV.APP_PORT + ' (' + _constants.ENV.ENV + ')');
                });
             
           
            }
        }
    }, {
        key: 'cancle',
        value: function cancle() {}
    }]);

    return Express;
}();

/**
 * Exports express
 * @public
 */


exports.default = Express;
