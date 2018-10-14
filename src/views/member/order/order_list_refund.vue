<template >
<div id="refund">
	<c-title :hide="false" :text="title"></c-title>
	<div style="height: 42px;"></div>
	<!-- <div class="my_wrapper" id="cause">
		<span>退款原因：</span>
		<div class="my-value">
			  <el-select v-model="form.reason" placeholder="请选择">
    				<el-option v-for="item in reasons"  :label="item" :value="item"></el-option>
  			  </el-select>
		</div>
	</div>
	<div class="my_wrapper">
		<span>退款金额：</span>
		<div class="my-value">{{money}}元</div>
	</div>
	<font>提示：您可退款的最大金额为{{money}}元</font>
	<div class="my_wrapper">
		<span>处理方式：</span>
		<div class="my-value">
			  <el-select v-model="form.refund_type" placeholder="请选择">
    				<el-option v-for="item in refundTypes"  :label="item.name" :value="item.value"></el-option>
  			  </el-select>
		</div>
	</div> -->
	
		<div class="info">
			<ul class="mode" style='position:relative'>
				<li>退款方式：<span style='position:absolute;left:24%;z-index:999;padding-left: 10px;'>{{refundtype[form.refund_type]}}</span></li>
				<li class="select">
					<yd-button @click.native="show2 = true">请选择</yd-button>
					<i class="fa fa-angle-right"></i>
				</li>
			</ul>
			<ul class="sum" style="border-bottom: none;">
				<li>退款金额：</li>
				<!--<li class="select">
					<input type="number" style="text-align: left;color: #f15353;caret-color:#999;" v-model="form.price" placeholder="请输入退款金额"
						pattern="[0-9]*"/>
					<i class="fa fa-angle-right"></i>
				</li>-->
				<li style="text-align: left;color: #f15353;caret-color:#999;">{{form.price}}</li>
				<!--<li class="right">{{money}}元</li>-->
			</ul>
			<div class="prompt">提示：您的退款最大金额为{{money}}元</div>
			<!--退款商品选择-->
			<div class="cart_main">
				<el-checkbox-group v-model="checkList" @change="allSelectHandle" style="margin-bottom: 0px;">
					<div class="cart_good" style="margin-left: 14px;padding-left: 0px;" v-for="good in order.has_many_order_goods">
						<el-checkbox :label="good" @change="selectGood">&nbsp;</el-checkbox>
						<div class="right">
							<div class="img" @click='toGoodsInfo(good)'><img :src="good.thumb"></div>
							<div class="info">
								<div class="inner">
									<div class="name" @click='toGoodsInfo(good)'>
										{{good.title}}
									</div>
									<div class="introduction">{{good.option_str}}</div>
								</div>
								<div class="other">
									<div class="price">￥<span>{{good.payment_amount}}</span></div>
									<div style="float: right;">x{{good.total}}</div>
									<!--<div class="num">
										<div class="leftnav" @click.stop='deleteNumber(good)'>-</div>
										<input type="text" disabled=false class="shownum" v-model='good.total'>
										<div class="rightnav" @click.stop='addNumber(good)'>+</div>
									</div>-->
								</div>
							</div>
						</div>
					</div>
				</el-checkbox-group>
			</div>	
			<!--退款商品选择结束-->
		</div>
		<div class="info">
			<ul class="cause"  style='position:relative'>
				<li>退款原因：<span style='position:absolute;left:24%;z-index:999;padding-left: 10px;'>{{form.reason}}</span></li>
				<li class="select">
					<yd-button @click.native="show1 = true">请选择</yd-button>
					<i class="fa fa-angle-right"></i>
				</li>
			</ul>
			<!-- <ul class="explain">
				<li>退款说明：</li>
				<li class="right"><input type="text" placeholder="请输入退款说明"></li>
			</ul> -->
		</div>
		<div class="explain">
			<span>退款说明：</span>
			<textarea type="text" placeholder="请输入退款说明" maxlength="100" v-model='form.content'></textarea>
		</div>
	



	<!--<div class="my_wrapper" v-show="value=='B'">
		<span>快递单号</span>
		<div class="my-value">
			<el-input v-model="express_number" placeholder="请输入快递单号"></el-input>
		</div>
	</div>	-->



	<!-- <mt-field  v-model="form.content" label="退款说明：" placeholder="请输入退款说明" type="textarea" rows="1"></mt-field> -->
	<div style="height: 20px;"></div>
	<mt-button type="primary" size="large" @click="confirmRefund">提交申请</mt-button>

	<yd-popup v-model="show1" position="bottom" height="60%">
		<div class="return-cause">
			<h1>退款原因</h1>
			<ul>
				<li v-for='val,key1 in reasonarr' @click='changetext(val)'>{{val}}</li>
			</ul>
		</div>
	</yd-popup>

	<yd-popup v-model="show2" position="bottom" height="60%">
		<div class="return-cause">
			<h1>处理方式</h1>
			<ul>
				<li v-for='val,key in refundtype' @click='changetype(key)'>{{val}}</li>
			</ul>
		</div>
	</yd-popup>
</div>
</template>
<script>
import order_list_refundcontroller from './order_list_refundcontroller';
export default order_list_refundcontroller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../../../assets/css/cart.scss';
	.cart_good:last-child{
		border-bottom: 1px solid #e3e3e3;;
	}


#refund{    text-align: left;
	font{display: block;color: #8c8c8c;line-height: 2rem;padding: 0 10px;font-size: .875rem;}
	.my_wrapper{background: #FFF; overflow: hidden; display: flex; padding: 10px 14px; align-items: center;
		span{width:86px;flex: none;font-size: 16px;line-height: 1;}
		.my-value{color:#f15353;flex: 2;text-align: left;font-size:16px; span{color: red;}}
		.mint-popup{width: 100%;	img{
			width: 100%;height: 100%;
		}}
	}
	.el-select{
		width:100%;
	}
	
		
		.info{
			background-color: #fff;
			.cause,.mode, .sum{
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
			.sum,.explain{
				display: flex;
				/*padding:0 14px;*/
				line-height: 44px;
				font-size:15px;
				li:nth-child(2){
					color:#f15353;
				}
			}
			.sum{
				input[type=number] {  
				    -moz-appearance: textfield;
				}
				input[type=number]::-webkit-inner-spin-button,  
				input[type=number]::-webkit-outer-spin-button {  
				    -webkit-appearance: none;
				}
			}
			.explain{
				li:nth-child(2){
					flex:3;
				}
				input{
					border:none;
					width:100%;
					font-size:14px;
					color:#8c8c8c;
				}
			}
			.sum .right,.explain .right{
				padding-left:10px;
			}
			
		}
		.explain{
			background-color: #fff;
			padding:0 14px 14px 14px;
			font-size:15px;
			span{
				line-height: 44px;
				text-align: left;
			}
			textarea{
				border:solid 1px #ebebeb;
				background-color: #fff;
				width:100%;
				height:72px;
				border-radius: 4px;
				padding:6px;
				line-height: 20px;
				color:#8c8c8c;
				font-size:14px;
			}
		}
		.prompt{
			line-height: 26px;
			padding-right: 14px;
			margin-left: 14px;
			font-size:13px;
			color: #f15353;
			border-bottom:solid 1px #ebebeb;
		}
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
