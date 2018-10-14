<template>
    <div id="shareholderCenter">
        <c-title :hide="false" :text='mailSingleReturnTitle'></c-title>
    
        <div class="share_holder">
        	<div class="left">
        		<span><b>{{alreadyReturn}} </b></span><br>
        		<span>已{{mailSingleReturnName}}总额(元)</span>
        	</div>
        	<div class="right">
        		<span>商品{{mailSingleReturnName}}比例:{{order_return_rate}}% </span><br>
        		<span>每期{{mailSingleReturnName}}比例:{{each_return_rate}}%</span>
        	</div>
        </div>
        
        <div class="share_info">
        	<div class="left">
        		<span>{{returnAmountTotal}}</span><br />
        		{{mailSingleReturnName}}总额(元)
        	</div>
        	<div>
        		<span>{{notReturn}}</span><br />
        		未{{mailSingleReturnName}}总额(元)
        	</div>
        </div>
        
        
        <div class="shareholder-order">
            <div id="tabs">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane :label="mailReturnQueue" name="first">

                        <ul class='rationList'>
                            <li v-for="elem in first_content" class="list">
                                <h4>
                                	{{mailSingleReturnName}}队列ID:{{elem.id}}
                                	<span>{{elem.status_name}}</span>
                                </h4>
                                <ul>
                                	<li>
                                		总{{mailSingleReturnName}}(元) <br />
                                		<span>{{elem.amount}}</span>
                                	</li>
                                	<li>
                                		已{{mailSingleReturnName}}(元) <br />
                                		<span>{{elem.return_amount}}</span>
                                	</li>
                                	<li>
                                		未{{mailSingleReturnName}}(元) <br />
                                		<span>{{elem.not_return}}</span>
                                	</li>
                                </ul>
    							
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
                    <el-tab-pane :label="mailReturnLog" name="second">
                        <ul class='rationList'>
                            <li v-for="elem in second_content" class="recordList">
                               {{elem.created_at}}
                                <span>{{elem.amount}}元</span>
                            </li>
                        </ul>
                    </el-tab-pane>
                </el-tabs>
            </div>
    
        </div>
    
    </div>
</template>

<script>
import single_return_center_controller from './single_return_center_controller';
export default single_return_center_controller;
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
       height: 80px;
       box-sizing: border-box;
           background: linear-gradient(to top, #FECD50, #F4AB2B);
       
       .left{

       		text-align: center;
       		color:#FFFFFF;
       		box-sizing: border-box;
       		float:right;
       		span{
       			font-size: 14px;
				line-height: 24px;
				display: inline-block;
       		}
			   b{
				   font-size:18px;
			   }
       }
       .right{
       	box-sizing: border-box;
       	color:#fff;
       	text-align: left;
       	float:left;
       	font-size: 14px;
		   span{
			   line-height: 24px;
			   display: inline-block;
		   }
       	
       }
    }
    
    .share_info{
    	width: 100%;
    	height: 74px;
    	background-color: #fff;
    	margin-bottom: 10px;
		.left{
			border-right:solid 1px #e2e2e2;
		}
    	div{
    		color:#8c8c8c;
    		font-size: 12px;
    		margin: 16px 0;
    		line-height: 20px;
    		float:left;
    		width: 50%;
    		box-sizing: border-box;
    		span{
    			color:#e84f40;
    			font-size: 18px;
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
					.one{
						padding:0 12px ;
					
					.time{
						width:100%;
						line-height: 26px;
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
    				h4{
    					width: 100%;
    					box-sizing: border-box;
    					padding: 10px 12px;
    					text-align: left;
    					color:#333;
    					font-size: 14px;
    					border-bottom: 1px solid #ececec;
    					span{
    						display: inline-block;
    						font-size: 14px;
    						font-weight: normal;
    						color:#f15353;
    						border-radius: 5px;
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
    						width: 33.3%;
    						float: left;
    						font-size: 12px;
    						color:#8c8c8c;
    						line-height: 22px;
    						span{
    							color:#f15353;
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
    				margin-top: 1px;
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
    	}
        
    }
    
}
</style>