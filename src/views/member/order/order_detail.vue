<template v-title="订单详情">

	<div id="goodsinfo">
		<c-title :hide="false" text='订单详情'></c-title>
		<div style="height: 40px;"></div>

		<div class="addr" v-if="pay_type_id == '' && orderType == 'shop' && order_data.is_virtual == 0">
			<i class="iconfont icon-dingwei"></i>
			<ul class="addr-info">
				<li style="margin-bottom:8px;font-size:14px;">收件人：{{receiver}}&nbsp;&nbsp;&nbsp;（{{mobile}}）</li>
				<li style="color:#888">{{address}}</li>
			</ul>
			<div class="clearfix"></div>
		</div>

		<div>
			<div class="goods" v-for="good in order_data.has_many_order_goods" @click.stop="gotoDetail(good.goods_id)">
				<div class="img"  ><img v-lazy="good.thumb"></div>
				<div class="inner" >
					<!--<div class="name">{{good.title}}</div>
	                <div class="option">
	                	规格: {{good.goods_option_title}}
	                	<div> ×{{good.total}}</div>
	                	<div class="money"> ￥{{good.goods_price}}<span v-if="order.plugin_id == 40?true:false">/天</span></div>
	                </div>-->
					<div class="name">{{good.title}}</div>
					<div class="option" v-show="order_data.is_virtual == 0">

						规格: {{good.goods_option_title}}
						<div>×{{good.total}}</div>
						<div class="money">¥{{good.price}}<span v-if="order_data.plugin_id == 40">/天</span></div>
						<div style="float: right;margin-top: 5px;"><del>¥{{good.goods_price}}</del></div>

						<!--<div class="specifications">规格:  {{good.goods_option_title}}</div>
						<div class="numb">×{{good.total}}</div>
						<div class="money">￥{{good.goods_price}}<span v-if="order_data.plugin_id == 40">/天</span></div>-->

					</div>
					<div class="option" v-if="order_data.plugin_id == 40">{{good.lease_toy_goods.deposit}}</div>
					<div class="option" v-if="order_data.plugin_id == 40">押金:</div>
				</div>

				<div style="clear:both;"></div>
			</div>
			<div class="address" style="">
				<div class="address-info"><span>收货人:{{order_data.address_info.realname}}</span><span class="address-phone">{{order_data.address_info.mobile}}</span></div>
				<div class="address-info">收货地址:{{order_data.address_info.address}}</div>
			</div>

		</div>
		<div class="detail_good" v-if="0">
			<h3><i class="fa fa-truck"></i>发货信息</h3>
			<div class="content">
				1、激活码：553321 中国移动：135 911 234 56 链接：
				<a href="#">点攻击链接</a><br /> 2、激活码：967454 中国移动：137 334 234 56 链接：
				<a href="#">点攻击链接</a><br />
			</div>
		</div>
		<div class="tbs">
			<div class="tbs-number-tra">
				<ul class="number">
					<li class="left">订单编号:</li>
					<li class="right" style="color: #aaa;">{{order_data.order_sn}}</li>
				</ul>
				<ul class="number">
					<li class="left">下单时间:</li>
					<li class="right" style="color: #000;">{{order_data.create_time}}</li>
				</ul>
				<ul class="number" v-if="order_data.status!=0">
					<li class="left">付款时间:</li>
					<li class="right" style="color: #000;">{{order_data.pay_time}}</li>
				</ul>
				<ul class="tra" v-if="order_data.plugin_id == 40">
					<li class="left">租期:</li>
					<li class="right">{{order_data.lease_toy.return_days}}天</li>
				</ul>
				<ul class="tra">
					<li class="left">交易状态:</li>
					<li class="right">{{order_data.status_name}}</li>
				</ul>
				<ul class="tra" v-if="order_data.plugin_id == 40">
					<li class="left">租金总金额:</li>
					<li class="right">￥{{order_data.goods_price*order_data.lease_toy.return_days}}</li>
				</ul>
			</div>
			<template v-if="order_data.cashier_order">
				<div class="info">
					<ul class="time">
						<li class="left">下单时间:</li>
						<li class="right">{{order_data.cashier_order.created_at}}</li>
					</ul>
					<ul class="name">
						<li class="left">姓名:</li>
						<li class="right">{{order_data.cashier_order.realname}}</li>
					</ul>
					<ul class="member">
						<li class="left">电话:</li>
						<li class="right">{{order_data.cashier_order.mobile}}</li>
					</ul>
				</div>
			</template>

			<template v-if="order_data.has_one_pay_type">
				<ul class="Pay-method">
					<li class="left">支付方式:</li>
					<li class="right" style="color: #aaa;">{{order_data.has_one_pay_type.name}}</li>
				</ul>
			</template>
			<div id="discount">
				<template v-for="info in order_data.order_discount">
					<ul class="Discount">
						<li class="left">{{info.name}}:</li>
						<li class="right">￥{{info.amount}}</li>
					</ul>
				</template>
			</div>

			<!--<div class="left">总抵扣:</div>
			<div class="right">￥{{order_data.deduction_price}}</div>
			<div class="left">总优惠:</div>
			<div class="right">￥{{order_data.discount_price}}</div>-->
			<template v-if="pay_type_id == '' && orderType == 'shop'">
				<ul class="Fre">
					<li class="left">运费:</li>
					<li class="right">￥{{order_data.dispatch_price}}</li>
				</ul>
			</template>
			<ul class="Sub">
				<li class="left">商品小计:</li>
				<li class="right" v-if="!(order_data.plugin_id == 40)">￥{{order_data.price}}</li>
				<li class="right" v-if="order_data.plugin_id == 40">￥{{order_data.order_goods_price}}</li>
			</ul>
			<ul class="Sub" v-if="order_data.plugin_id == 40">
				<li class="left">押金:</li>
				<li class="right">￥{{order_data.lease_toy.deposit_total}}</li>
			</ul>
			<ul class="Real-pay">
				<li class="left" v-if="!(order_data.plugin_id == 40)">实付费(含运费):</li>
				<li class="left" v-if="order_data.plugin_id == 40">合计:（押金￥{{order_data.lease_toy.deposit_total}}可退）:</li>
				<li class="right">￥{{order_data.price}}</li>
			</ul>
		</div>
		<!-- <div style="height:59px"></div> -->
		<!-- 租赁详情 -->
		<!-- <div class="addr" v-if="pay_type_id == '' && orderType == 'shop' && order_data.is_virtual == 0">
    		<i class="fa fa-map-marker"></i>
			<ul class="addr-info">
				<li style="margin-bottom:8px;font-size:14px;">收件人：{{receiver}}&nbsp;&nbsp;&nbsp;（{{mobile}}）</li>
				<li style="color:#888">{{address}}</li>
			</ul>
			<div class="clearfix"></div>
    	</div>
		<div class="commodity">
			<div class="jpg"><img data-v-2c15d270="" src="http://release.yunzshop.com/attachment/images/2/2017/08/qwFK28UnUz8zYvzunjM3pUQpuTz8W2.jpg"></div>

			<ul>
				<li>
					<span class="left">芸众信息科技有限公司</span>
					<span class="red"><i class="iconfont icon-rent"></i>￥6.00</span>
				</li>
				<li>
					<span class="left">规格</span>
					<span>押金：￥300.00</span>
				</li>
				<li class="rent">
					<span class="red">租金：￥300.00<small>￥300.00/天</small></span>
				</li>

			</ul>

		</div>
		<div class="rent-info">
			<ul>
				<li>
					<span>订单编号</span>
					<span>SN201800219235847L7</span>
				</li>
				<li>
					<span>租期</span>
					<span>30天</span>
				</li>
				<li>
					<span>交易状态</span>
					<span>{{order_data.status_name}}</span>
				</li>
				<li>
					<span>租金总金额</span>
					<span>￥270.00</span>
				</li>
				<li>
					<span>会员折扣</span>
					<span>-￥30.00</span>
				</li>
				<li>
					<span>单品满额减</span>
					<span>-￥0.00</span>
				</li>
				<li>
					<span>优惠券总金额</span>
					<span>-￥0.00</span>
				</li>
				<li>
					<span>抵扣金额</span>
					<span>-￥0.00</span>
				</li>

			</ul>
			<div class="info">
				<span>运费</span>
				<span>￥6.00</span>
			</div>
			<div class="info">
				<span>押金</span>
				<span>￥600.00</span>
			</div>
			<div class="info">
				<span>合计：（押金￥600可退）</span>
				<span>￥846.00</span>
			</div>

		</div> -->
		<!--  -->
		<!-- <div style="height:59px"></div> -->
		<div class="detail_pay">
			<div :class="{active: index==0 && item.name !== '删除订单' ? true:false}" class="order_delete" v-for="(item,index) in order_data.button_models" @click="operation(item,order_data)" >{{item.name}}</div>

			<!-- <input type="button" value="退还商品" @click="gotoRefund"> -->
		</div>
		<div class="qrcode">
			<mt-popup v-model="showQrcode" position="right" modal="false">
				<img :src="qrcode" style="width:100%">
				<div style="height: 30px;">请核销员扫码</div>
			</mt-popup>
		</div>
	</div>

