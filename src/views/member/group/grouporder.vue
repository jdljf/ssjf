<template>
	<!--拼团订单页面-->
  <div id="group_order">
  		<c-title :hide="false" text='拼团订单详情'></c-title>
  		<div style="height: 40px;"></div>
  		<!--收货地址开始-->
  		<!--<div v-show="store_id">
      <mt-navbar v-model="selected">
	        <template v-for="(item, index) in dispatch">
	      				<mt-tab-item @click.native="setDispatch" :id="item">{{dispatchName[item]}}</mt-tab-item>
					</template>
			</mt-navbar>

			<mt-tab-container v-model="selected">
					<mt-tab-container-item id="2">
							<div class="addr" @click="showAddress">
									<i class="fa fa-map-marker"></i>
									<p>自提地点:{{store_info.store_name}} {{store_info.store_mobile}}
										<br />
										<span>{{store_info.store_address}}</span>
									</p>
									<i class="fa fa-angle-right"></i>
							</div>
							<div style="height: 5px;"></div>
							<div v-if="store_info.delivery_information == null || store_info.delivery_information ==0?false:true">
									<mt-field label="提货人姓名" v-model="linkinfo.name" placeholder="请输入提货人姓名"></mt-field>
									<mt-field label="提货人手机" v-model="linkinfo.mobile" placeholder="请输入提货人手机"></mt-field>
							</div>
							<div style="height: 5px;"></div>
					</mt-tab-container-item>
					<mt-tab-container-item id="3">
	
							<div class="addr" @click="showAddress">
									<i class="fa fa-map-marker"></i>
									<p>收件人:{{realname}} {{mobile}}
										<br />
										<span>{{address}}</span>
									</p>
									<i class="fa fa-angle-right"></i>
							</div>
	
							<div style="height: 5px;"></div>
	
							<div class="addr" @click="showAddress">
									<i class="fa fa-map-marker"></i>
									<p>自提地点:{{store_info.store_name}} {{store_info.store_mobile}}
										<br />
										<span>{{store_info.store_address}}</span>
									</p>
									<i class="fa fa-angle-right"></i>
							</div>
	
							<div style="height: 5px;"></div>
					</mt-tab-container-item>
					<mt-tab-container-item id="1">
							<div class="addr" @click="showAddress">
									<i class="fa fa-map-marker"></i>
									<p>收件人:{{realname}} {{mobile}}
										<br />
										<span>{{address}}</span>
									</p>
									<i class="fa fa-angle-right"></i>
							</div>
							<div style="height: 5px;"></div>
					</mt-tab-container-item>
			</mt-tab-container>
		</div>
  -->
  		<!--收货地址结束-->
  		
			<!--拼团商品详情开始-->
			<div class="detail_good">					
					<div class="goods">
							<div class="img">
									<img src="../../../../static/app/images/address.png"/>
							</div>			
		            <!-- 普通商品显示开始 -->
		            <div class="warp">
								<div class="inner">
										<div class="name">骚是是是啥时是是是是是是是是是是是是是所</div>
										<div class="option">
												规格: 大小
												<p class="">×2</p>
												<p class="money">¥	33.00
												<del style="color: #CCCCCC;display: block;margin-left: -5px;" >￥22.44</del></p>
										</div>														
								</div>
						</div>
            <!-- 普通商品显示结束 -->           						
					</div>
			</div>
			<!--拼团商品详情结束-->
			
			<!--配送方式选择开始-->
			<div class="info">
				<ul class="mode" style='position:relative'>
					<li>快递方式：<span style='position:absolute;left:24%;z-index:999;padding-left: 10px;'></span></li>
					<li class="select">
							<yd-button @click.native="show2 = true">请选择</yd-button>
							<i class="fa fa-angle-right"></i>
					</li>
				</ul>
			</div>
			<!--配送方式列表结束-->
			
			<!--订单列表开始-->
			<div class="tbs coupon-list" @click="showCoupon">
				<div class="coupon list" style="padding: 0;">
					<div class="left ">优惠券
							<font>{{coupon_size}}张可用</font>
					</div>
					<div class="right">
							<font color="#E84E40">
									<span>{{(use_coupon_size==0) ? "未使用":"已使用"+use_coupon_size+"张"}}</span>
							</font>
					</div>
				</div>
			</div>
			<div class="tbs">
				<div class="price list">
					<div class="left ">{{isRent?"租金总金额":"订单总金额"}}</div>
					<div class="right">
							<div class="right">
									<font color="#AAAAAA">￥{{goods_price}}</font>
							</div>
					</div>
				</div>
				<div class="price list">
					<div class="left ">总运费</div>
					<div class="right">
							<div class="right">
									<font color="#AAAAAA">￥{{dispatch_price}}</font>
							</div>
					</div>
				</div>
		
				<div class="price list">
					<div class="left ">总优惠</div>
					<div class="right">
							<div class="right">
									<font color="#AAAAAA">-￥{{discount_price}}</font>
							</div>
					</div>
				</div>
		
				<div class="price list">
					<div class="left ">总抵扣</div>
					<div class="right">
							<div class="right">
									<font color="#AAAAAA">-￥{{deduction_price}}</font>
							</div>
					</div>
				</div>
			</div>
			<!--订单列表结束-->
			
			<!--底部支付开始-->
			<div class="detail_pay">
		      <ul class="total">
		          <li class="deposit"><small v-if="isRent">(押金￥{{goodsInfo.total_deposit}}可退)</small></li>
		          <li>合计：<font style="color:#f15353">￥<span class="span_t">{{price}}</span></font></li>
		      </ul>
		      <div class="order_delete" @click="submit" v-if="">提交订单</div>
			</div>
			<!--底部支付结束-->
			
			<!--点击选择配送方式开始-->
			<yd-popup v-model="show2" position="bottom" height="60%">
						<div class="return-cause">
							<h1>配送方式</h1>
							<ul>
									<li>圆通快递￥10.00</li>
									<li>申通快递￥10.00</li>
									<li>韵达快递￥10.00</li>
									<li>天天快递￥10.00</li>
							</ul>
					</div>
			</yd-popup>
			<!--点击选择配送方式结束-->
  </div>
