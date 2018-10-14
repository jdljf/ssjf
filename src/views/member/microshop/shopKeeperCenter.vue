<style lang="scss" rel="stylesheet/scss" scoped>
#shopKeeperCenter {
	.spare{
		width:100%;
		height:40px;
	}
	.main {
		.linkShop {
			margin: 10px 0;
			padding: 10px;
			text-align: center;
			background: #fff;
			font-size: 16px;
			color: goldenrod,
		}

		.top1 {
			/*width: 100%;*/
			padding:20px;
			/*height: 80px;*/
			overflow: hidden;
			box-sizing: border-box;
			background: #f15353;
			text-align: left;
			color: #fff;
			.picture1 {
				float: left;
				/*width: 50px;*/
				width: 48px;
				height: 48px;
				border:solid 2px #fff;
				border-radius: 50%;
				overflow: hidden;
				img {
					width: 100%;
					border-radius: 50%;
					vertical-align: middle;
				}
			}
			.name1 {
				font-size: 0.9rem;
				float: left;
				width: 40%;
				line-height: 22px;
				padding-top: 4px;
				margin-left: 10px;
				color: #fff;
				span {
					font-size: 0.9rem;
					font-weight:bold;
				}
				b {
					color: #fff;
					font-weight: normal;
					font-size: 12px;
					/*border:1px solid #ccc;*/
					padding: 2px 4px;
					border-radius: 4px;
					background: rgba(0, 0, 0, .4);
					color: #fff;
					/*opacity:0.4;*/
					/*padding-left:2px;*/
					i {
						vertical-align: middle;
						font-size: 14px;
						margin-top: 2px;
					}
				}
			}
			.share {
				height: 50px;
				line-height: 22px;
				padding-top: 5px;
				font-size: 0.7rem;
				text-align: right;
				float: right;
				width: 40%;
			}
		}

		.content {
			.line04{
				position: absolute;
				margin-top:-76px;
				margin-left:75%;
				width:1px;
				height: 52px;
				background-color: #e2e2e2;
				.line04-child{
					background-color: #fff;
					width: 6px;
					height: 6px;
					border: 1px solid #e2e2e2;
					border-left: 0;
					border-bottom: 0;
					-webkit-transform: rotate(45deg);
					-moz-transform: rotate(45deg);
					-ms-transform: rotate(45deg);
					-o-transform: rotate(45deg);
					transform: rotate(45deg);
					margin-top: 23px;
					position: absolute;
					margin-left:-2.5px;
				}
			}
			.title {
				padding:0 15px;
				height: 36px;
				text-align: left;
				background: #fff;
				border-bottom: solid 1px #e2e2e2;
				color: #363636;
				font-size:.9rem;
				span {
					float: right;
					color: #333;
					line-height: 36px;
				}
				
				b {
					font-size: 16px;
					color:#f15353;
					line-height: 36px;
				}
			}
			
			.nav {
				background: #fff;
				padding:16px 0;
				height: 82px;
				margin-bottom:10px;
				.child01,.child02{
					border-right: solid 1px #e2e2e2;
				}
				
				li {
					width: 25%;
					text-align: center;
					float: left;
					font-size: 14px;
					span {
						color: #939393;
						font-size: 17px;
          				line-height: 26px;
						  display: inline-block;
						  margin-bottom:10px;
					}
					a {
						color: gray
					}
					b{
						color:#333;
						font-size:11px;
					}
				}
				
				a {
					li {
						color: #363636
					}
				}
				.child01 span,.child02 span,.child03 span{
					color:#ffa800;
				}
				.child04 span{
					color:#f15353;
				}
				
			}
			.shareNav {
				background: #fff;
				margin-top: 10px;
				li {
					width: 33.3%;
					line-height: 50px;
					text-align: center;
					float: left;
					font-size: 14px;
				}
			}


			.ratioNav {
				padding: 0px;
				margin: 0px;
				height: 40px;
				width: 100%;
				background: #fff;
				border-bottom: 1px solid #cdcdcd;
				border-top: 1px solid #cdcdcd;
				li {
					float: left;
					width: 33%;
					text-align: center;
					line-height: 40px;
					font-size: 16px;
					color: #666;
				}
			}
			.rationList {
				padding: 0px;
				margin: 0px;
				background: #fff;
				li {
					width: 100%;
					height: 65px;
					padding: 10px;
					box-sizing: border-box;
					border-bottom: 1px solid #f3f3f3;
					.left {
						width: 60%;
						float: left;
						text-align: left;
						padding-left: 22px;
						box-sizing: border-box;
						line-height: 20px;
						span {
							font-size: 16px;
							font-weight: 400;
							color: #333;
						}
						p {
							font-size: 14px;
							color: #999;
						}
					}
					.right {
						line-height: 20px;
						padding-top: 10px;
						float: left;
						text-align: right;
						width: 40%;
						color: #999;
						span {
							color: #e51c23
						}
					}
				}
			}







			.shareNav:after,
			.nav:after,
			.conte:after {
				content: "";
				display: block;
				clear: both;
			}
			.conte {
				margin-top: 1px;
				.con {
					box-sizing: border-box;
					text-align: center;
					float: left;
					height: 65px;
					padding: 15px;
					background: #fff;
					.el-badge {
						border: none;
						position: relative;
						top: 8px;
						.el-button--small {
							font-size: 15px;
						}
						button {
							border: none;
						}
						.el-badge__content {
							background: #ffa800 !important;
						}
					}
					b {
						color: #f15353;
					}
				}

				.con1 {
					width: 50%;
					box-sizing: border-box;
					margin-right: 1px;
					line-height: 19px;
				}
				.con2 {
					width: 33.3%;
					margin-top: 1px;
					border-right: 1px solid #f15353;
					line-height: 19px;
				}
				.con2:last-child {
					border: none;
				}
				.con3 {
					width: 49%;
					margin-right: 1px;
				}
			}
		}
	}

	.m_header {
		height: 40px;
		line-height: 40px;
		background: #fff;
		border-bottom: 1px solid #ccc;
		text-align: center;
		padding: 0 15px 0 8px;
		span.lf {
			font-size: 25px;
		}
		a {
			color: #939393;
			font-size: 12px;
		}
	}
	.linkCata {
		width: 100%;
		height: 45px;
		background: #fff;
		color: #f15353;
		line-height: 45px;
		font-weight: bold;
		position: fixed;
		bottom: 0;
		left: 0;
		i {
			font-size: 22px;
			vertical-align: bottom;
			line-height: 45px;
		}
	}
}

