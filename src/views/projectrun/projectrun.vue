<template>
	<div id="secondkill">

		<c-title :hide="false" text='产品分润'></c-title>
		<div class="search"><input ref="input" v-model="inp2" class="inp" placeholder="请输入商品字段搜索" type="text" />
			<i @click="getdata" style="position: absolute;top:-2px;right: 40px;" class="iconfont icon-sousuo icon-custom-undefined"></i>
		</div>
		<div id="secondslist" style="margin: 40px auto;padding:0px 3%;background: #FFFFFF;height: 100%;">
			<ul class="ultext" style="margin-top: 40px;display: inline-block;">
				<li class="secondgoods" v-for="item in contentlist">

					<img :src="item.thumb" alt="">
					<div class="text-right" style="margin-left: 15px;display: inline-block;position: relative;">
						<div class="secondkilltit">{{item.title}}</div>
						<div class="secondprice">
							<div class="secondprice-left">
								<div style="color: #C3C3C3;font-size:12px;padding-top: 5px;"><span>所属分类:</span>{{item.top_category_name}}</div>
								<div style="color: #C3C3C3;font-size:12px;padding-top: 5px;"><span>产品原价:</span>￥{{item.price}}</div>
								<div style="color: #C3C3C3;font-size:12px;padding-top: 5px;"><span>产品分润价格:</span>￥{{item.fee_splitting}}</div>
								<!--<del style="color:#C6C7C6;display: block;margin-top:10px;" >￥{{item.price}}</del>-->

							</div>
						</div>
					</div>
				</li>
			</ul>
			<div v-if="jiazaiload" @click="clickadd" style="line-height: 30px;">点击加载更多其他</div>
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
				focus: true,
				inp2:'',
				
			}
		},
		computed: mapState(["view"]),
		methods: {
			initData() {
				this.page = 1;
				this.allLoaded = false;
				//				this.jiazaiload = false;
			},
			getdata(){
				var that = this;
				let url="shop.index.fee-splitting-goods";	
				if(this.inp2!=''){
//					let json1 = {
//					kw:this.inp2
//				};
                url+='&kw='+this.inp2;
				$http.get(url).then((response) => {
					if(response.result == 1) {
						
						that.isMorePage(response.data.total_page_num);
						that.contentlist = response.data.data;
						if(that.contentlist==false){
							Toast("没有找到你要的数据");
						}
						}
				});
				}else{
		         return false;
				}
			},
			getContentlist() {
				var that = this;
				let json = {
					page: this.page
//					kw:this.inp2
				};
				let url="shop.index.fee-splitting-goods";	
				$http.get(url,json, '...加载中').then((response) => {
					if(response.result == 1) {
						that.cpage = response.data.per_page;
						that.toal = response.data.total;
						that.allpage = response.data.total_page_num;
						that.isMorePage(response.data.total_page_num);
						console.log('总页', that.allpage);
						if(that.page == 1) {
							that.contentlist = [];
							that.contentlist = response.data.data;
						} else {
							if(response.data.data != null && response.data.data.length > 0) {
								that.contentlist = that.contentlist.concat(response.data.data);
								console.log('数据是', response);
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
						that.isMorePage(0);
					}
				});
			},
			isMorePage(allpage) {
				this.jiazaiload = this.page < allpage ? true : false;
			},
			clickadd() {
				//				if(this.page < this.allpage) {
				this.page++;
				this.getContentlist();
				Toast('正在加载中');
				//				}
				//					Toast('暂无更多数据');
			},

		},

		created() {

		},
		mounted() {},
		activated() {
			this.page=1;
			//			console.log('方法调用了====activated=====');
			this.$refs['input'].focus()
			this.getContentlist();
			this.initData();
			this.inp2="";
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
		.search {
			margin-top: 0px;
			background: #fff;
			box-shadow: 0px 2px 5px 1px #f7f7f7;
			line-height: 50px;
			position: fixed;
			width: 100%;
			z-index: 100;
			.inp {
				line-height: 35px;
				border: 1px solid #F7F7F7;
				/*border-radius:30px;*/
				width: 90%;
				padding-left: 10px;
				background: #F6F6F6;
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
				padding: 50px 20px;
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
						text-overflow: ellipsis;
						height: 2.1rem;
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