"use strict";
exports.__esModule = true;
var Text = (function () {
    function Text() {
    }
    Text.parseInput = function (message) {
        return message.replace(/\/[A-z0-9]+\@[A-z0-9\S]+/i, '').trim();
    };
    return Text;
}());
exports["default"] = Text;
