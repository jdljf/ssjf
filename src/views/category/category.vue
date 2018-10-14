<template>
	<div id="category">
		<c-title :hide="true" text=''></c-title>
		<!--取自catelist.vue-->
		<ul class="top-tab">
			 <li class="search-box">
			 	<!--<yd-icon class="iconfont icon-sousuo" custom size="" color="#a9a9a9" style="margin: -4px 10px 0 0"></yd-icon>-->
			 	<span class="iconfont icon-sousuo" style="margin-top: -15px;position: absolute;"></span>
				<input type="text" @click='tosearch' placeholder="搜索" v-model='searchvalue'>			 
			 </li>
		 </ul>
		<div id="category-content" ref="menucontent">
			<div id="err" v-if='err'>未检测到子分类数据!</div>
			<c-carcontent hide="true" :list='contentlist' v-if='!err'></c-carcontent>	
		</div>
		<div id="rootlists" ref="menu">
			<ul id='rootList' v-if='list'>			
				<li @click="secondkill">秒杀</li>
				<li @click="bpfun">推荐品牌</li>
				<li @click="allList" :class="{active:active2}">推荐分类</li>
				<li v-for="(item,index) in list" :class="{active:active==index}" @click='tabsa(index,item)'>{{item.name}}</li>
				<div style="height: 20px;"></div>
			</ul>
		</div>
		<div style="height: 45px;"></div>
	</div>
</template>

<script>
	import category from './category_controller';
	import { mapState, mapMutations } from 'vuex';
	import cGoodsList from 'components/goodsList';
	import cSort from 'components/sort';
	export default category;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/css/category.scss'
</style>
<style lang="scss" rel="stylesheet/scss" scoped>
.top-tab{
	padding: 10px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: 50px;
    line-height: 50px;
    background: #f2f2f2;
	.search-text{
		font-size:.9rem;
	}
	.search-box{
		position: relative;
		padding: 4px 5px;
	    display: -ms-flexbox;
	    display: flex;
	    -ms-flex-pack: justify;
	    justify-content: space-between;
	    height: 30px;
	    background-color: #fff;
	    -ms-flex: 2;
	    flex: 2;
		input{
			flex:3;
			border:none;
			color:#8c8c8c;
			text-align: center;
		}
		input::-webkit-input-placeholder, input:-moz-placeholder, input:-ms-input-placeholder {
		    color: #d0d0d0;
		}
		i{
			line-height: 30px;
		}
	}
}
#search {
	.osll{min-height: 100vh;overflow: scroll;}
	.uou {
		position: fixed;
		z-index: 99;
		top: 0px;
		transition: .2s;
		width: 100%;
		-webkit-transition: .2s;
	}
	.mout {
		top: -36px;
	}
}
	.search{
		overflow: hidden;
		background: #fff;
		border-bottom: 1px solid #f5f5f5;
		.el-button.el-button--default{    float: left;
			width: 10%;    border: none;
			padding-top: 21px;}
		.el-input.el-input-group.el-input-group--append{    float: left;
			width: 80%;

			margin-left: 2%;
			height: 45px;
			}
	.el-input-group__append .el-button.el-button--default{    
		background: #f5f5f5;
	    padding-top: 10px;
	    line-height: 20px;
	    padding-right: 29px;
	    border-top-left-radius: 0;
	    border-bottom-left-radius: 0;
	    border-radius: 0 15px 15px 0;
	}
	.el-input.el-input-group.el-input-group--append .el-input-group__append{background: #f5f5f5;}
	.el-col-1{        
		margin: 20px 0px 12px 0;
		color: #666;
		font-size: 16px;}
	}
</style>