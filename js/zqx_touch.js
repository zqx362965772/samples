/**
 * Created by Qingxin.Zheng on 15/10/7.
 * 触屏滑动插件
 */
var zqx_touch = {

    _distance: 50,
    _startX: 0,
    _startY: 0,
    _endX: 0,
    _endY: 0,
    _touchXForwardEvents: [],
    _touchXBackEvents: [],
    _touchYForwardEvents: [],
    _touchYBackEvents: [],

    addTouchXForwardEvent: function (func) {
        this._touchXForwardEvents.push(func);
    },
    addTouchXBackEvent: function () {
        this._touchXBackEvents.push(func);
    },
    addTouchYForwardEvent: function (func) {
        this._touchYForwardEvents.push(func);
    },
    addTouchYBackEvent: function (func) {
        this._touchYBackEvents.push(func);
    },
    triggerEvents: function (e) {
        if (this._endX - this._startX > this._distance) {
            for (var i = 0; i < this._touchXBackEvents.length; i++) {
                this._touchXBackEvents[i]();
            }
            return;
        }
        if (this._endX - this._startX < this._distance * -1) {
            for (var i = 0; i < this._touchXForwardEvents.length; i++) {
                this._touchXForwardEvents[i]();
            }
            return;
        }
        if (this._endY - this._startY > this._distance) {
            for (var i = 0; i < this._touchYBackEvents.length; i++) {
                this._touchYBackEvents[i]();
            }
            return;
        }
        if (this._endY - this._startY < this._distance*-1) {
            for (var i = 0; i < this._touchYForwardEvents.length; i++) {
                this._touchYForwardEvents[i]();
            }
            return;
        }
        e.target.click();
    },
    clear: function () {
        this._endX = 0;
        this._endY = 0;
        this._startX = 0;
        this._startY = 0;
    },
    init: function () {
        var self = this;
        document.addEventListener("touchstart", function (e) {
            e.preventDefault();
            self._startX = e.touches[0].pageX;
            self._startY = e.touches[0].pageY;
        }, false);
        document.addEventListener("touchend", function (e) {
            e.preventDefault();
            self._endX = e.changedTouches[0].clientX;
            self._endY = e.changedTouches[0].clientY;
            self.triggerEvents(e);
            self.clear();
        }, false);
        document.addEventListener("touchmove",function(e){
            e.preventDefault();
        },false);
        document.addEventListener("mousedown", function (e) {
            e.preventDefault();
            self._startX = e.clientX;
            self._startY = e.clientY;
        }, false);
        document.addEventListener("mouseup", function (e) {
            e.preventDefault();
            self._endX = e.clientX;
            self._endY = e.clientY;
            self.triggerEvents(e);
            self.clear();
        }, false);
    }
};
(function () {
    zqx_touch.init();
})();