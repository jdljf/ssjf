<template>
  <div id="white_integral">
    <c-title :hide="false"
             text='白积分'></c-title>
			 <div style="height:40px;"></div>
	<div class='user-white'>
		<div class='whitenum'>
			<p>白积分</p>
			<span>{{}}</span>
		</div>
		<div class='proportion'>
			<span>每期赠送比例:{{}}</span>
		</div>	
	</div>
			<div id="tabs" style="margin-top:10px;">
                <el-tabs>
                    <el-tab-pane label="获得历史">
                        <div class="list">
							<div class="nember">
								<h1>订单编号：</h1>
								<span>SN20180309</span>
							</div>
							<ul>
								<li>
									<span class="time">订单时间：</span>
									<span>2018-03-09&nbsp;&nbsp;16:19:23</span>
								</li>
								<li>
									<span class="time">订单金额</span>
									<span>￥200</span>
								</li>
								<li>
									<span class="time">获得数量：</span>
									<span>200个</span>
								</li>
							</ul>
						</div>
						<div class="list">
							<div class="nember">
								<h1>订单编号：</h1>
								<span>SN20180309</span>
							</div>
							<ul>
								<li>
									<span class="time">订单时间：</span>
									<span>2018-03-09&nbsp;&nbsp;16:19:23</span>
								</li>
								<li>
									<span class="time">订单金额</span>
									<span>￥200</span>
								</li>
								<li>
									<span class="time">获得数量：</span>
									<span>200个</span>
								</li>
							</ul>
						</div>
                    </el-tab-pane>
                </el-tabs>
            </div>		     	
  </div>
</template>
<script>
import member_white_integralcontroller from './member_white_integralcontroller';
export default member_white_integralcontroller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#white_integral{
	.user-white{
		display: flex;
		justify-content: space-between;
		background:#f15353;
		box-sizing:border-box;
		padding:16px 12px;
		.whitenum{
			text-align: center;
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
			color:#fff;
			font-size:0.9rem;
		}
		
	}
	#tabs{
		.list{
			background-color: #fff;
			margin-top:6px;
			.nember{
				display: flex;
				justify-content: space-between;
				height:40px;
				line-height: 40px;
				padding-right:12px;
				margin-left:12px;
				font-size:.875rem;
				border-bottom:solid 1px #e2e2e2;
			}
			ul{
				background-color: #fff;
				padding:10px 0;
				li{
					padding:0 12px;
					display: flex;
					justify-content: space-between;
					height:30px;
					line-height: 30px;
					font-size:.9rem;
					.time{
						color:#8c8c8c;
					}
				}
			}
		}
		
	}
}
</style>


