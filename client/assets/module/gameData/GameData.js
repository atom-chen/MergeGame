let Util = require('Util');
let ObserverMgr = require('ObserverMgr');
module.exports = {
    playerInfo: {
        userId: '',
        name: '',
        diamond: 0,
        medal: 0,
        gold: 0,
        historyGold: 0,
        level: 0,
        loginTimes: 1
    },

    initPlayerInfo(data) {
        if (data === undefined) {
            this.resetPlayerInfo();
            let userId = Util.getStorage('UserId');
            if (userId === null || userId === undefined) {
                userId = dayjs().unix();
                Util.setStorage('UserId', userId);
            }
            this.playerInfo.userId = userId;
        } else {
            this.playerInfo.userId = data.userId;
            this.playerInfo.gold = data.gold;
            this.playerInfo.name = data.name;
            this.playerInfo.medal = data.medal;
            this.playerInfo.diamond = data.diamond;
            this.playerInfo.historyGold = data.historyGold;
            this.playerInfo.level = data.level;
            this.playerInfo.loginTimes = data.loginTimes;
        }
    },

    resetPlayerInfo() {
        this.playerInfo.userId = '';
        this.playerInfo.name = '';
        this.playerInfo.gold = 0;
        this.playerInfo.diamond = 0;
        this.playerInfo.historyGold = 0;
        this.playerInfo.medal = 0;
        this.playerInfo.level = 0;
        this.playerInfo.loginTimes = 1;
    },

    initGameDataEvent() {
        ObserverMgr.removeEventListenerWithObject(this);
        //监听勋章兑换
        ObserverMgr.addEventListener(GameMsgHttp.Msg.ExchangeMedal.msg, (msg, data) => {
            if (data !== null) {
                this.playerInfo.gold = data.gold;
                this.playerInfo.medal = data.medal;
                ObserverMgr.dispatchMsg(GameLocalMsg.Msg.UpdateUserinfo, this.playerInfo);
            }
        }, this)
    }
};