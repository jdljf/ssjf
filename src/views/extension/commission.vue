<template>
	<div id="commission">
		<c-title :hide="false" :text="$yzt('commission.yuji')"></c-title>
		<div style="height: 40px;"></div>
	
		<div v-for="item in datas">
	
			<div class="tbs">
				<ul class="item1">
					<li>{{item.order_sn}}</li>
					<li>{{item.price}}{{ $yzt('common.yuan') }}</li>
				</ul>
				<ul class="item2" v-if="item.status==1">
					<li class="reg">{{ $yzt('common.yongjin') }}+{{item.commission}}</li>
					<li>{{item.created_at}}</li>
				</ul>

					<ul class="item2" v-else="item.status==0">
						<li class="unreg">{{ $yzt('common.yongjin') }} +{{item.commission}}</li>
						<li class="time">{{item.created_at}}</li>
					</ul>
			</div>
	
			<!--<div class="times">2017年3月</div>-->
			<!--<router-link :to="{ name: 'commissionDetails', params: { id: 12 }}">
							<div class="tbs">
								<div class="item1">商品名字
									<br/>984.15元</div>
								<div class="item2"><span class="reg">佣金   +3.00</span>
									<br />2013.09.05 09:51:05</div>
							</div>
						</router-link>-->
		</div>
	
	</div>
</template>
<script>
import commission from './commission_controller';
export default commission;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#commission {
	.times {
		text-align: left;
		text-indent: 10px;
		line-height: 2rem;
		background: #dddddd;
	}
	.tbs {
		background: #FFF;
		overflow: hidden;
		display: flex;
		align-items: center;
		padding: 10px 12px;
		border-bottom: 1px solid #e2e2e2;
		font-size:.875rem;
		li{
			line-height: 24px;
		}
		.item1 {
			color: #000;
			flex: 50%;
			text-align: left;
		}
		.item2 {
			flex: 50%;
			text-align: right;
			color: #333;
			.reg {
				color: #259B24;
			}
			.unreg {
				color: #333;
			}
			.time{
				color:#8c8c8c;
			}
		}
	}
}
</style>