<template>
<!--拼团页面-->	
<div id="group">
	<!--标题-->
	<c-title :hide="false"
			  text='团购商城'></c-title>
	<div style="height: 40px;"></div>
	<!--商品内容-->
	<div class="main2">
		<div class="list" v-for="item in contentlist"   @click.stop="gotoDetail(item.id)">
			<div class="imgs">
				<img :src="item.thumb"/>
			</div>
			<div class="shop_info" >
					<div class="title"><span style="color: #FE0191;margin-left: 5px;">[{{item.has_one_goods_group_buying.number}}人团]</span>{{item.title}}</div>
					<div class="message-box" style="position: relative;">
						<div class="member" ><small>￥</small>{{item.has_one_goods_group_buying.price}}</div>
						<div style="color: #CCCCCC;padding: 11px 5px;font-size: 0.7rem;display: inline-block;"><del>¥{{item.price}}</del></div>
						<span class="goto-group">去开团</span>
						<span class="ready-group">已团<span style="padding: 0 4px;">{{item.show_sales}}</span>件</span>
					</div>
			</div>		
			
		</div>
			<div v-if="jiazaiload"  @click="clickadd" style="line-height: 30px;">点击加载更多</div>
			<div v-if="allLoaded"   style="line-height: 30px;">暂无更多数据</div>
			
	
		
		
		
	</div>
</div>
</template>
<script>
	import cTitle from 'components/title';
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
				id:''
			}
		},
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
				$http.get("shop.index.get-group-buying-goods", json, '...加载中').then((response) => {
					if(response.result == 1) {
						console.log('我的商品拼团数据',response.data);

						that.cpage = response.data.per_page;
						that.toal = response.data.total;
						that.allpage = that.toal / that.cpage;
						that.isMorePage(that.allpage);
						
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
				this.jiazaiload = this.page<allpage ? true : false;
				this.allLoaded=this.page<allpage ? false : true;
			},
			clickadd() {
				
					this.page++;
					this.getContentlist();
					Toast('正在加载中');
			
//					Toast('暂无更多数据');
				

			},

		},

		created() {

		},
		mounted() {},
		activated() {
			//			console.log('方法调用了====activated=====');
			this.getContentlist();
			this.initData();
		},
		components: {
			cTitle,
			
		}
	}

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#group {
	.main2{
		/*margin-top: 30px;*/
		.list{display: flex; background: #ffffff;padding:10px 12px;border-bottom:solid 1px #e2e2e2;}
		.imgs{flex:1.5;box-sizing: border-box;margin-right:10px;   
		overflow: hidden;
				img {width: 100%;}
			}
		.shop_info{flex:3;
					text-align: left;
					display: flex;
					justify-content: space-between;
					margin-bottom:10px;
					flex-direction: column;
			.title{
				font-size:.9rem;
				flex:3;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp:2;
				overflow: hidden;
				height: 2.5rem;
				font-weight: bold;
			 }
			 .message-box{
			 	margin-top: 10px;
			 	.member{font-size:1.2rem;color:#FF4074;flex:1;display:inline-block;font-weight:bold;
			 	
				/*text-align: right;margin-left:10px;*/
				 a{color: #f23030; font-weight: bold;}
				 }
				
				.goto-group{
					position: absolute;
					top: -10px;
					right: 0;
					padding: 7px 20px;
					background: #FF4074;
					font-size: .8rem;
					color: #FFF;
					border-radius: 5px;
				}
				.ready-group{
					position: absolute;
					top: -20px;
					left: 5px;
					color: #FF4074;
					font-size: 0.8rem;
				}
			 }
			
		}
		
	}
}
</style>
