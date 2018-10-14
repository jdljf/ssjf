<template>
	<div id="detailed">
		<c-title :hide="false"
		         text='我的评价'></c-title>
		<div style="height: 40px;"></div>
		<mt-navbar v-model="selected">
			<mt-tab-item id="0"
			             @click.native="swichTabTItem">待评价</mt-tab-item>
			<mt-tab-item id="1"
			             @click.native="swichTabTItem">已评价</mt-tab-item>
			<!--<mt-tab-item id="2"
				             @click.native="swichTabTItem">评价回复</mt-tab-item>-->
		</mt-navbar>

		<div style="width:100%;height:1px;"></div>
		<!-- tab-container -->
		<mt-tab-container v-model="selected">
	
			<mt-tab-container-item id="0" class="orderhoet">                 
				<div v-for="item in wait" class="listWarp">
					
					<div style="padding-bottom: 0;" class="goods" v-for="good in item.has_many_order_goods">
						<div class="titleID">订单号：{{item.order_sn}}</div>
						<div class="product">
							<div class="img">
								<img :src="good.thumb">
							</div>
							<div class="warp">
								<ul class="inner">
									<li class="name">{{good.title}}</li>
									<li class="option">
										<div>规格: {{good.goods_option_title}}</div>
										<div class="option"> ×{{good.total}}</div>
										<div class="commodity_price">￥{{good.price}}</div>
									</li>
								</ul>
									<!--<span><router-link :to='{name:"evaluate",params:{order_data:1}}' >评价</router-link></span>-->
									<div class="evaluate"></div>
								
							</div>
							
						</div>
						<div class="butts">
							<span @click="toComment(item.id,good)">评价</span>
						</div>
					</div>
	
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="1"
			                       class="orderhoet2">
				<div v-for="item in comment">
					<div class="goodsinfo"
					     v-for="good in item.has_many_order_goods">
						<div class="goods">
	
							<div class="img"><img :src="good.thumb"></div>
	
							<div class="warp">
								<ul class="inner">
									<li class="name">{{good.title}}</li>
									<li class="option">
										<div>规格: {{good.goods_option_title}}</div>
										<div class="option"> ×{{good.total}}</div>
										<div class="commodity_price">￥{{good.price}}</div>
									</li>
								</ul>
		
							</div>
						</div>
						<div class="butts">
							<span v-for="btn in good.buttons"
							      @click="opration(btn,good)">{{btn.name}}</span>
						</div>
					</div>
				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="2"
			                       class="orderhoet3">
				<div class="pall"
				     v-for="item in other">
					<router-link :to="{name:'othercommentdetails',params:{comment_id:1},query:{i:toi}}">
						<div class="goodsinfo">
							<!--<div class="hrt"></div>-->
							<div class="goods">
								
								<div class="img"><img :src="item.thumb"></div>									
										
								<div class="warp">
									<div class="inner">
										<div class="name">
											{{item.title}}
										</div>
										<div class="option2">
											<font>￥{{item.price}}</font>
										</div>
		
									</div>
								</div>
							</div>
						</div>
					</router-link>
				</div>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
