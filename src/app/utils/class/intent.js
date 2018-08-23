'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Intent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _constants = require('../constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// import {
//     CheckBalance,
//     CheckNetworkType,
//     CheckRemaining,
//     CheckMainPromotion,
//     GetPublicId,
//     CallAISPlay,
//     OfferPackageOntop,
//     RegisterPackgetOntop
// } from '../../services'

var Intent = exports.Intent = function () {
    function Intent(app, INTENT) {
        _classCallCheck(this, Intent);

        this.INTENT = INTENT;
        this.TEXT = null;
        this.app = app;
        this.conv = null;
        this.params = null;
        this.value = null;
        this.language = null;
        // this.service = {
        //     CheckBalance: null,
        //     CheckNetworkType: null,
        //     CheckRemaining: null,
        //     CheckMainPromotion: null,
        //     GetPublicId: null,
        //     CallAISPlay: null,
        //     OfferPackageOntop: null,
        //     RegisterPackgetOntop: null
        // }
       
    }

    _createClass(Intent, [{
        key: '_',
        value: function _(conv, params, value) {
            this.conv = conv;
            this.conv._ = {};
            this.params = params;
            this.value = value;
            this.language = conv.body.queryResult.languageCode;
            this.TEXT = (0, _constants.getTextLanguage)(this.language);
            this.conv.contexts.set('before_intent', 1, { name: this.INTENT });
            this.middlewareStack = [];
            // for (const serviceName in Service) {
            //     this.service[serviceName] = new Service[serviceName](conv._.storage.msisdn).request
            // }
       
            this.use = this.use.bind(this);
            this.next = this.next.bind(this);
            this.end = this.end.bind(this);
            return this.onInit(conv);
        }
    }, {
        key: 'use',
        value: function use(fn) {
            this.middlewareStack.push(fn.bind(this));
            return { use: this.use, end: this.end };
        }
    }, {
        key: 'next',
        value: function next() {
            var nextFn = this.middlewareStack.pop();
            if (nextFn) {
                return nextFn(this.conv, this.params, this.value, this.next);
            }
        }
    }, {
        key: 'end',
        value: function end() {
            this.middlewareStack.reverse();
            return this.next();
        }
    }]);

    return Intent;
}();