.list1 {
	height: 44px;
	background: #fff;
	padding:0 15px;
	font-size: 15px;
	line-height: 44px;
	color: #333;
	box-sizing: content-box;
	text-align: left;
	margin-bottom:10px;
	div.lf {
		font-size: 25px
	}
}

.list1 i {
	float: right;
	line-height: 44px;
	display: inline-block;
	font-size: 24px;
	color: #c9c9c9;
}
</style>
<template>
	<div id="shopKeeperCenter">

		<!--<c-title :hide="false" text='店主中心' tolink='/microShop/baseinfo' totext='微店设置'></c-title>-->
	<c-title :hide="false" text='店主中心' tolink='microShop_baseinfo' totext='微店设置'></c-title>
		<div class="spare"></div>
		<div class="main">

			<div class="top1">
				<div class="picture1">
					<img v-if="!userImg" src="../../../../static/app/images/photo-mr.jpg" alt="用户头像" />
					<img v-if="userImg" :src="userImg" alt="用户头像" />

				</div>
				<div class="name1">
					<span>{{username1}}</span> <br />

					<router-link :to="fun.getUrl('microShop_apply')">
						<b>{{level1}}&nbsp;
							<i class="iconfont icon-right"></i>
						</b>
					</router-link>
				</div>
				<div class="share" v-if="false">
					分红比例：{{share1}}% <br /> 上级店主分红比例：{{share2}}%
				</div>
			</div>

			<router-link :to="fun.getUrl('microShop_home')">
				<div class="list1">
					<div class="iconfont icon-tuiguang-zhengchangzhuangtai lf"></div>我的微店
					<i class="fa fa-angle-right"></i>
				</div>
			</router-link>

			<!--<router-link :to="fun.getUrl('microShop_home')">
					<div class="linkShop">我的商铺</div>
				 </router-link>-->

			<div class="content">
				<router-link :to="fun.getUrl('microShop_orderDetail',{date:'-1'})" v-if="false">
					<div class="title">
						<b class="iconfont icon-weidiandingdan"></b> 微店订单
						<i class="iconfont icon-right"></i>
						<span>累计：<b>{{totalTicket}}单</b></span>
					</div>
				</router-link>

				<ul class="nav" v-if="false">
					<router-link :to="fun.getUrl('microShop_orderDetail',{date:'1'})">
						<li  class="child01">
							<span>{{orderData.today}}</span> <br/><b>今天</b></li>
					</router-link>
					<router-link :to="fun.getUrl('microShop_orderDetail',{date:'2'})">
						<li  class="child02">
							<span>{{orderData.yesterday}}</span> <br/><b>昨日</b></li>
					</router-link>
					<router-link :to="fun.getUrl('microShop_orderDetail',{date:'3'})">
						<li  class="child03">
							<span>{{orderData.week}}</span> <br/><b>本周</b></li>
					</router-link>
					<router-link :to="fun.getUrl('microShop_orderDetail',{date:'4'})">
						<li  class="child03">
							<span>{{orderData.month}}</span> <br/><b>本月</b></li>
					</router-link>
				</ul>

				<router-link :to="fun.getUrl('microShop_shareList',{date:'-1'})">
					<div class="title">
						<b class="iconfont icon-weidiandingdan"></b> 微店佣金
						<i class="iconfont icon-right"></i>
						<span>累计：<b><i style="font-weight: normal;">￥</i>{{totalShareMoney}}</b></span>
					</div>
				</router-link>

				<ul class="nav">
					<router-link :to="fun.getUrl('microShop_shareList',{date:'1'})">
						
						<li  class="child01">
							<span>￥{{shareData.today}}</span> 
							<br/>
							<b>今天</b>
						</li>
					</router-link>
					<router-link :to="fun.getUrl('microShop_shareList',{date:'2'})">
						<li  class="child02">
							<span>￥{{shareData.yesterday}}</span> 
							<br/> 
							<b>昨日</b>
						</li>
					</router-link>
					<router-link :to="fun.getUrl('microShop_shareList',{date:'3'})">
						<li class="child03">
							<span>￥{{shareData.week}}</span> 
							<br/>
							<b>本周</b>
						</li>
					</router-link>
					<router-link :to="fun.getUrl('microShop_shareList',{date:'4'})">
						<li class="child04">
							<span>￥{{shareData.month}}</span>
							 <br/>
							 <b>本月</b> 
						</li>
					</router-link>
					
				</ul>
				<div class="line04"><div class="line04-child"></div></div>
			</div>
		</div>

		<router-link :to="fun.getUrl('micro_shop_add_category')">
			<div class="linkCata">
				<i>+</i>&nbsp;添加商品</div>
		</router-link>
	</div>
