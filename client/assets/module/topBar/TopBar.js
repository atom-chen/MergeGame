let Observer = require('Observer');
let GameData = require('GameData');
let Util = require('Util');
let UIMgr = require('UIMgr');

cc.Class({
    extends: Observer,

    properties: {
        userinfoBar: {
            displayName: 'userinfoBar',
            default: null,
            type: cc.Node
        },
        medalBar: {
            displayName: 'medalBar',
            default: null,
            type: cc.Node
        },
        diamondBar: {
            displayName: 'diamondBar',
            default: null,
            type: cc.Node
        },
        lblUserMedal: {
            displayName: 'lblUserMedal',
            default: null,
            type: cc.Label
        },
        lblUserDiamond: {
            displayName: 'lblUserDiamond',
            default: null,
            type: cc.Label
        },
        lblUserLevel: {
            displayName: 'lblUserLevel',
            default: null,
            type: cc.Label
        },
        medalPre: {
            displayName: 'medalPre',
            default: null,
            type: cc.Prefab
        },
    },

    // LIFE-CYCLE CALLBACKS:
    _getMsgList() {
        return [
            GameLocalMsg.Msg.UpdateUserinfo
        ];
    },
    _onMsg(msg, data) {
        if (msg === GameLocalMsg.Msg.UpdateUserinfo) {
            this.refreshView();
        }
    },
    onLoad() {
        this._initMsg();
        this.refreshView();
    },

    start() {

    },

    // update (dt) {},
    refreshView() {
        this.lblUserMedal.string = Util.numberFormat(GameData.playerInfo.medal);
        this.lblUserDiamond.string = Util.numberFormat(GameData.playerInfo.diamond);
        this.lblUserLevel.string = Util.numberFormat(GameData.playerInfo.level);
    },

    onBtnClickToMedal() {
        UIMgr.createPrefab(this.medalPre, (root, ui) => {
            this.node.parent.getChildByName('uiNode').addChild(root);
        });
        Util.reZOrderToTop(this.node);
    }
});