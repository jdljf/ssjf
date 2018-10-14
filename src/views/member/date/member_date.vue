<template>
  <div id="date">
<h1>
	<span @click='put'>－</span>
	{{year}}年{{month}}月
	<span @click='add'>＋</span></h1>
<ol>
	<li>日</li>
	<li>一</li>
	<li>二</li>
	<li>三</li>
	<li>四</li>
	<li>五</li>
	<li>六</li>
</ol>
<div style='height:19rem;background:#fff'>
<ul>
	<div  v-bind:style="{'width':w+'%'}"></div>
		<li v-for='val,key in m'>
			<span>{{val}}</span>
			<img v-if='test(key)' src='../../../assets/iconfont/gou.svg'>
		</li>
</ul>
</div>
  </div>
</template>
<script>
import member_datecontroller from './member_datecontroller';
export default member_datecontroller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#date{
	h1{
		background:#fff;
		font-size:1.1rem;
		color:#99cc99;
		font-weight:normal;
		line-height:2.5rem;
		text-align:left;
		text-indent:1rem;	
	}
	ol{
		display:flex;
		background:#fff;
		box-sizing:border-box;
		padding:0 0.3rem;
		&>li{
			display:inline-block;
			width: 14.27%;
			float:left;
			line-height:2rem;
			border-bottom:solid 1px #e5e5e5;
				}
		}
	ul{
		display: flex;
		flex-wrap: wrap;
		position:relative;
		box-sizing:border-box;
		padding:0 0.3rem;
		div{
			border-bottom:solid 1px #e5e5e5;	
		}
		&>li{
			list-style: none;
			width: 14.27%;	
			height:3rem;
			border-bottom:solid 1px #e5e5e5;
			span{
				display:block;
				margin:0.55rem 0 0.4rem 0;
			}
			img{
             background:#99cc99;
             border-radius:50%;
             width:0.85rem;
             height:0.85rem;
			 display:block
           }
		}
		&:after{
			content:'';
			width:100%;
			height:1px;
			z-index:1;
			background:#fff;
			position:relative;
			left:0;
			bottom:1px;
		}
	}

}


</style>