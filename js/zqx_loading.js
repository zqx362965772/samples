/**
 * Created by qingxin.zheng on 2015/9/21.
 */
 ;
!window.jQuery && document.write('<script src="http://code.jquery.com/jquery-latest.js"></script>');
// (function ($) {
// 	if(!$){
//         alert("This Plugin needs jquery!");
//         return;
//     }
//     var zqx_loading = function (options) {
//     	this._option = options;
//         this._effect = options.effect ? options.effect : "zqx_loading_icon2";
//         this._element = null;
//     }

//     zqx_loading.prototype.init = function () {
//         if (!this._element || this._effect != this._option.effect) {
//             this._effect = this._option.effect;
//             if (this._effect == "zqx_loading_icon1") {
//                 this._element = $('<div class="zqx_barrier"><div class="zqx_loading_area"><div class="zqx_loading_icon1"></div></div></div>');
//             } else if (this._effect == "zqx_loading_icon2") {
//                 this._element = $('<div class="zqx_barrier"><div class="zqx_loading_icon2"></div></div>')
//             }
//             this._element.hide();
//             $("body").append(this._element);
//         }
//     }
//     zqx_loading.prototype.loading = function () {
//         if (!this._element || this._effect != this._option.effect) {
//             this.init(this._option);
//         }
//         this._element.show();
//         return this;
//     }
//     zqx_loading.prototype.unloading = function () {
//         if (!this._element) {
//             this.init();
//         }
//         this._element.hide();
//         return this;
//     }

//     $.zqx_loading = zqx_loading;
// }(jQuery))

var zqx_loading = {

	_effect:"zqx_loading_icon1",

	_option:{},

	_element:null,

	init:function(options){
		if(!this._element||this._effect!=options.effect){
			this._effect = options.effect;
			if(this._effect=="zqx_loading_icon1"){
				this._element = $('<div class="zqx_barrier"><div class="zqx_loading_area"><div class="zqx_loading_icon1"></div></div></div>');	
			}else if(this._effect=="zqx_loading_icon2"){
				this._element=$('<div class="zqx_barrier"><div class="zqx_loading_icon2"></div></div>')
			}
			this._element.hide();
			$("body").append(this._element);
		}
		return this;
	},

	loading:function(options){
		if(!this._element||this._effect!=options.effect){
			this.init(options);
		}
		this._element.show();
		return this;
	},

	unloading:function(){
		if(!this._element){
			this.init();
		}
		this._element.hide();
		return this;
	}
}