<template>
	<div class="progressContainer">
		<div class="progressItem" :style="{width:barwidth+'%'}"></div>

		<span class="left">{{rest}}</span>
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
		height: 14px;
		width: 100%;
		background-color: #666666;
		/*border-radius: 2px;*/
	}
	
	.progressItem {
		position: absolute;
		height: 14px;
		background: linear-gradient(to left, #FF4500, #FC9022);
		/*border-radius: 2px;*/
	}

	
       .left {
		position: absolute;
		top: .1rem;
		left: 0;
		bottom: 0;
		right: 0;
		margin: auto;
		color: #fff;
	}
	
	.progressLabel .right {
		position: absolute;
		right: 0px;
	}
</style>