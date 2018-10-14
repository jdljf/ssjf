<style lang="scss" rel="stylesheet/scss" scoped>
p,
ul,
li {
	margin: 0;
	padding: 0;
}

li {
	list-style: none;
}

#share {

	.m_header {
		width: 100%;
		height: 45px;
		padding-right: 15px;
		box-sizing: border-box;
		background: #fff;
		line-height: 45px;
		font-size: 18px;
		span {
			display: inline-block;
			width: 16px;
			height: 24px;
			float: left;
			margin-left: 10px;
			font-size: 30px;
		}
		i {
			font-size: 16px;
			float: right;
			font-style: normal;
		}
	}
	.top {
		text-align: left;
		padding: 16px;
		background: #fff;
		text-align: center;
		i {

			font-style: normal;
			font-size: 16px;
			display: block;
		}
		.content {

			width: 120px;
			margin: 0 auto;
			font-size: 16px;
			text-align: center;
			span {
				font-size: 28px;
				color: #333;
				display: inline-block;
				padding-top: 12px;
				margin-bottom: 5px;
			}
			b {
				line-height: 24px;
				font-weight: normal;
				color: #8c8c8c;
				width: 60px;
				height: 24px;
				display: inline-block;
			}
		}
	}
	.middle1{
		border-bottom: solid 1px #e2e2e2;
	}
	.middle1,.middle2,
	.bott {
		text-align: left;
		padding:10px 12px ;
		line-height: 30px;
		color: #343434;
		background: #fff;
	}
	.middle1,.middle2 {
		display: flex;
		flex-wrap: wrap;
		.lrest {
			flex: 50%;
			color:#8c8c8c;
		}
		.resot {
			flex: 50%;
			text-align: right;
		}
	}
}
</style>
<template>
	<div id="share">
		<div>
	
			<c-title :hide="false" :text='mailReturnDetail'></c-title>
			<div style="height:40px"></div>
			<div class="top">
				<i>{{mailReturnAmount}}</i>
				<div class="content">
					<span>{{return_amount}}</span>元
					<br />
					<b>{{status_name}}</b>
				</div>
			</div>
			<div class="middle1">
				<template>
					<div class="lrest">订单金额</div>
					<div class="resot">{{order_amount}}</div>

					<div class="lrest">每期{{mailSingleReturnName}}比例</div>
					<div class="resot">{{each_return_rate}}%</div>

					<div class="lrest">{{mailSingleReturnName}}方式</div>
					<div class="resot">{{return_mode}}</div>

					<div class="lrest">已{{mailSingleReturnName}}金额</div>
					<div class="resot">{{return_amount}}</div>

					<div class="lrest">未{{mailSingleReturnName}}金额</div>
					<div class="resot">{{not_return}}</div>
				</template>
			</div>
			<div class="middle2">
				<template>
					<div class="lrest">{{mailSingleReturnName}}队列ID</div>
					<div class="resot">{{id}}</div>

					<div class="lrest">订单编号</div>
					<div class="resot">{{order_sn}}</div>

					<div class="lrest">创建时间</div>
					<div class="resot">{{created_at}}</div>

					<div class="lrest">完成时间</div>
					<div class="resot">{{finish_time}}</div>
				</template>
			</div>
		</div>
	</div>
</template>


<script>
import single_return_list_info_controller from './single_return_list_info_controller';
export default single_return_list_info_controller;
</script>