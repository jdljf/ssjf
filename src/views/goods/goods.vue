<template>
	<transition name="fade2">
		<div id="goods">
			<div v-if="!loading">
				<div id="hoid" @click="goto" :class="{hoet:hoet}">
					<div id="back">
						<i class="mintui mintui-back"></i>
					</div>
				</div>
				<div id="cart" @click="gotoCart" :class="{hoet:hoet}" v-if="is_o2o">
					<div id="back">
						<i class="iconfont icon-ai-home"></i>
					</div>
				</div>
				<!-- <div id="cart" @click="gotoCart" :class="{hoet:hoet}" v-if="!is_o2o">
					<div id="back">
						<i class="iconfont icon-ai-home"></i>
					</div>
				</div> -->
				<div id="member" @click="gotoMember" :class="{hoet:hoet}" >
					<div id="back">
						<i class="iconfont icon-wode-wode"></i>
					</div>
				</div>
				<c-myswipe style="height: 100vw;" :pagination-visible="true" :slides="goodsInfo.thumb_url" :repeating="true" :auto="0">
					<div v-for="(ithumb,index) in goodsInfo.thumb_url" :key="index">
						<template v-if='ithumb'>
							<img  ref="hasimg"  :src="ithumb ? ithumb : loadingimg " width="100%">
						</template>
						<template v-if='!ithumb'>
							<img :src="loadingimg" width="100%">
						</template>
					</div>
				</c-myswipe>
	
				<el-row>
					<el-col :span="21" id='tilie'>{{goodsInfo.title}}</el-col>
					<el-col :span="3">
						<div id='share' @click="shareWeixin()">
							<i class="fa fa-share-alt" aria-hidden="true"></i>
							<br/>
							<span>分享</span>
						</div>
					</el-col>
				</el-row>
	
				<el-row>
					<el-col :span="24" id='price' v-if="!isGoodsLove">￥
						<span id="price-num">{{(goodsInfo.has_option==1?goodsInfo.min_price+"-"+goodsInfo.max_price:goodsInfo.price)}}</span>
					</el-col>
	
					<el-col :span="24" id='price' style="background: #f2efef;" v-if="isGoodsLove">
						<el-col :span="5" style="    background: #ffe000;padding: 8px;color: #000;">
							<div id="price-num" style="font-size: 0.8rem;font-weight: 600;text-align: center;">天天兑价</div>
							<div id="price-num" style="font-size: 0.8rem;font-weight: 600;text-align: center;">￥{{goodsInfo.price}}</div>
						</el-col>
	
						<el-col :span="19" class="sale" style="text-align:left;padding-left:10px;">
							<div id="price-num" style="font-size: 0.8rem;font-weight: 600;text-align: left;    margin-bottom: 5px;margin-top: 5px;">￥{{goods_love_cash+" + "+goods_love_deduction+goods_love_name}}</div>
							<div id="price-num" style="font-size: 0.8rem;font-weight: 600;text-align: left;color:#000">原价:￥{{goodsInfo.price}}</div>
						</el-col>
					</el-col>
					<el-col :span="24" id='stockcontainer'>
						<el-col :span="12">库存:{{goodsInfo.stock}}</el-col>
						<el-col :span="12" class="sale">销量:{{goodsInfo.show_sales}}</el-col>
					</el-col>
	
					<el-col v-if="is_o2o"><div id="select">
						<div id="left"  @click='updateCart(goodsInfo.id,-1)' v-if="o2oCount>0">-</div>
						<span style="width:20px;font-size:20px;" >{{o2oCount}}</span>
						<div id="right"  @click='addCart1(goodsInfo)'>+</div>
					</div></el-col>
	
				</el-row>
	
				<mt-button class="good_speci" v-if="!is_o2o&&isGoods&&goodsInfo.has_option!=1" @click="buyNow">
					<span id="optiondiv">{{(goodsCount>0)?"已添加"+goodsCount+goodsInfo.sku:"请选择商品数量"}}</span>
					<i class="fa fa-angle-right" style="margin-right:0px;float:right; line-height:44px; font-size:26px; color: #666;"></i>
				</mt-button>
	
				<mt-popup v-model="popupSpecs" position="bottom" class="mint-popup-4" closeOnClickModal='true'>
					<div class="specifications">
						<div class="shopimg">
							<div id="chooser_img">
								<img :src="popThumb" style="width: 100%;height: 100%;">
							</div>
							<div class="right">
								<div class="price">￥
									<span id="option_price">{{popPrice}}</span>
								</div>
								<div class="option">库存{{popStock}}{{goodsInfo.sku}}</div>
								<div class="option">{{goodsDescription}}</div>
							</div>
						</div>
	
						<div class="shopinfo">
							<dl v-for="specs in goodsInfo.has_many_specs" style="font-size: 0.9rem;margin-bottom: 5px;">
								<!--<dt style="margin-bottom: 5px;padding-left: 10px;">{{specs.title}}</dt>-->
								<dt style="margin-bottom: 5px;padding-left: 10px;font-size: 1rem;">规格</dt>
								<dd>
									<el-radio-group v-model="specs.description" size='small' fill='#f15353' @change="selectSpecs">
										<el-radio-button style="margin-right: 20px;min-width: 25px;" :disabled=specitem.c v-for="specitem in specs.specitem" :label="specitem">{{specitem.title}}</el-radio-button>
									</el-radio-group>
								</dd>
							</dl>
	
						</div>
	
						<el-row style="margin-top: 50px; margin-bottom: 30px;">
							<el-col :span="12" id='num'>购买数量：</el-col>
							<el-col :span="11">
								<div class="num">
	
									<div class="leftnav" @click='reduceGoods'>-</div>
									<input type="text" disabled=false class="shownum" v-model='goodsCount'>
									<div class="rightnav" @click='addGoods'>+</div>
								</div>
							</el-col>
						</el-row>
						<el-button size='small' id='btsmall' type='danger' @click="submitAction">确认</el-button>
					</div>
				</mt-popup>
	
				<mt-popup v-model="popupSpecs2" position="bottom" class="mint-popup-4" closeOnClickModal='true'>
					<div class="specifications">
						<div class="shopimg" style="width: 100%;height: 100%;">
							<div id="chooser_img" style="width: 100%;height: 100%;">
								<img :src="popThumb" style="width: 100%;height: 100%;">
							</div>
							<div class="right">
								<div class="price">￥
									<span id="option_price">{{popPrice}}</span>
								</div>
								<div class="option">库存{{popStock}}{{goodsInfo.sku}}</div>
								<div class="option">{{goodsDescription}}</div>
							</div>
						</div>
	
						<el-row style="margin-top: 50px; margin-bottom: 30px;">
							<el-col :span="12" id='num'>购买数量：</el-col>
							<el-col :span="11">
								<div class="num">
	
									<div class="leftnav" @click='reduceGoods'>-</div>
									<input type="text" disabled=false class="shownum" v-model='goodsCount'>
									<div class="rightnav" @click='addGoods'>+</div>
								</div>
							</el-col>
	
						</el-row>
						<el-button size='small' id='btsmall' type='danger' @click="buyNowNew">确认</el-button>
					</div>
				</mt-popup>
	
				<div id="foot" v-if="!is_o2o">
					<div class="addfav" :class="{'nocar':!isGoods}" type="info"  v-if="!is_o2o">
			
						<template v-if="!favorite">
							<i class="fa fa-star normal" @click="onFavorite(favorite)"></i>
							收藏</i>
						</template>
						<template v-if="favorite">
							<i class="fa fa-star active" @click="onFavorite(favorite)"></i>
							收藏</i>
						</template>
					</div>
					<div class="addfav" type="info" v-if="!is_o2o" style="height: 49px;">
						<div class="cart-num">{{cartnum}}</div>
						<template>
							<i class="fa fa-cart-plus active" @click="gotoCart1()"></i>
							购物车</i>
						</template>
					</div>
					<div class="cservice" v-if="!is_o2o&&cservice">
						<a :href="cservice">
							<i class="iconfont icon-kefu"></i>客服</a>
					</div>
					<div :class="{'cart':true,'cell':true,'nocar':!isGoods||!isAddCart}" @click="addCart">加入购物车</div>
					<div class="buy cell" :class="{'nocar':!isGoods}" v-if="!is_o2o" @click="buyNow">立即购买</div>
					
				</div>
				<!-- //门店购物车 -->
				<!-- <div id="foot1" v-if="is_o2o">
					
					<div style="background: url(//static-o2o.360buyimg.com/daojia/new/images/minicart/cart.png) 10px 5px no-repeat;width:80px;top: -13px;height: 58px;background-position: 10px -70px;background-size: 50px 125px;margin-bottom:15px;"@click="goShowCart">
						<i style=" position: absolute;top: 5px;left: 55px;padding: 0 5px;height: 15px;line-height: 15px;overflow: hidden;text-align: center;color: #fff;background-color: #ff5d5c;border-radius: 7px;font-size: 10px">{{goodsCount}}</i>
					</div>
					
					
	
					<div id="balance" style="position: absolute;z-index: 40;right: 0;width: 115px;text-align: center;color: #fff;line-height: 48px;background-color: #47b34f"  @click="o2oGotoOrder">
						去结算
					</div>
	
			
	
				</div> -->
	
	
	
				
				
			<div id="store-position">
				<div class="store-box" v-if="is_o2o" @click="gotoList">
					<div class="store-name"><i class="iconfont icon-dianpu"></i><span>门店名称</span></div>
					<div style="color:#8c8c8c">{{o2oName}}</div>
				</div>
	
				<div class="contact-box" v-if="is_o2o">
					<div class="contact"><a :href="o2oPhone"><i class="iconfont icon-dianhua1"></i><span>联系商家</span></a></div>
					<div class="position" @click="goToAdress"><i class="iconfont icon-dingwei"></i></div>
				</div>
			</div>
	
				<div style="height: 10px;clear:both;" v-if="is_o2o"></div>
				<div id="shopInfo" ref='goodinfo' :class="{goodTop:goodTop==true}">
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
								<div style="margin-bottom: 50px;">
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
	
										<div class="comment">
											<span @click='toContentInfo(n)'>评论数:{{n.reply_count}}</span>
										</div>
									</div>
								</div>
	
							</el-tab-pane>
						</el-tabs>
					</div>
					<div style="height: 60px"></div>
				</div>
	
				<!-- <mt-popup v-model="o2oCartShow" position="bottom">
					<div style="background: url(//static-o2o.360buyimg.com/daojia/new/images/minicart/cart.png) 10px 5px no-repeat;width:80px;top: -13px;height: 58px;background-position: 10px -70px;background-size: 50px 125px;">
						<i style=" position: absolute;top: 5px;left: 55px;padding: 0 5px;height: 15px;line-height: 15px;overflow: hidden;text-align: center;color: #fff;background-color: #ff5d5c;border-radius: 7px;font-size: 10px">{{goodsCount}}</i>
					</div>
	
					
	
					<div id="select">
						<div id="left"  @click='o2oReduceGoods'>-</div>
						<span style="width:20px;font-size:20px;">{{goodsCount}}</span>
						<div id="right"  @click='o2oAddGoods'>+</div>
					</div>
	
					<div id="balance">
						<yd-button type="primary" size="small" @click.native="o2oGotoOrder">去结算</yd-button>
					</div>
					<br>
				</mt-popup> -->
	
				
				<div class="a2q" v-if="is_o2o">
	                <div class="a2w "><div></div></div>
	                <div class="a33">
	                    <p class="a34" hidegatherlist=""></p>
	                    <ul class="a35"></ul>
	                </div>
	                <div class="a2z"></div>
	                <a href="javascript:void 0;" @click="goShowCart" v-show="!showCart" class="a2r outcartcontent show " :class="{'light':carts.length>0}">
	                    <i class="a2s" v-show="carts.length>0">{{cartsNum}}</i>
	                </a>
	                <div class="a2t" :style="leftPrice">
	                    <div v-show="carts.length>0" class="">￥{{cartsTotal}}</div>
	                    <div v-show="carts.length == 0" class="a2u">购物车是空的</div>
	                </div>
	                <a class="a2v" :class="{'disabled':goodsCarts.length==0}" qujiesuan=""  @click="goodsOrder(goodsCarts)">去结算</a>
	                <div class="minicart-content" :style="minicartStyle">
	                    <a href="javascript:void 0;"  @click="goShowCart" class="a2r incartcontent light" :class="showLogo">
	                        <i class="a2s">{{cartsNum}}</i>
	                    </a>
	                    <i class="a37"></i>
	                    <div class="a38 ">
	                        <span class="a4b a4c checked" checkallgoods="" @click="lg">全选</span>
	                        <p class="a4e">(已选{{cartsNum}}件)</p>
	                        <!-- <a href="javascript:void 0;" class="a39" >清空购物车</a> -->
	                    </div>
	                    <div class="a3b" >
	                        <div class="a3m single">
	                            <div class="a3r single" expandgift="single"><span></span>
	                                <div style="display:none"></div>
	                            </div>
	                            <ul class="minicart-goods-list single">
	                                <li class="a3o single" v-for="item in carts">
	                                    <span class="a4b a3p checked" checkgoods="" @click="checkCart(item.id)"></span>
	                                    <a class="a3s">
	                                        <table class="a3t">
	                                            <tbody>
	                                            <tr>
	                                                <td style=" width:62px; " @click="goToGoodsO2O(item)">
	                                                    <img class="a3u" :src="item.goods.thumb">
	                                                </td>
	                                                <td>
	                                                    <div class="a3x"  @click="goToGoodsO2O(item)">{{item.goods.title}}</div>
	                                                    <div class="a46" @click="goToGoodsO2O(item)">
	                                                        <div class="a3q"  >￥{{item.goods.price}}</div>
	                                                    </div>
	                                                </td>
	                                            </tr>
	                                            </tbody>
	                                        </table>
	                                    </a>
	                                    <a style="" @click="updateCart(item.goods_id, -1)" class="a3v" style="right: 61px;background-position: center -68px;"></a>
	                                    <em style="" class="a3y">{{item.total}}</em>
	                                    <a @click="updateCart(item.goods_id, 1)" class="a3w"></a>
	                                </li>
	                            </ul>
	                            <div class="a3n single" style=""></div>
	                        </div>
	                    </div>
	                    <!-- <div style="height:49px;" discountpromptmsgheight=""></div>
	                    <div style="display:none" class="a4f" discountpromptmsg=""></div> -->
	                </div>
	                <!-- <div giftcontent="">  </div> -->
	                <div class="a30" @click="goShowCart" style="display: block;" v-if="showCart"></div>
	                <div class="a30" v-if="!showCart"></div>
	            </div>
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

	
</style>
