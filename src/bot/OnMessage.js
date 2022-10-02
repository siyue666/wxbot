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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.OnMessages = void 0;
var wechaty_1 = require("wechaty");
var request_1 = require("../api/request");
var config_1 = __importDefault(require("../conf/config"));
var constant_1 = __importDefault(require("../constant/constant"));
var ql_1 = __importDefault(require("../constant/ql"));
var Bot_1 = require("./Bot");
var qlUtils_1 = require("../util/qlUtils");
var dataMonitoring_1 = require("./message/dataMonitoring");
var dbUtil_1 = require("../util/dbUtil");
var OnMessages = (function () {
    function OnMessages() {
    }
    OnMessages.message = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var contact, content, room, remarks, isText, rem_1, cha, _loop_1, i, len, mobile, name_1, index, res_1, _a, name_2, index, ret, cookie, res_2, _b, res1, pt_pin, jdId, msg_1, mobile_1, flag, db, mobile_arr, index, data, content_arr, mobile_2, threshold, db, mobile_arr, index, data, _c, res;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        if (msg.self()) {
                            return [2];
                        }
                        contact = msg.talker();
                        content = msg.text().trim();
                        room = msg.room();
                        return [4, contact.alias()];
                    case 1:
                        remarks = _d.sent();
                        isText = msg.type() === Bot_1.bot.Message.Type.Text;
                        wechaty_1.log.info("\u53D1\u6D88\u606F\u4EBA\u7684\u5907\u6CE8: ".concat(remarks, " \u53D1\u6D88\u606F\u4EBA\u7684\u6635\u79F0: ").concat(contact.name(), " \u6D88\u606F\u5185\u5BB9: ").concat(content));
                        if (!(!room && isText)) return [3, 105];
                        return [4, OnMessages.forwardLogGroup(msg)];
                    case 2:
                        _d.sent();
                        if (!/菜单/.test(content)) return [3, 4];
                        return [4, contact.say(constant_1["default"].message.menu + "\n\u672C\u901A\u77E5 By:https://github.com/hxianseng/wxbot.git")];
                    case 3:
                        _d.sent();
                        return [3, 105];
                    case 4:
                        if (!/^查询$/.test(content)) return [3, 9];
                        return [4, OnMessages.check_ql_module(contact)];
                    case 5:
                        if (!(_d.sent())) {
                            return [2];
                        }
                        if (!(remarks == '')) return [3, 7];
                        return [4, contact.say('此微信号没有绑定京东id, 发送 菜单 查看详细指令')];
                    case 6:
                        _d.sent();
                        return [2];
                    case 7:
                        rem_1 = remarks.split('#');
                        cha = '';
                        _loop_1 = function (i, len) {
                            if (rem_1[i] != '') {
                                var jddata = ql_1["default"].jd_ck.concat(ql_1["default"].cfd_ck).filter(function (item) {
                                    return new RegExp(rem_1[i]).test(item.value);
                                });
                                if (jddata.length > 0) {
                                    cha += "".concat(i == 0 ? '' : '\n\n', "\u8D26\u53F7:\u300C").concat(rem_1[i], "\u300D");
                                    cha += "\n\u72B6\u6001: ".concat(jddata[0].status == 0 ? '「在线」' : '「离线」');
                                    cha += "\n\u8C46\u5B50: ".concat(jddata[0].status == 0 ? '「开发中」' : '「离线」');
                                    cha += "\n\u901A\u77E5: \u300C\u5DF2\u5F00\u542F\u300D";
                                }
                                else {
                                    cha += "".concat(i == 0 ? '' : '\n\n', "\u8D26\u53F7:\u300C").concat(rem_1[i], "\u300D");
                                    cha += "\n\u72B6\u6001:\u300C\u4E0D\u5B58\u5728\u300D";
                                }
                            }
                        };
                        for (i = 0, len = rem_1.length; i < len; i++) {
                            _loop_1(i, len);
                        }
                        cha += '\n\nPs:「离线」或「不存在」请发送 短信登录 更新账号';
                        return [4, contact.say(cha)];
                    case 8:
                        _d.sent();
                        return [3, 105];
                    case 9:
                        if (!/^短信登录$/.test(content)) return [3, 12];
                        return [4, OnMessages.check_ql_module(contact)];
                    case 10:
                        if (!(_d.sent())) {
                            return [2];
                        }
                        return [4, contact.say('请发送手机号开始登录...')];
                    case 11:
                        _d.sent();
                        return [3, 105];
                    case 12:
                        if (!/^[1]([3-9])[0-9]{9}$/.test(content)) return [3, 30];
                        return [4, OnMessages.check_ql_module(contact)];
                    case 13:
                        if (!(_d.sent())) {
                            return [2];
                        }
                        mobile = content;
                        name_1 = contact.name();
                        index = constant_1["default"].sms.findIndex(function (x) { return x.name == name_1; });
                        if (!(index != -1)) return [3, 15];
                        return [4, contact.say('短时间内重复获取验证码,请过会重试!')];
                    case 14:
                        _d.sent();
                        return [2];
                    case 15:
                        _a = config_1["default"].current_interface;
                        switch (_a) {
                            case 'nark': return [3, 16];
                        }
                        return [3, 19];
                    case 16: return [4, contact.say('nark正在获取验证码,请稍后...')];
                    case 17:
                        _d.sent();
                        return [4, request_1.reapi.send_sms_nark(content)];
                    case 18:
                        res_1 = _d.sent();
                        return [3, 22];
                    case 19: return [4, contact.say('maiark正在获取验证码,请稍后...')];
                    case 20:
                        _d.sent();
                        return [4, request_1.reapi.send_sms(content)];
                    case 21:
                        res_1 = _d.sent();
                        _d.label = 22;
                    case 22:
                        if (!res_1) return [3, 27];
                        if (!(res_1.data.code == 0 || res_1.data.success)) return [3, 24];
                        return [4, contact.say("\u9A8C\u8BC1\u7801\u5DF2\u53D1\u9001,\u8BF7\u57283\u5206\u949F\u5185\u56DE\u590D6\u4F4D\u6570\u9A8C\u8BC1\u7801")];
                    case 23:
                        _d.sent();
                        res_1.data['mobile'] = mobile;
                        res_1.data['name'] = name_1;
                        constant_1["default"].sms.push(res_1.data);
                        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                            var index;
                            return __generator(this, function (_a) {
                                index = constant_1["default"].sms.findIndex(function (x) { return x.name == name_1; });
                                if (index != -1) {
                                    constant_1["default"].sms.splice(index, 1);
                                }
                                return [2];
                            });
                        }); }, 1000 * 180);
                        return [3, 26];
                    case 24: return [4, contact.say('获取验证码失败\n' + JSON.stringify(res_1.data))];
                    case 25:
                        _d.sent();
                        console.log(res_1);
                        return [2];
                    case 26: return [3, 29];
                    case 27: return [4, contact.say('请求验证码接口失败,请联系管理员查看日志')];
                    case 28:
                        _d.sent();
                        return [2];
                    case 29: return [3, 105];
                    case 30:
                        if (!/^\d{6}$/.test(content)) return [3, 52];
                        return [4, OnMessages.check_ql_module(contact)];
                    case 31:
                        if (!(_d.sent())) {
                            return [2];
                        }
                        return [4, contact.say('开始登录京东,请稍后...')];
                    case 32:
                        _d.sent();
                        name_2 = contact.name();
                        index = constant_1["default"].sms.findIndex(function (x) { return x.name == name_2; });
                        if (!(index == -1)) return [3, 34];
                        return [4, contact.say('验证码失效,请重新发送手机号开始登录')];
                    case 33:
                        _d.sent();
                        return [2];
                    case 34:
                        ret = constant_1["default"].sms.find(function (x) { return x.name == name_2; });
                        ret['smscode'] = content;
                        cookie = '';
                        _b = config_1["default"].current_interface;
                        switch (_b) {
                            case 'nark': return [3, 35];
                        }
                        return [3, 37];
                    case 35: return [4, request_1.reapi.smsLogin_nark(ret.mobile, content)];
                    case 36:
                        res_2 = _d.sent();
                        return [3, 39];
                    case 37: return [4, request_1.reapi.smsLogin(ret)];
                    case 38:
                        res_2 = _d.sent();
                        _d.label = 39;
                    case 39:
                        if (!res_2) return [3, 49];
                        if (!(res_2.data.code == 200 || res_2.data.success)) return [3, 44];
                        cookie = res_2.data.ck ? res_2.data.ck : '';
                        if (!(cookie == '')) return [3, 41];
                        return [4, request_1.reapi.getEnvsById(res_2.data.data.qlid)];
                    case 40:
                        res1 = _d.sent();
                        cookie = res1.data.data.value;
                        _d.label = 41;
                    case 41: return [4, contact.say(cookie)];
                    case 42:
                        _d.sent();
                        return [4, contact.say('登录成功')];
                    case 43:
                        _d.sent();
                        return [3, 46];
                    case 44: return [4, contact.say("登录失败\n" + JSON.stringify(res_2.data))];
                    case 45:
                        _d.sent();
                        return [2];
                    case 46: return [4, qlUtils_1.qlUtil.getJDCK()];
                    case 47:
                        _d.sent();
                        pt_pin = cookie.match(/pt_pin=.+?;/) || [0];
                        jdId = pt_pin[0].replace('pt_pin=', '').replace(';', '');
                        return [4, OnMessages.bindRemarks(remarks, contact, jdId)];
                    case 48:
                        _d.sent();
                        return [3, 51];
                    case 49: return [4, contact.say('登录失败,请重新发送验证码或联系管理员查看日志')];
                    case 50:
                        _d.sent();
                        _d.label = 51;
                    case 51: return [3, 105];
                    case 52:
                        if (!/联通登录/.test(content)) return [3, 57];
                        if (!!config_1["default"].traffic_query) return [3, 54];
                        return [4, contact.say('联通流量查询已关闭, 联系管理员开启')];
                    case 53:
                        _d.sent();
                        return [2];
                    case 54: return [4, contact.say('请发送如下开始:')];
                    case 55:
                        _d.sent();
                        return [4, contact.say('联通#手机号')];
                    case 56:
                        _d.sent();
                        return [3, 105];
                    case 57:
                        if (!/^联通#[1]([3-9])[0-9]{9}$/.test(content)) return [3, 61];
                        if (!!config_1["default"].traffic_query) return [3, 59];
                        return [4, contact.say('联通流量查询已关闭, 联系管理员开启')];
                    case 58:
                        _d.sent();
                        return [2];
                    case 59: return [4, dataMonitoring_1.DataMonitoring.getVerificationCode(contact, content, remarks)];
                    case 60:
                        _d.sent();
                        return [3, 105];
                    case 61:
                        if (!/^联通#\d{4}$/.test(content)) return [3, 65];
                        if (!!config_1["default"].traffic_query) return [3, 63];
                        return [4, contact.say('联通流量查询已关闭, 联系管理员开启')];
                    case 62:
                        _d.sent();
                        return [2];
                    case 63: return [4, dataMonitoring_1.DataMonitoring.login(contact, content, remarks)];
                    case 64:
                        _d.sent();
                        return [3, 105];
                    case 65:
                        if (!/ck登录/.test(content)) return [3, 68];
                        return [4, OnMessages.check_ql_module(contact)];
                    case 66:
                        if (!(_d.sent())) {
                            return [2];
                        }
                        return [4, contact.say('发送带有 pt_key=和pt_pin= 字段的cookie')];
                    case 67:
                        _d.sent();
                        return [3, 105];
                    case 68:
                        if (!(/pt_pin=.+?;/.test(content) && /pt_key=.+?;/.test(content))) return [3, 71];
                        return [4, OnMessages.check_ql_module(contact)];
                    case 69:
                        if (!(_d.sent())) {
                            return [2];
                        }
                        return [4, OnMessages.addCookie(contact, content, remarks)];
                    case 70:
                        _d.sent();
                        return [3, 105];
                    case 71:
                        if (!/查询流量/.test(content)) return [3, 76];
                        if (!!config_1["default"].traffic_query) return [3, 73];
                        return [4, contact.say('联通流量查询已关闭, 联系管理员开启')];
                    case 72:
                        _d.sent();
                        return [2];
                    case 73: return [4, contact.say('查询中,请稍后...')];
                    case 74:
                        _d.sent();
                        msg_1 = '';
                        return [4, dataMonitoring_1.DataMonitoring.queryTraffic(contact, msg_1)];
                    case 75:
                        _d.sent();
                        return [3, 105];
                    case 76:
                        if (!/^联通#(关闭|开启)监控#[1]([3-9])[0-9]{9}$/.test(content)) return [3, 91];
                        if (!constant_1["default"].read_flag) return [3, 78];
                        return [4, contact.say('机器人繁忙, 请稍后再试')];
                    case 77:
                        _d.sent();
                        return [2];
                    case 78: return [4, contact.say('请稍后...')];
                    case 79:
                        _d.sent();
                        flag = true;
                        if (content.includes('开启')) {
                            mobile_1 = content.replace('联通#开启监控#', '');
                        }
                        else {
                            flag = false;
                            mobile_1 = content.replace('联通#关闭监控#', '');
                        }
                        return [4, (0, dbUtil_1.getDb)("../constant/lt.json")];
                    case 80:
                        db = _d.sent();
                        mobile_arr = db.lt_arr[contact.name()];
                        if (!!mobile_arr) return [3, 82];
                        constant_1["default"].read_flag = false;
                        return [4, contact.say('此微信号没有登录过联通')];
                    case 81:
                        _d.sent();
                        return [2];
                    case 82:
                        index = mobile_arr.findIndex(function (x) { return x.mobile == mobile_1; });
                        if (!(index == -1)) return [3, 84];
                        constant_1["default"].read_flag = false;
                        return [4, contact.say('此微信号没有登录过该手机号')];
                    case 83:
                        _d.sent();
                        return [2];
                    case 84:
                        data = mobile_arr[index];
                        mobile_arr.splice(index, 1);
                        if (!flag) return [3, 86];
                        data.notice = 0;
                        return [4, contact.say('开启监控成功')];
                    case 85:
                        _d.sent();
                        return [3, 88];
                    case 86:
                        data.notice = 1;
                        return [4, contact.say('关闭监控成功')];
                    case 87:
                        _d.sent();
                        _d.label = 88;
                    case 88:
                        mobile_arr.push(data);
                        db.lt_arr[contact.name()] = mobile_arr;
                        return [4, (0, dbUtil_1.saveDb)(db, '../constant/lt.json')];
                    case 89:
                        _d.sent();
                        _d.label = 90;
                    case 90: return [3, 105];
                    case 91:
                        if (!/^联通#阈值\d+#[1]([3-9])[0-9]{9}$/.test(content)) return [3, 103];
                        if (!constant_1["default"].read_flag) return [3, 93];
                        return [4, contact.say('机器人繁忙, 请稍后再试')];
                    case 92:
                        _d.sent();
                        return [2];
                    case 93: return [4, contact.say('请稍后...')];
                    case 94:
                        _d.sent();
                        content_arr = content.split('#');
                        mobile_2 = content_arr[2];
                        threshold = content_arr[1].replace('阈值', '');
                        console.log(content_arr);
                        return [4, (0, dbUtil_1.getDb)("../constant/lt.json")];
                    case 95:
                        db = _d.sent();
                        mobile_arr = db.lt_arr[contact.name()];
                        if (!!mobile_arr) return [3, 97];
                        constant_1["default"].read_flag = false;
                        return [4, contact.say('此微信号没有登录过联通')];
                    case 96:
                        _d.sent();
                        return [2];
                    case 97:
                        index = mobile_arr.findIndex(function (x) { return x.mobile == mobile_2; });
                        if (!(index == -1)) return [3, 99];
                        constant_1["default"].read_flag = false;
                        return [4, contact.say('此微信号没有登录过该手机号')];
                    case 98:
                        _d.sent();
                        return [2];
                    case 99:
                        data = mobile_arr[index];
                        mobile_arr.splice(index, 1);
                        data.threshold = parseInt(threshold);
                        mobile_arr.push(data);
                        db.lt_arr[contact.name()] = mobile_arr;
                        return [4, (0, dbUtil_1.saveDb)(db, '../constant/lt.json')];
                    case 100:
                        _d.sent();
                        return [4, contact.say('设置阈值成功')];
                    case 101:
                        _d.sent();
                        _d.label = 102;
                    case 102: return [3, 105];
                    case 103: return [4, contact.say("\u6CA1\u6709\u5339\u914D\u5230\u6307\u4EE4\n".concat(constant_1["default"].message.menu, "\nPs:\u6307\u4EE4\u8981\u6BCF\u4E2A\u5B57\u90FD\u5339\u914D\u4E0A\n\u4F8B\u5982:\u8054\u901A\u767B\u5F55\u221A \u8054\u901A\u767B\u9646\u00D7"))];
                    case 104:
                        _d.sent();
                        return [2];
                    case 105:
                        if (!(config_1["default"].logGroup && config_1["default"].logGroup != '')) return [3, 114];
                        _c = room;
                        if (!_c) return [3, 107];
                        return [4, room.topic()];
                    case 106:
                        _c = (_d.sent()) == config_1["default"].logGroup;
                        _d.label = 107;
                    case 107:
                        if (!_c) return [3, 114];
                        if (!/^菜单$/.test(content)) return [3, 109];
                        return [4, room.say(constant_1["default"].message.menu2)];
                    case 108:
                        _d.sent();
                        return [3, 114];
                    case 109:
                        if (!/^初始化青龙$/.test(content)) return [3, 114];
                        wechaty_1.log.info('初始化青龙===========开始');
                        return [4, request_1.reapi.getQlToken()];
                    case 110:
                        res = _d.sent();
                        if (res) {
                            wechaty_1.log.info('初始化青龙===========成功');
                            ql_1["default"].qlToken = res.data.data.token;
                            ql_1["default"].ql_token_type = res.data.data.token_type;
                        }
                        else {
                            wechaty_1.log.info("api\u8BF7\u6C42\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u91CD\u8BD5\uFF01");
                            return [2];
                        }
                        wechaty_1.log.info('初始化青龙===========结束');
                        return [4, qlUtils_1.qlUtil.qlNotify()];
                    case 111:
                        _d.sent();
                        return [4, qlUtils_1.qlUtil.getJDCK()];
                    case 112:
                        _d.sent();
                        return [4, room.say('初始化结束')];
                    case 113:
                        _d.sent();
                        _d.label = 114;
                    case 114: return [2];
                }
            });
        });
    };
    OnMessages.addCookie = function (contact, content, remarks) {
        return __awaiter(this, void 0, void 0, function () {
            var pt_pin, pt_key, cookie, jdId, flag, _id, _i, _a, item, data, res, data, res;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        pt_pin = content.match(/pt_pin=.+?;/) || '';
                        pt_key = content.match(/pt_key=.+?;/) || '';
                        cookie = pt_key[0] + pt_pin[0];
                        jdId = pt_pin[0].replace('pt_pin=', '').replace(';', '');
                        return [4, contact.say("\u8BC6\u522B\u5230cookie:\n".concat(cookie))];
                    case 1:
                        _b.sent();
                        return [4, qlUtils_1.qlUtil.getJDCK()];
                    case 2:
                        _b.sent();
                        flag = false;
                        _id = '';
                        _i = 0, _a = ql_1["default"].jd_ck;
                        _b.label = 3;
                    case 3:
                        if (!(_i < _a.length)) return [3, 9];
                        item = _a[_i];
                        if (!item.value.includes(jdId)) return [3, 8];
                        flag = true;
                        if (!(config_1["default"].QLurl.qlId == '_id')) return [3, 4];
                        _id = item._id;
                        return [3, 7];
                    case 4:
                        if (!(config_1["default"].QLurl.qlId == 'id')) return [3, 5];
                        _id = item.id;
                        return [3, 7];
                    case 5: return [4, contact.say('更新失败,配置文件的qlId值错误')];
                    case 6:
                        _b.sent();
                        return [2];
                    case 7: return [3, 9];
                    case 8:
                        _i++;
                        return [3, 3];
                    case 9:
                        if (!flag) return [3, 28];
                        return [4, contact.say('更新cookie,请稍后...')];
                    case 10:
                        _b.sent();
                        data = {
                            cookie: cookie,
                            jdId: jdId,
                            _id: _id
                        };
                        return [4, request_1.reapi.updateEnv(data)];
                    case 11:
                        res = _b.sent();
                        if (!res) return [3, 16];
                        if (!(res.data.code == 200)) return [3, 13];
                        return [4, contact.say('cookie更新成功,cookie启用中...')];
                    case 12:
                        _b.sent();
                        return [3, 15];
                    case 13: return [4, contact.say('cookie更新失败\n' + JSON.stringify(res.data))];
                    case 14:
                        _b.sent();
                        return [2];
                    case 15: return [3, 18];
                    case 16: return [4, contact.say('[updateEnv]接口请求失败,请管理员查看日志')];
                    case 17:
                        _b.sent();
                        return [2];
                    case 18: return [4, request_1.reapi.enableEnvs(_id)];
                    case 19:
                        res = _b.sent();
                        if (!res) return [3, 24];
                        if (!(res.data.code == 200)) return [3, 21];
                        return [4, contact.say('cookie启用成功')];
                    case 20:
                        _b.sent();
                        return [3, 23];
                    case 21: return [4, contact.say('cookie启用失败\n' + JSON.stringify(res.data))];
                    case 22:
                        _b.sent();
                        _b.label = 23;
                    case 23: return [3, 26];
                    case 24: return [4, contact.say('[enableEnvs]接口请求失败,请管理员查看日志')];
                    case 25:
                        _b.sent();
                        _b.label = 26;
                    case 26: return [4, OnMessages.bindRemarks(remarks, contact, jdId)];
                    case 27:
                        _b.sent();
                        return [3, 37];
                    case 28: return [4, contact.say('添加cookie,请稍后...')];
                    case 29:
                        _b.sent();
                        data = [
                            {
                                name: 'JD_COOKIE',
                                value: cookie,
                                remarks: jdId
                            }
                        ];
                        return [4, request_1.reapi.addEnvs(data)];
                    case 30:
                        res = _b.sent();
                        if (!res) return [3, 33];
                        if (!(res.data.code == 200)) return [3, 32];
                        return [4, contact.say('cookie添加成功')];
                    case 31:
                        _b.sent();
                        _b.label = 32;
                    case 32: return [3, 35];
                    case 33: return [4, contact.say('[addEnvs]接口请求失败,请管理员查看日志')];
                    case 34:
                        _b.sent();
                        return [2];
                    case 35: return [4, OnMessages.bindRemarks(remarks, contact, jdId)];
                    case 36:
                        _b.sent();
                        _b.label = 37;
                    case 37: return [2];
                }
            });
        });
    };
    OnMessages.bindRemarks = function (remarks, contact, jdId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(/^jd-/.test(remarks) || /^jd_/.test(remarks))) return [3, 4];
                        if (!new RegExp(jdId).test(remarks)) return [3, 2];
                        return [4, contact.say(constant_1["default"].message.msg1 + jdId + ',' + constant_1["default"].message.msg3)];
                    case 1:
                        _a.sent();
                        return [2];
                    case 2:
                        contact.alias(remarks + '#' + jdId);
                        return [4, contact.say(constant_1["default"].message.msg2 + remarks + '#' + jdId)];
                    case 3:
                        _a.sent();
                        return [2];
                    case 4:
                        contact.alias(jdId);
                        return [4, contact.say(constant_1["default"].message.msg2 + jdId)];
                    case 5:
                        _a.sent();
                        return [2];
                }
            });
        });
    };
    OnMessages.forwardLogGroup = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            var contact, content, remarks, room;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        contact = msg.talker();
                        content = msg.text().trim();
                        return [4, contact.alias()];
                    case 1:
                        remarks = _a.sent();
                        if (!(config_1["default"].logGroup && config_1["default"].logGroup != '')) return [3, 4];
                        return [4, Bot_1.bot.Room.find({ topic: config_1["default"].logGroup })];
                    case 2:
                        room = _a.sent();
                        return [4, (room === null || room === void 0 ? void 0 : room.say("\u3010\u8054\u7CFB\u4EBA\u6D88\u606F\u3011\n\u6765\u81EA:".concat(contact.name()).concat(remarks == '' ? '' : "(".concat(remarks, ")"), "\n\u5185\u5BB9:").concat(content)))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2];
                }
            });
        });
    };
    OnMessages.check_ql_module = function (contact) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (config_1["default"].ql_module) {
                            return [2, true];
                        }
                        return [4, contact.say('[ql_module]JD相关模块已关闭, 联系管理员开启')];
                    case 1:
                        _a.sent();
                        return [2, false];
                }
            });
        });
    };
    return OnMessages;
}());
exports.OnMessages = OnMessages;
