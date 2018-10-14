<template>
	<div id="teamAgentCenter">
		<!--<c-title :hide="false" :text='mailTeamDividendTitle'></c-title>-->
		<c-title :hide="false" text='我的收益'></c-title>
		<div style="height:40px"></div>
		<div class="sharetop">
			<div class="moneys">¥<span style="margin-left: 5px;">{{settlement.settle_money_total}}</span></div>
			<div class="lastmoney">账户余额</div>
			<div class="reflect" style="display: none;">立即提现</div>
			<div class="addmoney">累计结算收益:¥{{settlement.settle_money_total}}</div>
		</div>
		<div class="liarr">
			<div class="liss">
				<div class="li">
					<span class="r">结算收入</span>
					<span style="font-size: 14px;">¥{{settlement.last_month.settle}}</span>
					<span class="l">上月佣金</span>
				</div>
				<div class="li">
					<span class="r">预估收入</span>
					<span style="font-size: 14px;">¥{{settlement.this_month}}</span>
					<span class="l">本月佣金</span>
				</div>
				<div class="li">
					<span class="r">预估收入</span>
					<span style="font-size: 14px;">¥{{settlement.last_month.money}}</span>
					<span class="l">上月佣金</span>
				</div>
			</div>
		</div>
		<div class="liarr">
			<div class="day"><img style="width: 1.5rem;" src="../../../assets/images/sun.png" /><b class="days">今日</b></div>
			<div class="liss">
				<div class="li">
					<span class="r">付款笔数</span>
					<span style="font-size: 14px;">{{settlement.today.count}}</span>

				</div>
				<div class="li">
					<span class="r">预估佣金</span>
					<span style="font-size: 14px;">¥{{settlement.today.money}}</span>

				</div>
				<div class="li">
					<span class="r">其他</span>
					<span style="font-size: 14px;">¥{{settlement.today.extra}}</span>

				</div>
			</div>
		</div>
		<div class="liarr">
			<div class="day"><img style="width: 1.5rem;" src="../../../assets/images/month.png" /><b class="days">昨日</b></div>

			<div class="liss">
				<div class="li">
					<span class="r">付款笔数</span>
					<span style="font-size: 14px;">{{settlement.yesterday.count}}</span>

				</div>
				<div class="li">
					<span class="r">预估佣金</span>
					<span style="font-size: 14px;">¥{{settlement.yesterday.money}}</span>

				</div>
				<div class="li">
					<span class="r">其他</span>
					<span style="font-size: 14px;">¥{{settlement.yesterday.extra}}</span>

				</div>
			</div>
		</div>
		<div class="content">
			<div class="detailname" @click="searchdetail">结算佣金明细</div>
			<div class="detailname" style="display: none;">提现记录</div>
			<!--<el-tabs v-model="activeName">
				<el-tab-pane  name="first" style="width: 100%;">-->
			<ul class='rationList' style="width: 100%;" v-if="detailshow">
				<li v-for="elem in shareinfo" style="width: 100%;">
					<div class="detail">
						<span class="month">{{elem.create_month}}</span>
						<div class="info" v-for="item in elem.has_many_dividend">
							<router-link :to="fun.getUrl('ShareFenRun',{selected:'1',name:item.order_sn})">
								<ul class="left">
									<li>订单号：{{item.order_sn}}</li>
									<li class="time">时间：{{item.created_at}}</li>
								</ul>
								<ul class="right">
									<li>{{item.dividend}}</li>
									<li class="state" v-if="item.status==0">未结算</li>
									<li class="state" v-else-if="item.status==1">已结算</li>

								</ul>
							</router-link>
						</div>

					</div>

				</li>
			</ul>

			<!--</el-tab-pane>

			</el-tabs>-->

		</div>

	</div>
</template>

