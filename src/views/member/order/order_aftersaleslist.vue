<template >
    <div id="evaluate">
        <c-title :hide="false"
                 text='售后列表'></c-title>
        <div style="height: 42px;"></div>
       <mt-loadmore v-if="goload"
		             :top-method="loadTop"
		             :bottom-method="loadBottom"
		             :bottom-all-loaded="allLoaded"
		             ref="refund_loadmore"
		             bottomPullText=''
		             bottomDropText='下拉加载...'
		             bottomLoadingText=''
		             :autoFill='true' id='olis'>
                     </mt-loadmore>
            <div class="shop"
                 v-for="item in list">
                <!--<h3><i class="fa fa-bookmark-o"></i>一元店主</h3>-->
                <div class="title">
                    <h4>{{item.order.order_sn}}</h4> <span>{{item.status_name}}</span>
                </div>
                <div class="goods"
                     v-for="good in item.order.has_many_order_goods">
                    <div class="img"><img :src="good.thumb"></div>

                    <div class="warp">
                        <div class="inner">
                            <div class="name">{{good.title}}</div>
                            <div class="option">
                            	<div class="specifications">规格: {{good.goods_option_title}}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="refund">
                <span class="left" v-if="(item.plugin_id == 40 && item.refund_type == 1)">租赁归还</span>
                <span class="left" v-if="!(item.plugin_id == 40 && item.refund_type == 1)">{{item.refund_type_name}}</span>
                <span class="right">退款金额: <b  style="font-size:18px;color: #f15353;">￥{{item.price}}</b></span>
                </div>
                <div class="gourl">
                     <!-- //普通详情 -->
                    <span v-if="!(item.plugin_id == 40 && item.refund_type == 1 && item.status == 6)">
                        <router-link  :to="fun.getUrl('aftersales',{refund_id:item.id})">查看详情</router-link>
                    </span>

                    <!-- //租赁详情 -->
                    <span v-if="(item.plugin_id == 40 && item.refund_type == 1 && item.status == 6)">
                        <router-link  :to="fun.getUrl('OrderReturnAftersalesDetail',{id:item.order.id})">查看详情</router-link>
                    </span>

                </div>
            </div>
        
    
    </div>
</template>
<script>
import order_aftersaleslistcontroller from './order_aftersaleslistcontroller';
export default order_aftersaleslistcontroller;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#evaluate {
    .title {
        padding: 0 12px;
        display: flex;
        align-items: center;
        h4 {
            text-align: left;
            font-weight: normal;
            margin: 10px 0;
            flex: 5;
            font-size: .875rem;
            b {
                font-size: 1.1rem;
            }
        }
        span {
            color: #f15353;
            text-align: right;
            margin-right: 1px;
            flex: 5;
            font-size:.875rem;
        }
    }
    .shop {
        background: #FFF;
        margin-bottom: 10px;
        p {
            margin: 10px;
            text-align: left;
        }
        h3 {
            padding: 10px;
            background: #FFF;
            text-align: left;
            font-weight: normal;
            font-size: .8rem;
            i {
                margin-right: 10px;
                color: #666;
            }
        }
        .gourl {
            display: block;
            border-top: #ebebeb solid 1px;
            text-align: right;
            height:50px;
            padding-right:14px;
            overflow: hidden;
            .refund {
                float: left;
                line-height: 30px;
                color: #f15353;
                font-size: .8rem;
            }
            a {
                color: #000;
            }
            span {
                float: right;
                border: #aaa 1px solid;
                border-radius: 5px;
                padding: 6px 10px;
                margin-left: 10px;
                text-align: center;
                margin-top:7px;
            }
        }
        .refund{
            line-height: 36px;
            width:100%;
             display: flex;
             padding:0 12px;
             font-size:14px;
            .left{
                flex: 1;
                text-align: left;
             }
             .right{
                flex:1;
                text-align: right;
             }
        }
    }
    

.goods:after{
            content: "";
            display: block;
            clear: both;
        }
        .goods {
            /*display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-align: stretch;
            -ms-flex-align: stretch;
            align-items: stretch;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -ms-flex-flow: row wrap;
            flex-flow: row wrap;
            */
            padding:0 14px;
            width: 100%;
            box-sizing: border-box;
            background: #fff;
            padding-bottom: 7px;
            .img {
                /*flex: 1;*/
                width: 30%;
                float: left;
                display: inline-block;
                /*background:blue;*/
                img {
                    width: 100%;
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
			        	width: 100%;
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
						font-size: 1.1rem;
						height: 2.5rem;
			    		line-height: 1.3rem;
					}
	      		}
                
                .price {
                    width: 30%;
                    align-items: center;
                    text-align: right;
                    color: #333333;
                    box-sizing: border-box;
                    float: left;
                    padding-right: 4px;
                    p {
                        margin-top: 0
                    }
                }
                
                .option {
			      	color: #888;
			      	/*font-size: 0.4rem;*/
			     	 /*flex: 1;*/
			     	position: relative;
			     	width: 100%;
			     	font-size: 1rem;
			    	height: 2rem;
			    	.numb{
			     	 	position: absolute;
			      		right: 0;
			     	 	bottom: 1.2rem;
			      		line-height: 1.6rem;
			      	}
			      	.specifications{
			      		position: absolute;
			      		left: 0;
			      		bottom: 0;
			      		font-size: .8rem;
			      		width: 120px;
			      		overflow: hidden;
			      	}
			      	.money{
			      		position: absolute;
			      		right: 0;
			      		bottom: 0;
			      		color: #f15353;
			      	}
			    }
            }
    



        .option {
            color: #888;
            font-size: .75rem;
            flex: 2;
        }
    }
}
</style>