<template>
	<div id="register">
    <c-title :hide="false" text='投放商品'></c-title>
	<div style="height:40px;"></div>
	<div class="content-box">
		<div class="name">
			<h2>柜子名称:{{cup_name}}</h2>
			<span>格子：{{cup_id}}</span>
		</div>
		<div class="code-box">
			<input type="text" placeholder="请输入商品条形码或扫码录入" v-model="cup_code">
			<yd-icon class="iconfont icon-saoma" custom size="24px" color="#999" @click.native="scanCode"></yd-icon>
		</div>
		<div class="btn">
			<yd-button type="hollow" @click.native="delivery">确认投放</yd-button><br>
			<span>请将物品平整放入框中，并关好箱门！谢谢</span>
		</div>
		
	</div>
	

	</div>
</template>

<script>
import cupboard_delivery_controller from "./cupboard_delivery_controller";
export default cupboard_delivery_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#register {
 .content-box{
	 background-color: #fff;
	 padding-top:48px;
	 margin-top:10px;
	 height:617px;
	 .name{
		 h2{
			font-size:16px;
			margin-bottom: 10px;
			color:#333;
		}
		span{
			color:#999;
			font-size:14px;
		}
	 }
	 .code-box{
		 border:solid 1px #ebebeb;
		 width:80%;
		 height:36px;
		 line-height: 36px;
		 border-radius: 3px;
		 margin:0 auto;
		 display: flex;
		 justify-content: space-between;
		 padding:0 6px;
		 margin-top:40px;
		 input{
			 width:90%;
			 border:none;
			 font-size:14px;
		 }
	 }
	 .btn{
		 margin-top:80px;
		 button{
			 width:69%;
			 height:40px;
			 margin:0 auto;
			 background-color: #259b24;
			 border:none;
			 color:#fff;
			 border-radius: 4px;
			 font-size:14px;
			 padding:0;
		 }
		 span{
			 color:#f15353;
			 display: inline-block;
			 margin-top:10px;
		 }
	 }
 }
}
</style>