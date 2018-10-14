<template>
  <div id="red_integral">
    <c-title :hide="false"
             text='红积分'></c-title>
			 <div style="height:40px"></div>
	<div class='user-red'>
		<div class='rednum'>
			<p>红积分</p>
			<span>{{72.00}}</span>
		</div>
		<div class='proportion'>
		<router-link :to="fun.getUrl('withdrawal')">
			<p>提现到创业金</p>
		</router-link>	
			<span>收取{{}}%的手续费</span>	
		</div>	
	</div>	
	<div id="tabs" style="margin-top:10px;">
                <el-tabs>
                    <el-tab-pane label="获得历史">
                        <ul>
							<li>
								<span class="time">2018-03-09&nbsp;&nbsp;16:19:23</span>
								<span>赠送数量：200</span>
							</li>
							<li>
								<span class="time">2018-03-09&nbsp;&nbsp;16:19:23</span>
								<span>赠送数量：200</span>
							</li>
							<li>
								<span class="time">2018-03-09&nbsp;&nbsp;16:19:23</span>
								<span>赠送数量：200</span>
							</li>
						</ul>
                    </el-tab-pane>
                </el-tabs>
    </div>	     	
  </div>
</template>
<script>
import member_red_integralcontroller from './member_red_integralcontroller';
export default member_red_integralcontroller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#red_integral{
	.user-red{
		display: flex;
		justify-content: space-between;
		padding:16px 12px;
		background:#f15353;
		box-sizing:border-box;
		.rednum{
			color:#fff;
			p{
				font-size:1.15rem;
				font-weight:bold;	
			}
			span{
				font-size:1.15rem;
				line-height:1.7rem;
			}
		}
		.proportion{
			p{
				font-size:0.7rem;
				font-weight:bold;
				color:#f15353;
				background:#fff;
				padding:5px 10px;
				border-radius: 4px;
			}
			span{
				color:#fff;
				font-size:0.9rem;
				margin-top:6px;
				display: block;
			}
			
		}
		
	}
	#tabs{
		ul{
			margin-top:4px;
			background-color: #fff;
			li{
				padding:0 12px;
				display: flex;
				justify-content: space-between;
				height:44px;
				line-height: 44px;
				font-size:.9rem;
				border-bottom:solid 1px #e2e2e2;
				.time{
					color:#8c8c8c;
				}
			}
		}
	}
}
</style>