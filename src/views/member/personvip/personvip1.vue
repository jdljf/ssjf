<template>
	<div id="shareholderss">
		<c-title :hide="false" text='会员管理'></c-title>
		<div class="activationarr"><span v-bind:class="{ 'action': isA }" @click="actives" class="titles" data-name="noactive">已激活</span><span @click="actives" v-bind:class="{ 'action': isB }" data-name="active" class="titles">未激活</span></div>

		<div class="banner" v-if="baner1">

			<div class="personvip">
				<div class="search"><input v-model="nickname" ref="inputs" class="inp" placeholder="请输入昵称搜索" type="text" />
					<i @click="getdata" style="position: absolute;top:-2px;right: 20px;" class="iconfont icon-sousuo icon-custom-undefined"></i>
				</div>
				<img @click="goback()" class="returnimg" src="../../../assets/images/return1.png" />
				<div class="shareholders-context">
					<ul class="personvipul">
						<li class="shareli" v-for="item in arrays" @click="nextPage(item.uid,item.has_many_lower.length)">
							<img :src="item.avatar" alt="" />
							<div class="sharelitext">
								<span class="name">{{item.nickname}}</span>
								<labe style="color: #D1D1D1;padding-top: 1px;text-align: left;">加入时间:{{item.create_time}}</labe>

								<labe style="color: #D1D1D1;padding-top: 1px;text-align: left;">手机号:{{item.phone_hidden}}</labe>

							</div>
							<div class="liright" style="">
								<span>
							团队:{{item.has_many_lower.length}}
						</span>
								<span>
						</span>
							</div>
						</li>
					</ul>
				</div>
				<div @click="add_more" v-if="jiazaiload" style="line-height: 30px;">点击加载更多
				</div>
			</div>
		</div>
		<!--模块二-->
		<div class="banner" v-if="baner2">
			<div class="personvip">
				<div class="total">未激活:<b>{{people.noActiveTotal}}</b></div>
				<div class="shareholders-context">
					<ul class="personvipul">
						<li class="shareli" v-for="(item, index) in subord">
							<img :src="item.avatar == '' ? avatar : item.avatar" alt="" />
							<div class="sharelitext">
								<span class="name">{{item.realname}}</span>

								<labe style="color: #D1D1D1;padding-top: 15px;text-align: left;">{{item.phone_back}}</labe>

							</div>
							<div class="liright1" style="">
								<span>
							未激活
						</span>
							</div>
						</li>
					</ul>
				</div>
				<div @click="add_morepeo" v-if="jiazaiload" style="line-height: 30px;">点击加载更多
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import personvip from './personvip';
	export default personvip;
</script>

<style>
	.total {
		line-height: 40px;
		font-size: 16px;
		background: #fff;
		border-bottom: 1px solid #f7f7f7;
		text-align: left;
		padding-left: 15px;
		color: #DC534A;
	}
	
	.activationarr {
		line-height: 40px;
		display: flex;
		border: 1px solid #F6F6F6;
		font-weight: bold;
		background: #fff;
		/*position: fixed;*/
		width: 100%;
		background: #fff;
		z-index: 100;
		margin-top: 40px;
	}
	
	.action {
		border-bottom: 2px solid #D64D31;
	}
	
	.titles {
		flex: 1;
		text-align: center;
	}
	
	.header {
		width: 100%;
		padding: 10px 0px;
		background-color: #fff;
		font-size: 14px;
	}
	
	.search {
		background: #fff;
		box-shadow: 0px 2px 5px 1px #f7f7f7;
		line-height: 50px;
		/*position: fixed;*/
		width: 100%;
		z-index: 100;
		padding-left: 50px;
		position: relative;
	}
	
	.inp {
		line-height: 35px;
		border: 1px solid #F7F7F7;
		width: 98%;
		padding-left: 10px;
		background: #F6F6F6;
	}
	
	.returnimg {
		position: fixed;
		z-index: 100;
		width: 2.3rem;
		height: 2.3rem;
		top: 85px;
		left: 5px;
		padding: 10px 10px;
		border-radius: 50%;
		display: block;
		background: linear-gradient(to right, #323232, #92999B);
		opacity: .7;
	}
	
	.familynum {
		/*margin-top: 40px;*/
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
		/*margin-top: 40px;*/
		display: inline-block;
	}
	
	.shareli {
		width: 100%;
		height: 100px;
		padding: 25px 15px;
		background-color: #FFFFFF;
		margin-bottom: 3px;
	}
	
	.shareli img {
		width: 4rem;
		height: 4rem;
		float: left;
		border-radius: 15%;
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
		color: #7B7B7B;
		position: absolute;
		right: 0px;
	}
	
	.liright1 {
		color: #7B7B7B;
		position: absolute;
		right: 20px;
		padding: 7px 15px;
		border: 1px solid #DB5147;
		border-radius: 15px;
	}
	
	.liright span {
		padding: 0px 5px;
	}
</style>