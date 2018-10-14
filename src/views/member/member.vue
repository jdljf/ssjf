<!--我的页面-->
<template>
	<div id="all" style="height:100vh;overflow: scroll;-webkit-overflow-scrolling: touch">
		<mt-loadmore  :top-method="loadTop" :top-status.sync="topStatus" @top-status-change="handleTopChange" ref="loadmore">
			<div id="member" style="position:relative;">
				<c-title :hide="true" text='home'></c-title>
				<div class="header">
					<div class="icon" v-if="member_item">
						<router-link :to="fun.getUrl('info',{item:member_item})">
							<i class="iconfont icon-shezhi"></i>
						</router-link>
					</div>
					<div class="header-info" style="margin-top: -7px;">
						<div class="left">
							<img v-lazy="avatar">
						</div>
						<div class="user-info">
							<div class="user-name">{{nickname}}</div>
							<div class="user-name" style="display:none ;">[{{$store.state.langService.language.langMember.langMemberId}}:{{uid}}]</div>
							<!--<div  class="user-other" v-if="MyReferrer.is_show=='1'">[推荐人:{{MyReferrer.nickname}}]
							</div>-->

							<div class="user-other" v-if="level_name" style="padding-top: 5px;">[{{level_name}}] {{validity_value}}	
							</div>
                          <div class="user-other" v-if="showteam" style="padding-top: 5px;">[{{team_names}}]
							</div>
							<div class="user-name" v-if="is_custom">{{custom_title}}:{{custom_value}}
							</div>
						</div>
						<div class="member-box" @click="gotoMemberGrade" style="z-index:39;" v-if="isMemberGrade">
							<div class="img"><img src="../../assets/images/member-vip02.png"></div>
							<div class="font">会员<i class="fa fa-angle-right"></i></div>
						</div>
					</div>
					<!-- <div class="user">
						<div class="vip">
							<i class="iconfont icon-shoucang1"></i>
						</div>
						<div class="user-head">
							<img v-lazy="avatar">
						</div>
						<div class="user-info">
							<div class="user-name">{{nickname}}</div>
							<div class="user-name">[{{$store.state.langService.language.langMember.langMemberId}}:{{uid}}]</div>
							<div class="user-other" v-if="MyReferrer.is_show=='1'">[推荐人:{{MyReferrer.nickname}}]
							</div>

							<div class="user-other" v-if="level_name">[{{level_name}}] {{validity_value}}
							</div>
							<div class="user-name" v-if="is_custom">{{custom_title}}:{{custom_value}}
							</div>
						</div>
						<div class="set" v-if="member_item">
							<router-link :to="fun.getUrl('info',{item:member_item})">
								<i class="fa fa-gear"></i>
							</router-link>
						</div>
						
					</div> -->
				</div>
				<div id="userinfo">
					<ul style="padding:1rem 0rem 1rem 0rem;">
						<li style="text-align: left;width: 50%;padding: 0px 15px;">
							<router-link :to="fun.getUrl('balance')" style="text-align: left;">

								{{credit.text}}
								<span style="padding-left:10px">￥{{credit.data}}</span>
							</router-link>
						</li>
						<li style="text-align: left;width: 50%;padding: 0px 15px;">
							<router-link :to="fun.getUrl('integral_v2')" style="text-align: left;display: inline;">
								{{integral.text}}
								<span style="padding-left:10px;color:#F1A547;">{{integral.data}}</span>
							</router-link>
						</li>
						<!--<li style="display: none;">
							<router-link :to="fun.getUrl('income')">
								<span style="color:#F7AD2C;">￥{{coupon}}</span>
								<br>提现</router-link>
						</li>-->
					</ul>
				</div>
				<div id="orderlist">
					<div class="ordertltie">
						<!--to="/member/orderList/0"-->
						<router-link :to="fun.getUrl('orderlist',{ status:'0' })">
							<div class="ordername">我的订单</div>
							<div class="">
								<i class="fa fa-angle-right"></i>
							</div>
						</router-link>
					</div>
					<div class="order_all">
						<router-link :to="fun.getUrl('orderlist',{ status:'1'})">
							<div class="order_pub">
								<div class="badge">{{waitPay==0?'':waitPay}}</div>
								<i class="fa money"></i>
								<br>待付款
							</div>
						</router-link>
						<router-link :to="fun.getUrl('orderlist',{ status:'2' })">

							<div class="order_pub">
								<div class="badge ">{{waitSend==0?'':waitSend}}</div>
								<i class="fa box"></i>
								<br>待发货
							</div>
						</router-link>
						<router-link :to="fun.getUrl('orderlist',{ status:'3'})">

							<div class="order_pub">
								<div class="badge ">{{waitReceive==0?'':waitReceive}}</div>
								<i class="fa car"></i>
								<br>待收货
							</div>

						</router-link>
						<!--aftersaleslist-->
						<router-link :to="fun.getUrl('aftersaleslist')">
							<div class="order_pub">
								<div class="badge">{{waitrRefund==0?'':waitrRefund}}</div>
								<i class="fa refun"></i>
								<br>待退款
							</div>
						</router-link>
						<router-link :to="fun.getUrl('grouplist',{},{status:'0' })">
							<div class="order_pub">
								<div class="badge">{{waitrRefund==0?'':waitrRefund}}</div>
								<i class="fa teamicon"></i>
								<br>团购
							</div>
						</router-link>
					</div>

				</div>

				<div id="tool">
					<div class="title">
						<div class="spare"></div>
						<h3>基础工具</h3>
					</div>

					<ul class="tool-box">
						<li>
							<router-link :to="fun.getUrl('collection',{selected:'1'})">
								<div class="img">
									<img src="../../assets/images/tool-collection.png">
								</div>
							</router-link>
							<div>收藏</div>
						</li>
			
						<li>
							<router-link :to="fun.getUrl('myEvaluation',{selected:'1'})">
								<img src="../../assets/images/tool-comment.png">
							</router-link>
							<div>评论</div>
						</li>
						<li style="display: none;">
							<router-link :to="fun.getUrl('myRelationship',{selected:'1'})">
								<img src="../../assets/images/tool-relation.png">
							</router-link>
							<div>关系</div>
						</li>
						<li>
							<router-link :to="fun.getUrl('address',{selected:'1'})">
								<img src="../../assets/images/tool-address.png">
							</router-link>
							<div>地址管理</div>
						</li>
						<li>
							<router-link :to="fun.getUrl('coupon',{selected:'1'})">
								<img src="../../assets/images/tool-coupon.png">
							</router-link>
							<div>优惠券</div>
						</li>
						
						
					</ul>
				</div>
				<div style="padding-top: 10px;background: #F5F5F5;"></div>
				<div id="tool">
					<div class="title" >
						<div class="spare"></div>
						<h3>会员权益</h3>
					</div>

					<ul class="tool-box"  >
						<li @click="viphref()"  v-if="level_name == 'VIP会员'||level_name =='普通会员'">							
								<div class="img">
									<img class="addimg" src="../../assets/images/icon_vip.png">
								</div>
							<div>vip年卡</div>
						</li>
						<li @click="openQrCode('block')" v-if="relation_switch">

							<img class="addimg" src="../../assets/images/erwei.png">
							<div>邀请二维码</div>
						</li>	
						<li>
							<router-link :to="fun.getUrl('integrals')">
								<div class="img">
									<img class="addimg" src="../../assets/images/inter.png">
								</div>
							</router-link>
							<div>积分商城</div>
						</li>
		
							<li>
							<router-link :to="fun.getUrl('group')">
								<img class="addimg" src="../../assets/images/teamshop.png">
							</router-link>
							<div>团购商城</div>
						</li>
						<li>
							<router-link :to="old == 0 ? fun.getUrl('old',{selected:'1',name:uid}) : fun.getUrl('subordinate',{selected:'1'})">
								<div class="img">
									<img  src="../../assets/images/tool-news.png">
								</div>
							</router-link>
							<div>老会员激活</div>
						</li>
					</ul>
				</div>
				<!--再添加-->
				<div v-if="level_name == '股东'">
				<div style="padding-top: 10px;background: #F5F5F5;"></div>
				<div id="tool" >
					<div class="title">
						<div class="spare"></div>
						<h3>合伙人权益</h3>
					</div>

					<ul class="tool-box">
						<li>

							<router-link :to="fun.getUrl('personvip',{},{member_id:uid})">
								<div class="img">
									<img class="addimg" src="../../assets/images/team.png">
								</div>
							</router-link>
							<div>团队管理</div>
						</li>
			
						<li>
							<router-link :to="fun.getUrl('Sharecommission',{selected:'1',name:uid})">
								<img class="addimg" src="../../assets/images/money 2.png">
							</router-link>
							<div>收益</div>
						</li>
						<li >
							<router-link :to="fun.getUrl('projectrun')">
								<img src="../../assets/images/tool-relation.png">
							</router-link>
							<div>产品分润列表</div>
						</li>
						<li @click="openQrCode('block')" v-if="relation_switch">
							
								<img  src="../../assets/images/tool-code.png">
							
							<div>推广二维码</div>
						</li>
						<li>
							<router-link :to="fun.getUrl('sharerankingIndex')">
								<img class="addimg" src="../../assets/images/tirge.png">
							</router-link>
							<div>龙虎榜</div>
						</li>
						
						<li @click="partner">

							<img class="addimg" src="../../assets/images/we1.png">
							<div>合伙人引导</div>
						</li>
						<li >
							<router-link :to="fun.getUrl('storeApply')">
								<img class="addimg" src="../../assets/images/mendian.png">
								<div>申请门店道场</div>
							</router-link>
						</li>
						<li >
							<!--:to="fun.getUrl(isTeamDividendShow?'':'teamAgentCenter',{})"-->
							<router-link :to="fun.getUrl('supplier')" v-if="supplier" >
								<img class="addimg" src="../../assets/images/gongying.png">
							</router-link>
							<div>{{supplier.value}}</div>
						</li>
						
						
					</ul>
				</div>
				</div>
				<div v-if="has_one_team_dividend!=null">
				<div style="padding-top: 10px;background: #F5F5F5;"></div>
				<div id="tool" >
					<div class="title">
						<div class="spare"></div>
						<h3>组织权益</h3>
					</div>

					<ul class="tool-box">
						<li>
							<router-link :to="fun.getUrl(isTeamDividendShow?'':'teamAgentCenter',{})">
								<div class="img">
									<img class="addimg" src="../../assets/images/zuzhi.png">
								</div>
							</router-link>
							<div>组织权益</div>
						</li>
						<li>
							<router-link :to="fun.getUrl('newrankingIndex')">
								<img class="addimg" src="../../assets/images/list.png">
							</router-link>
							<div>龙虎榜</div>
						</li>	
						
					</ul>
				</div>
				</div>
				<div style="padding-top: 10px;background: #F5F5F5;"></div>
				<div id="tool">
					<div class="title">
						<div  class="spare"></div>
						<h3>客服中心</h3>
					</div>

					<ul class="tool-box">
						<li @click="kefuonline">
								<img class="addimg" src="../../assets/images/mebkefu.png">				
							<div>在线客服</div>
						</li>
						<li @click="kefuhrefs()">
								<img class="addimg" src="../../assets/images/phone 2.png">
							<div>客服电话</div>
						</li>
						<li  @click="hrefs()">	
								<img class="addimg" src="../../assets/images/aboutme.png">
							<div>关于我们</div>
						</li>	
					</ul>
				</div>
				
				<!--之前注释-->
				<!-- <div style="height: 10px;clear: both;"></div>

					<template>
					    <yd-cell-group>
					        <yd-cell-item arrow>
					            <yd-icon slot="icon" name="order" size=".42rem"></yd-icon>
					            <span slot="left">我的订单</span>
					            <span slot="right">查看全部订单</span>
					        </yd-cell-item>

					        <yd-cell-item arrow>
					            <img slot="icon" src="http://static.ydcss.com/ydui/img/logo.png">
					            <span slot="left">图标</span>
					            <span slot="right">图标是image</span>
					        </yd-cell-item>
					    </yd-cell-group>
					</template> -->

				<!--<div class="cart">-->
				<!--之前注释-->
				<!--<router-link to="/member/marketing">
													<div class="list1" ><div class="ico marketing"></div>
														营销工具
														<i class="fa fa-angle-right" ></i></div>
												</router-link>-->
				<!--<router-link to=""><div class="list1" style="margin:0px;"><i class="iconfont icon-article"></i>我的消息<i class="fa fa-angle-right" style="color:#999; font-size:26px; float:right; line-height:44px;"></i></div></router-link>-->
				<!--<router-link v-if='signs' :to="fun.getUrl('sign')">
						<div class="list1" style="border:none">
						<yd-icon slot="icon" class="iconfont icon-member-clock" custom size="20px" color="#F7AD2C" style="margin-right:6px"></yd-icon>	
							<span slot="text" style="height:44px;line-height:44px;">{{sign_name}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>-->
				<!--<router-link v-if="pluginsList.conference.enable" :to="fun.getUrl('conferenceList')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-act-signup" custom size="20px" color="#F7AD2C" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">活动报名</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>
					<router-link v-if="store_set && store_set.is_open_cashier==1" :to="fun.getUrl('cashier')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-Cashier" custom size="20px" color="#F7AD2C" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">收银台</span>
							<i class="fa fa-angle-right" ></i>
						</div>
					</router-link>
					<router-link :to="fun.getUrl('extension')" v-if="is_extension">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-extension" custom size="20px" color="#F7AD2C" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">我的推广</span>
							<i class="fa fa-angle-right"></i>
						</div>    
					</router-link>

					<router-link v-if="haveShop==1" :to="fun.getUrl('microShop_home')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-mendian" custom size="20px" color="#F7AD2C" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">微店中心</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>
					<router-link v-else-if="haveShop==0" :to="fun.getUrl('microShop_apply')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-my-shop" custom size="20px" color="#F7AD2C" style="margin-right:6px;vertical-align: middle;"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">我要开店</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>-->
				<!--之前注释-->
				<!--<div id="service">
								<router-link :to= "fun.getUrl('service')">
									<div class="list1">
										<div class="ico extension"></div>我的服务
										<i class="fa fa-angle-right"></i></div>
								</router-link>
							</div>-->

				<!--<div id="service" v-if="isELive">
						<router-link :to="fun.getUrl('lifeService')">
							<div class="list1">
								<yd-icon slot="icon" class="icon-member-life-pay" custom size="20px" color="#F7AD2C" style="margin-right:6px"></yd-icon>
								<span slot="text" style="height:44px;line-height:44px;">生活缴费</span>
								<i class="fa fa-angle-right"></i>
							</div>
						</router-link>
					</div>

					<router-link :to="fun.getUrl('supplier')" v-if="supplier">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-apply" custom size="20px" color="#F7AD2C" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">{{supplier.value}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<router-link v-if="isLove" :to="fun.getUrl('love_index')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-exchange" custom size="20px" color="#F7AD2C" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">{{love_name}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>
					<router-link v-if="coin" :to="fun.getUrl('overseas_index')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-currency" custom size="20px" color="#F7AD2C" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">{{coin_name}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<router-link v-if="pluginsList.store_cashier.enable" :to="fun.getUrl('storeApply')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-store-apply" custom size="20px" color="#F7AD2C" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">门店申请</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<router-link v-if="pluginsList.credit.enable" :to="fun.getUrl('creditInfo')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-credit-value" custom size="20px" color="#F7AD2C" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">信用值</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<router-link v-if="pluginsList.ranking.enable" :to="fun.getUrl('rankingIndex')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-bank-list" custom size="20px" color="#F7AD2C" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">排行榜</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>
					<router-link v-if="pluginsList.article.enable" :to="fun.getUrl('notice',{id:'0'})">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-collect" custom size="20px" color="#F7AD2C" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">{{pluginsList.article.title}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>
					<router-link v-if="pluginsList.clock_in.enable" :to="fun.getUrl('ClockPunch')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-clock" custom size="20px" color="#F7AD2C" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">{{pluginsList.clock_in.title}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<router-link v-if="pluginsList.recharge_code.enable" :to="fun.getUrl('rechargeCode')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-recharge" custom size="20px" color="#F7AD2C" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">充值码</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link> 
					<router-link v-if="is_stroeWithdraw" :to="fun.getUrl('storeManage')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-cash" custom size="20px" color="#F7AD2C" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">门店提现</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>

					<router-link v-if="pluginsList.video_demand.enable" :to="fun.getUrl('CourseManage')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-course" custom size="20px" color="#F7AD2C" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">课程中心</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>
					<router-link v-if="helps" :to="fun.getUrl('helpcenter')">
						<div class="list1">
							<yd-icon slot="icon" class="icon-member-course" custom size="20px" color="#F7AD2C" style="margin-right:6px"></yd-icon>
							<span slot="text" style="height:44px;line-height:44px;">{{help_name}}</span>
							<i class="fa fa-angle-right"></i>
						</div>
					</router-link>-->
				<!--<router-link :to= "fun.getUrl('rentIndex')">
					
											<div class="list1">
												<div class="ico extension"></div>租赁中心
												<i class="fa fa-angle-right"></i></div>
										</router-link>-->

				<!--<router-link to="/member/alipay">
													<div class="list1" ><div class="ico newsetting"></div>支付宝测试
														<i class="fa fa-angle-right" ></i></div>
												</router-link>-->
				<!--</div>-->
				<div style="height: 10px;clear: both;"></div>
				<mt-button type="primary" style="font-size: 1rem;font-weight: bold;" size="large" @click="outInfo($event)" v-if="myType==5">退出登录</mt-button>
				<div id="copyright">©{{copyright}}&nbsp;</div>

				<div style="height: 60px;clear: both;"> </div>
				<!--<div slot="top" class="mint-loadmore-top">
												<span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
												<span v-show="topStatus === 'loading'">Loading...</span>
				</div>-->
			</div>
		</mt-loadmore>
		<div id="ewm" ref="hook" @click="openQrCode('none')">

			<div class="pic" style="position: relative;width:80%;padding:0px;border-radius: 5px;background: #fff;">
				<div style="position: absolute;top: 10px;right: 10px;width: 1.6rem;height: 1.6rem;line-height: 1.7rem;
							text-align: center;background: #808080;color: #fff;border-radius: 50%;" @click="posterShow = false">X</div>
				<div style="width:100%;height:100%;padding: 20% 9% 30px;text-align: center;">
					<img style="height: auto;box-shadow: 0 0 5px 5px #ccc;border-radius: 3px;" :src="poster" alt="">
					<img src="../../assets/images/img_default.png" v-if='!poster' style="width:100%;
								height: auto;border-radius: 3px;box-shadow: 0 0 5px 5px #ccc;"/>
					<!--<div style="width: 200px;height: 1.8rem;line-height: 1.8rem;font-size: 0.6rem;
								color: #fff;background: #ff4748;text-align: center;
								margin: 20px auto 0;border-radius: 5px;" v-if='poster' @click="savePicture">保存图片</div>-->
					<div style="font-size: 1rem;padding-top: 15px;color: #999;" v-if='poster'>长按图片保存到本地</div>
				</div>	
			</div>

		</div>
		
	</div>
</template>

<script>
	import member from "./membercontroller";
	export default member;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	@import "../../assets/css/member.scss";
	
	#tool li {
		font-size:.7rem !important;
	  img{
		width: 39%;
	}
	.addimg{
		padding:5px;
	}
	}
</style>