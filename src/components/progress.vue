<template>
	<div class="progressContainer">
		<div class="progressItem" :style="{width:barwidth+'%'}"></div>
		<div class="progressLabel">
			<span class="left">已售:{{rest}}</span>
			<!--<span class="right">总数:{{total}}</span>-->
		</div>
	</div>
</template>
<script>
	export default {
		props: ['total', "rest", "barwidth"],
		data() {
			return {

			}
		},
		activated() {

		},
		mounted: function() {

		},
		methods: {

		}
	}
</script>
<style>
	.progressContainer {
		position: relative;
		height: 6px;
		width: 100%;
		background-color: #666666;
		border-radius: 2px;
	}
	
	.progressItem {
		position: absolute;
		height: 6px;
		background: linear-gradient(to left, #E8292E, #DD5148);
		border-radius: 2px;
	}
	
	.progressLabel {
		position: relative;
		top: 6px;
		display: block;
		width: 100%;
		color: #999999;
	}
	
	.progressLabel .left {
		position: absolute;
		left: -45px;
		top: -10px;
		font-size: 10px;
	}
	
	.progressLabel .right {
		position: absolute;
		right: 0px;
	}
</style>