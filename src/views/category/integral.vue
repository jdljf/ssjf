<template>
	<div id="secondkill">

		<c-title :hide="false" text='积分商品'></c-title>

		<!--<div class="header-img" style="margin-top: 40px;">
			<img src="../../assets/images/second.jpg" style="width:100%;margin-top:40px" />
		</div>-->
		<div id="secondslist" style="margin: 40px auto;padding:5px 3%;background: #FFFFFF;height: 100%;">

			<ul class="ultext">
				<li class="secondgoods" v-for="item in contentlist" @click.stop="gotoDetail(item.id)">

					<img :src="item.thumb" alt="">
					<div class="text-right" style="margin-left: 15px;display: inline-block;position: relative;">
						<div class="secondkilltit">{{item.title}}</div>
						<div class="secondprice">
							<div class="secondprice-left">
								<div class="integral">
									<span class="deduction">积分抵扣</span>
									<span class="giving">购买送积分</span>
								</div>

								<span style="color:#E8292E;font-size: 1.2rem;">￥{{(item.member_discount!=false&&item.member_discount.discount_value!=0?item.member_discount.discount_value:item.price)}}</span>
								<del style="color:#C6C7C6;">￥{{item.price}}</del>
								<span style="float: right;font-weight: 300;color: #CACACA;font-size: .7rem;">已售:{{item.show_sales}}</span>
							</div>
						</div>
					</div>
				</li>
			</ul>
			<div v-if="jiazaiload" @click="clickadd" style="line-height: 30px;">点击加载更多</div>
		</div>

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
	import { Loadmore } from 'mint-ui';
	import { Indicator, Toast } from 'mint-ui';
	import PullToRefresh from 'components/pull-to-refresh.vue';
	import { InfiniteScroll } from 'mint-ui';

	export default {
		data() {
			return {
				page: 1,
				allLoaded: false,
				contentlist: [],
				jiazaiload: false,
				tag: true,
				cpage: 0,
				toal: 0,
				allpage: 1,
			}
		},
		computed: mapState(["view"]),
		methods: {
			initData() {
				this.page = 1;
				this.allLoaded = false;
				this.jiazaiload = false;
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

			getContentlist() {
				var that = this;
				let json = {
					page: this.page
				};
				$http.get("shop.index.get-point-goods", json, '...加载中').then((response) => {
					if(response.result == 1) {
						that.isMorePage(that.allpage);
						that.cpage = response.data.per_page;
						that.toal = response.data.total;
						that.allpage = that.toal / that.cpage;
						console.log('总页', that.allpage);
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
						that.tag = false;
					} else {
						this.doException(response);
						that.isMorePage(0); //制造不可分页
					}
				});
			},

			//判断是否有分页
			isMorePage(allpage) {
				this.jiazaiload = this.page < allpage ? true : false;
			},
			clickadd() {
				if(this.page < this.allpage) {
					this.page++;
					this.getContentlist();
					Toast('正在加载中');
				}
				//					Toast('暂无更多数据');

			},
			//			scroll() {
			//				let that = this;
			//				that.tag = true;
			////				var scrolltop = document.getElementsByClassName('ultext')[0].scrollTop;
			//				   var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
			////				var offsetheight = document.getElementsByClassName('ultext')[0].clientHeight;
			////				var scrollheight = document.getElementsByClassName('ultext')[0].scrollHeight;
			//				window.onscroll = () => {
			////					let bottomheight = scrollheight - offsetheight - scrolltop <= 30
			//					if(document.documentElement.scrollHeight == document.documentElement.clientHeight + scrollTop ) {
			//						if(that.tag == true) {
			//							that.jiazaiload = true;
			//							console.log('在请求数据中');
			//							this.clickadd();
			//						} else {
			//							console.log('只能先请求一次');
			//						}
			//							console.log('全高',document.documentElement.scrollHeight);
			//							console.log('内容高',document.documentElement.clientHeight);
			//							console.log('距离头部',scrollTop);
			//							
			//					}
			//
			//				} 
			//			}

		},

		created() {

		},
		mounted() {},
		activated() {
			//			console.log('方法调用了====activated=====');
			this.getContentlist();
			this.initData();
			//			this.scroll();
		},
		components: {
			cTitle,
			cCarcontent,
			progressbar,
			PullToRefresh
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	#secondkill {
		width: 100%;
		height: auto;
		padding-bottom: 50px;
		background: #FFFFFF;
		.goostitle {
			text-align: left;
			border-bottom: 1px solid #F7F7F7;
			color: #E7292E;
			padding: 5px;
			font-weight: bold;
		}
		ul {
			li {
				padding: 20px 20px;
				text-align: left;
				box-shadow: 0px 1px 2px 1px #e3e3e3;
				margin-top: 10px;
				border-radius: 3px;
				box-sizing: border-box;
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
						text-overflow: ellipsis;
						height: 2.3rem;
						font-weight: 900;
					}
					.secondprice {
						/*padding-top: .5rem;*/
						.timedif {
							padding: 4px 15px 2px 15px;
							background: #FC5E28;
							color: #FFFFFF;
							border-radius: 3px;
							font-size: .6rem;
							margin-top: 15px;
						}
						.secondprice-left {
							padding-top: 0rem;
							flex-direction: column;
							margin-left: 5px;
							.integral {
								padding: .5rem 0rem;
								.giving {
									border: 1px solid #2497F3;
									padding: .3rem .4rem .2rem;
									border-radius: 2px;
									color: #2497F3;
								}
								.deduction {
									border: 1px solid #EB2444;
									padding: .3rem .4rem .2rem;
									border-radius: 2px;
									color: #EB2444;
								}
							}
							.opint {
								padding: .1rem .5rem;
								background: #E5282C;
								color: #FFF7E6;
								margin-top: 6px;
								display: inline-block;
								font-size: .6rem;
								border-radius: 3px;
								box-shadow: 1px 1px 2px 1px #ccc;
							}
						}
					}
				}
			}
		}
	}
</style>