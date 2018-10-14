<template>
	<div id="secondkill">
		<c-title :hide="false" text='提成详情'></c-title>
		<div id="secondslist" style="margin: 40px auto;padding:0px 3%;background: #FFFFFF;height: 100%;">

			<ul>
				<li class="secondgoods" v-for="item in sharedetails.has_many_order_goods">
					<div style="width: 30%;float: left;">
					<img :src="item.thumb" alt=""></div>
					<div class="text-right" style="margin-left: 15px;display: inline-block;position: relative;">
						<div class="secondkilltit">{{item.title}}</div>
						<div class="secondprice">
							<div class="secondprice-left">
								<span style="color:#E8292E;font-size: .9rem;">￥{{item.price}}</span>
								<span style="float: right">x{{item.total}}</span>
								<del style="color:#C6C7C6;display: block;">￥{{item.goods_price}}</del>
							</div>
						</div>
					</div>
				</li>

			</ul>
			<div class="infos">订单信息</div>
			<ul class="ul2">
				<li class="sharefentext">订单编号:<span class="liright">{{sharedetails.order_sn}}</span></li>
				<li class="sharefentext">支付时间:<span class="liright">{{sharedetails.pay_time}}</span></li>
				<li class="sharefentext">下单时间:<span class="liright">{{sharedetails.send_time}}</span></li>
				<li class="sharefentext">交易状态:<span class="liright">{{sharedetails.status_name}}</span></li>
				<li class="sharefentext">支付方式:<span class="liright">{{sharedetails.pay_type_name}}</span></li>

			</ul>
			<div class="infos">会员信息</div>
			<ul class="ul3">
				<li class="sharefentext">会员名:<span class="liright">{{sharedetails.belongs_to_member.nickname}}</span></li>
				<li class="sharefentext">用户电话:<span class="liright">{{sharedetails.belongs_to_member.mobile}}</span></li>
			</ul>
		</div>
	</div>
</template>

<script>
	import ShareFenRun from './ShareFenRun'
	export default ShareFenRun
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	#secondkill {
		width: 100%;
		height: auto;
		padding-bottom: 50px;
		background: #FFFFFF;
		ul {
			li {
				padding: 30px 20px 40px 20px;
				text-align: left;
				background: #FFFFFF;
				border-bottom: 1px solid #F7F7F7;
				img {
					display: inline-block;
					width: 100%;
					height: 100%;
				}
				.text-right {
					width: 64%;
					display: inline-block;
					margin-left: 15px;
					.secondkilltit {
						/*white-space: nowrap;*/
						overflow: hidden;
						text-overflow: ellipsis;
						height: 40px;
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
							.opint {
								padding: .3rem .5rem;
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
		.infos {
			padding: 6px;
			color: #D64D31;
			background: #F1F2F3;
			text-align: left;
			font-size: .8rem;
			font-weight: bold;
		}
		.ul2 {
			
			.sharefentext {
				padding: 10px;
				.liright {
					float: right;
				}
			}
		}
		.ul3 {
			
			.sharefentext {
				padding: 10px;
				.liright {
					float: right;
				}
			}
		}
	}
</style>