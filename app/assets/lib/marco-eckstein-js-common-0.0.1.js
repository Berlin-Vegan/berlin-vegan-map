"use strict";
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
    }
    return JsCommon;
}());
exports.JsCommon = JsCommon;
//# sourceMappingURL=index.js.map