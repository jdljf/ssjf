<template>
    <div id="shareholderCenter">
        <c-title :hide="false" :text='mailFullReturnTitle'></c-title>

        <div class="share_holder">
        	<div class="left">
				<span>￥{{returnAmountTotal}} </span><br />
        		<span>{{mailFullReturnName}}总额(元)</span>
        	</div>
        </div>

        <div class="share_info">
        	<div>
        		<span>￥{{alreadyReturn}}</span><br />
				已{{mailFullReturnName}}总额(元)
        	</div>
        	<div>
        		<span>￥{{notReturn}}</span><br />
        		未{{mailFullReturnName}}总额(元)
        	</div>
        </div>
        
        
        <div class="shareholder-order" v-if="isShow">
            <div id="tabs">
                <el-tabs v-model="activeName" @tab-click="handleClick">

                    <el-tab-pane :label="mailFullReturnLog" name="first">
                        <ul class='rationList'>
                            <li v-for="elem in first_content" class="list">
                                <h4>
                                    {{mailFullReturnLog}}ID:{{elem.id}}
                                    <span>{{elem.amount}}</span>
                                </h4>
                                

								<div class="one">
									<div class="time">
										<span class="left">{{mailSingleReturnName}}时间ID:{{elem.id}}</span>
										<span class="right">{{elem.created_at}}</span>
									</div>
									<div class="Record"  @click="toReturnInfo(elem.id)">
										<span class="left">查看记录</span>
										<i class="fa fa-angle-right"></i>
									</div>
								</div>
                    
                            </li>
                        </ul>
						
                    </el-tab-pane>
                </el-tabs>
            </div>
    
        </div>
    
    </div>
</template>

<script>
import full_return_center_controller from './full_return_center_controller';
export default full_return_center_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
p {
    margin: 0;
    padding: 0;
}

#shareholderCenter {
	padding-top: 40px;
    .m_header {
        width: 100%;
        height: 45px;
        line-height: 45px;
        font-size: 15px;
        font-weight: bold;
        background: #fff;
        span {
            display: inline-block;
            width: 16px;
            height: 24px;
            float: left;
            margin-left: 10px;
            font-size: 30px;
        }
    }
    .share_holder {
	   padding:16px 12px;
       box-sizing: border-box;
          background: linear-gradient(to top, #FECD50, #F4AB2B);
       
       .left{
       		width:55% ;
       		text-align: left;
       		color:#FFFFFF;
       		box-sizing: border-box;
			   span:first-child{
				   font-weight: bold;
				   font-size:20px;
			   }
       		
       		span{
				   line-height: 24px;
       			font-size: 13px;
       		}
       }
       .right{
       	width: 45%;
       	padding:32px 15px 0px 0px;
       	box-sizing: border-box;
       	color:#fff;
       	text-align: right;
       	line-height: 26px;
       	
       	font-size: 12px;
       	
       }
    }
    
    .share_info{
    	width: 100%;
    	padding:16px 0;
    	background-color: #fff;
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
		div:first-child{
			border-right:solid 1px #e2e2e2;
		}
    	div{
    		font-size: 12px;
    		line-height: 20px;
    		width: 50%;
    		box-sizing: border-box;
    		span{
    			color:#e84f40;
    			font-size: 16px;
    			font-weight: bold;
    		}
    	}
    	
    }
    
    
    .shareholder-order {
    	#tabs{
    		.rationList{
    			.list{
    				margin: 6px 0px;
    				background-color:#fff;
    				h4{
    					width: 100%;
    					box-sizing: border-box;
    					padding: 10px 20px;
    					text-align: left;
    					color:#333;
    					font-size: 14px;
    					border-bottom: 1px solid #ececec;
    					span{
    						display: inline-block;
    						font-size: .875rem;
    						font-weight: normal;
    						color:#f15353;
    						float: right;
    					};
    				}
    				ul:after{
    					content: "";
    					display: block;
    					clear: both;
    				}
    				ul{
    					width: 100%;
    					padding: 10px 0px;
    					li{
    						width: 33%;
    						float: left;
    						font-size: 12px;
    						color:#8c9295;
    						line-height: 22px;
    						span{
    							color:#333;
    							font-size: 14px;
    						}
    					}
    				}
    				p{
    					color:#aab2b9;
    					text-align: left;
    					box-sizing: border-box;
    					padding: 0px 20px 15px;
    					span{
    						color:#728ae3;
    						float: right;
    					}
    				}
    				
    			}
    			
    			
    			.recordList{
    				padding:15px;
    				font-size: 14px;
    				line-height: 18px;
    				color:#333;
    				text-align: left;
    				background-color: #fff;
    				margin: 2px;
    				span{
    					font-size: 14px;
    					float: right;
    				}
    			}
    			
    			
    		}
    		.rationList:after{
    			content: "";
    			display: block;
   				clear: both;
			}
			.one{
						padding:0 12px ;
					
					.time{
						width:100%;
						line-height: 26px;
						margin-top:10px;
						display: flex;
						justify-content:space-between;
					}
					.Record{
						width:100%;
						line-height: 44px;
						display: flex;
						justify-content:space-between;
						
						i{
							font-size: 20px;
							color:#929292;
							line-height: 44px;
						}
					}
					.left{
						color:#8c8c8c;
						font-size:12px;
					}
					.right{
						color:#333;
					}
				}
    	}
        
    }
    
}
</style>