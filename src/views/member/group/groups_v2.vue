<template>
	<transition name="fade2">
		<div id="goods">
			<div v-if="!loading">
				<div id="hoid" @click="goto" :class="{hoet:hoet}" v-if="isCup">
					<div id="back">
						<i class="mintui mintui-back"></i>
					</div>
				</div>
				<div id="cart" @click="gotoCart" :class="{hoet:hoet}" v-if="isCup">
					<div id="back">
						<i class="iconfont icon-ai-home"></i>
					</div>
				</div>
				<div id="member" @click="gotoMember" :class="{hoet:hoet}" v-if="isCup">
					<div id="back">
						<!-- <i class="fa fa-user"></i> -->
						<i class="iconfont icon-wode-wode"></i>
					</div>
				</div>
				<c-myswipe style="height: 100vw;" :pagination-visible="true" :slides="goodsInfo.thumb_url" :repeating="true" :auto="0">
					<div class="imgsbox" v-for="(ithumb,index) in goodsInfo.thumb_url" :key="index">
						<template v-if='ithumb'>
							<img ref="hasimg"  :src="ithumb" width="100%" alt="图片加载中">
						</template>
						<template v-if='!ithumb || beforeimg == true' >
							<img :src="loadingimg" width="100%">
						</template>
					</div>
				</c-myswipe>
				<div class="rob-time" v-if="isBuy && isTime">
					<div class="img"><img src="../../assets/images/rob-time.png" width="16%;"></div>
					<ul class="price">
						<li class="text"><span>限时<br>秒杀</span></li>
						<!-- <li class="none-line"><small>￥</small><b>3.2</b>&nbsp;/天</li>
						<li class="middle-line"><small>￥</small><b>3.2</b>&nbsp;/天</li> -->
					</ul>
					<div class="time">
						<span class="text">截至倒计时：</span>
						<yd-countdown slot="right" :time="endTimeStr" class="bottom">
							<em style="padding:2px;border-radius:2px;">{%d1}<em>{%d2}</em></em>天
							<em style="padding:2px;border-radius:2px;">{%h1}<em>{%h2}</em></em><b>:</b>
							<em style="padding:2px;border-radius:2px;">{%m1}<em>{%m2}</em></em><b>:</b>
							<em style="padding:2px;border-radius:2px;">{%s1}<em>{%s2}</em></em>
						</yd-countdown>
					</div>
				</div>
	
				<el-row>
					<div class="info-box">
						<div class="title-box">
							<h1>{{goodsInfo.title}}</h1>
							<i class="iconfont icon-erweima" @click="postShow()"></i>
							<i class="iconfont icon-fenxiang" @click="shareWeixin()"></i>
						</div>
						<h2>
							<el-col :span="24" id='price' v-if="!isGoodsLove">
								<!--&&goodsInfo.member_discount.discount_value!=0-->
								<div v-if="goodsInfo.member_discount.level_name==level_name">
								<span style="font-size: 1.4rem;" >￥{{(goodsInfo.member_discount.discount_value!=0?goodsInfo.member_discount.discount_value:goodsInfo.price)}}</span><span class="viptext" style="" >{{(level_name=="普通会员"?'会员价':'vip会员价')}}</span><del class="delprice" style="">¥{{goodsInfo.price}}</del><div @click="upvip()" v-if="level_name=='普通会员'"   class="pricestyle" ><span style="margin-left: 10px;"><span style="display: block;font-size: 1.3rem;margin-top: -3px;">¥{{upvippice}}</span>升vip更享折扣</span></div>
							  </div>
							    	<!--<div v-else-if="goodsInfo.member_discount.level_name=='普通会员'">
								<span style="font-size: 1.4rem;">{{goodsInfo.member_discount.level_name}}￥{{(goodsInfo.member_discount.discount_value!=0?goodsInfo.member_discount.discount_value:goodsInfo.price)}}</span><span class="viptext" >会员价1</span><del class="delprice">¥{{goodsInfo.price}}</del><div class="pricestyle"><span v-if="hasmanyoption!=false" style="margin-left: 10px;"><span style="display: block;font-size: 1.3rem;margin-top: -3px;">¥{{membershareprice}}</span>升级vip会员更享折扣1</span><span v-if="hasmanyoption==false" style="margin-left: 10px;"><span style="display: block;font-size: 1.3rem;margin-top: -3px;">¥{{difprice}}</span>升vip更享折扣1！</span>
								</div>
								</div>-->
							    <div v-else>
								<span id="price-num" style="font-size: 1.4rem;">￥{{(goodsInfo.has_option==1?goodsInfo.min_price+"-"+goodsInfo.max_price:goodsInfo.price)}}</span><span class="viptext" >会员价</span><del class="delprice">¥{{goodsInfo.price}}</del>
								<div @click="upvip()" v-if="level_name=='普通会员'"   class="pricestyle" ><span style="margin-left: 10px;"><span style="display: block;font-size: 1.3rem;margin-top: -3px;">¥{{upvippice}}</span>升vip更享折扣</span></div>
								</div>
							   
							</el-col>
							<!--<el-col :span="24" id='price' v-if="!isGoodsLove">
								<div v-if="goodsInfo.member_discount.level_name==level_name&&goodsInfo.member_discount.discount_value!=0">
								<span style="font-size: 1.4rem;" >￥{{goodsInfo.member_discount.discount_value}}</span><del style="color: #CCCCCC;margin-left: 5px;">¥{{goodsInfo.price}}</del><span  style="margin-left: 10px;">vip会员价格立减{{difprice}}元</span>
							 </div>
							</el-col>-->
						</h2>
					</div>
				</el-row>
	
				<el-row>
					<!-- <el-col :span="24" id='price' v-if="!isGoodsLove">￥
						<span id="price-num">{{(goodsInfo.has_option==1?goodsInfo.min_price+"-"+goodsInfo.max_price:goodsInfo.price)}}</span>
					</el-col> -->
					<el-col :span="24" id='price' style="background: #fff;" v-if="isGoodsLove">
						<el-col :span="5" style="background: #f15353;padding: 2px 4px;color: #fff;border-radius:3px;">
							<div id="price-num" style="font-size: 0.8rem;font-weight: 600;text-align: center;">天天兑价</div>
							<div id="price-num" style="font-size: 0.8rem;font-weight: 600;text-align: center;">￥{{goodsInfo.price}}<span v-if="isRent">/天</span></div>
						</el-col>
	
						<el-col :span="19" class="sale" style="text-align:left;padding-left:10px;">
							<div id="price-num" style="font-size: 0.8rem;font-weight: 600;text-align: left;">￥{{goods_love_cash+" + "+goods_love_deduction+goods_love_name}}</div>
							<div id="price-num" style="font-size: 0.8rem;font-weight: 600;text-align: left;color:#000">
								原价:￥{{goodsInfo.price}}
								<span v-if="isRent">/天</span>
								<i class="iconfont icon-rent" style="font-size:16px;color:#FF9500" v-if="(isRent && isRight)"></i>
							</div>
						</el-col>
					</el-col>
	
					<el-col :span="24" id='stockcontainer'>
						<el-col :span="12">库存:{{goodsInfo.stock}}</el-col>
						<el-col :span="12" class="sale">{{isRent?"租赁次数":"销量"}}:{{goodsInfo.show_sales}}</el-col>
					</el-col>
	
				</el-row>
	
				<div v-if="!this.fun.isTextEmpty(goodsInfo.has_one_brand)">
					<div class="brand" @click="toBrandDetail(goodsInfo.has_one_brand.id)" v-if="isCup">
						<ul class="logo">
							<li>
								<yd-icon class="iconfont icon-pinpai" custom size="16px" color="#f15353"></yd-icon>
								<span>品牌简介</span>
							</li>
							<li class="return"><i class="fa fa-angle-right"></i></li>
						</ul>
					</div>
				</div>
	
				<div v-if="!isRent">
					<div class="member-box" v-if="!is_o2o&&isGoods&&goodsInfo.has_option!=1" @click="buyNow">
						<span id="optiondiv">{{(goodsCount>0)?"已添加"+goodsCount+goodsInfo.sku:"请选择商品数量"}}</span>
						<i class="fa fa-angle-right"></i>
					</div>
				</div>
	
				<div class="act-box">
					<div v-if="isCup">
						<ul class="coupon" @click="gotoCoupon" v-if="goodsInfo.availability==1?true:false">
							<li class="">领券</li>
							<li><span>优惠券</span></li>
							<i class="fa fa-angle-right"></i>
						</ul>
					</div>
					<!--二次注释-->
					<!--<ul class="vip" v-if="!this.fun.isTextEmpty(goodsInfo.member_discount)">
						<li><span>会员</span></li>
						<li class="grade"><span>{{goodsInfo.member_discount.level_name}}</span></li>
						<li>会员专享价<span>￥{{goodsInfo.member_discount.discount_value}}</span><span v-if="isRent">/天</span></li>
					</ul>-->
					<ul class="act" @click="activityShowFun" v-if="activitySwitch">
						<li class="act1">活动</li>
						<li class="act2"><span>{{firstActivityBtn}}</span></li>
						<li class="act3"><span>{{firstActivityCon}}</span></li>
						<i class="fa fa-angle-right"></i>
					</ul>
				</div>
	
				<mt-popup v-model="popupSpecs" position="bottom" class="mint-popup-4" closeOnClickModal='true'>
					<div class="specifications">
						<div class="shopimg" style="min-height: 100px;">
							<div id="chooser_img">
								<img :src="popThumb == null || popThumb == '' || popThumb == undefined?goodsInfo.thumb:popThumb" style="width: 100%;height: 100%;">
							</div>
							<div class="right">
								<div class="price">￥
									<span id="option_price">{{popPrice}}</span><span v-if="isRent">/天</span>
								</div>
								<div class="option">库存{{popStock}}{{goodsInfo.sku}}</div>
								<div class="option">{{goodsDescription}}</div>
							</div>
						</div>
	
						<div class="shopinfo">
							<dl v-for="specs in goodsInfo.has_many_specs" style="font-size: 0.9rem;margin-bottom: 5px;">
								<dt style="margin-bottom: 5px;padding-left: 10px;font-size: 1rem;">{{specs.title}}</dt>
								<!--<dt style="margin-bottom: 5px;padding-left: 10px;font-size: 1rem;">规格</dt>-->
								<dd>
									<el-radio-group v-model="specs.description" size='small' fill='#f15353' @change="selectSpecs">
										<el-radio-button style="margin-right: 20px;min-width: 25px;" :disabled=specitem.c v-for="specitem in specs.specitem" :label="specitem">{{specitem.title}}</el-radio-button>
									</el-radio-group>
								</dd>
							</dl>
	
						</div>
						<div v-if="!isRent" style="margin-top: 50px; margin-bottom: 30px;">
							<el-row>
								<el-col :span="12" id='num'>购买数量：</el-col>
								<el-col :span="11">
									<div class="num">
	
										<div class="leftnav" @click='reduceGoods'>-</div>
										<input type="text" disabled=false class="shownum" v-model='goodsCount'>
										<div class="rightnav" @click='addGoods'>+</div>
									</div>
								</el-col>
							</el-row>
						</div>
						<el-button size='small' id='btsmall' type='danger' @click="submitAction">确认</el-button>
					</div>
				</mt-popup>
	
				<mt-popup v-model="popupSpecs2" position="bottom" class="mint-popup-4" closeOnClickModal='true' style="">
					<div class="specifications" style="font-size: 0px;">
						<div class="shopimg">
							<div id="chooser_img">
								<img :src="popThumb" style="width:100%;height:100%;">
							</div>
							<div class="right">
								<div class="price">￥
									<span id="option_price" >{{popPrice}}</span><span v-if="isRent">/天</span>
								</div>
								<div class="option">库存{{popStock}}{{goodsInfo.sku}}</div>
								<div class="option" style="overflow: visible;">{{goodsDescription}}</div>
							</div>
						</div>
	
						<div v-if="!isRent" style="margin-top: 50px; margin-bottom: 30px;">
							<el-row>
								<el-col :span="12" id='num'>购买数量：</el-col>
								<el-col :span="11">
									<div class="num">
	
										<div class="leftnav" @click='reduceGoods'>-</div>
										<input type="text" disabled=false class="shownum" v-model='goodsCount'>
										<div class="rightnav" @click='addGoods'>+</div>
									</div>
								</el-col>
							</el-row>
						</div>
						<!--<el-button style="width: 50%;display: inline-block;margin-left: 0px;background: #ee5a32;" size='small' id='btsmall' type='danger' @click="addCart">加入购物车</el-button>
						<el-button style="width: 50%;display: inline-block;margin-left: 0px;" size='small' id='btsmall' type='danger' @click="submitAction">立即购买</el-button>-->
						<el-button size='small' id='btsmall' type='danger' @click="buyNowNew">确认</el-button>
					</div>
				</mt-popup>
	
				<mt-popup v-model="posterShow" closeOnClickModal='true' style="width:335px;height:485px;padding:0px;">
					<div style="width:100%;height:100%;">
						<!-- <img :src="posterImg" style="width:100%;height:100%;"/> -->
	
						<img v-lazy="posterImg" v-if='posterImg' />
						<img src="../../assets/images/img_default.png" v-if='!posterImg' style="width:100%;height:100%;" />
	
					</div>
				</mt-popup>
	
				<yd-popup v-model="activityShow" position="bottom" width="70%">
					<yd-navbar title="活动" height="40px" fontsize="14px" fixed>
						<span slot="right">
						<!-- <yd-navbar-back-icon @click.native="activityShow = false"></yd-navbar-back-icon> -->
						<i class="iconfont icon-guanbi" style="color:#666;size:20px;" @click="activityShow = false"></i>
					</span>
					</yd-navbar>
					<div style="clear:both;margin-top:40px;">
						<yd-cell-group>
							<yd-cell-item v-if="activityItem.ed_full==0 && activityItem.ed_reduction==0?false:true">
								<div slot="left" style="height:27px;border-radius:3px;line-height:27px;border:1px solid #E85151;color:#E85151;padding:0px 5px;">满减</div>
								<span slot="right">本商品满<span style="color:#df1e13;">￥{{activityItem.ed_full}}</span>立减<span style="color:#df1e13;">￥{{activityItem.ed_reduction}}</span></span>
							</yd-cell-item>
							<yd-cell-item v-if="activityItem.ed_money==0 && activityItem.ed_num==0?false:true">
								<div slot="left" style="height:27px;border-radius:3px;line-height:27px;border:1px solid #E85151;color:#E85151;padding:0px 5px;">包邮</div>
								<span slot="right"><span v-if="activityItem.ed_money==0?false:true"><span>本商品满<span style="color:#df1e13;">￥{{activityItem.ed_money}}</span>包邮</span>
								</br>
								</span><span v-if="activityItem.ed_num==0?false:true">本商品满<span style="color:#df1e13;">{{activityItem.ed_num}}件</span>包邮</span>
								</span>
							</yd-cell-item>
							<yd-cell-item v-if="activityItem.point==0 && activityItem.max_point_deduct==0?false:true">
								<div slot="left" style="height:27px;border-radius:3px;line-height:27px;border:1px solid #E85151;color:#E85151;padding:0px 5px;">{{activityItem.point_name}}</div>
								<span slot="right"><span>最高抵扣<span style="color:#df1e13;">{{activityItem.max_point_deduct}}</span>{{activityItem.point_name}}</span><br><span> 购买赠送<span style="color:#df1e13;">{{activityItem.point}}</span>{{activityItem.point_name}}</span>
								</span>
							</yd-cell-item>
							<yd-cell-item v-if="activityItem.award_proportion==0 && activityItem.deduction_proportion==0?false:true">
								<div slot="left" style="height:27px;border-radius:3px;line-height:27px;border:1px solid #E85151;color:#E85151;padding:0px 5px;">{{activityItem.love_name}}</div>
								<span slot="right"><span>最高抵扣<span style="color:#df1e13;">{{activityItem.deduction_proportion}}</span>{{activityItem.love_name}}</span><br><span> 购买赠送<span style="color:#df1e13;">{{activityItem.award_proportion}}</span>{{activityItem.love_name}}</span>
								</span>
							</yd-cell-item>
							<yd-cell-item v-if="activityItem.coupon==0?false:true">
								<div slot="left" style="height:27px;border-radius:3px;line-height:27px;border:1px solid #E85151;color:#E85151;padding:0px 5px;">购买返券</div>
								<span slot="right">商品订单完成赠送优惠券</span>
							</yd-cell-item>
	
							<yd-cell-item v-if="activityItem.award_balance==0?false:true">
								<div slot="left" style="height:27px;border-radius:3px;line-height:27px;border:1px solid #E85151;color:#E85151;padding:0px 5px;">余额</div>
								<span slot="right">购买赠送<span style="color:#df1e13;">{{activityItem.award_balance}}</span>余额</span>
							</yd-cell-item>
	
						</yd-cell-group>
	
					</div>
	
				</yd-popup>
				<div v-if="isCup">
					<div v-if="isRent">
						<div class="but" v-if="isRentBuyShow" @click="toRentBuy(goodsInfo.lease_toy.immed_goods_id)"><button>立即</br>购买</button></div>
					</div>
				</div>
	
				<div id="foot">
					<div class="addfav" :class="{'nocar':!isGoods}" type="info" v-if="!is_o2o">
						<template v-if="!favorite">
							<i class="fa fa-star normal" @click="onFavorite(favorite)"></i> 收藏
							</i>
						</template>
						<template v-if="favorite">
							<i class="fa fa-star active" @click="onFavorite(favorite)"></i> 收藏
							</i>
						</template>
					</div>
					<div v-if="isCup" style="height: 49px;">
						<div class="addfav" type="info" v-if="!is_o2o">
							<div class="cart-num">{{cartN_l}}</div>
							<template>
								<i class="fa fa-cart-plus active" @click="gotoCart1()"></i> 购物车
								</i>
							</template>
						</div>
					</div>
					<div class="" style="padding-top:5px;padding-top: 5px;position: fixed;bottom: 60px;right: 20px;" v-if="!is_o2o&&cservice">
						<a :href="cservice" v-if="isCup">
							<img src="../../components/temp/img/kehu1.png" style="width: 60px;height: 60px;" />
						</a>
					</div>
					<!--<div :class="{'cart':true,'cell':true,'nocar':!isGoods||!isAddCart}" @click="addCart" v-if="isCup">加入购物车</div>-->
					<div style="padding: 10px 0;line-height: 16px;" :class="{'cart':true,'cell':true,'nocar':!isGoods||!isAddCart}" @click="buyNow" v-if="isCup">
						<div>单独购买</div>
						<div>￥200.99</div>
					</div>
					<!--<div v-if="!isRent" class="buy cell">
						<div :class="{'nocar':!isGoods}" v-if="!is_o2o" @click="buyNow">立即购买</div>
					</div>-->
	
					<div v-if="!isRent" class="buy cell" style="padding: 10px 0;line-height: 16px;">
						<div class="nocar" v-if="!is_o2o" @click="buyNow">
							<div>2人团</div>
							<div>￥100.77</div>
						</div>
					</div>
	
					<!--<div v-if="isRent && !isCup" class="buy cell">
						<div :class="{'nocar':!isGoods}" v-if="!is_o2o" @click="buyNow">立即租</div>
					</div>-->

				</div>
	
				<!-- <div style="height: 10px;"></div> -->
				<div id="shopInfo" ref='goodinfo' :class="{goodTop:goodTop==true,bottomMargin:isMarginBottom}">
					<div id="tabs">
						<el-tabs v-model="activeName" @tab-click="handleClick">
							<el-tab-pane label="商品介绍" name="first">
								<div id="goods_content" v-html='first_content'></div>
							</el-tab-pane>
							<el-tab-pane label="商品参数" name="second">
								<div class="parameter" v-for="item in second_content">
									<div class="par-info">
										<span class="name">{{item.title}}</span>
										<span class="value">{{item.value}}</span>
									</div>
								</div>
							</el-tab-pane>
							<el-tab-pane label="用户评价" name="third">
							<div>
								<div class="pj" v-for="n in third_content">
									<div layout="row" layout-align="start center" id="user">
										<div>
											<img :src="n.head_img_url" />
										</div>
										<div>{{n.nick_name}}</div>
										<div>{{n.created_at}}</div>
									</div>
									<el-rate v-model="n.level" disabled show-text text-color="#ff9900" text-template="{value}">
									</el-rate>
									<p>{{n.content}}</p>

									<div v-if="n.append">
										<p class="last_day">追评
											<span>{{n.append.created_at}}</span>
										</p>
										<p class="">{{n.append.content}}</p>
									</div>

									<div class="comment" v-if="isCup">
										<span @click='toContentInfo(n)'>评论数:{{n.reply_count}}</span>
									</div>
								</div>
							</div>

						</el-tab-pane>

						</el-tabs>
					</div>
	
				</div>
	
				<!-- <div :class="{bottomMargin:isMarginBottom}"></div> -->
				<div v-if="isCup">
					<div style="background:#fff;margin-bottom:49px;" v-if="this.fun.isTextEmpty(goodsInfo.show_push)?false:true">
						<div class="box06">
							<div class="like">猜你喜欢</div>
							<div style="width:100%;height:1px;background-color:rgba(178, 178, 178, 0.5);"></div>
						</div>
						<!-- <div class="like-box">
							<div style="float:left;text-align:center;width:20%;margin-left:2.5%;margin-right:2.5%;margin-top:10px;" v-for="item in goodsInfo.show_push" @click="pushGoodGoto(item)">
								<div style="width:100%;height:68px;">
									<img :src="item.thumb" style="width:100%;height:100%;">
								</div>
								<div style="width:100%;"><span style="margin-top:6px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%;height:20px;display:block;">{{item.title}}</span></div>
								<span style="color:#f15353;margin-top:6px;">￥{{item.price}}</span>
								
							</div>
						</div> -->
						<div class="like-box" v-for="item in goodsInfo.show_push" @click="pushGoodGoto(item)">
							<div style="margin-left:2.5%;margin-right:2.5%;margin-top:10px;display:flex;">
								<div style="height:68px;flex:1.1">
									<img :src="item.thumb" style="width:100%;height:100%;">
								</div>
								<div style="flex:5;margin-left:5px;width:80%;">
									<div style="width:100%;float:left"><span style="margin-top:6px;width:100%;display:block;word-wrap:break-word;overflow:hidden;">{{item.title}}</span></div>
									<div style="color:#f15353;margin-top:27px;float:right;">￥{{item.price}}</div>
								</div>
	
							</div>
						</div>
	
					</div>
				</div>
	
				<div style="height: 10px;" v-if="this.fun.isTextEmpty(goodsInfo.show_push)?false:true"></div>
	
				<div style="height: 50px;" v-if="this.fun.isTextEmpty(goodsInfo.show_push)"></div>
			</div>

		</div>
	</transition>
