/**
 * Created by qingxin.zheng on 2015/9/17.
 * 翻页控件
 * 依赖：jquery,zqx_touch
 */

!window.jQuery && document.write('<script src="http://code.jquery.com/jquery-latest.js"></script>');
var zqx_paging = {

    _currentIndex: 0,

    _currentPage: {},

    _nextPage: {},

    _elements: [],

    _defaultOptions: {
        "x-slide": {
            forwardOutClass: "zqx-page-moveToLeft",
            forwardInClass: "zqx-page-moveFromRight",
            backOutClass: "zqx-page-moveToRight",
            backInClass: "zqx-page-moveFromLeft"
        },
        "y-slide": {
            forwardOutClass: "zqx-page-moveToTop",
            forwardInClass: "zqx-page-moveFromBottom",
            backOutClass: "zqx-page-moveToBottom",
            backInClass: "zqx-page-moveFromTop"
        },
        "x-slide-scale-down": {
            forwardOutClass: "zqx-page-scaleDown",
            forwardInClass: "zqx-page-moveFromRight",
            backOutClass: "zqx-page-scaleDown",
            backInClass: "zqx-page-moveFromLeft"
        },
        "y-slide-scale-down": {
            forwardOutClass: "zqx-page-scaleDown",
            forwardInClass: "zqx-page-moveFromBottom",
            backOutClass: "zqx-page-scaleDown",
            backInClass: "zqx-page-moveFromTop"
        },
        "z-cover-scale-down": {
            forwardOutClass: "zqx-page-scaleDown",
            forwardInClass: "zqx-page-scaleUp zqx-page-delay300",
            backOutClass: "zqx-page-scaleUpDown",
            backInClass: "zqx-page-scaleUpUp zqx-page-delay300"
        },
        "z-flip-right": {
            forwardOutClass: "zqx-page-flipOutRight",
            forwardInClass: "zqx-page-flipInLeft zqx-page-delay300",
            backOutClass: "zqx-page-scaleUpDown",
            backInClass: "zqx-page-scaleUpUp zqx-page-delay300"
        }
    },

    _endCurrent: false,

    _endNext: false,

    _forwardInClass: "zqx-page-moveFromRight",

    _forwardOutClass: "zqx-page-moveToLeft",

    _backInClass: "zqx-page-moveFromLeft",

    _backOutClass: "zqx-page-moveToRight",

    _isAnimate: false,               //判断是否处于动画状态

    init: function (elements, effect) {
        this._elements = elements;
        this._currentPage = elements.eq(0);
        this._nextPage = elements.eq(1);
        this._forwardInClass = this._defaultOptions[effect].forwardInClass;
        this._forwardOutClass = this._defaultOptions[effect].forwardOutClass;
        this._backInClass = this._defaultOptions[effect].backInClass;
        this._backOutClass = this._defaultOptions[effect].backOutClass;
        return this;
    },

    triggerForward: function () {
        var self = this;
        if (!self._isAnimate) {
            self._isAnimate = true;
            this._nextPage = this._elements.eq(this._currentIndex + 1);
            var amEndEvent = "webkitAnimationEnd";
            if (getBrowserInfo().toString().indexOf("msie") || getBrowserInfo().toString().indexOf("firefox")) {
                amEndEvent = "animationend";
            }
            this._currentPage.addClass(self._forwardOutClass).on(amEndEvent, function () {
                $(this).off(amEndEvent);
                $(this).removeClass("pt-current-page").removeClass(self._forwardOutClass);
                self._endCurrent = true;
                if (self._endNext) {
                    self.onForwardEndAnimate();
                    self._isAnimate = false;
                }
            });
            this._nextPage.addClass("pt-current-page").addClass(self._forwardInClass).on(amEndEvent, function () {
                $(this).off(amEndEvent);
                self._endNext = true;
                if (self._endCurrent) {
                    self._isAnimate = false;
                    self.onForwardEndAnimate();
                }
            });
        }
    },
    triggerBack: function () {
        var self = this;
        if (!self._isAnimate) {
            self._isAnimate = true;
            this._nextPage = this._elements.eq(this._currentIndex - 1);
            var amEndEvent = "animationend";
            if (getBrowserInfo().toString().indexOf("chrome") || getBrowserInfo().toString().indexOf("safari")) {
                amEndEvent = "webkitAnimationEnd";
            }
            this._currentPage.addClass(self._backOutClass).on(amEndEvent, function () {
                $(this).off(amEndEvent);
                $(this).removeClass("pt-current-page").removeClass(self._backOutClass);
                self._endCurrent = true;
                if (self._endNext) {
                    self._isAnimate = false;
                    self.onBackEndAnimate();
                }
            });
            this._nextPage.addClass("pt-current-page").addClass(self._backInClass).on(amEndEvent, function () {
                $(this).off(amEndEvent);
                self._endNext = true;
                if (self._endCurrent) {
                    self._isAnimate = false;
                    self.onBackEndAnimate();
                }
            });
        }
    },
    onForwardEndAnimate: function () {
        this._currentPage.removeClass(this._forwardOutClass);
        this._nextPage.removeClass(this._forwardInClass);
        this._endCurrent = false;
        this._endNext = false;
        this._currentPage = this._nextPage;
        this._currentIndex++;
        if (this._currentIndex == this._elements.length - 1) {
            this._currentIndex = -1;
        }
    },
    onBackEndAnimate: function () {
        this._currentPage.removeClass(this._backOutClass);
        this._nextPage.removeClass(this._backInClass);
        this._endCurrent = false;
        this._endNext = false;
        this._currentPage = this._nextPage;
        this._currentIndex--;
        if (this._currentIndex == 0) {
            this._currentIndex = this._elements.length - 1;
        }
    }
};

function getBrowserInfo() {
    var agent = navigator.userAgent.toLowerCase();

    //var regStr_ie = /msie [\d.]+;/gi;
    //var regStr_ff = /firefox\/[\d.]+/gi
    //var regStr_chrome = /chrome\/[\d.]+/gi;
    //var regStr_saf = /safari\/[\d.]+/gi;
    //var regStr_ip = /iphone\/[\d.]+/gi;
    //IE
    if (agent.indexOf("msie") > 0) {
        //return agent.match(regStr_ie);
        return "msie";
    }


    //firefox
    if (agent.indexOf("firefox") > 0) {
        //return agent.match(regStr_ff);
        return "firefox";
    }

    //Chrome
    if (agent.indexOf("chrome") > 0) {
        //return agent.match(regStr_chrome);
        return "chrome";
    }

    //Safari
    if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
        //return agent.match(regStr_saf);
        return "safari";
    }
    //iphone
    if (agent.indexOf("iphone")) {
        //return agent.match(regStr_ip);
        return "iphone";
    }

    if(agent.indexOf("android")){
        return "android";
    }

}