</template>


<script>
  import grouporder from "./grouporder.js";
  export default grouporder;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#group_order{
	/*拼团商品开始*/
	.detail_good{
	  background: #fff;
	  overflow: hidden;
	  .content {
	    text-align: left;
	    background: #efeded;
	    padding: 10px;
	    color: #8c6700;
	  }
	  a {
	    color: #000000;
	  }
	  h3 {
	    text-align: left;
	    margin: 9px 0;
	    i {
	      font-size: 20px;
	      padding-right: 5px;
	    }
	  }
	  .goods:after {
	    content: "";
	    display: block;
	    clear: both;
	  }
	  .goods {
	    display: flex;
	    padding: 16px 14px 16px 14px;
	    width: 100%;
	    box-sizing: border-box;
	    border-bottom: 1px solid #e2e2e2;
	    .img {
	      /*flex: 1;*/
	      width: 30%;
	      display: inline-block;
	      /*background:blue;*/
	      img {
	        width: 100%;
	      }
	    }
	    .warp {
	      width: 70%;
	      margin-left: 10px;
	      position: relative;
	      .inner {
	        width: 100%;
	        float: left;
	        box-sizing: border-box;
	        padding-left: 8px;
	        text-align: left;
	        .red {
	          color: #f15353;
	          i {
	            font-size: 12px;
	            color: #ff9500;
	          }
	        }
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
	      	.option {
			      color: #888;
			      /*font-size: 0.4rem;*/
			      /*flex: 1;*/
			     	position: relative;
			      width: 100%;
			      font-size: 14px;
			      .money{
			      	position: absolute;
			      	right: 0;
			      	bottom: 0;
			      	color: #f15353;
			      }
			    }
	      .price {
	        display: flex;
	        justify-content: space-between;
	        color: #333333;
	        box-sizing: border-box;
	        p {
	          margin-top: 0;
	        }
	      }
	    }
	    .option {
	      color: #888;
	      font-size: 0.875rem;
	    }
	  }
	  .rent-choice {
	    width: 100%;
	    position: absolute;
	    bottom: 0;
	    display: flex;
	    justify-content: space-between;
	    .red {
	      color: #f15353;
	      margin-right: 10px;
	      font-size: 0.875rem;
	    }
	    li:nth-child(2) {
	      position: relative;
	      right: 0;
	    }
	  }
	}
	/*拼团商品结束*/
	
	/*配送方式开始*/
	.info{
		background: #FFF;
		.mode{
			line-height: 44px;
			margin-left:14px;
			padding-right:14px;
			border-bottom:solid 1px #ebebeb;
			display: flex;
			justify-content: space-between;
			font-size: 15px;
			i{
				font-size:18px;
				color:#999;
				margin-left:8px;
			}
			li:nth-child(2){
				color:#8c8c8c;
			}
			input{
				text-align: right;
				width:90%;
				border:none;
			}
			.select{
				flex:2;
				text-align: right;
			}
			button{
				width: 90%;
				color:#999;
				text-align: right;
				padding:0;
				background-color: #fff;
			}
		}
	}
	/*配送方式结束*/
	
	.tbs.coupon-list {
	  margin-top: 10px;
	  margin-bottom: 10px;
	}
  .tbs{
  	display: flex;
	  flex-direction: column;
	  align-items: center;
	  background: #fff;
	  flex-flow: row wrap;
	  padding: 10px 14px;
	  line-height: 1.5rem;
	  border-bottom: #e8e8e8 solid 1px;
	  font-size: 0.8rem;
  	.list {
  		width: 100%;
    	padding-bottom: 10px;
  		.left{
  			text-align: left;
        float: left;
        color: #858585;
        span {
          font-size: 14px;
        }
  		}
      .left font {
        color: #fff;
        background: #f15353;
        font-size: 0.7rem;
        height: 20px;
        padding: 0 5px;
        border-radius: 3px;
        margin-left: 5px;
      }
      .right font span {
        font-size: 0.8rem;
      }
      .right font i {
        font-size: 0.8rem;
        color: #999;
      }
      .right {
        text-align: right;
        float: right;
      }
 			   
    }
  }  
    
	/*底部支付开始*/
	.detail_pay{
	  z-index: 98;
	  font-size: 1rem;
	  text-align: left;
	  height:49px;
	  width: 100%;
	  background: #fff;
	  padding: 0 0 0 14px;
	  margin-top: 30px;
	  border-top: 1px solid #eaeaea;
	  position: fixed;
	  bottom: 0px;
	  box-sizing: border-box;
	  display: flex;
	  justify-content: space-between;
	  .order_delete {
	    flex:1;
	    width: auto;
	    background: #f15353;
	    text-align: center;
	    color: #fff;
	    line-height: 49px;
	  }
	  .total{
	    font-size:.9rem;
	    padding-right:10px;
	    display: flex;
	    justify-content: flex-end;
	    line-height: 49px;
	    flex:3;
	    .deposit{
	      font-size:12px;
	      color:#999;
	      margin-right:6px;
	    }
	  }
	}
	/*底部 支付结束*/
	
	.return-cause{
		h1{
			line-height: 45px;
			text-align: center;
			font-size:.875rem;
			border-bottom:solid 1px #e2e2e2;
		}
		ul{
			padding:10px 14px 0 14px;
			li{
				font-size: 18px;
				line-height: 40px;
			}
		}
	}
}	
	
</style>