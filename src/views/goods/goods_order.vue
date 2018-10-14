<template>
  <div id="goodsinfo">
    <c-title :hide="false" text='商品订单详情'></c-title>
    <div style="height: 40px;"></div>
    <div v-show="store_id">
      <mt-navbar v-model="selected">
        <template v-for="(item, index) in dispatch">
      				<mt-tab-item @click.native="setDispatch" :id="item">{{dispatchName[item]}}</mt-tab-item>
				</template>
				<!--<mt-tab-item id="3">送货上门</mt-tab-item>
				<mt-tab-item id="1">快递</mt-tab-item>-->
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

		<div  v-if="!store_id" class="addr" @click="showAddress" style="position: relative;">
      <div class="icon">
          <i class="fa fa-map-marker"></i>
          <p>收件人:{{realname}} {{mobile}}
            <br />
            <span>{{address}}</span>
          </p>
      </div>
			
			<i class="fa fa-angle-right" style="position: absolute;top: 10px;right: 14px;"></i>
		</div>

    <div style="margin-top:10px;background:#fff;" v-if="showMyinfo">
      
            <yd-cell-item>
                <span slot="left" style="font-size:12.8px">姓名</span>
                <span slot="right">{{myRealname}}</span>
            </yd-cell-item>
            <yd-cell-item>
                <span slot="left" style="font-size:12.8px">身份证号</span>
                <span slot="right">{{myIdcard}}</span>
            </yd-cell-item>

            <yd-cell-item arrow @click.native="alertMyInfo">
                <span slot="left" style="font-size:12.8px">修改个人信息</span>
            </yd-cell-item>
            
        
    </div>
	
	
		<div class="goods-detail">
      <div class="title" v-if="isRent && !(rent_deposit_free == 0 && rent_free == 0)">
          <yd-icon class="iconfont icon-tishi" custom  size="18px" color="#f15353"></yd-icon>
          <span>您还可以免费租{{rent_free}}件商品!</span>
      </div>
			<div class="goods-shop">
					<p>店铺名称</p>
			</div>
			<div v-for="item in order_data">

        	<!--添加租赁信息-->
        
				<div class="detail_good">
					
					<div class="goods" v-for="g in item.order.order_goods">
						<div class="img">
							<img :src="g.thumb">
						</div>
						<!-- 租赁商品显示 -->
						<div class="warp" v-if="isRent">
              <!-- <el-checkbox-group v-model="checkList" @change="rentSelect"> -->
                <ul class="inner">
                    <li class="name">{{g.title}}</li></br>
                    <li class="red">
                      <yd-icon class="iconfont icon-rent" custom size="12px" color="#ff9500" v-if="!(rent_deposit_free == 0 && rent_free == 0)"></yd-icon>
                      ￥{{(g.goods_price/g.total)}}元/天<span>×{{g.total}}</span>
                      
                    </li>
                    <!-- <li>×{{g.total}}</li> -->
                </ul>
                <div class="right">
                    <ul class="price">
                      <li class="option">规格: {{g.goods_option_title}}</li></br>
                      <li class="right">押金：￥{{g.has_one_lease_goods.goods_deposit}}</li>
                      <!-- <li>￥{{(g.goods_price/g.total)}}</li> -->
                    </ul>
                    <ul class="rent-choice">
                        <li class="left"><span class="red">租金：￥{{g.price}}</span>￥{{g.order_lease_goods[0].lease_price}}元/天</li>
                        <!-- <li><el-checkbox v-if="g.has_one_lease_goods.is_rights==1?true:false" :label="g">&nbsp;</el-checkbox></li> -->
                    </ul>
                </div>
              <!-- </el-checkbox-group> -->
						</div>

            <!-- 租赁商品显示结束 -->

            <!-- 普通商品显示 -->
            <div class="warp" v-if="!isRent">
							<div class="inner">
								<div class="name">{{g.title}}</div>
								<div class="option">
									规格: {{g.goods_option_title}}
									<p class="">×{{g.total}}</p>
									<p class="money">¥	{{(g.price/g.total)}}
									<del style="color: #CCCCCC;display: block;margin-left: -5px;" >￥{{(g.goods_price/g.total)}}</del></p>
									
								</div>
								
								
							</div>
						</div>

            <!-- 普通商品显示结束 -->

            
						
					</div>
          
				</div>

          <div class="rent-info">
              <!-- <ul>
                  <li>租金</li>
                  <li>￥270.00</li>
              </ul>
              <ul>
                  <li>会员折扣</li>
                  <li>-￥30.00</li>
              </ul>
              <ul>
                  <li>运费</li>
                  <li>￥6.00</li>
              </ul>  -->
              
              
          </div>
          <!-- <div class="rent-money"> -->
              <!-- <div class="list">
                  <ul>
                      <li>租金总金额</li>
                      <li>￥270.00</li>
                  </ul>
                  <ul>
                      <li>总运费</li>
                      <li>￥6.00</li>
                  </ul>
                  <ul>
                      <li>总折扣</li>
                      <li>-￥30.00</li>
                  </ul>
                  <ul>
                      <li>总优惠</li>
                      <li>-￥0.00</li>
                  </ul>
                  <ul>
                      <li>总抵扣</li>
                      <li>-￥0.00</li>
                  </ul>
              </div> -->
              <!-- <div class="deposit">
                  <ul>
                    <li>押金（可退还）</li>
                    <li>￥600.00</li>
                  </ul>
              </div> -->
              <!-- <div class="agreement">
                <el-checkbox><span>我已认真阅读并同意该</span><a href="">《租赁协议》</a></el-checkbox>
              </div> -->
          <!-- </div> -->
          <!-- <div style="height:59px"></div> -->
    <!-- 租赁结束 -->

				<div class="tbs">
          <div class="num list" v-if="isRent">
            <div v-if="!(rent_deposit_free == 0 && rent_free == 0)">
                	<div class="left">会员权益</div>
                  <div class="right">
                    <mt-switch v-model="isOpenRight" @change="rentSelect"></mt-switch>
                  </div>
            </div>
					
					</div>
					<div class="num list">
						<div class="left">{{isRent?"租金":"商品金额"}}</div>
						<div class="right">
							<!--<font color="#E84E40">￥{{item.order.goods_price}}</font>-->
							<font color="#E84E40">￥{{goods_price}}</font>
						</div>
					</div>
					<div class="freight-num list">
						<div class="left">运费:</div>
						<div class="right">
							<font color="#E84E40">
								<span> &nbsp;</span>￥{{item.order.dispatch_price}}</font>
						</div>
					</div>
	
					<div class=" score list" v-if="item.order.order_deductions">
						<div v-for="d in item.order.order_deductions" style="width:100%;display:block;clear:both;margin-bottom: 35px;">
							<div class="left ">
								可用{{d.coin}}{{d.name=='积分'?integral:d.name}}
								<span>抵扣{{d.amount}}元</span>
							</div>
							<div class="right">
								<mt-switch v-model="d.checked" @change="discountHandle(item,d)"></mt-switch>
								<!--<mt-switch v-model="d.checked" @change="discountHandle(item,d)"></mt-switch>-->
							</div>
						</div>
					</div>

          <!-- <div class="remarks" v-if="isRent">
              <div class="left">备注:</div><br>
              <textarea name="备注" id="备注" placeholder="若有送货时间或其他要求，请在这里备注说明" cols="30" rows="10"></textarea>
					</div> -->
	
				</div>
			</div>
      <div class="rent-time" v-if="isRent && isRightChoose">
              <div class="text"><span>租期：</span></div>
              <div class="week">
                  <yd-button type="hollow" v-for="(item,index) in rentTime" @click.native="rentTimeChoose(item,index)" :class="{active:index == currentIndex}">{{item.term_name}}<br><span>优惠{{item.term_discount}}%</span></yd-button>
                  <!-- <button type="button">1周<br><span>优惠5%</span></button>
                  <button type="button">1周<br><span>优惠5%</span></button>
                  <button type="button">1周<br><span>优惠5%</span></button> -->
                  <yd-button type="hollow" @click.native="rentSelfChoose">自定义<br><span></span></yd-button>
              </div>
        </div>
		</div>

		<!--商品订单结束-->
	
		<div class="tbs coupon-list" @click="showCoupon">
			<div class="coupon list">
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

      <div class="price list" v-if="isRent">
				<div class="left ">押金（可退还）</div>
				<div class="right">
					<div class="right">
						<font color="#AAAAAA">￥{{goodsInfo.total_deposit}}</font>
					</div>
				</div>
			</div>

      <div class="agreement" v-if="isRent">
          <div class="right">			
              <el-checkbox v-model="agreement"></el-checkbox>
          </div>
          <div class="left "><span>我已认真阅读并同意该</span><span @click="showAgreement" style="color:red;">《租赁协议》</span></div>
			</div>
		</div>
	
		<div style="height: 50px;"></div>
		<div class="detail_pay">
      <ul class="total">
          <li class="deposit"><small v-if="isRent">(押金￥{{goodsInfo.total_deposit}}可退)</small></li>
          <li>合计：<font style="color:#f15353">￥<span class="span_t">{{price}}</span></font></li>
      </ul>
      <div class="order_delete" @click="submit" v-if="">提交订单</div>
		</div>


	
	<div id="AllGood" :class="{popupMemberSpecs}">
				<div class="add-info">
					<c-title :hide="false" text='我的信息'></c-title>
					<div style="height: 30px;"></div>
					<mt-field label="真实姓名" placeholder="请输入真实姓名" v-model='member_name'></mt-field>
					<mt-field label="身份证号码" placeholder="请输入身份证号码" v-model='member_card'></mt-field>
					<div class="address_addnav1" @click="saveInfo"><span>确认修改</span></div>


					<div style="height: 80px;"></div>
					<div class="address_addnav2" @click="open"><i class="fa fa-info-circle red"></i><span style="font-size: 14px;">使用说明</span></div>

				</div>
		</div>
		<mt-popup v-model="popupSpecs" position="bottom" class="mint-popup-4" closeOnClickModal='true'>
			<div class="add-info">
				<ul>
	
					<li v-for="item in addressData" @click="selectAddress(item)">
						<div class="liia">
							<span class="name" style="">{{item.username+" "+item.mobile}}</span>
							<br />
							<p class="address" style="" v-if="item.street">{{item.province+" "+item.city+" "+item.district+" "+item.street}} {{item.address}}
							</p>
              <p class="address" style="" v-else>{{item.province+" "+item.city+" "+item.district}} {{item.address}}
							</p>
						</div>
						<!--<i class="fa fa-trash-o"></i>-->
					</li>
	
				</ul>
			</div>
			<button class="address-plus" type="button" @click="addAddress">新增地址</button>
	
		</mt-popup>
	
		<mt-popup v-model="popupCouponSpecs" position="bottom" class="mint-popup-4" closeOnClickModal='true'>
			<div class="add-info">
	
				<!--<el-checkbox-group v-model="checkCouponList">-->
	
				<div class="coupon-list-info" v-for="coupon in coupons">
	
					<div class="checkList">
						<el-checkbox :label=coupon :checked=coupon.checked @change="selectCoupon" :disabled="!coupon.valid"> &nbsp </el-checkbox>
					</div>
					<div :class="{coupon_voucher_main :coupon.valid, coupon_voucher_gray :!coupon.valid}">
						<div class="coupon_voucher_left">
	
							<div v-if="coupon.belongs_to_coupon.coupon_method==1">
								<p class="coupon_voucher_amount type_large">{{coupon.belongs_to_coupon.deduct}}</p>
								<p class="coupon_voucher_limit">满{{coupon.belongs_to_coupon.enough}}立减</p>
							</div>
							<div v-else>
								<p class="coupon_voucher_amount type_large">{{coupon.belongs_to_coupon.discount}}折</p>
								<p class="coupon_voucher_limit">满{{coupon.belongs_to_coupon.enough}}立享</p>
							</div>
	
							<!--<p class="coupon_voucher_amount type_large">20</p>
																						<p class="coupon_voucher_limit">满{{coupon.enough}}元可用</p>-->
	
						</div>
						<div class="coupon_voucher_hr"></div>
						<div class="coupon_voucher_right">
							<p class="coupon_voucher_range">{{coupon.belongs_to_coupon.name}}</p>
							<p class="coupon_voucher_period">{{coupon.time_start}}-{{coupon.time_end}}</p>
							
						</div>
	
					</div>
				</div>
	
				<!--</el-checkbox-group>-->
	
			</div>
			<button class=" sure" type="button" @click="popupCouponSpecs=fales">确认</button>
			<button class="close" type="button" @click="popupCouponSpecs=fales">取消</button>
		</mt-popup>



	 <yd-popup v-model="popAddAddress" position="right" width="100%">
		 <div style="background: #eee;">
				<mt-header fixed title="添加地址">
					<mt-button icon="back" @click="popAddressClose" slot="left"></mt-button>
				</mt-header>
				<div style="height: 60px;"></div>
		<yd-cell-group>
				<yd-cell-item>
					<span slot="left">收件人：</span>
					<yd-input slot="right" v-model="form.username" max="20" placeholder="请输入收件人"></yd-input>
				</yd-cell-item>
				<yd-cell-item>
					<span slot="left">联系电话：</span>
					<yd-input slot="right" v-model="form.mobile" placeholder="请输入联系电话" type="tel"></yd-input>
				</yd-cell-item>
    	</yd-cell-group>

		<yd-cell-group>
			<yd-cell-item>
				<span slot="left">设置默认地址：</span>
				<span slot="right"><mt-switch v-model="form.isDefault"></mt-switch></span>
			</yd-cell-item>
    	</yd-cell-group>
		
				<yd-cell-group>
					<yd-cell-item arrow>
						<span slot="left">所在地区：</span>
						<input slot="right" type="text" @click.stop="addressShow = true" v-model="addressName" readonly placeholder="请选择收货地址">
					</yd-cell-item>
					<yd-cell-item arrow v-if="strShow">
						<span slot="left">街道：</span>
						<input slot="right" type="text" @click.stop="streetChoose" v-model="form.street" readonly placeholder="请选择街道">
					</yd-cell-item>
				</yd-cell-group>

			<yd-cell-group>
				<yd-cell-item>
					<yd-textarea slot="right" placeholder="请输入详细地址" v-model="form.address"  maxlength="100"></yd-textarea>
				</yd-cell-item>
			</yd-cell-group>
			
			 
				<div class="address_addnav" @click="appendAddress">
					<i class="fa fa-plus-circle"></i>
					<span>保存</span>
				</div>
				<yd-cityselect v-model="addressShow" :callback="addressCallback" :items="district"></yd-cityselect>
		 </div>
        </yd-popup>


		<yd-popup v-model="streetShow" position="right" width="100%">
			
			<yd-navbar title="选择街道" height="40px" fontsize="14px" fixed>
				<span slot="left">
					<yd-navbar-back-icon @click.native="streetShow = false"></yd-navbar-back-icon>
				</span>
			</yd-navbar>
			<div style="clear:both;margin-top:40px;"></div>
			
			<yd-cell-item arrow v-for="item in districtVal" @click.native="streetConfirm(item.areaname)">
				<span slot="left">{{item.areaname}}</span>
			</yd-cell-item>
           
    </yd-popup>

    <!-- 租赁协议 -->
    <yd-popup v-model="agreementShow" position="right" width="100%">
			
			<yd-navbar title="租赁协议" height="40px" fontsize="14px" fixed>
				<span slot="left">
					<yd-navbar-back-icon @click.native="agreementShow = false"></yd-navbar-back-icon>
				</span>
			</yd-navbar>
			<div style="clear:both;margin-top:40px;"></div>
      <div>
          <p style="text-align:center;margin-top:10px;font-size:16px;">{{agreeCon.pact_title}}</p>
          <p v-html="agreeCon.lease_toy_pact">
            
          </p>
      </div>
			
			
           
    </yd-popup>

	</div>