import myEvaluation from './myEvaluation_controller';
export default myEvaluation;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#detailed {
	a {
		color: #000;
	}
	.orderhoet2,
	.orderhoet3 {
		margin-bottom: 0px;
	}
	.orderhoet {
		margin-bottom: 0px;
		.titleID {
			font-size:14px;
			text-align: left;
			line-height: 2rem;
		}
		.listWarp :after{
			content: "";
			display: block;
			clear: both;
		}
	}
	.pj {
		background: #FFF;
		padding: 0 10px;
		p {
			text-align: left;
			margin: 0;
		}
		img {
			width: 100%;
		}
	}
	.pic {
		display: flex;
		align-items: stretch;
		flex-flow: row wrap;
		padding: 10px;
		background: #FFF;
		div {
			flex: 33% 0 0;
			img {
				width: 90%;
			}
		}
	}
	#user {
		div:nth-child(1) {
			flex: 1;
			padding: 5px 2px;
			img {
				width: 90%;
				border-radius: 50%;
			}
		}
		div:nth-child(2) {
			flex: 5;
			text-align: left;
		}
		div:nth-child(3) {
			color: #908a8a;
			font-size: .6rem;
			padding-right: 10px;
		}
	}
	.mint-navbar .mint-tab-item {
		padding: 14px 0;
	}
	.goodsinfo {
		margin-bottom: 10px;
		padding: 0;
		background: #FFF;
		.hrt {
			border-top: #e0e0e0 1px solid;
			margin: 10px 0;
		}
		   
	}
	.butts {
	    display: flex;
	    align-items: center;
	    justify-content: flex-end;
	    /*border-top: 1px solid #ebebeb;*/
	    height: 50px;
	    /*padding-right:14px;*/
	    padding: 0 10px;
	    
	    span {
      		border-radius: 5px;
		    margin-left: 10px;
		    padding: 6px 10px;
		    text-align: center;
	    	font-size: 14px;
	    	border: 1px solid #aaa;
	    	color: #000;
	    }
	} 
	.goods:after{
			content: "";
			display: block;
			clear: both;
		}
	.goods {
		/*margin-top: 10px;*/
		border-bottom: solid 1px #ebebeb;
		text-align: right;
		position: relative;
		/*display: flex;
		align-items: stretch;
		flex-flow: row wrap;
		background: #e0e0e0;
		padding: 5px;
		margin-bottom: 10px;
		.img {
			flex: 3;
			img {
				width: 100%;
			}
		}
		.inner {
			flex: 5;
			padding: 0 5px;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}
		.name {
			flex: 5;
			text-align: left
		}
		
		.price {
			flex: 2;
			display: flex;
			flex-direction: column;
			align-items: flex-end;
			font {
				flex: 3;
			}
			span {
				border: solid 1px #BFCBD9;
				border-radius: 13px;
				padding: 1px 10px;
				font-size: .8rem;
				line-height: 1.2rem;
				margin: 0;
				background: #FFF;
			}
			.yijp {
				background: #888888;
				padding: 0 5px;
				color: #FFF;
			}
		}
		
		* 
		* */
		
		
		
			padding:10px 12px;
			width: 100%;
			box-sizing: border-box;
			background: #fff;
			.product{
			    padding: 20px 0;
			    /*margin: 0 10px;*/
			    /* width: 100%; */
			    box-sizing: border-box;
			    background: #FFFFFF;
			    border-top: 1px solid #ebebeb;
			    border-bottom: 1px solid #ebebeb;
			}
			.allbt {
			    display: flex;
			    align-items: center;
			    justify-content: flex-end;
			    /*border-top: 1px solid #ebebeb;*/
			    height: 50px;
			    /*padding-right:14px;*/
			    padding: 0 10px;
			    
			    span {
			      border-radius: 3px;
				    border: 1px solid #666;
				    margin-left: 10px;
				    padding: 6px 10px;
				    text-align: center;
				    background: seagreen;
			    	font-size: 14px;
			    	color: #fff;
			    }
			}    
			.img {
		      /*flex: 1;*/
		      width: 30%;
		      float: left;
		      display: inline-block;
		      /*background:blue;*/
		      img {
		        width: 100%;
		      	max-height: 100px;
		      }
		    }
			.warp{
				width: 70%;
				float: left;
				display: inline-block;
				.inner {
					width: 100%;
			        float: left;
			        box-sizing: border-box;
			        padding-left: 8px;
			        text-align: left;
					.name {
						text-align: left;
			            color: #333333;
			            margin-bottom: 20px;
			          	white-space: normal;
			          	overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						/*autoprefixer: off*/
						-webkit-box-orient: vertical;
						/*autoprefixer: on*/
						font-size: 14px;
						width: 100%;
						height: 40px;
	    				line-height: 20px;
					}
				}
				
				.price {
					width: 30%;
					align-items: center;
					text-align: right;
					box-sizing: border-box;
					float: left;
					p {
						margin-top: 0
					}
					
					.yijp {
						background: #888888;
						padding: 0 5px;
						color: #FFF;
					}
				}
				
			}
	.goods:first-child {
		margin-top: 0px;
	}		
			/*.commodity_price{
				margin-bottom: 10px;
				font-size: 14px;
			}*/

	.evaluate span {
				/*border: solid 1px #f15353;*/
				border-radius: 4px;
				padding:4px 10px;
				text-align:center;
				display: inline-block;
				position: absolute;
				right:12px;;
				bottom:10px;
				/*color:#f15353;*/	
		}
		


	


	
		
		
		
		
		.option {
		    color: #888;
		    /*font-size: 0.4rem;*/
		    /*flex: 1;*/
		 	position: relative;
		    width: 100%;
		    font-size: 14px;
		    .commodity_price{
	  	  	  position: absolute;
		      right: 0;
		  	  bottom: 0;
		      color: #f15353;
		  }
	    }
		.option2 {
			color: #e84e40;
			font-size: .9rem;
			flex: 1;
			width: 100%;
			font {
				float: left;
			}
		}
	}
	.qtpl {
		text-align: right;
		width: 100%;
		span {
			background: #FFF;
			border: #B1A6A6 solid 1px;
			padding: 2px 20px;
			border-radius: 10px;
		}
	}
	.pall {
		margin-bottom: 10px;
	}
}
</style>