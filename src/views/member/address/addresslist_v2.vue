<template>
	<div>
		<c-title :hide="false" text='收货地址管理'></c-title>
		<div style="height: 40px;"></div>
		<!--<c-addressList :datasource="list"></c-addressList>-->
		<div class="box">
			<div class="content01" v-for="(item,itemIndex) in datasource" @click.stop="selectedAddress(itemIndex)">
				<ul class="xinxi">
					<li class="name">{{item.username}}</li>
					<li class="phone">{{item.mobile}}</li>
					<div class="clearfix"></div>
				</ul>
				<div class="where" style="text-align:left;margin-left:0px;">收货地址：{{item.province}} {{item.city}} {{item.district}} {{item.street}} {{item.address}}</div>
				<div class="xuxian"></div>
				<div class="choice">
					<div class="add01">
						<!-- <img src="../../../assets/work/moren.png"> -->
						<el-checkbox v-model="checkList[itemIndex]" @change="setDefaultAddress(itemIndex)">
							<div class="moren">默认地址</div>
						</el-checkbox>
					</div>
					<div class="shanchu" @click.stop="deleteHandler(item,itemIndex)">
						<img src="../../../assets/work/shanchu.png">
						<div class="del">删除</div>
					</div>
					<div class="bianji" @click.stop="alterHandler(itemIndex)">
						<img src="../../../assets/work/bianji.png">
						<div class="edit">编辑</div>
					</div>
					<div class="clearfix"></div>
					<div class="bottom-line"></div>
				</div>
			</div>

	
			
			<div class="content03">
				<div class="new-add" @click="addendAddress">
					<img src="../../../assets/work/add.png">
					<div class="dizhi">新增收货地址</div>
					<div style="clear:both"></div>
				</div>
			</div>
		</div>
	</div>
	</div>
</template>

<script>
	import address_controller from './addresslist_controller';
	export default address_controller;
</script>

<style>
	.box {
		background-color: #f5f5f5;
		margin-bottom:47px;
		
	}
	ul {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	.content01 {
		background-color: #fff;
		padding-left: 14px;
		padding-bottom: 10px;
		padding-top: 14px;
		padding-right: 14px;
		border-bottom: solid 1px #ebebeb;
		border-top: solid 1px #ebebeb;
		margin-bottom:10px;
	}
	.content02 {
		background-color: #fff;
		margin-top: 12px;
		padding-top: 14px;
		padding-left: 14px;
		padding-bottom: 10px;
	}
	.xinxi {
		font-size: 16px;
		color: #333;
	}
	.name {
		float: left;
	}
	.phone {
		float: right;
	}
	.clearfix {
		clear: both;
	}
	.where {
		margin-right: 10px;
		font-family: "Microsoft YaHei";
		font-size: 14px;
		color: #666;
		margin-top: 10px;
		margin-left: 30px;
	}
	.xuxian {
		height:1px;
		background-color: #ebebeb;
		margin-top: 10px;
	}
	.choice {
		margin-top: 10px;
		width: 100%;
	}
	.add01 {
		float: left;
	}
	.add01 img {
		float: left;
	}
	.moren {
		/*float: left;*/
		font-size: 12px;
		color: #f15353;
		margin-right: 10px;
		z-index:96;
		display: inline-block;
	}
	.moren02 {
		float: left;
		font-size: 12px;
		color: #797979;
		margin-left: 8px;
	}
	.shanchu {
		float: right;
		margin-left: 20px;
	}
	.shanchu img {
		float: left;
	}
	.shanchu .del {
		float: left;
		font-size: 12px;
		color: #797979;
		margin-left: 8px;
	}
	.bianji {
		float: right;
		/*margin-left: 20px;*/
	}
	.bianji img {
		float: left;
	}
	.bianji .edit {
		float: left;
		font-size: 12px;
		color: #797979;
		margin-left: 8px;
	}
	.content03 {
		width: 100%;
		height: 45px;
		background-color: #FC482D;
		position: fixed;
		display: flex;
		justify-content: center;
		bottom: 0px;
		z-index:99;
	}
	.new-add {
		margin: 0 auto;
		margin-top: 13.5px;
	}
	.new-add img {
		float: left;
		top: 13px;
	}
	.new-add .dizhi {
		float: left;
		font-size: 14px;
		color: white;
		line-height: 18px;
		margin-left: 10px;
	}
</style>


    
	
   

		