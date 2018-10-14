<template>
<div id="old">
	<c-title :hide="false"
			  text='老用户绑定'></c-title>
	<div style="height: 40px;"></div>  
	
	<div class="merge">
		<img src="../../../assets/images/merge.png" alt="" />
		<div class="auto-merge">
			<div>系统将会自动合并</div>
			<div>原始数据</div>
		</div>
	</div>
	<ul style="padding: 0;margin: 0;">
	
		<li class="bind-item">
			<div class="bind-item-title">手机号</div>
			
			<input class="bind-input" type="tel" slot="right" placeholder="请输入手机号码" v-model.trim="form.mobile">
			
			<yd-sendcode slot="right" v-model="start1" @click.native="verificationCode" type="warning"></yd-sendcode>
		
		</li>
		<li class="bind-item">
			<div class="bind-item-title">验证码</div>
			
			<input class="bind-input" slot="right" type="text" placeholder="请输入验证码" v-model.trim="form.code">
		</li>
	</ul>
	<div class="confirm-btn" @click="sure_confirm">确认绑定</div>
</div>
	

</template>
<script>
import old from './old.js';
export default old;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#old {
	.merge{
		padding: 2.7rem 0 1.5rem 0;
		height: 7.4rem;
		text-align: center;
		font-size: 0;
		border-bottom: 1px solid #E5E2DF;
		background: #fff;
		img{
			height: 100%;
			width: 2.5rem;
		}
		.auto-merge{
			display: inline-block;
			font-size: 1rem;
			padding: 10px 0 0 12px;
			line-height: 1.2rem;
			vertical-align: top;
			text-align: left;
		}
	}
	
	.bind-item{
		display: flex;
		flex-flow: row nowrap;
		border-bottom: 1px solid #E5E2DF;
		height: 53px;
		padding: 0 16px;
		font-size: 16px;
		color: #444;
		justify-content: center;
	    background: #FFFFFF;
	    align-items: center;
		.bind-item-title{
			width: 4rem;
			text-align: left;
			min-width: 4rem;
		}
		.bind-input{
			display: block;
			flex-grow: 1;
			border: none;
			font-size: 1rem;
			color: #666;
			-moz-appearance: textfield;
			-webkit-appearance: none;
			min-width: 100px;
			.identity-select-btn{
				font-size: 30px;
				line-height: 100%;
				vertical-align: middle;
				color: #ff3b53;
				height: 33px;
			}
		}
		.verification{
			text-align: center;
		    font-size: 13px;
		    display: inline-block;
		    white-space: nowrap;
		    display: inline-block;
		    background: #ffb400;
			line-height: 30px;
			color: #fff;
			border-radius: 4px;
		    padding: 0 10px;
		}
		.right{
			text-align: right;
		}
	}
	.confirm-btn{
		display: block;
		width: 92%;
		height: 51px;
		line-height: 51px;
		background: #ff3b53;
		margin: 30px 4% 0 4%;
		text-align: center;
		color: #fff;
		border-radius: 4px;
		font-size: 1rem;
	}
}
</style>
