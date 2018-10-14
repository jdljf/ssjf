<template>
	<div id="search" :style="{background:datas.params.bgcolor}" @click="tosearch">
		<span class="log"><img class="imgs" src="../../assets/images/log.jpeg"></span>
		<div id="soso" style="text-align: left;width: 80%;font-size: .7rem;" :style="{borderColor:datas.params.bordercolor,color:datas.params.color}">
			<i style="margin-right: 10px;" class="el-icon-search" :class="{style1:datas.params.style!='style1'}"></i><span class="place">{{datas.params.placeholder}}</span>
		</div>

	</div>
</template>
<script>
	export default {
		props: ['datas'],
		mounted() {

		},
		methods: {
			tosearch() {
				this.$router.push(this.fun.getUrl('search', {}));
				//this.$router.push(this.fun.getUrl('search',{kyes:this.datas.params.placeholder}));
			},
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#search {
		padding: 10px 4px;
		text-align: right;
		.log {
			width: 15%;
			display: inline-block;
			position: absolute;
			left: 12px;
			.imgs {
				width: 100%;
				height: 100%;
			}
		}
		#soso {
			border: 1px solid #ccc;
			background: #FFF;
			padding: 4px 5px;
			text-align: left;
			display: inline-block;
			width: 100%;
			/*border-radius: 10px;*/
			background: #F4F4F4;
			font-size: 1rem;
			i {
				color: #999;
				line-height: 1.3rem;
			}
			.place {
				margin-top: 2px;
				display: inline-block;
			}
			i.style1 {
				float: left;
			}
		}
	}
</style>