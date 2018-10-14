<template>
	<div id="register">
	
	<c-title :hide="false" text='清空商品'></c-title>
	<div style="height:40px;"></div>
	<div class="content-box">
		<div class="name">
			<h2>柜子名称:{{cup_name}}</h2>
			<span>格子：{{cup_id}}</span>
		</div>
		<div class="goods-img">
			<div class="img"><img :src="this.fun.isTextEmpty(cup_img)?require('../../../assets/images/loading.jpg'):cup_img" ></div>
			<span>芸中商城商品名称</span>
		</div>
		<div class="btn">
			<yd-button type="hollow" @click.native="empty">确认清空</yd-button>
		</div>
		
		
	</div>
	</div>
</template>

<script>
import cupboard_empty_controller from "./cupboard_empty_controller";
export default cupboard_empty_controller;
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
	 .goods-img{
		 margin-top:40px;
		 .img{
			 width:100px;
			 height:100px;
			 background-color: #0487a1;
			 margin:0 auto;
			 img{
				 width: 100%;
				 height: 100%;
			 }
		 }
		 span{
			 display: inline-block;
			 margin-top:10px;
			 font-size:14px;
		 }
	 }
	 .btn{
		 margin-top:80px;
		 button{
			 width:69%;
			 height:40px;
			 margin:0 auto;
			 background-color: #f15353;
			 border:none;
			 color:#fff;
			 border-radius: 4px;
			 font-size:14px;
			 padding:0;
		 }
	 }
	 .prompt{
		 border-radius: 4px;
		 h1{
			 line-height: 44px;
			 font-size:16px;
		 }
		 span{
			 display: inline-block;
			 color:#999;
			 font-size:14px;
			 line-height: 36px;
			 margin-bottom:10px;
		 }
		 ul{
			 display: flex;
			 justify-content: space-between;
			 font-size:14px;
			 border-top:solid 1px #ebebeb;
			 li{
				 line-height: 40px;
				 flex:1;
			 }
			 li:first-child{
				 border-right:solid 1px #ebebeb;
			 }
		 }
	 }
 }
}
</style>