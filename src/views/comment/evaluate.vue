<template >
	<div id="evaluate">
		<c-title :hide="false"
		         text='评价'></c-title>
		<div style="height: 42px;"></div>
		<div id="shop">
			<div class="goods">
				<div class="img"><img :src="good.thumb"></div>
				
				<div class="warp">
					<ul class="inner">
						<li class="name">{{good.title}}</li>
						<div class="option">
							规格: {{good.goods_option_title}}
							<div class="product_price">￥{{good.goods_price}}</div>
							<div class="option"> ×{{good.total}}</div>
						</div>	
						</li>
					</ul>
					<ul class="price">
					</ul>
				</div>
			</div>
	
			<div id="pjall">
				<div id="pj"><span>评分:</span>
					<el-rate v-model="level"
					         show-text
					         @change="getStar"></el-rate>
				</div>
				<div style="height:10px"></div>
				<el-input type="textarea"
				          :rows="2"
				          placeholder="请输入评论内容"
				          v-model="comment">
				</el-input>
				
				<!--<ul class="upfile">
					<li><img src="../../assets/images/img_default.png"/></li>
					<li><i class="fa fa-camera"></i></li>
				</ul>-->
			</div>
			
		</div>
			<el-button type="primary"
			           @click="toComment(good)" style='background: red;border: 0;'>提交评价</el-button>
	</div>
</template>
<script>
import order_list_evaluatecontroller from './evaluatecontroller';
export default order_list_evaluatecontroller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#evaluate {
	#shop {
		background: #FFF;
		padding:10px 0 0 0;
	}
	
	
	.goods:after{
			content: "";
			display: block;
			clear: both;
		}
	
	
	.goods {
		/*display: flex;
		align-items: stretch;
		flex-flow: row wrap;
		background: #efeded;
		padding: 5px;
		margin-bottom: 5px;
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
			align-items: center;
		}*/
		
		
		
		
		
			display: flex;
			padding:10px 14px;
			width: 100%;
			box-sizing: border-box;
			background: #fff;
			.img {
				flex: 1;
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
		
		.product_price {
			/*margin-bottom: 10px;*/
			font-size: 14px;
			color: #F15353;
		}
		
		
		
		.option {
		    color: #888;
		    /*font-size: 0.4rem;*/
		    /*flex: 1;*/
		 	position: relative;
		    width: 100%;
		    font-size: 14px;
		    .product_price{
	  	  	  position: absolute;
		      right: 0;
		  	  bottom: 0;
		      color: #f15353;
		  }
	    }
	}
	#pjall {
		background: #FFF;
		padding: 10px 14px;
		.upfile{text-align: left; margin-top: 10px;
			li{width: 20vw; float: left; height: 20vw; line-height: 20vw;}
			i{font-size: 1rem;border: 1px dashed #919191;font-weight: normal;color: #919191;padding: 10px;}
			img{width: 100%;}
		}
		textarea {
			width: 87%;
			margin-top: 10px;
			padding: 10px;
		}
		#pj {
			text-align: left;
			span {
				float: left;
				font-size: 14px;
				padding-right: 10px;
			}
		}
	}
	button {
		width: 92%;
		margin-top:20px;
		height: 36px;
	}
}
</style>