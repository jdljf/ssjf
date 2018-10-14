<template>
<div id="subordinate" style="overflow: scroll;">
	<c-title :hide="false"
		      text='我的邀请'></c-title>
    <div style="height: 40px;"></div>
	<div class="activation">
		<div class="activation-items">
			<div class="activation-item">全部</div>
			<div class="activation-num">{{people.total}}</div>
		</div>
		<div class="activation-items">
			<div class="activation-item">已激活</div>
			<div class="activation-num">{{people.activeTotal}}</div>
		</div>
		<div class="activation-items">
			<div class="activation-item">未激活</div>
			<div class="activation-num">{{people.noActiveTotal}}</div>
		</div>
	</div>	    
	<div class="subordinate-title">下级列表</div>	

	<div class="subordinate" v-for="(item, index) in subord">
		<img class="avatar" :src="item.avatar == '' ? avatar : item.avatar"/>
		
		<div class="subordinate-state">
			<div class="activation-name">{{item.realname}}</div>
			<div class="subordinate-phone-num">{{item.phone_back}}</div>	
		</div>
		
		<span v-show="item.actived == 0 ? true:false" class="invitation-btn">未激活</span>
		<span v-show="item.actived == 1 ? true:false" class="invitation-success">已激活</span>
	</div>
	<div @click="add_more" class="loadNomore" v-show="allLoaded">点击加载更多...</div>
	<div class="loadNomore" v-show='!allLoaded'>
		<img :class="{'big-no-img' : subord.length <= 0 ? true:false}" src="../../../assets/images/no-more-product.png" />
	</div>
</div>
	

</template>
<script>
import subordinate from './subordinate.js';
export default subordinate;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#subordinate {
	.activation{
		display: flex;
		height: 90px;
		background: #fff;
		.activation-items{
			flex: 1;
			justify-content: center;
			line-height: 1.1rem;
			.activation-item{
				padding: 33px 0 10px 0;
				font-size: 0.8rem;
				color: #999;
			}
			.activation-num{
				font-size: 1.2rem;
				color: #444;
			}
		}
	}
	.subordinate-title{
		text-align: left;
		padding: 5px 10px 0;
		line-height: 22px;
		font-size: 1rem;
		color: #999;
		background: #fff;
	}
	.subordinate{
		display: flex;
		align-items: center;
		padding: 10px 10px;
		border-bottom: 1px solid #ccc;
		background: #fff;
		img{
			width: 50px;
			height: 50px;
			border-radius: 50%;
			border: 1px solid #000;
		}
		.subordinate-state{
			flex: 1;
			font-size: 0;
			text-align: left;
			margin-left: 13px;
			.activation-name{
				display: inline-block;
				font-size: 1rem;
				font-family: MicrosoftYaHeiLight;
				font-weight: 600;
				line-height: 1.1rem;
				color: #222;
				margin-bottom: 7px;
			}
			.activation-sign{
				display: inline-block;
				width: 45px;
				height: 18px;
				line-height: 1.1rem;
				font-size: 0.8rem;
				border-radius: 4px;
				text-align: center;
				background: #FF3B53;
				color: #fff;
				margin-left: 5px;
				margin-bottom: 6.5px;
    			vertical-align: bottom;
			}
			.no-activation{
				display: inline-block;
				width: 45px;
				height: 18px;
				line-height: 1.1rem;
				font-size: 0.8rem;
				border-radius: 4px;
				text-align: center;
				background: #CBCBCB;
				color: #fff;
				margin-left: 5px;
				margin-bottom: 6.5px;
    			vertical-align: bottom;
			}
			.subordinate-phone-num{
				padding-top: 6.5px ;
				font-size: 0.9rem;
				line-height: 1.2rem;
				color: #666;
			}
		}
		.invitation-btn{
			min-width: 5rem;
			text-align: center;
			font-size: 0.9rem;
			border-radius: 16px;
			color: #FF3B53;
			border: 1px solid #FF3B53;
			padding: 5px 7px;
		}
		.invitation-success{
			min-width: 5rem;
			text-align: center;
			font-size: 0.9rem;
			border-radius: 16px;
			color: #999;
			border: 1px solid #ccc;
			padding: 5px 7px;
		}
	}
	.loadNomore {
		position: relative;
		width: 100%;
		height: 4rem;
		line-height: 4rem;
		text-align: center;
		font-size: 1rem;
		img {
			position: absolute;
			/*top: 5px;*/
			left: 0;
			right: 0;
			width: 3.5rem;
		}	
		.big-no-img{
			top: 130px;
			width: 9rem;
			height: auto;
		}
	}
}
</style>