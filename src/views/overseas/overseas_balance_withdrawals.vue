<template >
<div id="balance_recharge">
	<c-title :hide="false" text='提现'></c-title>
	<div style="height: 40px;"></div>
	<div class="my_wrapper">
		<span>冻结{{coin_name}}</span>
		<div class="my-value"><span>{{froze}} </span> 元</div>
	</div>
	<div class="my_wrapper">
		<span>可用{{coin_name}}</span>
		<div class="my-value"><span>{{usable}} </span> 元</div>
	</div>	
	<mt-field label="提现金额" v-model="balance_money" placeholder="请输入提现金额"></mt-field>
	

	
	<!--<mt-button type="primary" size="large" @click="confirm">确认提现</mt-button>-->
	<div id="payBtnList">
		<div class="mod_btns" id="wechatpay">
			<a @click="confirm(1)" class="mod_btn bg_wechat">提现到余额</a>
		</div>
	</div>
	<div style="color:#8c8c8c;">提现手续费:{{withdraw_proportion}}%<br />实际到账值为：{{bllw}}</div>
</div>
</template>
<script>
	import overseas_balance_withdrawals from './overseas_balance_withdrawalscontroller';
	export default overseas_balance_withdrawals;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	#balance_recharge{
	.my_wrapper{background: #FFF; overflow: hidden; display: flex;line-height: 44px ;padding:0 12px;align-items: center;
	span{width:120px;text-align: left;
		font-size: 15px;line-height: 1;}
	.my-value{flex: 2;text-align: left; span{color: red;}}
	}

	}
	.mint-field .mint-cell-title {
		width: 80px;
		-webkit-box-flex: 0;
		-ms-flex: none;
		flex: none;
		text-align: left;
		margin-left: 15px;}

	#payBtnList {
	.mod_btns {  margin: 10px 0;height: 40px;  line-height: 40px;  font-size: 1rem;
	.mod_btn{display: block;width: 96%;margin: 15px 2%;border-radius: 4px;}
	.mod_btn.bg_wechat {background: #26ce29;color: #fff;}
	.mod_btn.bg_ali {background: #22aaed;color: #fff;}

	}}
</style>