</template>
<script>
    import order_detailcontroller from './order_detailcontroller';
    export default order_detailcontroller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.qrcode {
		width: 100%;
		margin: 0 auto;
	}

	#goodsinfo {
		.address {
			display: flex;
			padding: 10px 20px;
			flex-direction: column;
			background: #FFFFFF;
			border-top: 1px solid #F7F7F7;
			font-size: 14px;
			color: #515150;
			.address-info {
				padding-top: 10px;
				text-align: left;
				color: #8c8c8c;

				.address-phone{
					float: right;
				}
			}

		}
		.addr {
			text-align: left;
			padding: 0 12px;
			background: #FFF;
			border-bottom: #ebebeb 1px solid;
			margin-bottom: 10px;
			padding-top: 12px;
			padding-bottom: 12px;
			i {
				font-size: 16px;
				color: #333;
				float: left;
				margin-right: 10px;
				margin-top: 1px;
			}
			p {
				text-align: left;
				span {
					color: #858585;
					font-size: .6rem;
				}
			}
			.addr-info {
				float: left;
				font-size: 14px;
			}
			.clearfix {
				clear: both;
			}
		}
		.goods {
			padding: 10px 14px;
			background-color: #fff;
			.img {
				width: 30%;
				float: left;
				img {
					width: 100%;
					height: 100%;
					display: inline-block;
				}
			}
			.inner {
				width: 70%;
				float: left;
				box-sizing: border-box;
				padding-left: 8px;
				text-align: left;
				.name {
					width: 100%;
					text-align: left;
					color: #333333;
					margin-bottom: 20px;
					white-space: normal;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					/* autoprefixer: off*/
					-webkit-box-orient: vertical;
					/* autoprefixer: on*/
					font-size: 1.1rem;
					height: 2.5rem;
					line-height: 1.3rem;
				}
			}

			.money{font-size:.875rem;font-size: 1rem;color: #F15353;}
			.price{width:20%;float: left; align-items:center;text-align: right;}
			.option {
				color: #888;
				position: relative;
				width: 100%;
				font-size: 1rem;
				height: 2rem;
				.numb{
					position: absolute;
					right: 0;
					bottom: 1.2rem;
					line-height: 1.6rem;
				}
				.specifications{
					position: absolute;
					left: 0;
					bottom: 0;
					font-size: .8rem;
					width: 120px;
					overflow: hidden;
				}
				.money{
					position: absolute;
					right: 0;
					bottom: 0;
					color: #f15353;
				}
			}
		}
		.tbs {
			font-size: .875rem;
			width: 100%;
			.left {
				flex: 2;
				color: #000;
				text-align: left;
			}
			.right {
				flex: 3;
				text-align: right;
				color: #aaa;
			}
			.tbs-number-tra {
				background-color: #fff;
				width: 100%;
				padding: 10px 14px;
				margin-top: 10px;
				li {
					line-height: 30px;
				}
			}
			.Sub {
				width: 100%;
				display: flex;
				justify-content: space-between;
				line-height: 30px;
				padding: 0 14px 10px 14px;
				background-color: #fff;
			}
			.Real-pay {
				background-color: #fff;
				display: flex;
				justify-content: flex-end;
				line-height: 36px;
				padding: 0 14px;
				border-top: solid 1px #ebebeb;
				font-size: 14px;
				.red {
					color: #f15353;
					font-size: 16px;
					margin-left: 10px;
				}
			}
			.Fre {
				display: flex;
				justify-content: space-between;
				background-color: #fff;
				padding: 0 14px;
				line-height: 30px;
			}
			#discount {
				margin-top: 10px;
				padding-top: 10px;
				background-color: #fff;
			}
			.Discount {
				width: 100%;
				line-height: 30px;
				display: flex;
				justify-content: space-between;
				padding: 0px 14px;
			}
			.number,
			.tra {
				line-height: 28px;
				display: flex;
				justify-content: space-between;
			}
			.Pay-method {
				background-color: #fff;
				width: 100%;
				display: flex;
				justify-content: space-between;
				line-height: 36px;
				padding: 0 14px;
				border-top: solid 1px #ebebeb;
			}

			.pay-time {
				border-top: none;
			}

			.info {
				padding: 0px 12px;
				line-height: 28px;
				border-top: solid 1px #e2e2e2;
				.time,
				.name,
				.member {
					display: flex;
					justify-content: space-between;
				}
			}
		}
		.detail_pay {
			height: 49px;
			width: 100%;
			background: #fff;
			padding: 0px 12px;
			margin-top: 30px;
			border-top: 1px solid #ebebeb;
			position: fixed;
			bottom: 0px;
			box-sizing: border-box;
			.order_delete {
				margin-left: 10px;
				background: #fff;
				padding: 4px 6px;
				margin-top: 11px;
				border-radius: 4px;
				color: #333;
				float: right;
				border: 1px solid #666;
				font-size: 14px;
			}
			input {
				padding: 4px 10px;
				border: solid 1px #666;
				border-radius: 3px;
				background-color: #fff;
				margin-top: 11px;
				float: right;
				color: #333;
				font-size: 12px;
			}
		}
		.rent-info {
			border-bottom: solid 1px #e2e2e2;
			background-color: #fff;
			ul {
				padding: 16px 14px;
				li {
					display: flex;
					justify-content: space-between;
					line-height: 24px;
					font-size: .875rem;
					span:first-child {
						color: #8c8c8c;
					}
				}

			}

		}
		.detail_pay { height: 49px; width: 100%; background: #fff; padding: 0px 12px; margin-top: 30px; border-top: 1px solid #ebebeb;
			position: fixed; bottom: 0px; box-sizing: border-box;
			.order_delete {margin-left: 10px; background: #fff; padding: 4px 6px; margin-top: 11px; border-radius: 4px; color: #333;
				float: right; border: 1px solid #ccc;font-size: 14px;}
			.active{
				color: #F15353;
				border-color: #F15353;
			}
			input{
				padding:4px 10px;
				border:solid 1px #666;
				border-radius: 3px;
				background-color: #fff;
				margin-top:11px;
				float: right;
				color:#333;
				font-size:12px;
			}
		}


		/*.commodity {
			background-color: #fff;
			display: flex;
			justify-content: space-between;
			padding: 10px 14px;
			.jpg {
				width: 30%;
				overflow: hidden;
				margin-right: 10px;
				img {
					width: 100%;
					height: 100%;
				}
			}
			ul {
				position: relative;
				width: 70%;
				li {
					display: flex;
					justify-content: space-between;
				}
				li:first-child {
					margin-bottom: 10px;
					.left {
						text-align: left;
						width: 60%;
						overflow: hidden;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					i {
						font-size: 12px;
						color: #ff9500;
					}
				}
				.red {
					font-size: .875rem;
					color: #f15353;
					small {
						font-size: .75rem;
						color: #333;
						margin-left: 10px;
					}
				}
				.left {
					font-size: .875rem;
				}
				.rent {
					position: absolute;
					bottom: 0;
				}
			}
		}*/
	}
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
	.mint-header {
		background: none;
		color: #666;
	}

	.is-fixed .mint-header-title {
		font-weight: bold;
	}

	.mint-header.is-fixed {
		border-bottom: 1px solid #e8e8e8;
		background: #FFF;
		z-index: 99;
	}

	.is-right a {
		font-size: .6rem;
	}
</style>