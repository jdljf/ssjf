<template>
	<div id="refund">
		<c-title :hide="false" text='退还商品'></c-title>
		<div style="height:40px;"></div>
		<!-- 状态1 -->
		<div v-if="order_status == 2" class="status-1">
			<ul class="money">
				<li>
					<span class="left">押金预计退还金额</span>
					<span>￥{{refundMoney}}</span>
				</li>
			</ul>
			<p class="prompt">提示：最终退款金额已商品退还确认后为准</p>
			<p class="refund-add">退还地址：请务必按照选择的地址退回商品</p>
			<div class="add-box">
				<el-radio-group v-model="checked" @change="chooseAddress">
					<div class="addr" v-for="(item,index) in address">
						<div style="width:100%;font-size:0.875rem;">
							<p><i class="fa fa-map-marker" style="margin-right:5px;"></i>收件人:{{item.contact_name}} {{item.mobile}}
								<div style="float:right;">
									<el-radio :label="item">&nbsp;</el-radio>
								</div>
							</p><br>
							<p>{{item.address}}</p>
						</div>
					</div>
				</el-radio-group>
			</div>
			<div class="express-member">
				<span>退还快递:</span>
				<input type="text" @click="expressShow" readonly placeholder="请选择退还快递" v-model="express">
			</div>
			<div class="express-member">
				<span>快递单号:</span>
				<input type="text" placeholder="请输入您的快递单号" v-model="expressSN">
			</div>
			<div class="submit">
				<input type="button" name="button" id="button" value="提交退还" @click="submit" />
			</div>
		</div>
		<!-- 状态2 -->
		<div v-if="order_status == 1">
			<div id="state">
				<span>商品状态:</span>
				<span>{{check_status}}</span>
			</div>
			<div class="return-money">
				<ul class="money">
					<li>
						<span class="left">押金退还金额</span>
						<span class="right">￥{{refundMoney}}</span>
					</li>
				</ul>
				<p class="prompt">提示：最终退款金额已商品退还确认后为准</p>
			</div>
		</div>
		<mt-popup v-model="popupVisible" position="bottom" style="width:100%;height:300px;">
			<mt-navbar fixed>
				<mt-header fixed title="选择快递" style="background:#ffffff;color:#000000;border-bottom:1px solid #ccc;"></mt-header>
			</mt-navbar>
			<div style="height:40px;"></div>
			<div style="width:100%;height:300px;overflow:scroll;">
				<div v-for="item in options" style="height:40px;line-height:40px;border-bottom:1px solid #ccc;" @click="expressChoose(item)">
					{{item.name}}
				</div>
			</div>
		</mt-popup>
	</div>
</template>

<script>
	import refund from './order_refund_controller';
	export default refund;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	#refund {
		.status-1 {
			padding: 0 14px 45px 14px;
			background-color: #fff;
		}
		.money {
			padding: 10px 0;
			li {
				line-height: 26px;
				display: flex;
				justify-content: space-between;
				font-size: .875rem;
			}
		}
		.prompt {
			color: #f15353;
			text-align: left;
			line-height: 24px;
			margin-bottom: 10px;
		}
		.refund-add {
			text-align: left;
			font-size: .875rem;
			line-height: 24px;
			margin-bottom: 10px;
		}
		.add-box {
			margin-bottom: 20px;
			.addr {
				border-top: solid 1px #e2e2e2;
				display: flex;
				justify-content: space-between;
				flex-flow: row wrap;
				align-items: center;
				background: #fff;
				padding: 16px 0;
				.icon {
					font-size: .875rem;
					display: flex;
					i {
						line-height: 24px;
						margin-right: 10px;
					}
				}
				i {
					font-size: 16px;
					color: #333;
				}
				.fa-angle-right {
					font-size: 24px;
					color: #c9c9c9;
				}
				p {
					flex: 6;
					text-align: justify;
					font-weight: bold;
					line-height: 1.5rem;
					padding-right: 1rem;
					color: #333333;
					span {
						font-size: 0.9rem;
						font-weight: normal;
						color: #666;
					}
				}
			}
		}
		.refund-express {
			width: 100%;
			display: flex;
			text-align: left;
			font-size: .875rem;
			span {
				width: 21%;
				line-height: 26px;
			}
			select {
				width: 79%;
				border: solid 1px #e2e2e2;
				background-color: #fff;
				height: 26px;
				border-radius: 3px;
				padding: 0 4px;
				color: #8c8c8c;
			}
		}
		.express-member {
			span {
				line-height: 26px;
				width: 21%;
			}
			display: flex;
			justify-content: space-between;
			text-align: left;
			font-size:.875rem;
			margin-top:20px;
			input {
				background-color: #fff;
				border: solid 1px #e2e2e2;
				width: 79%;
				height: 26px;
				border-radius: 3px;
				padding: 0 4px;
			}
		}
		.remarks {
			display: flex;
			justify-content: space-between;
			text-align: left;
			font-size: .875rem;
			display: flex;
			margin-top: 20px;
			span {
				margin-right: 10px;
			}
			textarea {
				width: 79%;
				background-color: #fafafa;
				border: solid 1px #e2e2e2;
				border-radius: 4px;
				padding: 4px;
				height: 68px;
			}
		}
		.submit {
			margin-top: 20px;
			input {
				width: 60%;
				height: 2rem;
				color: #fff;
				background-color: #f15353;
				border: none;
				border-radius: 4px;
				font-size: .875rem;
			}
		}
		.my_wrapper {
			background: #FFF;
			overflow: hidden;
			display: flex;
			padding: 10px;
			align-items: center;
			span {
				width: 105px;
				flex: none;
				font-size: 16px;
				line-height: 1;
			}
			.my-value {
				flex: 2;
				text-align: left;
				span {
					color: red;
				}
			}
		}
		.el-radio-group {
			display: block;
		}
		#state {
			display: flex;
			justify-content: space-between;
			background-color: #f15353;
			color: #fff;
			padding: 0 14px;
			height: 60px;
			text-align: left;
			span {
				font-size: 16px;
				font-weight: bold;
				line-height: 60px;
			}
		}
		.return-money {
			background-color: #fff;
			padding: 0 14px;
		}
		.money {
			padding: 10px 0;
			border-bottom: solid 1px #e2e2e2;
			li {
				line-height: 30px;
				display: flex;
				justify-content: space-between;
				font-size: .875rem;
			}
			.right {
				color: #f15353;
			}
		}
		.prompt {
			color: #8c8c8c;
			text-align: left;
			line-height: 36px;
		}
	}
</style>