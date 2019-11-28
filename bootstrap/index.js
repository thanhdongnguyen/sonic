"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var telegraf_1 = require("telegraf");
var stackoverflow_1 = require("./stackoverflow");
var text_1 = require("./libs/text");
var display_1 = require("./libs/display");
var dotenv = require("dotenv");
var path = require("path");
dotenv.config({ path: path.join(__dirname, "..", '.env') });
var Bot = (function () {
    function Bot() {
    }
    Bot.prototype.launch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bot, _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        bot = new telegraf_1["default"](process.env.BOT_TOKEN);
                        bot["catch"](function (error, ctx) {
                            console.log(error);
                            ctx.reply("An error occurred during processing, please try again later");
                        });
                        bot.start(this.botStart);
                        bot.help(this.botHelp);
                        _b = (_a = bot).command;
                        _c = ["/search"];
                        return [4, this.search];
                    case 1:
                        _b.apply(_a, _c.concat([_d.sent()]));
                        bot.launch();
                        return [2];
                }
            });
        });
    };
    Bot.prototype.botStart = function (ctx) {
        ctx.reply("Welcome to Sonic Bot. Currently we only support searching on stackoverflow");
    };
    Bot.prototype.botHelp = function (ctx) {
        ctx.reply("\n            Please enter text and waitting results\n        ");
    };
    Bot.prototype.search = function (ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var input, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        input = text_1["default"].parseInput(ctx.message.text);
                        return [4, stackoverflow_1["default"].search(input)];
                    case 1:
                        results = _a.sent();
                        if (!results.success) {
                            ctx.reply("Sorry, search result not success, please try again");
                        }
                        ctx.replyWithMarkdown(display_1["default"].show(results.data));
                        return [2];
                }
            });
        });
    };
    return Bot;
}());
var bot = new Bot();
bot.launch();