<script>
	import Sharecommission from "./Sharecommission";
	export default Sharecommission;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	.el-tabs__active-bar {
		width: 100% !important;
	}
	
	.el-tabs__item {
		width: 100%;
	}
	
	* {
		box-sizing: border-box;
	}
	
	.el-tabs__item {
		display: none;
	}
	
	#teamAgentCenter {
		.sharetop {
			padding: 20px 20px 10px 20px;
			background: #FC8E4F;
			color: #fff;
			.moneys {
				font-size: 24px;
			}
			.lastmoney {
				padding-top: 5px;
			}
			.reflect {
				display: inline-block;
				padding: 1px 10px;
				color: #FB7F47;
				background: #fff;
				border-radius: 10px;
				font-size: 14px;
				margin-top: 10px;
			}
			.addmoney {
				margin-top: 10px;
				font-size: 10px;
			}
		}
		.liarr {
			margin-top: 10px;
			.day {
				text-align: left;
				padding: 10px;
				background: #fff;
				border-bottom: 1px solid #f7f7f7;
				.days {
					display: inherit;
					margin-left: 2rem;
					margin-top: -1.4rem;
				}
			}
			.liss {
				display: flex;
				color: #C2C2C2;
				.li {
					display: flex;
					flex-direction: column;
					flex: 1;
					padding-top: 10px;
					background: #fff;
					padding-bottom: 10px;
					.l {
						color: #CFCFCF;
					}
					span {
						padding-bottom: 5px;
						padding-top: 5px;
						color: #7D7D7D;
					}
				}
				.li:after {
					width: 1px;
					height: 20px;
					background: red;
				}
			}
		}
		.share_holder {
			.header_box {
				padding: 16px 12px;
				background: linear-gradient(to top, #F5AF2F, #FDCB4E);
				color: #fff;
				display: flex;
				justify-content: space-between;
				.left {
					line-height: 48px;
				}
				.right {
					text-align: right;
					li {
						line-height: 24px;
					}
				}
			}
			.today_bonus {
				width: 100%;
				height: 82px;
				background: #fff;
				padding: 16px 0;
				box-sizing: border-box;
				position: relative;
				border-bottom: solid 1px #e2e2e2;
				li.line {
					position: absolute;
					width: 1px;
					height: 52px;
					background: #ddd;
					top: 16px;
					right: 28%;
					.careat {
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
						background: #fff;
						position: absolute;
						top: 23px;
						right: -3px;
					}
				}
				li {
					text-align: center;
					float: left;
					span {
						font-size: 17px;
						line-height: 37px;
						/*display: inline-block;*/
						margin-bottom: 10px;
					}
					b {
						font-size: 11px;
						color: #333;
					}
				}
				li.data {
					width: 14%;
					span {
						color: #ffa800;
					}
				}
				li:first-child,
				li:nth-child(2),
				li:nth-child(3),
				li:nth-child(4),
				{
					border-right: 1px solid #e2e2e2;
				}
				li.mounth {
					width: 28%;
					span {
						color: #fc6a70;
					}
				}
			}
		}
		.code {
			height: 44px;
			background: #fff;
			padding: 0 15px;
			font-size: 15px;
			line-height: 44px;
			color: #333;
			text-align: left;
			box-sizing: border-box;
			margin-bottom: 10px;
			i {
				float: right;
				line-height: 44px;
				display: inline-block;
				font-size: 24px;
				color: #c9c9c9;
				text-align: center;
				background-size: 20px;
			}
		}
		.content {
			margin-top: 10px;
			.el-tabs__nav .el-tabs__active-bar {
				width: 100%;
			}
			el-tabs__item {
				width: 100%;
			}
			.detailname {
				color: #C2C2C2;
				text-align: left;
				padding: 10px;
				border-bottom: 1px solid #f7f7f7;
				background: #fff;
			}
			.ratioNav {
				padding: 0px;
				margin: 0px;
				height: 38px;
				width: 100%;
				background: #fff;
				border-bottom: 1px solid #cdcdcd;
				border-top: 1px solid #cdcdcd;
				li {
					float: left;
					width: 33%;
					text-align: center;
					line-height: 35px;
					font-size: 14px;
					color: #666;
				}
			}
			.rationList {
				padding: 0px;
				margin: 0px;
				li {
					span.month {
						display: block;
						text-align: left;
						line-height: 36px;
						padding: 0 12px;
						background: #f0f0f0;
						font-size: .875rem;
					}
					.info {
						border-bottom: 1px solid #eee;
						overflow: hidden;
						padding: 10px 12px;
						background: #fff;
						font-size: .875rem;
						.left {
							width: 70%;
							float: left;
							text-align: left;
							box-sizing: border-box;
							.time {
								font-size: .75rem;
								color: #8c8c8c;
							}
							li {
								line-height: 24px;
							}
							span {
								font-size: 14px;
								font-weight: 400;
								color: #333;
							}
							p {
								font-size: 12px;
								color: #999;
							}
							span.created {
								font-size: 12px;
							}
							h4 {
								font-weight: normal;
								b {
									font-weight: normal;
									color: #f15353;
								}
							}
						}
						.right {
							float: left;
							width: 30%;
							color: #20b86a;
							text-align: right;
							.state {
								font-size: .75rem;
								color: #8c8c8c;
							}
							li {
								line-height: 24px;
							}
							p {
								margin: 0;
								padding: 0;
								font-size: 12px;
								color: #888;
							}
							b {
								font-weight: normal;
							}
							b.created {
								line-height: 35px;
							}
						}
					}
				}
			}
		}
	}
</style>