</template>


<script>
  import goods_order_controller from "./goods_order_controller";
  export default goods_order_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  #goodsinfo {
  	margin-bottom: 10px;
    .onclast {
      position: relative;
      top: -290px;
    }
    .title {
      line-height: 36px;
      background-color: #f7f7f7;
      color: #f15353;
      text-align: left;
      padding: 0 14px;
      span {
        margin-left: 10px;
      }
    }
    .goods-shop {
      background: #fff;
      line-height: 36px;
      border-bottom: #e8e8e8 solid 1px;
      p {
        text-align: left;
        margin: 0;
        padding: 0 0 0 14px;
        font-size: 0.8rem;
        color: #555;
      }
    }
    .add-info {
      overflow-y: scroll;
      width: 100%;
      background: #fff;
      max-height: 50vh;
      padding-top: 10px;
    }
    .mint-popup-4 {
      width: 100%;
      .sure {
        background: #f15353;
        height: 40px;
        line-height: 40px;
        color: #fff;
        width: 50%;
        border: 0;
        float: left;
      }
      .close {
        background: #eee;
        height: 40px;
        line-height: 40px;
        color: #333;
        width: 50%;
        border: 0;
        float: left;
      }
      .address-plus {
        background: #f15353;
        height: 40px;
        line-height: 40px;
        color: #fff;
        width: 100%;
        border: 0;
      }
      ul {
        overflow-y: scroll;
      }
      li {
        padding: 10px 0;
        display: flex;
        position: relative;
        .liia {
          width: 100%;
          padding-right: 20px;
          flex: 9;
          text-align: left;
          padding-left: 20px;
          .name {
            font-size: 1.1rem;
            color: #222;
            line-height: 2rem;
          }
          .address {
            word-break: break-word;
            width: 100%;
            font-size: 0.7rem;
            color: #666;
            line-height: 1.2rem;
          }
        }
        i {
          flex: 1;
        }
      }
    }
    .addr {
      display: flex;
      justify-content: space-between;
      flex-flow: row wrap;
      align-items: center;
      background: #fff;
      padding: 10px 14px;
      .icon {
        display: flex;
        i {
          line-height: 24px;
          margin-right: 10px;
        }
      }
      i {
        font-size: 16px;
        color: #333;
      }
      .fa-angle-right {
        font-size: 24px;
        color: #c9c9c9;
      }
      p {
        flex: 6;
        text-align: justify;
        font-weight: bold;
        line-height: 1.5rem;
        padding-right: 1rem;
        color: #333333;
        font-size: 0.9rem;
        span {
          font-weight: normal;
          color: #666;
        }
      }
    }
    .detail_good {
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
        display: flex;
        padding: 16px 14px 0 14px;
        width: 100%;
        box-sizing: border-box;
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
    .nums {
      background: #fff;
      text-align: right;
      margin: 0;
      padding-right: 10px;
      line-height: 2rem;
    }
    .tbs.coupon-list {
      margin-top: 10px;
      margin-bottom: 10px;
    }
    .coupon.list {
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
    }
    .rent-time {
      margin-top: 10px;
      padding: 16px 14px;
      background-color: #fff; //display: flex;
      .text {
        font-size: 0.875rem;
        text-align: left;
        flex: 16%;
        margin-bottom: 10px;
      }
      .week {
        display: flex;
        flex-wrap: wrap;
        button {
          display: inline-block;
          width: 30.4%;
          border: solid 1px #e2e2e2;
          background-color: #fff;
          font-size: 0.75rem;
          color: #333;
          border-radius: 4px;
          height: 60px;
          margin: 5px 1.1%;
          span {
            color: #f15353;
          }
        }
        .yd-btn{
          padding:0;
        }
        .active {
          border: solid 1px red;
        }
      }
    }
    .rent-info {
      background-color: #fff;
      padding: 10px 14px;
      font-size: 0.875rem;
      border-bottom: solid 1px #e2e2e2;
      ul {
        display: flex;
        justify-content: space-between;
        li {
          line-height: 24px;
          font-size: 0.875rem;
        }
        li:first-child {
          color: #8c8c8c;
        }
      }
      .coupon {
        margin-top: 10px;
        margin-bottom: 10px;
        font-size: 0.875rem;
        line-height: 36px;
        display: flex;
        justify-content: space-between;
        i {
          font-size: 24px;
          line-height: 36px;
          color: #c9c9c9;
        }
        .right {
          font-size: 12px;
          background-color: #f15353;
          color: #fff;
          margin-left: 10px;
          padding: 2px 4px;
          border-radius: 3px;
        }
      }
      .remarks {
        margin-bottom: 6px;
        display: flex;
        justify-content: space-between;
        textarea {
          color: #8c8c8c;
          padding: 4px;
          width: 90%;
          height: 68px;
          border: solid 1px #e2e2e2;
          background-color: #f9f9f9;
          border-radius: 4px;
        }
      }
    }
    .rent-money {
      padding: 10px 0;
      font-size: 0.875rem;
      background-color: #fff;
      border-bottom: solid 1px #e2e2e2;
      .list {
        margin: 0 14px;
        ul {
          display: flex;
          justify-content: space-between;
          li {
            line-height: 24px;
          }
          li:first-child {
            color: #8c8c8c;
          }
        }
      }
      .deposit {
        margin: 10px 14px;
        ul {
          display: flex;
          justify-content: space-between;
          li {
            line-height: 30px;
          }
        }
      }
      .agreement {
        margin: 0 14px;
        text-align: left;
        a {
          color: #f15353;
        }
        .checkbox {
          z-index: 88;
          border-radius: 50%;
        }
        .el-checkbox {
          float: none;
        }
      }
    }
    .tbs {
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
      }
      .list:nth-last-child(1) {
        padding-bottom: 0;
      }
      .left {
        text-align: left;
        float: left;
        color: #858585;
        span {
          font-size: 14px;
        }
      }
      .right {
        text-align: right;
        float: right;
      }
      p {
        text-align: left;
        margin: 0;
        padding-right: 10px;
        line-height: 2rem;
        width: 100%;
        span {
          color: #858585;
          font-size: 0.6rem;
          float: right;
        }
      }
      .remarks {
        width: 100%;
        textarea {
          color: #8c8c8c;
          padding: 4px;
          width: 100%;
          margin-top: 6px;
          height: 68px;
          border: solid 1px #e2e2e2;
          background-color: #f9f9f9;
          border-radius: 4px;
        }
      }
      .agreement {
        display: flex;
        .left {
          margin-left: 10px;
          a {
            color: #f15353;
          }
        }
      }
    }
    .detail_pay {
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
    .span_t {
      color: #f15353;
      font-size: 1rem;
    }
  }
  .checkList {
    position: relative;
    top: 30px;
    left: 3px;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
  }
  .el-checkbox {
    float: left;
    margin-left: 5px;
  }
  .coupon-list-info {
    width: 99.5vw;
  }
  .coupon_voucher_main {
    position: relative;
    padding-left: 102px;
    height: 80px;
    margin-left: 36px;
    margin-right: 10px;
    margin-bottom: 10px;
    .coupon_voucher_left {
      position: absolute;
      top: 0;
      left: 0;
      width: 102px;
      height: 100%;
      color: #fff;
      border-radius: 4px 0 0 4px;
      text-align: center;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: #47c1c4;
      .coupon_voucher_amount.type_large {
        margin: 0;
        font-size: 22px;
      }
      .coupon_voucher_amount {
        position: relative;
        font-family: helvet;
        font-size: 36px;
        line-height: 1;
      }
      .coupon_voucher_amount:before {
        content: "\00A5";
        font-size: 16px;
        display: inline-block;
        vertical-align: text-top;
        margin-right: 3px;
        line-height: 1;
      }
      .coupon_voucher_limit {
        font-size: 12px;
        line-height: 1;
        margin-top: 15px;
        margin-bottom: 0;
      }
    }
    .coupon_voucher_hr {
      position: absolute;
      top: 0;
      left: 97px;
      width: 6px;
      overflow: hidden;
      height: 100%;
    }
    .coupon_voucher_hr:after {
      box-sizing: border-box;
      position: absolute;
      top: -3px;
      right: -3px;
      bottom: 0;
      content: "• • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •";
      line-height: 10px;
      width: 7px;
      color: #f8fbfb;
      font-size: 18px;
      overflow: hidden;
      z-index: 1;
    }
    .coupon_voucher_right {
      box-sizing: border-box;
      padding: 15px 15px 15px 10px;
      height: 100%;
      border-radius: 0 4px 4px 0;
      background-color: #e5f3f3;
      color: #666;
      .coupon_voucher_range {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 12px;
        text-align: left;
        margin: 0;
        padding: 0;
        vertical-align: baseline;
      }
      .coupon_voucher_period {
        color: #999;
        font-size: 12px;
        position: absolute;
        bottom: 0;
      }
    }
  }
  .coupon_voucher_gray {
    position: relative;
    padding-left: 102px;
    height: 80px;
    margin-left: 36px;
    margin-right: 10px;
    margin-bottom: 10px;
    .coupon_voucher_left {
      position: absolute;
      top: 0;
      left: 0;
      width: 102px;
      height: 100%;
      color: #fff;
      border-radius: 4px 0 0 4px;
      text-align: center;
      display: -webkit-box;
      display: -webkit-flex;
      display: flex;
      flex-direction: column;
      justify-content: center;
      background-color: #ccc;
      .coupon_voucher_amount.type_large {
        margin: 0;
        font-size: 22px;
      }
      .coupon_voucher_amount {
        position: relative;
        font-family: helvet;
        font-size: 36px;
        line-height: 1;
      }
      .coupon_voucher_amount:before {
        content: "\00A5";
        font-size: 16px;
        display: inline-block;
        vertical-align: text-top;
        margin-right: 3px;
        line-height: 1;
      }
      .coupon_voucher_limit {
        font-size: 12px;
        line-height: 1;
        margin-top: 15px;
        margin-bottom: 0;
      }
    }
    .coupon_voucher_hr {
      position: absolute;
      top: 0;
      left: 97px;
      width: 6px;
      overflow: hidden;
      height: 100%;
    }
    .coupon_voucher_hr:after {
      box-sizing: border-box;
      position: absolute;
      top: -3px;
      right: -3px;
      bottom: 0;
      content: "• • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • • •";
      line-height: 10px;
      width: 7px;
      color: #f8fbfb;
      font-size: 18px;
      overflow: hidden;
      z-index: 1;
    }
    .coupon_voucher_right {
      box-sizing: border-box;
      padding: 15px 15px 15px 10px;
      height: 100%;
      border-radius: 0 4px 4px 0;
      background-color: #eee;
      color: #666;
      .coupon_voucher_range {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: 12px;
        text-align: left;
        margin: 0;
        padding: 0;
        vertical-align: baseline;
      }
      .coupon_voucher_period {
        color: #999;
        font-size: 12px;
        position: absolute;
        bottom: 0;
      }
    }
  }
  .mint-header {
    background: none;
    color: #666;
  }
  .is-fixed .mint-header-title {
    font-weight: bold;
  }
  .mint-header.is-fixed {
    border-bottom: 1px solid #e8e8e8;
    background: #fff;
    z-index: 99;
  }
  .is-right a {
    font-size: 0.6rem;
  }
  .address_addnav {
    width: 100%;
    padding: 0 3% 0 6% !important;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #f15353 !important;
    color: #fff !important;
    text-align: center;
    height: 44px !important;
    line-height: 44px !important;
  }
  .popup-con {
    width: 100%;
  }
  #goodsinfo .popupMemberSpecs {
    top: 0;
    header {
      display: flex;
    }
    .address_addnav {
      display: block;
    }
  }
  #goodsinfo .animation {
    top: 0;
    header {
      display: flex;
    }
    .address_addnav {
      display: block;
    }
  }
  #AllGood {
    position: fixed;
    top: 200vh;
    height: 100vh;
    overflow: scroll;
    width: 100%;
    background: #eee;
    z-index: 100;
    transition: 0.6s ease-out;
    display: block;
    #appendAddress .mint-field .mint-cell-title {
      text-align: left;
    }
    .address_addnav,
    header {
      display: none;
    }
    .address_addnav span {
      color: #fff;
    }
    .address_addnav i {
      color: #fff;
      font-size: 22px;
      position: absolute;
      top: 50%;
      height: 18px;
      line-height: 18px;
      margin-left: -34px;
      margin-top: -9px;
    }
    .maleall {
      background: #fff;
      text-align: left;
    }
    #appendAddress {}
    #appendAddress .males {
      line-height: 50px;
      display: flex;
      border-top: 1px solid #d9d9d9;
      margin-left: 10px;
      padding-right: 10px;
      position: relative;
      .address {
        display: inline-block;
        position: relative;
        width: 70%;
        float: right;
        box-sizing: border-box;
        padding-top: 8px;
      }
    }
    .maleall span {
      color: #333;
      font-size: 16px;
      vertical-align: middle;
      width: 105px;
      -webkit-box-flex: 0;
      -ms-flex: none;
      flex: none;
      display: inline-block;
      line-height: 50px;
    }
    #appendAddress .maleall .males .address {
      position: absolute !important;
      right: 20px !important;
      top: 0px;
    }
    .maleall .el-select {
      width: 65%;
      float: right;
      position: relative;
    }
    #address {
      flex: 1;
      line-height: 50px;
      .mint-button--default {
        line-height: 50px;
        text-align: left;
        font-size: 16px;
      }
    }
  }
</style>

</style>