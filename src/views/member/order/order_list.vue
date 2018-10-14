<template>
	<div id="payment">
			<!--多加:type="1" :gowhere="this.fun.getUrl('member')"-->
		<c-title :hide="false"  text='我的订单' ></c-title>
		<div style="height:100vh;overflow: scroll;-webkit-overflow-scrolling: touch">
		
		<div style="height: 84px;"></div>

		<mt-navbar v-model="selected" style="z-index:98"
		           fixed>
			<mt-tab-item style="margin-bottom:5px" id="0"
			             @click.native="swichTabTItem">全部</mt-tab-item>
			<mt-tab-item style="margin-bottom:5px" id="1"
			             @click.native="swichTabTItem"> 待付款</mt-tab-item>
			<mt-tab-item style="margin-bottom:5px" id="2"
			             @click.native="swichTabTItem" v-if="!(orderType=='cashier')">待发货</mt-tab-item>
			<mt-tab-item style="margin-bottom:5px" id="3"
			             @click.native="swichTabTItem" v-if="!(orderType=='cashier')">待收货</mt-tab-item>
			<mt-tab-item style="margin-bottom:5px" id="4"
			             @click.native="swichTabTItem">已完成</mt-tab-item>
		</mt-navbar>
		
		<mt-loadmore v-if="goload" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='true' id='olis'>
			<mt-tab-container v-model="selected">
				<mt-tab-container-item id="0">
					<cOrderList v-on:ConfrimOrderNotification="cofirmOrderAction" v-on:ToDetailNotification="toDetail" :datasource="orderList" :orderType="orderType" :detailUrl="detailUrl" :status="0" class='osll'></cOrderList>
				</mt-tab-container-item>
				<mt-tab-container-item id="1">
					<cOrderList v-on:ConfrimOrderNotification="cofirmOrderAction" v-on:ToDetailNotification="toDetail" v-on:MultiplePayNotification="multiplePayAction" :datasource="waitPayList" ref="mychild" :orderType="orderType" :detailUrl="detailUrl" :status="1" class='osll'></cOrderList>
				</mt-tab-container-item>
				<mt-tab-container-item id="2">
					<cOrderList v-on:ConfrimOrderNotification="cofirmOrderAction" v-on:ToDetailNotification="toDetail" :datasource="waitSendList" :orderType="orderType" :detailUrl="detailUrl" :status="2" class='osll'></cOrderList>
				</mt-tab-container-item>
				<mt-tab-container-item id="3">
					<cOrderList v-on:ConfrimOrderNotification="cofirmOrderAction" v-on:ToDetailNotification="toDetail" :datasource="waitReceiveList" :orderType="orderType" :detailUrl="detailUrl" :status="3" class='osll'></cOrderList>
				</mt-tab-container-item>
				<mt-tab-container-item id="4">
					<cOrderList v-on:ConfrimOrderNotification="cofirmOrderAction" v-on:ToDetailNotification="toDetail" :datasource="waitCompleteList" :orderType="orderType" :detailUrl="detailUrl" :status="4" class='osll'></cOrderList>
				</mt-tab-container-item>
				<!--多加-->
				 <mt-tab-container-item id="5">
					<cOrderList v-on:ConfrimOrderNotification="cofirmOrderAction" v-on:ToDetailNotification="toDetail" :datasource="waitCompleteList" :orderType="orderType" :detailUrl="detailUrl" :status="5" class='osll'></cOrderList>
				</mt-tab-container-item>
				<!---->
			</mt-tab-container>
		</mt-loadmore> 
		</div>
		<div class="contes" v-if="isMultiplePay"><button @click="toMultiplePay">合并支付</button></div>
		<!--多加-->
		<!--<div @click="add_more" class="loadNomore" v-show="allLoaded">点击加载更多...</div>

		<img v-show='!allLoaded' class="img" :class="{'big-no-img': (l_index == 3 && waitReceiveList.length <= 0) || (l-index == 0 && orderList.length<=0) || (l_index == 1 && waitPayList.length<=0) || (l_index == 2 && waitSendList.length<=0) || (l_index == 4 && waitCompleteList.length<=0)  ?true:false}" src="../../../assets/images/no-more-product.png" />
		<div v-if="isMultiplePay" style="height: 45px;"></div>-->
		<!---->
	</div>	
</template>
<script>
	import orderListController from "./order_listController";
	export default orderListController;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.osll {
		/*min-height: 100vh;*/
	}
	.contes {
		z-index: 98;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 45px;
		background: #fff;
		line-height: 45px;
		border-top: #e2e2e2 solid 1px;
		text-align: right;
		button {
			border: solid 1px #f15353;
			background: #f15353;
			border-radius: 4px;
			margin-right: 12px;
			color: #fff;
			padding: 4px 10px;
		}
	}
	.loadNomore {
		position: relative;
		width: 100%;
		height: 4rem;
		line-height: 4rem;
		text-align: center;
		font-size: 1rem;
	}
	.img {
		width: 3.5rem;
		padding: 6px 0;
	}
	.big-no-img{
		padding-top: 130px;
		width: 9rem;
		height: auto;
	}
	#payment {
		.mint-navbar.is-fixed {
			top: 40px;
		}
	}
	
</style>