</template>


<script>
import cTitle from 'components/title';
export default {
	components: { cTitle },
	data() {
		return {
			username1: "微店名称",
			level1: "级别",
			share1: "0",
			share2: "0",
			totalTicket: 0,
			totalShareMoney: 0,
			userImg: '',
			orderData: '',
			shareData: ''
		}
	},

	methods: {
		goBack() {
			this.$router.go(-1);
		},
		init() {
			let that = this;
			$http.get("plugin.micro.frontend.controllers.MicroShop.index", {}, "加载中").then(function(response) {
				console.log("微店中心收据.....");
				console.log(response);
				if (response.result == 1) {
					that.userImg = response.data.micro_shop_data.shop_avatar;
					that.username1 = response.data.micro_shop_data.shop_name;
					that.level1 = response.data.micro_shop_data.level_name;

					that.share1 = response.data.micro_shop_data.bonus_ratio;
					that.share2 = response.data.micro_shop_data.agent_bonus_ratio;

					that.totalTicket = response.data.order_data.order_total;
					that.totalShareMoney = response.data.bonus_log_data.bonus_total;

					that.shareData = response.data.bonus_log_data;
					that.orderData = response.data.order_data;
				} else {
					console.log(response);
				}
			}, function(response) {
				console.log(response);
			});
		}
	},
	activated() {
		this.init();
	}

}
</script>