</template>

<script>
	import goods from './goods_controller';
	export default goods;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../../assets/css/goods.scss';
	.imgsbox{
		img {
		  	position: relative;
		}
		img:after { 
		  	content: url('../../assets/images/goodsimg_loading.png');
		 	display: block;
		 	position: absolute;
		 	// 底下幾行是故意要滿版並且背景填滿擋住底下那個很醜的加載失敗圖片(包子)
	 		z-index: 2;
		 	top: 0;
		 	left: 0;
		  	width: 100%;
		  	height: 100%;
		  	background-color: #fff;
		}
	}
	.cart-num {
		right: 5%;
		background-color: #E5282C;
		border-radius: 50%;
		color: #fff;
		line-height: 15px;
		font-size: 12px;
		padding: 0 4px;
		z-index: 2;
	}
	
	.viptext {
		display: inline-block;
		padding: 3px 5px;
		background: #E9E9E9;
		margin-left: 6px;
		font-size: .6rem;
		margin-top: -5px;
		color: #A6A6A6;
	}
	
	.pricestyle {
		background: #FFA07A;
		color: #FFFFFF;
		display: inline-block;
		float: right;
		padding: 0px 30px 5px 30px;
		margin-right: -12px;
		border-top-left-radius: 30px;
		border-bottom-left-radius: 30px;
		font-size: .7rem;
		margin-top: -52px;
	}
	
	.delprice {
		color: #CCCCCC;
		margin-left: 5px;
		margin-top: 8px;
		display: block;
	}
</style>
