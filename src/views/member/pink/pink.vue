
<template>
	<div id="shareholderss">
	<c-title :hide="false" text='股东管理'></c-title>
		<!--<div class="shareholders-tab">
			<span class="shareholders-tab-span">家族会员数量</span>
			<span class="shareholders-tab-span">剩余提升次数</span>
		</div>-->
		<div class="familynum">家族会员数量</div>
		<img  @click="goback()" class="returnimg" src="../../../assets/images/return1.png" />
		<div class="shareholders-context" >
			<ul>
				<li class="shareli" v-for="item in arrays" @click="nextPage(item.uid,item.has_many_lower.length)">
					<img :src="item.avatar" alt="" />
					<div class="sharelitext">
						<span class="name">{{item.nickname}}</span>
						<!--<labe style="color: #D1D1D1;padding-top: 5px;">{{}}</labe>-->
					</div>
					<div class="liright" style="">
						<span>
							{{item.has_many_lower.length}}
						</span>
						<span>
						</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import pink from './pink';
	export default pink;
</script>

<style>
	.header {
		width: 100%;
		padding: 10px 0px;
		background-color: #fff;
		font-size: 14px;
	}
	
	.returnimg {
		position: fixed;
		width: 2.8rem;
		height: 2.8rem;
		margin-top: 60px;
		top: 50px;
		left:5px;
		padding: 10px 10px;
		border-radius: 50%;
		display: block;
		background:linear-gradient(to right,#323232,#92999B);
		opacity: .7;
	}
	
	.familynum {
		margin-top: 40px;
		padding: 10px;
		background: #313131;
		color: white;
		font-size: 1rem;
	}
	
	.shareholders-tab {
		width: 100%;
		background: linear-gradient(to top, #141212, #4D4D4C);
		line-height: 40px;
		color: #fff;
		display: flex;
	}
	
	.shareholders-tab-span {
		width: 50%;
		flex: 1;
		text-align: center;
	}
	
	.shareholders-context {
		width: 100%;
		height: auto;
	}
	
	.shareli {
		width: 100%;
		height: 100px;
		padding: 25px 15px;
		background-color: #FFFFFF;
		margin-bottom: 3px;
	}
	
	.shareli img {
		width: 3rem;
		height: 3rem;
		float: left;
		border-radius: 50%;
		border: 1px solid aliceblue;
	}
	
	.sharelitext {
		margin-left: 10px;
		float: left;
		display: flex;
		flex-direction: column;
	}
	
	.sharelitext .name {
		font-size: 14px;
		font-weight: bold;
		text-align: left;
	}
	
	.liright {
		float: right;
		margin-top: 27px;
		color: #404040;
	}
	
	.liright span {
		padding: 0px 5px;
	}
</style>