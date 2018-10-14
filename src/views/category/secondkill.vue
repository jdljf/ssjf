<template>
	<div id="secondkill">

		<c-title :hide="false" text='秒杀'></c-title>
		<div class="toparr">
			<div class="top">
				<div class="flexs " v-bind:class="{ 'action': isA }" @click="clickshow" data-name="today">今日精选</div>
				<div class="flexs" v-bind:class="{ 'action1': isB }" @click="clickshow" data-name="will">下场预告</div>
			</div>
		</div>
		<div class="br"></div>
		<div id="secondslist" v-if="show1" style="margin: 0px auto;padding:0px 3%;height: 100%;">
			<ul class="secondul" ref="secondul">
				<li v-hide="seconkill" class="secondgoods" v-for="item in contentlist">
					<div @click.stop="gotoDetail(item.id)">
						<img :src="item.thumb" alt="" />
						<div class="text-right" style="margin-left: 15px;display: inline-block;position: relative;">
							<div class="secondkilltit">{{item.title}}</div>
							<div class="secondprice">
								<span class="timedif" style="" :key="index">
					             秒杀：{{item.daojishi}}
								</span>
								<div class="secondprice-left">
									<span style="color:#E8292E;font-size: .9rem;">￥{{(item.member_discount!=false&&item.member_discount.discount_value!=0?item.member_discount.discount_value:item.market_price)}}</span><del style="color:#C6C7C6;display: block;">￥{{item.price}}</del>
									<div>
										<span></span>
										<span class="gosecondkill">去抢购</span>
									</div>
									<div class="progressbar-div">
										<progressbar :rest="item.readlybuy" :total="item.total" :barwidth="item.barwidth"></progressbar>
									</div>
								</div>
							</div>
						</div>
					</div>
				</li>

			</ul>
		</div>
		<div v-if="jiazaiload" @click="clickadd" style="line-height: 30px;">点击加载更多</div>
		<div id="secondslist" v-if="show2" style="margin: 0px auto;padding:0px 3%;height: 100%;">
			<ul class="secondul" ref="secondul">
				<li v-hide="seconkill" class="secondgoods" v-for="item in willlist">
					<div @click.stop="gotoDetail(item.id)">
						<img :src="item.thumb" alt="" />
						<div class="text-right" style="margin-left: 15px;display: inline-block;position: relative;">
							<div class="secondkilltit">{{item.title}}</div>
							<div class="secondprice">
								<span class="timedif1" :key="index">
					             距离秒杀：{{item.daojishi}}
								</span>
								<div class="secondprice-left">
									<span style="color:#E8292E;font-size: .9rem;">￥{{(item.member_discount!=false&&item.member_discount.discount_value!=0?item.member_discount.discount_value:item.market_price)}}</span><del style="color:#C6C7C6;display: block;">￥{{item.price}}</del>
									<div>
										<span></span>
										<span class="gosecondkill1">立即预约</span>
									</div>
									<div class="progressbar-div">
										<progressbar :rest="item.readlybuy" :total="item.total" :barwidth="item.barwidth"></progressbar>
									</div>
								</div>
							</div>
						</div>
					</div>
				</li>

			</ul>
		</div>
		<div v-if="jiazaiload" @click="clickadd1" style="line-height: 30px;">点击加载更多</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import progressbar from 'components/progress';
	import cTitle from 'components/title';
	import cRootlist from 'components/rootlist';
	import cCarcontent from 'components/carcontent';
	import BScroll from 'better-scroll';
	import Fun from '../../fun';
	import PullToRefresh from 'components/pull-to-refresh.vue';
	import { Indicator, Toast } from 'mint-ui';
	import { Loadmore } from 'mint-ui';
	import { InfiniteScroll } from 'mint-ui';

	export default {
		data() {
			return {
				allLoaded: false,
				contentlist: [],
				willlist: [],
				endtime: [],
				dates: '',
				seconkill: false,
				page: 1,
				isLoadMore: true,
				loading: false,
				tag: true,
				jiazaiload: false,
				last_page: 0,
				toal: '',
				cpage: '',
				show1: true,
				show2: false,
				allpage: '',
				action: false,
				isA:true,
				isB:false

			}
		},
		computed: mapState(["view"]),
		methods: {
			setCountdown(dataList) {
				setInterval(() => {
					for(var key in dataList) {
						var aaa = parseInt(dataList[key]["newEndTimeChuo"]);
						var bbb = new Date().getTime();
						var rightTime = aaa - bbb;
						if(rightTime > 0) {
							var dd = Math.floor(rightTime / 1000 / 60 / 60 / 24);
							var hh = Math.floor((rightTime / 1000 / 60 / 60) % 24);
							var mm = Math.floor((rightTime / 1000 / 60) % 60);
							var ss = Math.floor((rightTime / 1000) % 60);
							hh < 10 ? hh = '0' + hh : hh = hh;
							mm < 10 ? mm = '0' + mm : mm = mm;
							ss < 10 ? ss = '0' + ss : ss = ss;
						}
						//					console.log('<<<开始',dataList);
						//					console.log('<<<赋值======',dataList);
						dataList[key]["daojishi"] = dd + "天" + hh + "小时" + mm + "分" + ss + "秒";
						//										console.log(this.contentlist[key]["daojishi"]);
						//					console.log('新的对象this.contentlist=>>>', dataList[key].daojishi);

					}
				}, 1000);
			},
			InitTime(endtime) {
				var dd, hh, mm, ss = null;
				var time = parseInt(endtime) - new Date().getTime();
				if(time <= 0) {
					return '结束'
				} else {
					dd = Math.floor(time / 60 / 60 / 24);
					hh = Math.floor((time / 60 / 60) % 24);
					mm = Math.floor((time / 60) % 60);
					ss = Math.floor(time % 60);
					var str = dd + "天" + hh + "小时" + mm + "分" + ss + "秒";
					return str;
				}
			},
			gotoDetail(id) {
				$http.get("goods.goods.get-goods", {
					id: id
				}, "加载中...").then(response => {
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
			initData() {
				this.page = 1; //初始化分页
				this.allLoaded = false; //初始化加载更多
				this.jiazaiload = false;

			},
			getContentlist() {
				var that = this;
				let json = {
					page: this.page
				};
				var ulr2 = "shop.index.get-second-kill-goods";
				$http.get(ulr2, json, '..加载中').then((response) => {
					if(response.result == 1) {
						that.last_page = response.data.last_page;
						that.last_page = response.data.last_page;
						that.cpage = response.data.per_page;
						that.toal = response.data.total;
						that.allpage = that.toal / that.cpage;
						that.isMorePage(that.allpage);
						that.tag = true
						var dataList = response.data.data;
						for(var i = 0; i < dataList.length; i++) {
							this.endtime = dataList[i]['has_one_goods_limit_buy']['end_time'];
							this.dates = (Date.parse(new Date(this.endtime)));
							dataList[i]['newEndTimeChuo'] = this.dates;
							dataList[i]['daojishi'] = '';
							dataList[i]['barwidth'] = '';
							dataList[i]['readlybuy'] = '';
							dataList[i]['reset'] = dataList[i]['show_sales'];
							dataList[i]['stock'] = dataList[i]['stock'];
							dataList[i]['total'] = dataList[i]['reset'] + dataList[i]['stock'];
						}
						this.setCountdown(dataList);
						this.onBuy(dataList);
						this.contentlist = dataList;
						if(that.page == 1) {
							that.contentlist = [];
							that.contentlist = response.data.data;
						} else {
							if(response.data.data != null && response.data.data.length > 0) {
								that.contentlist = that.contentlist.concat(response.data.data);
							} else {
								that.isMorePage(0);
								Toast("暂无更多数据啦");
							}
						}
						console.log('zongshu', response.data.total);
						console.log(that.contentlist);

					} else {
						this.doException(response);
						that.isMorePage(0); //制造不可分页

					}
				});
			},
			getwill() {
				var that = this;
				let json = {
					page: this.page
				};
				var ulr2 = "shop.index.get-will-second-kill-goods";
				$http.get(ulr2, json, '..加载中').then((response) => {
					if(response.result == 1) {
						that.last_page = response.data.last_page;
						that.last_page = response.data.last_page;
						that.cpage = response.data.per_page;
						that.toal = response.data.total;
						that.allpage = that.toal / that.cpage;
						that.isMorePage(that.allpage);
						that.tag = true
						var dataList = response.data.data;
						for(var i = 0; i < dataList.length; i++) {
							this.endtime = dataList[i]['has_one_goods_limit_buy']['end_time'];
							this.dates = (Date.parse(new Date(this.endtime)));
							dataList[i]['newEndTimeChuo'] = this.dates;
							dataList[i]['daojishi'] = '';
							dataList[i]['barwidth'] = '';
							dataList[i]['readlybuy'] = '';
							dataList[i]['reset'] = dataList[i]['show_sales'];
							dataList[i]['stock'] = dataList[i]['stock'];
							dataList[i]['total'] = dataList[i]['reset'] + dataList[i]['stock'];
						}
						this.setCountdown(dataList);
						this.onBuy(dataList);
						this.willlist = dataList;
						if(that.page == 1) {
							that.willlist = [];
							that.willlist = response.data.data;
						} else {
							if(response.data.data != null && response.data.data.length > 0) {
								that.willlist = that.willlist.concat(response.data.data);
							} else {
								that.isMorePage(0);
								Toast("暂无更多数据啦");
							}
						}
						console.log('zongshu', response.data.total);
						console.log(that.willlist);

					} else {
						this.doException(response);
						that.isMorePage(0); //制造不可分页

					}
				});
			},

			clickshow(index) {
				var str = index.currentTarget.dataset.name;
				console.log('zz', str);
				if(str == 'today') {
					this.getContentlist();
					this.show1 = true;
					this.show2 = false;
					this.isA = true;
					this.isB = false;
					
				} else if(str == 'will') {
					this.getwill();
					this.show2 = true;
					this.show1 = false;
					this.isA = false;
					this.isB = true;
				}
			},
			isMorePage(allpage) {
				this.jiazaiload = this.page < allpage ? true : false;
			},
			clickadd() {
				this.page++;
				this.getContentlist();
				Toast("正在加载中");
			},
			clickadd1() {
				this.page++;
				this.getwill();
				Toast("正在加载中");
			},
			onBuy(dataList) {
				for(var key in dataList) {
					var reset = dataList[key]["reset"];
					var stock = dataList[key]['stock']
					var total = dataList[key]['total']
					total = reset + stock;
					if(reset >= total) {
						reset = total;
						this.seconkill = true;
					}
					dataList[key]['barwidth'] = Math.round(reset / total * 100);
					dataList[key]['readlybuy'] = dataList[key]['barwidth'] + '%';
				}
			},
		},
		created() {

		},
		mounted() {},
		activated() {
				
			
			//			console.log('方法调用了====activated=====');
			this.getContentlist();
			this.onBuy();
			this.initData();
			//			this.scroll();
		},
		components: {
			cTitle,
			cCarcontent,
			progressbar,
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	#secondkill {
		width: 100%;
		height: auto;
		padding-bottom: 50px;
		background: #F6F6F6;
		.br {
			width: 100%;
			height: 40px;
			margin-top: 40px;
		}
		.toparr {
			position: fixed;
			z-index: 1000;
			width: 100%;
			background: #fff;
			.top {
				display: flex;
				width: 100%;
				font-weight: bold;
				.flexs {
					flex: 1;
					line-height: 40px;
					border-bottom: 1px solid #F6F6F6;
				}
				.action {
					color: #E7272D;
					border-bottom: 2px solid #D64D31;
				}
				.action1 {
					color: #25ABF8;
					border-bottom: 2px solid #25ABF8;
				}
			}
		}
		.goostitle {
			text-align: left;
			border-bottom: 1px solid #F7F7F7;
			color: #E7292E;
			padding: 5px;
			font-weight: bold;
		}
		ul {
			li {
				border-radius: 2px;
				margin-top: 10px;
				padding: 10px 10px;
				text-align: left;
				background: #FFFFFF;
				border-bottom: 1px solid #F7F7F7;
				img {
					float: left;
					width: 30%;
				}
				.text-right {
					width: 64%;
					display: inline-block;
					margin-left: 15px;
					.secondkilltit {
						/*white-space: nowrap;*/
						overflow: hidden;
						height: 40px;
						text-overflow: ellipsis;
						font-weight: bold;
					}
					.secondprice {
						padding-top: .3rem;
						.timedif {
							padding: 4px 3px 2px 3px;
							background: #FC3632;
							color: #FFFFFF;
							border-radius: 1px;
							font-size: .6rem;
							margin-top: 15px;
						}
						.timedif1 {
							padding: 4px 3px 2px 3px;
							background: #249DF4;
							color: #FFFFFF;
							border-radius: 1px;
							font-size: .6rem;
							margin-top: 15px;
						}
						.secondprice-left {
							flex-direction: column;
							.progressbar-div {
								/*padding-top: 5px;*/
								padding-bottom: 10px;
								width: 40px;
								float: right;
								margin-right: -10px;
								margin-top: -13px;
							}
							.gosecondkill {
								float: right;
								margin-right: -10px;
								margin-top: -50px;
								padding: 2px 15px;
		                        background: linear-gradient(120deg, #F13833 10%, #FFFCF5 23%, #E7232A 50%);
								border-radius: 10px;
								color: #FFFFFF;
							}
							.gosecondkill1 {
								float: right;
								margin-right: -10px;
								margin-top: -50px;
								padding: 2px 15px;
		                       background: linear-gradient(120deg, #249EF4 10%, #B0D6F1 23%, #24A0F4 50%);
								
								border-radius: 10px;
								color: #FFFFFF;
							}
						}
					}
				}
			}
		}
	}
</style>