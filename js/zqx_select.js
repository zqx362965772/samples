/**
 * Created by Qingxin.Zheng on 15/9/17.
 */

;!window.jQuery && document.write('<script src="http://code.jquery.com/jquery-latest.js"></script>');

(function ($) {
    if(!$){
        alert("This Plugin needs jquery!");
        return;
    }
    var zqx_select = function (ele, config) {
        this._element = $(ele);
        this._element.addClass("btn btn-select");
        this._optionItems = config.options;
        this._currentStatus = false;
        this._itemsTargetY = this._element.offset().top + this._element.outerHeight() + 3;
        this._itemsTargetX = this._element.offset().left;
        this._itemsDiv = this.appendItems();
        this.bindEvent();
        this._callback = config.valueChange;
    }
    zqx_select.prototype.appendItems = function () {
        var $itemDiv = $('<div class="select-items-div"></div>');
        var itemTemplate = '';
        for (var i = 0; i < this._optionItems.length; i++) {
            itemTemplate += '<button class="btn btn-select-item" value="' + this._optionItems[i].value + '">';
            itemTemplate += this._optionItems[i].text + '</button>';
        }
        $itemDiv.html(itemTemplate);
        $itemDiv.css({
            top: this._itemsTargetY + 35,
            left: this._itemsTargetX,
            display: 'none'
        });
        $('body').append($itemDiv);
        // this._element.after($itemDiv);
        return $itemDiv;
    }
    zqx_select.prototype.bindEvent = function () {
        var self = this;
        //显示
        self._element.click(function (e) {
            if (!self._currentStatus) {
                self._itemsDiv.css({
                    display: "block",
                    opacity: 0
                }).animate({
                    top: self._itemsTargetY,
                    opacity: 1
                }, 500)
                self._currentStatus = true;
            }
            return false;
        })
        //关闭
        $('body').click(function () {
            if (self._currentStatus) {
                self._itemsDiv.animate({
                    top: self._itemsTargetY + 35,
                    opacity: 0
                }, 500, 'linear', function () {
                    $(this).css({display: "none"});
                });
                self._currentStatus = false;
            }
        })
        //点击
        this._itemsDiv.children(".btn-select-item").click(function(){
            var selectValue = $(this).attr("value");
            var selectText = $(this).text();
            self._element.attr('select-value', selectValue);
            self._element.text(selectText);
            self._itemsDiv.animate({
                top: self._itemsTargetY + 35,
                opacity: 0
            }, 500, 'linear', function () {
                $(this).css({display: "none"});
            })
            self._currentStatus = false;
            self._callback();
            return false;
        })
    }


    function Plugin(config) {
        return this.each(function () {
            var $this = $(this);
            new zqx_select($this, config);
        })
    }

    $.fn.zqx_select = Plugin;

}(jQuery))


// var zqx_select = {

//     _element: {},

//     _optionItems: [],

//     _itemsDiv: {},

//     _itemsTargetY: 0,

//     _itemsTargetX: 0,

//     _currentStatus: false,

//     _callback:function(){

//     },

//     init: function (ele, optionItems,callback) {
//         this._element = ele instanceof jQuery ? ele : $(ele);
//         this._element.addClass("btn btn-select");
//         this._optionItems = optionItems;
//         this._itemsTargetY = this._element.offset().top + this._element.outerHeight()+3;
//         this._itemsTargetX = this._element.offset().left;
//         this._itemsDiv = this.appendItems();
//         this.bindEvent();
//         this._callback = callback;
//         return this;
//     },

//     appendItems: function () {
//         var $itemDiv = $('<div class="select-items-div"></div>');
//         var itemTemplate = '';
//         for (var i = 0; i < this._optionItems.length; i++) {
//             itemTemplate += '<button class="btn btn-select-item" value="' + this._optionItems[i].value + '">';
//             itemTemplate += this._optionItems[i].text + '</button>';
//         }
//         $itemDiv.html(itemTemplate);
//         $itemDiv.css({
//             top: this._itemsTargetY + 35,
//             left: this._itemsTargetX,
//             display: 'none'
//         });
//         $('body').append($itemDiv);
//         return $itemDiv;
//     },

//     bindEvent: function () {
//         var self = this;
//         //显示
//         self._element.click(function (e) {
//             if (!self._currentStatus) {
//                 self._itemsDiv.css({
//                     display: "block",
//                     opacity: 0
//                 }).animate({
//                     top: self._itemsTargetY,
//                     opacity: 1
//                 })
//                 self._currentStatus = true;
//             }
//             return false;
//         })
//         //关闭
//         $('body').click(function () {
//             if (self._currentStatus) {
//                 self._itemsDiv.animate({
//                     top: self._itemsTargetY + 35,
//                     opacity: 0
//                 })
//                 self._currentStatus = false;
//             }
//         })
//         //点击
//         $('.btn-select-item').click(function () {
//             self._element.attr('value',$(this).attr('value')).text($(this).text());
//             self._itemsDiv.animate({
//                 top: self._itemsTargetY + 35,
//                 opacity: 0
//             })
//             self._currentStatus = false;
//             self._callback();
//             return false;
//         })
//     }

// }
