import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import progressbar from 'components/pintuan';
import { Indicator, Toast } from 'mint-ui';

export default {
	data() {
		return {
			timer:null,
			rightTime: 0,
			finish: '',
			newPerson: [],
			groupperson: [],
			groupgoods: {},
			order_sn: '',
			personlength: '',
			title: '',
			sharegoods: {},
			searchall: true,
			goods_id: '',
			option_id: '',
			is_group_buying: '',
			group_num: '',
			group_order_sn: '',
			group_down_time: '',
			id: '',
			pay_time: '',
			nickname: '',
			avater: '',
			group_leder: '',
			widths: '',
			width: '',
			dd: '',
			hh: '',
			ss: '',
			mm: '',
			timeshow: false,
			timeshow1: false,
			uid: '',
			userid: '',
			uidarr: [],
			showbtn: false,
			joinshow: true,
			group_status: ''

		}
	},
	methods: {
		//初始化分享设置
		initShare() {
			let that = this;
			console.log(document.location.href);
			let _url = document.location.href;
			let json = {
				url: _url,
				"i": this.fun.getKeyByI(),
				"type": this.fun.getTyep(),
				"mid": this.fun.getKeyByMid(),
				'order_sn': this.$route.query.order_sn
			};
			$http.post('member.member.wxJsSdkConfig', json).then(function(response) {
				console.log(response)
				if(response.result == 1) {
					//that.cservice = response.data.shop.cservice;
					var cs = response.data.shop.cservice;
					that.share(response.data);
					if(that.fun.isTextEmpty(that.zoneId)) {
						that.initCservice(response.data.shop.cservice); //重新赋值
					} else {
						$http.get("plugin.area-store.frontend.store.get-costom-service-by-store-id", {
							as_id: that.zoneId
						}).then(response => {
							if(response.result == 1) {
								that.initCservice(response.data.link);
							} else {
								console.log(cs);
								that.initCservice(cs)
							}
						})
					}

				} else {

				}
			}, function(response) {
				console.log(response);
			});
		},

		//分享
		shareWeixin() {
			//不是微信端 不访问
			if(this.fun.getTyep() == 5) {
				console.log('我不是微信');
				return;
			} else if(this.fun.getTyep() == 7) {
				this.appSharesinit();
				return;
			}
			MessageBox({
				title: '提示',
				message: '请点击右上角微信分享',
				showCancelButton: true
			});
		},
		//app获取分享数据
		appSharesinit() {
			var that = this;
			var _url = document.location.href;
			var json = {
				url: _url,
				"i": this.fun.getKeyByI(),
				"type": this.fun.getTyep()
			};
			$http.post('member.member.wxJsSdkConfig', json).then(function(response) {
				if(response.result == 1) {
					that.appShare(response.data);
				}
			}, function(response) {
				console.log(response);
			});
		},
		//app分享设置
		appShare(data) {
			var that = this;
			var _title = (that.fun.isTextEmpty(that.sharegoods.title));
			console.log('我的分享标签3', that.sharegoods.title);
			console.log('我的分享标签4', that.sharegoods.thumb);
			var _link = document.location.href + "&share_tag=2";
			_link = that.fun.isMid(_link, data.info.uid);
			var _imgUrl = (that.fun.isTextEmpty(that.sharegoods.thumb));
			var _desc = (that.fun.isTextEmpty(that.sharegoods.title));
			YDB.Share(_title, _desc, _imgUrl, _link, "Sharesback");
		},

		//组装分享设置
		share(data) {
			let that = this;
			wx.config(data.config);
			wx.ready(function() {
				let _title = (that.fun.isTextEmpty(that.sharegoods.title)) ? that.sharegoods.title : that.sharegoods.title;
				//let _link = document.location.href + "&mid=" + data.info.uid + "&share_tag=2";
				//let _link = location.protocol+'//'+location.host+location.pathname +'?i='+ that.fun.getKeyByI() +"&type=" +that.fun.getTyep()+ "&mid=" + data.info.uid + "&share_tag=2"; 
				let _link = document.location.href + "&share_tag=2";
				_link = that.fun.isMid(_link, data.info.uid);

				let _imgUrl = (that.fun.isTextEmpty(that.sharegoods.thumb)) ? that.sharegoods.thumb : that.sharegoods.thumb;
				let _desc = (that.fun.isTextEmpty(that.sharegoods.title)) ? that.sharegoods.title : that.sharegoods.title;
				wx.showOptionMenu();
				wx.onMenuShareTimeline({
					title: _title, // 分享标题
					link: _link, // 分享链接
					imgUrl: _imgUrl, // 分享图标
					success: function() {
						Toast("分享成功");
					},
					cancel: function() {
						Toast("取消分享");
					}
				});

				wx.onMenuShareAppMessage({
					title: _title, // 分享标题
					desc: _desc, // 分享描述
					link: _link, // 分享链接
					imgUrl: _imgUrl, // 分享图标
					type: 'link', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {
						Toast("分享成功");
					},
					cancel: function() {
						Toast("取消分享");
					}
				});
			});
		},

		gotolist() {
			this.$router.push(this.fun.getUrl('group'));
		},
		nogotoDetail(id) {
			var that = this;
			let json = {
				id: id
			}
			$http.get("goods.goods.get-goods", json, "加载中...").then(response => {
				if(response.result == 1) {
					if(response.data.is_course == 1) {
						this.$router.push(this.fun.getUrl('CourseDetail', {
							goods_id: id
						}));
					} else if(response.data.goods_type == 1) {
						this.$router.push(this.fun.getUrl('goodsO2O', {
							id: id,
							"tag": "o2o",
							store_id: response.data.store_id
						}));

					} else {
						this.$router.push(this.fun.getUrl('goods', {
							id: id
						}));

					}
				}
			}).catch(error => {
				console.log(error);
			})
		},
		getinfo() {
			var that = this;
			$http.get('member.member.getUserInfo').then(function(response) {
				if(response.result == 1) {
					var myData = response.data;
					that.userid = myData.uid;
					for(var key of that.uidarr) {
						if(key===that.userid ) {
						that.showbtn = false;	
						}else{
						that.showbtn = true;			
						}
					}
					console.log('我的id是', that.userid);
				}
				that.getContentlist();
			});
		},
		gotoDetail(id) {
			var that = this;
			let json = {
				id: id,
				is_group_buying: that.is_group_buying,
				group_num: that.group_num,
				group_down_time: that.group_down_time,
				group_order_sn: that.group_order_sn
			}
			$http.get("goods.goods.get-goods", json, "加载中...").then(response => {
				if(response.result == 1) {
					if(response.data.is_course == 1) {
						this.$router.push(this.fun.getUrl('CourseDetail', {
							goods_id: id
						}, {
							group_order_sn: that.order_sn
						}));
					} else if(response.data.goods_type == 1) {
						this.$router.push(this.fun.getUrl('goodsO2O', {
							id: id,
							"tag": "o2o",
							store_id: response.data.store_id
						}));

					} else {
						this.$router.push(this.fun.getUrl('goods', {
							id: id
						}, {
							group_order_sn: that.order_sn
						}));

					}
				}
			}).catch(error => {
				console.log(error);
			})
		},
		times(data) {
			this.timer=setInterval(() => {
				var aaa = "";
				aaa = parseInt(data);
				var nowtime = "";
				nowtime = parseInt(new Date().getTime());
				this.rightTime = 0;
				this.rightTime = aaa - nowtime;
			
				if(this.rightTime > 0) {
					var dd = Math.floor(this.rightTime / 1000 / 60 / 60 / 24);
					var hh = Math.floor((this.rightTime / 1000 / 60 / 60) % 24);
					var mm = Math.floor((this.rightTime / 1000 / 60) % 60);
					var ss = Math.floor((this.rightTime / 1000) % 60);
					hh < 10 ? hh = '0' + hh : hh = hh;
					mm < 10 ? mm = '0' + mm : mm = mm;
					ss < 10 ? ss = '0' + ss : ss = ss;
					this.dd = dd;
					this.hh = hh;
					this.mm = mm;
					this.ss = ss;
					this.timeshow = false;
					this.timeshow1 = true;
				} else {
					this.timeshow = true;
					this.timeshow1 = false;
				}
//								console.log('时间',this.dd+'天'+this.hh+'小时'+this.mm+'分'+this.ss+'秒');
			}, 1000)
		},

		getContentlist() {
			var that = this;
			//			that.finish="";
			that.order_sn = this.$route.query.order_sn;
			$http.get("order.group-buying-list.team&order_sn=" + that.order_sn).then((response) => {
				if(response.result == 1) {
					var endtime = '';
					var dataList = response;
					endtime = new Date(response.extra.finish_date).getTime();
					//					that.finish =endtime;
					//				    dataList['times'] =endtime;	
					console.log('结束时间', endtime);
					this.times(endtime);
					console.log('我的商品拼团人数', response.data);
					that.groupperson = response.data;
					that.personlength = response.data.length;
					that.newPerson = [];
					for(var i = 0; i < that.groupperson.length; i++) {
						that.sharegoods = that.groupperson[0].has_one_order_good;
						that.goods_id = that.groupperson[0].has_one_order_good.goods_id;
						that.is_group_buying = that.groupperson[0].group_status;
						that.group_status = that.groupperson[0].group_status;
						that.group_num = that.groupperson[0].group_num;
						that.group_order_sn = that.groupperson[0].group_order_sn;
						that.group_down_time = that.groupperson[0].group_down_time;
						that.groupgoods = that.groupperson[0].has_one_order_good;
						that.avater = that.groupperson[i].belongs_to_member.avatar;
						that.nickname = that.groupperson[i].belongs_to_member.nickname;
						that.pay_time = that.groupperson[i].pay_time;
						that.group_leder = that.groupperson[i].is_group_leader;
						that.uid = that.groupperson[i].belongs_to_member.uid;
						that.uidarr = [];
						that.uidarr.push(that.groupperson[i].belongs_to_member.uid);
						console.log('存入的id有', that.uidarr);
						var jsons = {
							img: that.avater,
							name: that.nickname,
							time: that.pay_time,
							group_leder: that.group_leder
						};
						that.newPerson.push(jsons);
					}
					that.width = Math.round(that.personlength / that.group_num * 100);
					that.widths = that.width + '%';
					if(that.personlength == that.group_num || that.group_status == 3) {
						that.joinshow = false;
					}
					console.log('img图', that.imgarr);
					console.log('num', that.group_num);
					console.log('order_sn', that.group_order_sn);
					console.log('time', that.group_down_time);
					console.log('buying', that.is_group_buying);
					console.log('id', that.goods_id);
					console.log('我要传的数据是', that.newPerson);
				}
			});
		},
		gotoPerson() {
			var newsperson = JSON.stringify(this.newPerson);
			this.$router.push(this.fun.getUrl('grouppeople', {
				person: newsperson
			}));

		},

	},
	activated() {
		this.finish = '';
		this.rightTime = 0;
	clearInterval(this.timer);
		
		//		this.getContentlist();
		console.log('我要的订单豪', this.$route.query.order_sn);
		this.getinfo();
	},
	mounted() {
	clearInterval(this.timer);

	},

	components: {
		cTitle,
		progressbar,

	}
}