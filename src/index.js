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
var discord_js_1 = require("discord.js");
var node_fetch_1 = require("node-fetch");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var client = new discord_js_1.Client({
    intents: [
        discord_js_1.Intents.FLAGS.GUILDS,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
        discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
client.once("ready", function () {
    console.log("Ready!");
});
var atodemiru = "808566487983587338";
client.on("messageReactionAdd", function (reaction, user) { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("test");
                if (!reaction.message.partial) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, reaction.message.fetch()];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Something went wrong when fetching the message: ", error_1);
                return [3 /*break*/, 4];
            case 4:
                if (reaction.message.channel.id === atodemiru && reaction.count === 1) {
                    reaction.message.pin();
                }
                return [2 /*return*/];
        }
    });
}); });
client.on("messageReactionRemove", function (reaction, user) { return __awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!reaction.message.partial) return [3 /*break*/, 4];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, reaction.message.fetch()];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error("Something went wrong when fetching the message: ", error_2);
                return [3 /*break*/, 4];
            case 4:
                console.log(user.username + " removed their \"" + reaction.emoji.name + "\" reaction.");
                return [2 /*return*/];
        }
    });
}); });
client.on("messageCreate", function (message) { return __awaiter(void 0, void 0, void 0, function () {
    var url, newurl_1, paragraph_1;
    return __generator(this, function (_a) {
        if (message.author.bot) {
            return [2 /*return*/];
        }
        if (message.content.startsWith("https://github.com/")) {
            url = message.content;
            newurl_1 = url.replace(/^(.*\/\/github.com\/.+\/.+\/)blob(\/.+)$/i, "$1raw$2");
            paragraph_1 = url.split("#");
            if (paragraph_1[1] != null) {
                console.log("Where you want to display is existing.");
                (function () { return __awaiter(void 0, void 0, void 0, function () {
                    var response, sendtext, body, lines, fileType, LineNumber, begin, end, begin, error_3;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                return [4 /*yield*/, (0, node_fetch_1["default"])(newurl_1)];
                            case 1:
                                response = _a.sent();
                                sendtext = "";
                                return [4 /*yield*/, response.text()];
                            case 2:
                                body = _a.sent();
                                lines = body.split("\n");
                                fileType = paragraph_1[0]
                                    .split("/")
                                    .slice(-1)[0]
                                    .split(".")
                                    .slice(-1)[0];
                                LineNumber = paragraph_1[1].split("-");
                                // 行始めと行終わりを取得
                                if (LineNumber.length === 2) {
                                    begin = Number(LineNumber[0].substring(1)) - 1;
                                    end = Number(LineNumber[1].substring(1));
                                    console.log({ begin: begin, end: end });
                                    sendtext = lines.slice(begin, end).join("\n");
                                }
                                else if (LineNumber.length === 1) {
                                    begin = Number(LineNumber[0].substring(1)) - 1;
                                    sendtext = lines.slice(begin, begin + 1).join("\n");
                                }
                                else {
                                    console.log("error");
                                }
                                // テンプレートリテラル
                                message.channel.send(" ```" + fileType + "\n" + sendtext + "  ```");
                                return [3 /*break*/, 4];
                            case 3:
                                error_3 = _a.sent();
                                console.log(error_3);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); })();
            }
        }
        return [2 /*return*/];
    });
}); });
client.login(process.env.DISCORD_TOKEN);
