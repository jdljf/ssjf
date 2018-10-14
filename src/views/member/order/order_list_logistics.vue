<template >
	<div id="logistics">
		<c-title :hide="false"
		         text='物流详情'></c-title>
		<div style="height: 42px;"></div>
		<div v-for="item in arrays">
			<div class="my_wrapper">
				<span><img :src="item.thumb"/></span>
				<div class="my-value">
					<p><b> 物流状态</b>
						<font>{{item.status_name}}</font>
					</p>
					<p>承运公司：{{item.company_name}}</p>
					<p>运单编号：{{item.express_sn}}</p>
					<p v-if="item.tel">官方电话：{{item.tel}}</p>
				</div>
			</div>
			<ul id="wlinfo" :class="{bgg: express_info.length <= 0 ? true : false}">
				<!--time: "2017-03-31 15:59:56", ftime: "2017-03-31 15:59:56", context: "[广东广州白云区公司]快件已被 已签收 签收", location: "广东广州白云区公司"-->
				<li v-for="item in express_info">
					{{item.context}}
					<br /><span>{{item.ftime}}</span>
				</li>
			</ul>	
			<div style="height: 8px;"></div>
		</div>
	</div>
</template>
<script>
import order_list_logisticscontroller from './order_list_logisticscontroller';
export default order_list_logisticscontroller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#logistics {
	.my_wrapper {
		background: #FFF;
		overflow: hidden;
		display: flex;
		padding: 10px;
		align-items: center;
		margin-bottom: 4px;
		span {
			flex: 1;
			font-size: 16px;
			line-height: 1;
			padding-right: 15px;
			img {
				width: 100%;
			}
		}
		.my-value {
			flex: 3;
			text-align: left;
			color: #8C8C8C;
			b {
				color: #000000;
				font-size: 1rem;
			}
			font {
				font-size: 0.9rem;
				margin-left: 5px;
				color: #259B24
			}
			p {
				margin: 0;
				font-size: 0.9rem;
			}
		}
	}
	#wlinfo.bgg {
		background: none;
	}
	#wlinfo {
		background: #FFF;
		/*margin-top: 10px;*/
		color: #8C8C8C;
		padding-top: 10px;
		li {
			border-left: 2px solid #BBBBBB;
			text-align: left;
			padding: 0 10px 10px 20px;
			margin-left: 20px;
			position: relative;
			font-size: 0.8rem;
			span {
				font-size: 13.6px;
				border-bottom: #dcdcdc 1px solid;
				display: block;
				line-height: 1.5rem;
			}
		}
		li:after {
			content: '.';
			border-radius: 50%;
			background: #8C8C8C;
			width: 10px;
			height: 10px;
			display: block;
			position: absolute;
			top: 2px;
			left: -6px;
		}
		li:first-child {
			color: #259B24;
		}
		li:first-child:after {
			background: #259B24;
			border: #42B983 4px solid;
			left: -6px;
			top: 0px;
		}
		li:last-child {
			padding-bottom: 0;
			span {
				border-bottom: none;
			}
		}
	}
}
</style>
