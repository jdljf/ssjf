<template xmlns="http://www.w3.org/1999/html">
	<div id="income">
		<c-title :hide="true" text='我的推广'></c-title>
		<!--<c-myextension v-if="!is_agent"></c-myextension>-->
		<div class="myextension" v-if="!is_agent">
			<div class="banner">
				<img :src="info_img" v-if="!(info_img=='' ||info_img==undefined||info_img==null)">
				<img src="../../assets/images/myextension.png" v-if="(info_img=='' ||info_img==undefined||info_img==null)">
			</div>
			<div class="main">
				<!--推广条件1   申请   -->
				<div class="welcome" v-if="becomeType_1">
					<div class="text">
						<p>欢迎加入
							<span>{{become_1_info_2}}</span>，请填写申请信息</p>
						<p>邀请人：
							<span>{{become_1_info_1}}</span>&nbsp;请核实</p>
					</div>
					<div class="info">
						<input type="text" v-model="para_name" placeholder="请填写真实姓名" class="inp">
						<input type="number" v-model="para_phone" placeholder="请填写手机号码方便联系" class="inp">
						<!--<input type="text"
																															v-model="para_weixin"
																															       placeholder="请填写微信号"
																															       class="inp">-->
						<input type="submit" @click="become_1_click" value="申请推广" class="btn">
						<!--提交后跳转至success页面（同无条件申请）-->
					</div>
				</div>
				<!--推广条件2   消费达到N次   -->
				<div class="welcome" v-if="becomeType_2">
					<div class="text">
						<p>本店累计消费满
							<span>{{become_2_info_1}}</span> 次， 才可开启&lt;{{become_2_info_3}}&gt;推广中心，您已消费
							<span>{{become_2_info_2}}</span> 次，请继续努力</p>
					</div>
					<div class="info">
						<div class="btn" @click="become_2_click">
							<!--点击跳转指定商品列表页面-->
							<i class="fa fa-shopping-cart"></i> 继续去购物
						</div>
					</div>
				</div>
				<!--推广条件3   消费达到N元   -->
				<div class="welcome" v-if="becomeType_3">
					<div class="text">
						<p>本店累计消费满
							<span>{{become_3_info_1}}</span>元， 才可开启&lt;{{become_3_info_3}}&gt;推广中心，您已消费
							<span>{{become_3_info_2}}</span> 元，请继续努力</p>
					</div>
					<div class="info">
						<div class="btn" @click="become_3_click">
							<!--点击跳转指定商品列表页面-->
							<i class="fa fa-shopping-cart"></i> 继续去购物
						</div>
					</div>
				</div>
				<!--推广条件4     购买指定商品 -->
				<div class="welcome" v-if="becomeType_4">
					<div class="text">
						<p>本店需购买商品
							<span>【{{become_4_info_1}}】</span>
							<!--可以点击跳转指定商品页面-->
							才可开启&lt;{{become_4_info_2}}&gt;推广中心，请现在去购买吧！
						</p>
					</div>
					<div class="info">
						<div class="btn" @click="become_4_click(become_4_info_3)">
							<!--点击跳转指定商品页面-->
							<i class="fa fa-shopping-cart"></i> 现在去购买
						</div>
					</div>
				</div>
				<div class="vip_main" v-if="!isCheck">
					<div class="title">推广特权</div>
					<div class="vip vip1">
						<div class="ico1">
							<i class="fa fa-qrcode"></i>
						</div>
						<div class="text">
							<div class="t1">专属二维码</div>
							<div class="t2">拥有专属推广二维码，用于推广客户；</div>
						</div>
					</div>
					<div class="vip">
						<div class="ico2">
							<i class="fa fa-cny"></i>
						</div>
						<div class="text">
							<div class="t1">推广收入</div>
							<div class="t2">推广的客户购买商品后，您将获得相应的推广收入；</div>
						</div>
					</div>
				</div>
			</div>
			<!--1：无条件展示     2：申请后展示-->
			<div class="success" v-if="isCheck">
				<div class="ico">
					<i class="fa fa-check"></i>
				</div>
				<div class="text">您的申请已经提交，请等待审核！</div>
				<a @click="isCheck_click()">
					<div class="sub">去商城逛逛</div>
				</a>
			</div>
		</div>
		<div v-if="is_agent">
			<div class="header">
				<div class="back">
					<i class="mintui mintui-back" v-if="false" @click="goback"></i>
				</div>
				<div class="user">
					<div class="user-head">
						<!--<img  v-lazy="userAvatar">-->
						<img :src="userAvatar">
					</div>
					<div class="user-info">
						<div class="user-name">{{userName}}</div>
						<div class="user-other" style="font-weight:bold;font-size:.9rem;">[会员ID:{{vipId}}]</div>
						<div class="user-other">[{{level}}]
						</div>
					</div>
				</div>
			</div>
			<h4>
			推广收入
			<span id="pricerg"> 
			<font ><b><small>￥</small>{{total_income}}</b></font>&nbsp;</span>
			</h4>
			<!-- 插件模版 -->
			<div style="clear:both;"></div>
			<div class="plug-box">
				<router-link class="plug-left" :to="fun.getUrl('distribution',{})" v-if="unCommissionShow && isCommissionShow">
					<ul>
						<li class="icon"><i class="iconfont icon-fenxiao01" style="color: #2F70B0;"></i></li>
						<li class="text">
							<span class="top">{{commission_title}}</span>
							<span>￥{{commission_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-right" :to="fun.getUrl(isAreaDividendShow?'regionalAgencyCenter':'applyRegionalAgency',{})" v-if="unAreaDividendShow && isAreaDividendShow">
					<ul>
						<li class="icon"><i class="iconfont icon-quyu01" style="color: #D2C196;"></i></li>
						<li class="text">
							<span class="top">{{area_dividend_title}}</span>
							<span>￥{{area_dividend_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-left" :to="fun.getUrl(isTeamDividendShow?'teamAgentCenter':'',{})" v-if="unTeamDividendShow && isTeamDividendShow">
					<ul>
						<li class="icon"><i class="iconfont icon-team-bonus" style="color: #97A8C7;"></i></li>
						<li class="text">
							<span class="top">{{team_dividend_title}}</span>
							<span>￥{{team_dividend_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-right" :to="fun.getUrl(isMerchantShow?'enterprise_index':'',{})" v-if="unMerchantShow && isMerchantShow">
					<ul>
						<li class="icon"><i class="iconfont icon-zhaoshang01" style="color: #675B43;"></i></li>
						<li class="text">
							<span class="top">{{merchant_title}}</span>
							<span>￥{{merchant_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-left" :to="fun.getUrl(isMicroShow?'microShop_ShopKeeperCenter':'',{})" v-if="unMicroShow && isMicroShow">
					<ul>
						<li class="icon"><i class="iconfont icon-weidian01" style="color: #37084A;"></i></li>
						<li class="text">
							<span class="top">{{micro_title}}</span>
							<span>￥{{micro_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-right" :to="fun.getUrl(isSingleReturnShow?'single_return_center':'',{})" v-if="unSingleReturnShow && isSingleReturnShow">
					<ul>
						<li class="icon"><i class="iconfont icon-dingdan01" style="color: #914FA6;"></i></li>
						<li class="text">
							<span class="top">{{singleReturn_title}}</span>
							<span>￥{{singleReturn_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-left" :to="fun.getUrl(isTeamLevelReturnShow?'teamlevel_return_center':'',{})" v-if="unTeamLevelReturnShow && isTeamLevelReturnShow">
					<ul>
						<li class="icon"><i class="iconfont icon-team-return" style="color: #434749;"></i></li>
						<li class="text">
							<span class="top">{{teamLevelReturn_title}}</span>
							<span>￥{{teamLevelReturn_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-right" :to="fun.getUrl(isConsumeReturnShow?'consume_return_center':'',{})" v-if="unConsumeReturnShow && isConsumeReturnShow">
					<ul>
						<li class="icon"><i class="iconfont icon-xiaofei01" style="color: #28BDF8;"></i></li>
						<li class="text">
							<span class="top">{{consumeReturn_title}}</span>
							<span>￥{{consumeReturn_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-left" :to="fun.getUrl(isFullReturnShow?'full_return_center':'',{})" v-if="unFullReturnShow && isFullReturnShow">
					<ul>
						<li class="icon"><i class="iconfont icon-mane01" style="color: #F84742;"></i></li>
						<li class="text">
							<span class="top">{{fullReturn_title}}</span>
							<span>￥{{fullReturn_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-right" :to="fun.getUrl(isShareholderDividend?'shareholder_dividend':'',{})" v-if="unShareholderDividend && isShareholderDividend">
					<ul>
						<li class="icon"><i class="iconfont icon-gudong01" style="color: #1EA56B;"></i></li>
						<li class="text">
							<span class="top">{{shareholderDividend_title}}</span>
							<span>￥{{shareholderDividend_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-left" :to="fun.getUrl(islevelReturn?'level_return':'',{})" v-if="unlevelReturn && islevelReturn">
					<ul>
						<li class="icon"><i class="iconfont icon-dengji01" style="color: #FC4A2C;"></i></li>
						<li class="text">
							<span class="top">{{levelReturn_title}}</span>
							<span>￥{{levelReturn_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-right" :to="fun.getUrl(isFixedReward?'fixedReward':'',{})" v-if="unFixedReward && isFixedReward">
					<ul>
						<li class="icon"><i class="iconfont icon-Medal01" style="color: #FDC850;"></i></li>
						<li class="text">
							<span class="top">{{fixedReward_title}}</span>
							<span>￥{{fixedReward_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-left" :to="fun.getUrl(isClockIn?'ClockPunch':'',{})" v-if="unClockIn && isClockIn">
					<ul>
						<li class="icon"><i class="iconfont icon-daka01" style="color: #54A3FC;"></i></li>
						<li class="text">
							<span class="top">{{clockIn_title}}</span>
							<span>￥{{clockIn_income}}</span>
						</li>
					</ul>
				</router-link>
				<router-link class="plug-right" :to="fun.getUrl(isVideoDemand?'courseIncome':'',{})" v-if="unVideoDemand && isVideoDemand">
					<ul>
						<li class="icon"><i class="iconfont icon-lecturer01"  style="color: #FFFAE9;"></i></li>
						<li class="text">
							<span class="top">{{videoDemand_title}}</span>
							<span>￥{{videoDemand_income}}</span>
						</li>
					</ul>
				</router-link>
			</div>
			<div style="clear:both;"></div>
			<!-- <template>
											<yd-grids-group :rows="2">
												<yd-grids-item :link="fun.getUrl('distribution',{})" v-if="unCommissionShow && isCommissionShow">
													<yd-icon slot="icon" class="icon-fenxiao01" custom size="24px" color="#f15353"></yd-icon>
													<span slot="text">{{commission_title}}
														<font>￥{{commission_income}}</font>元</span>
												</yd-grids-item>
												
												<yd-grids-item :link="fun.getUrl(isAreaDividendShow?'regionalAgencyCenter':'applyRegionalAgency',{})" v-if="unAreaDividendShow && isAreaDividendShow">
												<yd-icon slot="icon" class="icon-quyu01" custom size="24px" color="#f15353"></yd-icon>
													<span slot="text">{{area_dividend_title}}
														<font>￥{{area_dividend_income}}</font>元</span>
												</yd-grids-item>
												<yd-grids-item :link="fun.getUrl(isTeamDividendShow?'teamAgentCenter':'',{})" v-if="unTeamDividendShow && isTeamDividendShow">
													<yd-icon slot="icon" class="icon-team-bonus" custom size="24px" color="#f15353"></yd-icon>
													<span slot="text">{{team_dividend_title}}
														<font>￥{{team_dividend_income}}</font>元</span>
												</yd-grids-item>
												<yd-grids-item :link="fun.getUrl(isMerchantShow?'enterprise_index':'',{})" v-if="unMerchantShow && isMerchantShow">
													<yd-icon slot="icon" class="icon-zhaoshang01" custom size="24px" color="#f15353"></yd-icon>
													<span slot="text">{{merchant_title}}
														<font>￥{{merchant_income}}</font>元</span>
												</yd-grids-item>
												
												<yd-grids-item :link="fun.getUrl(isMicroShow?'microShop_ShopKeeperCenter':'',{})" v-if="unMicroShow && isMicroShow">
													<yd-icon slot="icon" class="icon-weidian01" custom size="24px" color="#f15353"></yd-icon>
													<span slot="text">{{micro_title}}
														<font>￥{{micro_income}}</font>元</span>
												</yd-grids-item>
												<yd-grids-item :link="fun.getUrl(isSingleReturnShow?'single_return_center':'',{})" v-if="unSingleReturnShow && isSingleReturnShow">
													<yd-icon slot="icon" class="icon-dingdan01" custom size="24px" color="#f15353"></yd-icon>
													<span slot="text">{{singleReturn_title}}
														<font>￥{{singleReturn_income}}</font>元</span>
												</yd-grids-item>
												<yd-grids-item :link="fun.getUrl(isTeamLevelReturnShow?'teamlevel_return_center':'',{})" v-if="unTeamLevelReturnShow && isTeamLevelReturnShow">
													<yd-icon slot="icon" class="icon-team-return" custom size="24px" color="#f15353"></yd-icon>
													<span slot="text">{{teamLevelReturn_title}}
														<font>￥{{teamLevelReturn_income}}</font>元</span>
												</yd-grids-item>
												<yd-grids-item :link="fun.getUrl(isConsumeReturnShow?'consume_return_center':'',{})" v-if="unConsumeReturnShow && isConsumeReturnShow">
													<yd-icon slot="icon" class="icon-xiaofei01" custom size="24px" color="#f15353"></yd-icon>
													<span slot="text">{{consumeReturn_title}}
														<font>￥{{consumeReturn_income}}</font>元</span>
												</yd-grids-item>
												<yd-grids-item :link="fun.getUrl(isFullReturnShow?'full_return_center':'',{})" v-if="unFullReturnShow && isFullReturnShow">
													<yd-icon slot="icon" class="icon-mane01" custom size="24px" color="#f15353"></yd-icon>
													<span slot="text">{{fullReturn_title}}
														<font>￥{{fullReturn_income}}</font>元</span>
												</yd-grids-item>
												<yd-grids-item :link="fun.getUrl(isShareholderDividend?'shareholder_dividend':'',{})" v-if="unShareholderDividend && isShareholderDividend">
													<yd-icon slot="icon" class="icon-gudong01" custom size="24px" color="#f15353"></yd-icon>
													<span slot="text">{{shareholderDividend_title}}
														<font>￥{{shareholderDividend_income}}</font>元</span>
												</yd-grids-item>
													<yd-grids-item :link="fun.getUrl(islevelReturn?'level_return':'',{})" v-if="unlevelReturn && islevelReturn">
														<yd-icon slot="icon" class="icon-dengji01" custom size="24px" color="#f15353"></yd-icon>
															<span slot="text">{{levelReturn_title}}
														<font>￥{{levelReturn_income}}</font>元</span>
													</yd-grids-item>
												
												<yd-grids-item :link="fun.getUrl(isFixedReward?'fixedReward':'',{})" v-if="unFixedReward && isFixedReward">
													<yd-icon slot="icon" class="icon-Medal01" custom size="24px" color="#f15353"></yd-icon>
													<span slot="text">{{fixedReward_title}}
														<font>￥{{fixedReward_income}}</font>元</span>
												</yd-grids-item>
												<yd-grids-item :link="fun.getUrl(isClockIn?'ClockPunch':'',{})" v-if="unClockIn && isClockIn">
													<yd-icon slot="icon" class="icon-daka01" custom size="24px" color="#f15353"></yd-icon>
													<span slot="text">{{clockIn_title}}
														<font>￥{{clockIn_income}}</font>元</span>
												</yd-grids-item>
											
											<yd-grids-item :link="fun.getUrl(isVideoDemand?'courseIncome':'',{})" v-if="unVideoDemand && isVideoDemand">
													<yd-icon slot="icon" class="icon-lecturer01" custom size="24px" color="#f15353"></yd-icon>
													<span slot="text">{{videoDemand_title}}
														<font>￥{{videoDemand_income}}</font>元</span>
												</yd-grids-item>
											
												
											</yd-grids-group>
</template>-->
			<!--<template>
	<div style="width:100%;clear:both;">
		<yd-grids-group :rows="2">
			<yd-grids-item :link="fun.getUrl('distribution',{})" v-if="unCommissionShow && isCommissionShow">
				<yd-icon slot="icon" class="icon-fenxiao01" custom size="24px" color="#f15353"></yd-icon>
				<span slot="text">{{commission_title}}
														<font>￥{{commission_income}}</font>元</span>
			</yd-grids-item>
			<yd-grids-item :link="fun.getUrl(isAreaDividendShow?'regionalAgencyCenter':'applyRegionalAgency',{})" v-if="unAreaDividendShow && isAreaDividendShow">
				<yd-icon slot="icon" class="icon-quyu01" custom size="24px" color="#f15353"></yd-icon>
				<span slot="text">{{area_dividend_title}}
														<font>￥{{area_dividend_income}}</font>元</span>
			</yd-grids-item>
			<yd-grids-item :link="fun.getUrl(isTeamDividendShow?'teamAgentCenter':'',{})" v-if="unTeamDividendShow && isTeamDividendShow">
				<yd-icon slot="icon" class="icon-team-bonus" custom size="24px" color="#f15353"></yd-icon>
				<span slot="text">{{team_dividend_title}}
														<font>￥{{team_dividend_income}}</font>元</span>
			</yd-grids-item>
			<yd-grids-item :link="fun.getUrl(isMerchantShow?'enterprise_index':'',{})" v-if="unMerchantShow && isMerchantShow">
				<yd-icon slot="icon" class="icon-zhaoshang01" custom size="24px" color="#f15353"></yd-icon>
				<span slot="text">{{merchant_title}}
														<font>￥{{merchant_income}}</font>元</span>
			</yd-grids-item>
			<yd-grids-item :link="fun.getUrl(isMicroShow?'microShop_ShopKeeperCenter':'',{})" v-if="unMicroShow && isMicroShow">
				<yd-icon slot="icon" class="icon-weidian01" custom size="24px" color="#f15353"></yd-icon>
				<span slot="text">{{micro_title}}
														<font>￥{{micro_income}}</font>元</span>
			</yd-grids-item>
			<yd-grids-item :link="fun.getUrl(isSingleReturnShow?'single_return_center':'',{})" v-if="unSingleReturnShow && isSingleReturnShow">
				<yd-icon slot="icon" class="icon-dingdan01" custom size="24px" color="#f15353"></yd-icon>
				<span slot="text">{{singleReturn_title}}
														<font>￥{{singleReturn_income}}</font>元</span>
			</yd-grids-item>
			<yd-grids-item :link="fun.getUrl(isConsumeReturnShow?'consume_return_center':'',{})" v-if="unConsumeReturnShow && isConsumeReturnShow">
				<yd-icon slot="icon" class="icon-team-return" custom size="24px" color="#f15353"></yd-icon>
				<span slot="text">{{teamLevelReturn_title}}
														<font>￥{{teamLevelReturn_income}}</font>元</span>
			</yd-grids-item>
			<yd-grids-item :link="fun.getUrl(isConsumeReturnShow?'consume_return_center':'',{})" v-if="unConsumeReturnShow && isConsumeReturnShow">
				<yd-icon slot="icon" class="icon-xiaofei01" custom size="24px" color="#f15353"></yd-icon>
				<span slot="text">{{consumeReturn_title}}
														<font>￥{{consumeReturn_income}}</font>元</span>
			</yd-grids-item>
			<yd-grids-item :link="fun.getUrl(isFullReturnShow?'full_return_center':'',{})" v-if="unFullReturnShow && isFullReturnShow">
				<yd-icon slot="icon" class="icon-mane01" custom size="24px" color="#f15353"></yd-icon>
				<span slot="text">{{fullReturn_title}}
														<font>￥{{fullReturn_income}}</font>元</span>
			</yd-grids-item>
			<yd-grids-item :link="fun.getUrl(isShareholderDividend?'shareholder_dividend':'',{})" v-if="unShareholderDividend && isShareholderDividend">
				<yd-icon slot="icon" class="icon-gudong01" custom size="24px" color="#f15353"></yd-icon>
				<span slot="text">{{shareholderDividend_title}}
														<font>￥{{shareholderDividend_income}}</font>元</span>
			</yd-grids-item>
			<yd-grids-item :link="fun.getUrl(islevelReturn?'level_return':'',{})" v-if="unlevelReturn && islevelReturn">
				<yd-icon slot="icon" class="icon-dengji01" custom size="24px" color="#f15353"></yd-icon>
				<span slot="text">{{levelReturn_title}}
														<font>￥{{levelReturn_income}}</font>元</span>
			</yd-grids-item>
			<yd-grids-item :link="fun.getUrl(isFixedReward?'fixedReward':'',{})" v-if="unFixedReward && isFixedReward">
				<yd-icon slot="icon" class="icon-Medal01" custom size="24px" color="#f15353"></yd-icon>
				<span slot="text">{{fixedReward_title}}
														<font>￥{{fixedReward_income}}</font>元</span>
			</yd-grids-item>
			<yd-grids-item :link="fun.getUrl(isClockIn?'ClockPunch':'',{})" v-if="unClockIn && isClockIn">
				<yd-icon slot="icon" class="icon-daqia01" custom size="24px" color="#f15353"></yd-icon>
				<span slot="text">{{clockIn_title}}
														<font>￥{{clockIn_income}}</font>元</span>
			</yd-grids-item>
			<yd-grids-item :link="fun.getUrl(isVideoDemand?'courseIncome':'',{})" v-if="unVideoDemand && isVideoDemand">
				<yd-icon slot="icon" class="icon-lecturer01" custom size="24px" color="#f15353"></yd-icon>
				<span slot="text">{{videoDemand_title}}
														<font>￥{{videoDemand_income}}</font>元</span>
			</yd-grids-item>
		</yd-grids-group>
	</div>
</template>-->

			<div class="more-extension">
				<div class="spare"></div>
				<span id="pricerg">更多推广权限</span>
			</div>
			<!-- <h3>更多推广权限</h3> -->
			<template>
				<yd-grids-group :rows="2">
					<yd-grids-item :link="fun.getUrl('distribution',{})" v-if="unCommissionShow && !isCommissionShow">
						<yd-icon slot="icon" class="icon-fenxiao01" custom size="24px" color="#D64D31"></yd-icon>
						<span slot="text">{{commission_title}}
														<font  class="moneyactive">￥{{commission_income}}</font>元</span>
					</yd-grids-item>
					<yd-grids-item :link="fun.getUrl(isAreaDividendShow?'regionalAgencyCenter':'applyRegionalAgency',{})" v-if="unAreaDividendShow && !isAreaDividendShow">
						<yd-icon slot="icon" class="icon-quyu01" custom size="24px" color="#81D349"></yd-icon>
						<span slot="text">{{area_dividend_title}}
														<font class="moneyactive">￥{{area_dividend_income}}</font>元</span>
					</yd-grids-item>
					<yd-grids-item :link="fun.getUrl(isTeamDividendShow?'':'teamAgentCenter',{})" v-if="unTeamDividendShow && !isTeamDividendShow">
						<yd-icon slot="icon" class="icon-team-bonus" custom size="24px" color="#FC6228"></yd-icon>
						<span slot="text">{{team_dividend_title}}
														<font class="moneyactive">￥{{team_dividend_income}}</font>元</span>
					</yd-grids-item>
					<yd-grids-item :link="fun.getUrl(isMerchantShow?'':'enterprise_apply',{})" v-if="unMerchantShow && !isMerchantShow">
						<yd-icon slot="icon" class="icon-zhaoshang01" custom size="24px" color="#FEE856"></yd-icon>
						<span slot="text">{{merchant_title}}
														<font class="moneyactive">￥{{merchant_income}}</font>元</span>
					</yd-grids-item>
					<yd-grids-item :link="fun.getUrl(isMicroShow?'':'microShop_apply',{})" v-if="unMicroShow && !isMicroShow">
						<yd-icon slot="icon" class="icon-weidian01" custom size="24px" color="#F3433D"></yd-icon>
						<span slot="text">{{micro_title}}
														<font class="moneyactive">￥{{micro_income}}</font>元</span>
					</yd-grids-item>
					<yd-grids-item :link="fun.getUrl(isSingleReturnShow?'':'single_return_center',{})" v-if="unSingleReturnShow && !isSingleReturnShow">
						<yd-icon slot="icon" class="icon-dingdan01" custom size="24px" color="#1996D7"></yd-icon>
						<span slot="text">{{singleReturn_title}}
														<font class="moneyactive">￥{{singleReturn_income}}</font>元</span>
					</yd-grids-item>
					<yd-grids-item :link="fun.getUrl(isTeamLevelReturnShow?'':'teamlevel_return_center',{})" v-if="unTeamLevelReturnShow && !isTeamLevelReturnShow">
						<yd-icon slot="icon" class="icon-team-return" custom size="24px" color="#8C6296"></yd-icon>
						<span slot="text">{{teamLevelReturn_title}}
														<font class="moneyactive">￥{{teamLevelReturn_income}}</font>元</span>
					</yd-grids-item>
					<yd-grids-item :link="fun.getUrl(isConsumeReturnShow?'':'consume_return_center',{})" v-if="unConsumeReturnShow && !isConsumeReturnShow">
						<yd-icon slot="icon" class="icon-xiaofei01" custom size="24px" color="#FF3E96"></yd-icon>
						<span slot="text">{{consumeReturn_title}}
														<font class="moneyactive">￥{{consumeReturn_income}}</font>元</span>
					</yd-grids-item>
					<yd-grids-item :link="fun.getUrl(isFullReturnShow?'':'full_return_center',{})" v-if="unFullReturnShow && !isFullReturnShow">
						<yd-icon slot="icon" class="icon-mane01" custom size="24px" color="#F4A460"></yd-icon>
						<span slot="text">{{fullReturn_title}}
														<font class="moneyactive">￥{{fullReturn_income}}</font>元</span>
					</yd-grids-item>
					<yd-grids-item :link="fun.getUrl(isShareholderDividend?'':'shareholder_dividend',{})" v-if="unShareholderDividend && !isShareholderDividend">
						<yd-icon slot="icon" class="icon-gudong01" custom size="24px" color="#FF6EB4"></yd-icon>
						<span slot="text">{{shareholderDividend_title}}
														<font class="moneyactive">￥{{shareholderDividend_income}}</font>元</span>
					</yd-grids-item>
					<yd-grids-item :link="fun.getUrl(islevelReturn?'':'level_return',{})" v-if="unlevelReturn && !islevelReturn">
						<yd-icon slot="icon" class="icon-dengji01" custom size="24px" color="#E6E6FA"></yd-icon>
						<span slot="text">{{levelReturn_title}}
														<font class="moneyactive">￥{{levelReturn_income}}</font>元</span>
					</yd-grids-item>
					<yd-grids-item :link="fun.getUrl(isFixedReward?'':'fixedReward',{})" v-if="unFixedReward && !isFixedReward">
						<yd-icon slot="icon" class="icon-Medal01" custom size="24px" color="#E0FFFF"></yd-icon>
						<span slot="text">{{fixedReward_title}}
														<font class="moneyactive">￥{{fixedReward_income}}</font>元</span>
					</yd-grids-item>
					<yd-grids-item :link="fun.getUrl(isClockIn?'':'ClockPunch',{})" v-if="unClockIn && !isClockIn">
						<yd-icon slot="icon" class="icon-daqia01" custom size="24px" color="#DAA520"></yd-icon>
						<span slot="text">{{clockIn_title}}
														<font class="moneyactive">￥{{clockIn_income}}</font>元</span>
					</yd-grids-item>
					<yd-grids-item :link="fun.getUrl(isVideoDemand?'':'courseIncome',{})" v-if="unVideoDemand && !isVideoDemand">
						<yd-icon slot="icon" class="icon-lecturer01" custom size="24px" color="#CAFF70"></yd-icon>
						<span slot="text">{{videoDemand_title}}
														<font class="moneyactive">￥{{videoDemand_income}}</font>元</span>
					</yd-grids-item>
				</yd-grids-group>
			</template>
			<div class="more-income">
				<div class="spare"></div>
				<span>收入</span>
			</div>
			<div class="income-box">

				<div class="income-detail" @click="gotoDetail">
					<span>收入明细</span>
					<i class="fa fa-angle-right"></i>
				</div>

				<div class="income-cash" @click="gotoRecharge">
					<span>收入提现</span>
					<i class="fa fa-angle-right"></i>
				</div>

			</div>

			<!-- <template>
	<yd-cell-group>
		<yd-cell-item arrow type="link" :href="fun.getUrl('incomedetails',{})">
			<span slot="left">收入明细</span>
			<span slot="right"></span>
		</yd-cell-item>
		<yd-cell-item arrow type="link" :href="fun.getUrl('income',{})">
			<span slot="left">收入提现</span>
			<span slot="right"></span>
		</yd-cell-item>
	</yd-cell-group>
</template> -->
		</div>
		<div style="height:59px"></div>

	</div>
</template>

<script>
	import index_controller from "./index_controller";
	export default index_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	@font-face {
		font-family: "iconfont";
		/* project id 432132 */
		src: url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.eot");
		src: url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.eot?#iefix") format("embedded-opentype"), url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.woff") format("woff"), url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.ttf") format("truetype"), url("//at.alicdn.com/t/font_432132_vo5ucd8n7xbhuxr.svg#iconfont") format("svg");
	}
	#income {
		background: #fff;
		.yd-grids-item::after{
				border-bottom: 0px;
			}
		.yd-grids-2 .yd-grids-item:not(:nth-child(2n))::before{
			border-right:0px;
		}
		.more-income {
			height: 36px;
			line-height: 36px;
			padding: 0 14px;
			text-align: left;
			border-bottom: solid 1px #e2e2e2;
			display: flex;
			align-items: flex-start;
			font-size: .875rem;
			.spare {
				width: 4px;
				height: 16px;
				background-color: #FECD50;
				border-radius: 1px;
				margin-right: 6px;
				margin-top: 9px;
			}
			span {
				font-weight: bold;
				font-size: .875rem;
			}
		}
		.income-box {
			background-color: #fff;
			padding-left: 15px;
			font-size: 15px;
			border-bottom: solid 1px #e2e2e2;
			i {
				line-height: 44px;
				font-size: 24px;
				color: #c9c9c9;
			}
			.income-detail {
				height: 44px;
				line-height: 44px;
				padding-right: 15px;
				border-bottom: solid 1px #F7F7F7;
				display: flex;
				justify-content: space-between;
			}
			.income-cash {
				height: 44px;
				line-height: 44px;
				padding-right: 15px;
				display: flex;
				justify-content: space-between;
			}
		}
		.plug-box {
			box-sizing: content-box;
			a {
				width: 33.3%;
				float: left;
				display: block;
				background-color: #fff;
				padding: 16px 12px;
				/*border-bottom: solid 1px #F7F7F7;*/
				.icon {
					i {
						font-size: 24px;
						/*&:nth-child(1) {
							color: yellowgreen;
						}
						&:nth-child(2) {
							color: red;
						}*/
					}
				}
				.text {
					text-overflow: ellipsis;
					overflow: hidden;
					white-space: nowrap;
					text-align: center;
					overflow: hidden;
					margin-top: 10px;
					font-size: .75rem;
					ul {
						padding: 0 10px;
						li {
							line-height: 20px;
						}
					}
				}
			}
			a:nth-of-type(odd) {
				/*border-right:solid 1px #e2e2e2;*/
			}
			/*// display: flex;
		// flex-wrap:wrap;
		// .plug-left,.plug-right{
		// 	width:50%;
		// 	background-color: #fff;
		// 	padding:16px 12px;
		// 	border-bottom:solid 1px #e2e2e2;
		// 	.icon{
		// 		i{
		// 		font-size:24px;
		// 		color:#f15353;
		// 		}
		// 	}
		// 	.text{
		// 		text-overflow: ellipsis;
		// 		overflow: hidden;
		// 		white-space: nowrap;
		// 		text-align:center;
		// 		overflow: hidden;
		// 		margin-top:10px;
		// 		ul{
		// 			padding:0 10px;
		// 		li{
		// 			line-height: 20px;
		// 		}
		// 		}
		// 	}
		// }
		// .plug-left{
		// 	border-right:solid 1px #e2e2e2;
		// }*/
		}
		.header {
			height: auto;
			background: linear-gradient(to top, #FECD50, #F4AB2B);
			background-size: 100% 100%;
			padding: 20px;
			position: relative;
		}
		.header .user {
			display: flex;
		}
		.header .user .user-head {
			box-sizing: content-box;
			height: 48px;
			width: 48px;
			background: #fff;
			border-radius: 50%;
			border: 2px solid #fff;
		}
		.header .user .user-head img {
			height: 48px;
			width: 48px;
			border-radius: 50%;
		}
		.header .user .user-info {
			margin-left: 16px;
			text-align: left;
			width: 100%;
			color: #fff;
		}
		.header .user .user-info .user-name {
			font-size: .9rem;
			font-weight: bold;
		}
		.header .user .user-info .user-other {
			width: auto;
			font-size: .75rem;
		}
		.header .user-gold {
			height: 35px;
			width: 94%;
			padding: 5px 3%;
			border-bottom: 1px solid #e3e3e3;
			background: #fff;
			font-size: 0.8rem;
			line-height: 35px;
		}
		.header .user-gold .title {
			height: 35px;
			width: auto;
			float: left;
			color: #666;
		}
		.header .user-gold .num {
			height: 35px;
			width: auto;
			float: left;
			color: #f90;
		}
		.header .user-gold .draw {
			width: 80px;
			height: 30px;
			background: #6c9;
			float: right;
		}
		.header .user .set {
			position: absolute;
			right: 10px;
			top: 10px;
			color: #fff;
			font-size: 0.9rem;
		}
		.header .user-op {
			height: 35px;
			width: 94%;
			padding: 5px 3%;
			border-bottom: 1px solid #e2e2e2;
			background: #fff;
			font-size: 0.8rem;
			line-height: 35px;
		}
		h3 {
			background: #fff;
			margin: 10px 0 0;
			font-weight: normal;
			font-size: 0.9rem;
			height: 2.5rem;
			box-sizing: border-box;
			line-height: 2.5rem;
			color: #f15353;
			border-bottom: 1px solid #e2e2e2;
			span {
				color: #999;
			}
		}
		.more-extension {
			height: 36px;
			line-height: 36px;
			padding: 0 14px;
			text-align: left;
			border-bottom: solid 1px #F7F7F7;
			display: flex;
			align-items: flex-start;
			font-size: .875rem;
		    border-top: 1px solid #f7f7f7;
			.spare {
				width: 4px;
				height: 16px;
				background-color: #f15353;
				border-radius: 1px;
				margin-right: 6px;
				margin-top: 9px;
			}
			span {
				font-weight: bold;
				font-size: .875rem;
			}
		}
		h4 {
			background: #fff;
			text-align: left;
			font-weight: normal;
			font-size: 0.875rem;
			height: 2.25rem;
			box-sizing: border-box;
			line-height: 2.25rem;
			color: #D64D31;
			border-bottom: 1px solid #f7f7f7;
			padding: 0 15px;
			font-weight: bold;
			span {
				color: #999;
			}
		}
		#gongge {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			align-items: center;
			justify-content: space-between;
			background: #fff;
			column-count: 3;
			padding: 10px 0;
			margin-bottom: 10px;
			li {
				flex: 33%;
				padding: 0 10px;
				border: 1px solid #e2e2e2;
				margin: 3px;
				border-radius: 5px;
				i {
					font-size: 34px;
					color: #eb3943;
					margin: 10px 0;
				}
				a {
					color: #333;
					font-size: 0.9rem;
					img {
						width: 23px;
						margin: 5px 0;
					}
					font {
						color: #e84e40;
						font-size: 0.8rem;
						padding-top: 5px;
					}
				}
			}
		}
		#un-gongge {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-between;
			background: #fff;
			column-count: 3;
			padding: 10px 0;
			li {
				flex: 25%;
				padding: 0 10px;
				i {
					font-size: 34px;
					margin: 15px 0;
				}
				a {
					color: #333;
					font-size: 0.8rem;
					img {
						width: 23px;
						margin: 5px 0;
					}
					font {
						color: #e84e40;
						font-size: 0.8rem;
						padding-top: 5px;
					}
				}
			}
		}
		#pricerg {
			text-align: right;
			float: right;
			font {
				color: #f15353;
				font-size: 1rem;
			}
		}
		.mszf {
			background: #fff;
			padding: 0 10px;
			margin: 0;
			text-align: left;
			overflow: hidden;
			margin-top: 10px;
			height: 44px;
			box-sizing: border-box;
			line-height: 44px;
			font-size: 0.857rem;
			color: #333;
			i {
				font-size: 17px;
				float: right;
				line-height: 44px;
				color: #999;
			}
			span {
				float: left;
			}
			a {
				color: #000000;
				display: block;
			}
		}
	}
	
	a {
		text-decoration: none;
		color: #222;
	}
	
	input {
		border-width: 0;
	}
	
	.myextension .banner img {
		width: 100%;
	}
	
	.myextension .main {
		position: relative;
		top: -4px;
	}
	
	.welcome {
		padding: 10px;
		background: #ffffff;
		.text {
			p {
				font-size: 0.8rem;
				color: #666;
				line-height: 1.2rem;
				span {
					color: #f55955;
				}
			}
		}
		.info {
			margin-top: 10px;
			input {
				display: block;
				margin-bottom: 8px;
				width: 100%;
				height: 2rem;
				border-radius: 5px;
				padding: 0 5px;
				box-sizing: border-box;
				outline: none;
			}
			.inp {
				border: 1px solid #F7F7F7;
			}
			.inp:focus {
				border-color: #f55955;
				box-sizing: border-box;
			}
			span {
				color: #f55955;
			}
			.btn {
				background: #f55955;
				color: #ffffff;
				margin-bottom: 8px;
				width: 100%;
				height: 2rem;
				border-radius: 5px;
				padding: 0 5px;
				box-sizing: border-box;
				text-align: center;
				font-size: 0.8rem;
				line-height: 2rem;
				i {
					display: inline-block;
				}
			}
			.btn:focus {
				background: #d8403c;
			}
		}
	}
	
	.myextension .main .vip_main {
		background: #ffffff;
		margin: 15px 0;
		.title {
			padding: 10px;
			font-size: 0.8rem;
			border-bottom: 1px solid #e2e2e2;
			text-align: center;
		}
		.vip {
			padding: 15px 10px;
			overflow: hidden;
			font-size: 0.8rem;
			color: #999;
			.ico1,
			.ico2 {
				width: 15%;
				float: left;
			}
			.ico1 {
				i {
					background: #32cd32;
				}
			}
			.ico2 {
				i {
					background: #fece00;
				}
			}
			.text {
				float: left;
				width: 85%;
				.t1 {
					font-size: 0.95rem;
					color: #333;
					margin-bottom: 5px;
					text-align: left;
				}
				.t2 {
					text-align: justify;
				}
			}
			i {
				background: #32cd32;
				height: 36px;
				width: 36px;
				border-radius: 18px;
				color: #fff;
				text-align: center;
				line-height: 38px;
				font-size: 1.2rem;
			}
		}
		.vip1 {
			border-bottom: 1px solid #e2e2e2;
		}
	}
	
	.myextension .success {
		height: 200px;
		padding-top: 65px;
		background: #ffffff;
		.ico {
			height: 65px;
			width: 65px;
			margin: auto;
			border: 3px solid #32cd32;
			border-radius: 4rem;
			color: #32cd32;
			font-size: 2.3rem;
			text-align: center;
			line-height: 4rem;
		}
		.text {
			height: 2rem;
			margin-top: 30px;
			color: #666;
			line-height: 1.6rem;
			text-align: center;
		}
		a .sub {
			height: 2rem;
			width: 80%;
			background: #f55955;
			margin: 20px auto;
			border-radius: 2rem;
			color: #fff;
			line-height: 2rem;
			text-align: center;
			font-size: 0.9rem;
			margin-bottom: 20px;
		}
		a .sub:focus {
			background: #d8403c;
		}
	}
</style>