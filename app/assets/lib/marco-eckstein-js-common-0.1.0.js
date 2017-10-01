"use strict";
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
Object.defineProperty(exports, "__esModule", { value: true });
var JsCommon = /** @class */ (function () {
    function JsCommon() {
        this.geoUtil = new /** @class */ (function () {
            function GeoUtil() {
            }
            /**
             * Adapted from http://stackoverflow.com/q/18883601/443836
             */
            GeoUtil.prototype.getDistanceInKm = function (pos1, pos2) {
                var earthRadiusInKm = 6371;
                var dLat = degToRad(pos2.lat() - pos1.lat());
                var dLng = degToRad(pos2.lng() - pos1.lng());
                var a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                    + Math.cos(degToRad(pos1.lat())) * Math.cos(degToRad(pos2.lat()))
                        * Math.sin(dLng / 2) * Math.sin(dLng / 2);
                var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                return earthRadiusInKm * c;
                function degToRad(deg) {
                    return deg * (Math.PI / 180);
                }
            };
            return GeoUtil;
        }());
        this.i18nUtil = new /** @class */ (function () {
            function I18nUtil() {
            }
            I18nUtil.prototype.transform = function (node, language) {
                var newNode = {};
                try {
                    for (var _a = __values(Object.getOwnPropertyNames(node)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        var childName = _b.value;
                        var child = node[childName];
                        if (typeof child === "string") {
                            return node[language];
                        }
                        else {
                            newNode[childName] = this.transform(child, language);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                return newNode;
                var e_1, _c;
            };
            return I18nUtil;
        }());
    }
    return JsCommon;
}());
exports.JsCommon = JsCommon;
//# sourceMappingURL=index.js.map