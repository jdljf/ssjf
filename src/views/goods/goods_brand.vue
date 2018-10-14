<template >
<div id="evaluate">
	<c-title :hide="false" text='品牌详情'></c-title>
	<div style="height:40px;"></div>
	<div class="detail-box">
		<div class="logo">
			<div class="img"><img :src="brandLogo?brandLogo:require('../../assets/images/loading.jpg')" alt=""></div>
			<span>{{brandTit}}</span>
		</div>
		<div class="syn">
			<div class="title">
				<div class="spare"></div>
				<h1>品牌介绍</h1>
			</div>
			<div class="text">
				<p v-html="desc"></p>
			</div>
			
		</div>
		<div class="logo-goods">
			<div class="title">
				<div class="spare"></div>
				<h1>品牌商品</h1>
			</div>
			
				<mt-loadmore v-if="goload" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="coupon_loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='false' id='olis'>
					<div class="goods-list">
						<div class="goods" v-for="item in goodsList">
								<div class="img">
									<img :src="item.thumb" style="width:100%;height:100%">
								</div>
								<ul>
									<li class="name"><h3>{{item.title}}</h3></li>
									<li class="price">￥<b>{{item.price}}</b><span>￥{{item.market_price}}</span></li>
								</ul>
						</div>
					</div>
				</mt-loadmore>
				
		
		</div>
	</div>
</div>
</template>
<script>
import brand from './goods_brand_controller';
export default brand;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#evaluate{
	.logo{
		background-color: #fff;
		padding:10px 14px;
		display: flex;
		.img{
			width:30px;
			height:30px;
			margin-right:10px;
			overflow: hidden;
			img{
				width: 100%;
				height: 100%;
			}
		}
		span{
			font-size:.9rem;
			line-height: 30px;
		}
	}
	.syn{
		margin-top:10px;
		text-align: left;
		background-color: #fff;
		.title{
			margin-left:14px;
			display: flex;
			border-bottom:solid 1px #f3f3f3;
			.spare{
				width:4px;
				height:16px;
				margin-top:9px;
				background-color: #f15353;
				margin-right:6px;
				border-radius: 1px;
			}
			h1{
				font-size:.875rem;
				line-height: 36px;
			}
		}
		.text{
			padding:10px 14px;
			p{
				line-height: 24px;
			}
		}
	}
	.logo-goods{
		margin-top:10px;
		.title{
			background-color: #fff;
			padding-left:14px;
			display: flex;
			.spare{
				width:4px;
				height:16px;
				margin-top:9px;
				background-color: #f15353;
				margin-right:6px;
				border-radius: 1px;
			}
			h1{
				font-size:.875rem;
				line-height: 36px;
			}
		}
		.goods-list{
			margin-top:2px;
			display: flex;
			flex-wrap: wrap;
			.goods{
				width:49vw;
				background-color:#fff;
				margin-right:2vw;
                margin-bottom:2vw;
				.img{
						height:49vw;
						width:49vw;
                        background-color: #f15353;
				}
				ul{

                        padding:5px;
                        text-align: left;
                        .name{
                            font-size:14px;
                            color:#333;
                            height:40px;
                            overflow:hidden;
                            
                            h3{
                                display: -webkit-box;
                                -webkit-box-orient: vertical;
                                -webkit-line-clamp:2;
                                overflow: hidden;
                                line-height: 20px;
                                height: 40px;
                                overflow: hidden;
                                font-weight: normal;
                                display: -webkit-box;
								-webkit-line-clamp: 2;
								/*autoprefixer: off*/
								-webkit-box-orient: vertical;
								/*autoprefixer: on*/
                            }
                              
                        }
                        .price{
                            color:#f15353;
                            font-size:12px;
							line-height: 20px;
							margin-top:6px;
							position: relative;
                            b{
                                font-size:18px;
                                font-weight: normal;
							}
							span{
								text-decoration:line-through;
								color:#888;
								font-size:12px;
								margin-left:10px;
								position: absolute;
								right:0;
							}
                        }
                    }
			}
			.goods:nth-child(2n){
                    margin-right:0;
                }
		}
	}
}
</style>