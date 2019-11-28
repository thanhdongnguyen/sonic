"use strict";
exports.__esModule = true;
var TEXTS = {
    401: "Unauthorization",
    500: "An error occurred during processing, please try again later"
};
var Message = (function () {
    function Message() {
    }
    Message.error = function (code) {
        if (!TEXTS[code]) {
            return "An error occurred during processing, please try again later";
        }
        return TEXTS[code];
    };
    return Message;
}());
exports["default"] = Message;
