<template>
	<div id="all">
		<div :class="{'scroll':!search_show,'fibben-scroll':search_show}">
			<c-title hide="true" text='home' :eteos="fun.setWXTitle($store.state.temp.item.janst)"></c-title>

			<header :class="{amout}" v-if='isfollow'>

				<!--用户进入商城，判断是否关注公众号-->
				<div class="attention">
					<img :src="follow_mode.logo">
					<!--用户分享时显示用户头像，不是分享进入页面显示商城logo-->

					<div class="text">
						<p> 来自<span>{{follow_mode.text}}</span>的推荐</p>

						<!--用户分享时显示用户名；不是分享进入页面时，显示商城名-->

						<p>关注公众号，享专属服务</p>
					</div>

					<button><a :href="follow_mode.url"> 立即关注</a></button>
					<!--跳转至后台设置页面-->
				</div>
			</header>
			<div class="home" v-if="$store.state.temp.default">
				<div :class="{'search':'ture','mout':amout,isfollow}" id="d1">
					<div class="search-form-box" @click='tosearch'><i class="el-icon-search"></i>{{ $store.state.langService.language.langHome.search }}</div>
				</div>

				<!-- <c-myswipe
    :pagination-visible="true"
    :slides="$store.state.temp.default.ads"
    :repeating="true"
    :auto="3000" v-if='$store.state.temp.default'>

    <div v-for="(slide,index) in $store.state.temp.default.ads" :key="index" @click="bannerClick(slide)">
     
        <img width="100%" :src="slide.thumb" />
     
    </div>
</c-myswipe>		  -->

				<!--<div class="my-swipe">
<swipe style="height: 130px;" :lengths='555'>
			<swipe-item v-for="item in bannerData">
				<template v-if='item.thumb'><img :src="item.thumb" width="100%"></template>
				<template v-if='!item.thumb'><img src="../../assets/images/img_default.png"></template>
			</swipe-item>
</swipe>
</div>-->
				<!--<div class="m-swipe">
		<mt-swipe :auto="0" :stopPropagation='true' :prevent='true' :continuous='false'>
			<mt-swipe-item v-for="item in bannerData">
				<template v-if='item.thumb'><img :src="item.thumb"></template>
				<template v-if='!item.thumb'><img src="../../assets/images/img_default.png"></template>
			</mt-swipe-item>
		</mt-swipe>
	</div>-->

				<!-- <div class="ment" v-if='$store.state.temp.default'>
			<c-ment :datas="fun.chunk($store.state.temp.default.category,8)"></c-ment>
		</div> -->

				<!-- <div class="goodsList" v-if='$store.state.temp.default'>
			<c-goodsList :goods='$store.state.temp.default.goods' text='推荐商品'></c-goodsList>
		</div>
		<div style="height: 50px;"></div> -->

				<!--区域分站开始-->

				<div id="home">
					<div class="banner">
						<!-- <div class="img"><img src="../../assets/images/init-image-1.jpg"></div> -->
						<c-myswipe :pagination-visible="true" :slides="$store.state.temp.default.ads" :repeating="true" :auto="3000" v-if='$store.state.temp.default' style="height:38vw">

							<div v-for="(slide,index) in $store.state.temp.default.ads" :key="index" @click="bannerClick(slide)" style="height:38vw">

								<img width="100%" height="100%" :src="slide.thumb" />

							</div>

							<div style="height:38vw" v-if='this.fun.isTextEmpty($store.state.temp.default.ads)'>
								<img width="100%" height="100%" src="../../assets/images/loading.jpg" />
							</div>

						</c-myswipe>

						<!-- <div class="position">
							<ul class="area" @click="searchShow" v-if="$store.state.zoneShow == 1?true:false">
								<li>
									<span>{{currentZone}}</span>
									<i class="iconfont icon-member-bottom"></i>
								</li>
								<li></li>
							</ul>
							<ul class="search-box" @click.stop='tosearch'>
								<li><i class="iconfont icon-sousuo1"></i></li>
								<li class="input"><input type="text" placeholder="搜索您想要商品"></li>
							</ul>
						</div> -->
					</div>
					<div style="clear:both;"></div>
					<div id="function-area">
						<div class="ment" v-if='$store.state.temp.default'>
							<c-ment :datas="fun.chunk($store.state.temp.default.category,8)"></c-ment>
						</div>
					</div>
					<div id="goods-image" v-if="!this.fun.isTextEmpty($store.state.temp.default.advs)">

						<div class="top">
							<ul class="left">
								<li @click="gotoAdvs($store.state.temp.default.advs[0].link)">
									<img :src="$store.state.temp.default.advs[0]?$store.state.temp.default.advs[0].img:require('../../assets/images/loading.jpg')" alt="" style="width:100%;height:100%;">
								</li>
							</ul>
							<ul class="right">
								<li @click="gotoAdvs($store.state.temp.default.advs[1].link)"><img :src="$store.state.temp.default.advs[1]?$store.state.temp.default.advs[1].img:require('../../assets/images/loading.jpg')" alt="" style="width:100%;height:100%;"></li>
								<li @click="gotoAdvs($store.state.temp.default.advs[2].link)"><img :src="$store.state.temp.default.advs[2]?$store.state.temp.default.advs[2].img:require('../../assets/images/loading.jpg')" alt="" style="width:100%;height:100%;"></li>
							</ul>
						</div>
						<div class="bottom">
							<!-- <ul v-if="$store.state.temp.default.advs.slice(2,6)">
								<li v-for="item in $store.state.temp.default.advs.slice(2,6)" ><img :src="item.img?item.img:require('../../assets/images/loading.jpg')"></li>
								
                               
							</ul> -->

							<ul>
								<li @click="gotoAdvs($store.state.temp.default.advs[3].link)"><img :src="$store.state.temp.default.advs[3]?$store.state.temp.default.advs[3].img:require('../../assets/images/loading.jpg')" alt="" style="width:100%;height:100%;"></li>
								<li @click="gotoAdvs($store.state.temp.default.advs[4].link)"><img :src="$store.state.temp.default.advs[4]?$store.state.temp.default.advs[4].img:require('../../assets/images/loading.jpg')" alt="" style="width:100%;height:100%;"></li>
								<li @click="gotoAdvs($store.state.temp.default.advs[5].link)"><img :src="$store.state.temp.default.advs[5]?$store.state.temp.default.advs[5].img:require('../../assets/images/loading.jpg')" alt="" style="width:100%;height:100%;"></li>
								<li @click="gotoAdvs($store.state.temp.default.advs[6].link)"><img :src="$store.state.temp.default.advs[6]?$store.state.temp.default.advs[6].img:require('../../assets/images/loading.jpg')" alt="" style="width:100%;height:100%;"></li>
							</ul>
						</div>
					</div>
					<div id="brand-box" v-if="!this.fun.isTextEmpty($store.state.temp.default.brand)">
						<div class="title">
							<!-- <yd-icon class="icon-member-logo" custom size="24px" color="#ff9800"></yd-icon> -->
							<div class="img"><img src="../../assets/images/member-logo.png"></div>
							<h1>品牌优选</h1>
						</div>
						<ul>
							<!-- <li><div class="img"><img src=" "></div><span>乐高</span></li>
							<li><div class="img"><img src=" "></div><span>乐高</span></li>
							<li><div class="img"><img src=" "></div><span>乐高</span></li>
							<li><div class="img"><img src=" "></div><span>乐高</span></li>
							<li><div class="img"><img src=" "></div><span>乐高</span></li>
							<li><div class="img"><img src=" "></div><span>乐高</span></li> -->
							<li v-for="item in $store.state.temp.default.brand" @click="gotoBrand(item)">
								<div class="img"><img :src="item.logo"></div><span>{{item.name}}</span></li>
						</ul>
					</div>

					<div id="limit-time" v-if="!this.fun.isTextEmpty($store.state.temp.default.time_goods)">
						<div class="title-box">
							<ul>
								<li class="main-title">
									<!-- <yd-icon class="icon-member-time1" custom size="24px" color="#f96587"></yd-icon> -->
									<div class="img"><img src="../../assets/images/member-time03.png"></div>
									<h2>限时优惠</h2>
								</li>
								<li class="vice-title">用最低价格买好物</li>
							</ul>
						</div>
						<div class="goods-box">
							<div class="goods" v-for="item in $store.state.temp.default.time_goods" @click="gotoTimeGood(item.id)">
								<div class="left"><img :src="item.thumb" style="width:100%;height:100%;" /></div>

								<ul>
									<li class="title">
										<h3>{{item.title}}</h3></li>
									<li class="price">限时价：￥<span>{{item.price}}</span>/天
										<font>￥{{item.market_price}}/天</font>
									</li>
									<li class="time">
										<yd-icon class="icon-member-time" custom size="26px" color="#f96587"></yd-icon>
										<!-- <span>还剩2天20:00:59</span> -->
										<yd-countdown slot="right" :time="item.has_one_goods_limit_buy.end_time" class="bottom">
											<em style="padding:2px;border-radius:2px;">{%d}</em>天
											<em style="padding:2px;border-radius:2px;">{%h}</em><b>:</b>
											<em style="padding:2px;border-radius:2px;">{%m}</em><b>:</b>
											<em style="padding:2px;border-radius:2px;">{%s}</em>
										</yd-countdown>
									</li>
								</ul>

							</div>

							<!-- <div class="goods">
							<div class="left"></div>
							
								<ul>
									<li class="title"><h3>芸众商城宝得适安全座椅双面骑士辣椒红</h3></li>
									<li class="price">限时价：￥<span>3.80</span>/天<font>￥3.80/天</font></li>
									<li class="time">
										<yd-icon class="icon-member-time" custom size="26px" color="#f96587"></yd-icon>
										<span>还剩2天20:00:59</span>
									</li>
								</ul>
							
						</div>
						<div class="goods">
							<div class="left"></div>
							
								<ul>
									<li class="title"><h3>芸众商城宝得适安全座椅双面骑士辣椒红</h3></li>
									<li class="price">限时价：￥<span>3.80</span>/天<font>￥3.80/天</font></li>
									<li class="time">
										<yd-icon class="icon-member-time" custom size="26px" color="#f96587"></yd-icon>
										<yd-countdown time="2018/05/06 00:00:00" format="还剩{%d}天{%h}:{%m}:{%s}"></yd-countdown>
									</li>
								</ul>
							
						</div> -->
						</div>
					</div>

					<div id="pop-recommend" v-if="!this.fun.isTextEmpty($store.state.temp.default.goods)">
						<div class="title-box">
							<ul>
								<li class="main-title">
									<div class="img"><img src="../../assets/images/member-hot.png"></div>
									<!-- <yd-icon class="icon-member-pop" custom size="24px" color="#6da9f5"></yd-icon> -->
									<h2>人气推荐</h2>
								</li>
								<li class="vice-title">精选最适合您得商品</li>
							</ul>
						</div>

						<div class="goodsList" v-if='$store.state.temp.default'>
							<c-goodsList :goods='$store.state.temp.default.goods' text='推荐商品'></c-goodsList>
						</div>

						<!-- <div class="goods-box"> -->
						<!-- <div class="goods">
								<div class="img"></div>
								<ul>
									<li class="name"><h3>芸众商城</h3></li>
									<li class="price">￥<b>3.80</b>/天</li>
								</ul>
							</div>
							<div class="goods">
								<div class="img"></div>
								<ul>
									<li class="name"><h3>芸众商城宝得适安全座椅双面骑士辣椒红椅</h3></li>
									<li class="price">￥<b>3.80</b>/天</li>
								</ul>
							</div>
							<div class="goods">
								<div class="img"></div>
								<ul>
									<li class="name"><h3>芸众商城宝得适安全座椅双面骑士辣椒红</h3></li>
									<li class="price">￥<b>3.80</b>/天</li>
								</ul>
							</div> -->

						<!-- </div> -->
					</div>
				</div>

				<!--区域分站结束-->

			</div>

			<div class="temp" v-if='$store.state.temp.item'>
				<div class="home" v-if='$store.state.temp.item.pageinfo'>
					<template v-if="$store.state.temp.item.pageinfo.temp=='topbar'">
						<!-- 浮动按钮 -->
						<div class="fe-floatico" v-if="$store.state.temp.item.pageinfo.params.floatico==1" :style="{'position':'fixed','width':$store.state.temp.item.pageinfo.params.floatwidth,'top':$store.state.temp.item.pageinfo.params.floattop}" :class="{'fe-floatico-right':$store.state.temp.item.pageinfo.params.floatstyle=='right'}">
							<a :href="$store.state.temp.item.pageinfo.params.floathref"><img :src="$store.state.temp.item.pageinfo.params.floatimg || './static/app/app/images/init-image-7.png'" style="height:100%; width: 100%;" /></a>
						</div>
					</template>
					<div class="home" v-if="$store.state.temp.item.data">
						<template v-for="item in $store.state.temp.item.data">
							<component :is="item.temp" :datas='item'></component>
						</template>
						<div style="height: 53px;"></div>
					</div>
				</div>
			</div>

			<!--<div class="temp" v-if='$store.state.temp.item'>
		<div class="home" v-if="$store.state.temp.item.data">
			<template v-for="item in $store.state.temp.item.data">
				<component :is="item.temp" :datas='item'></component>
			</template>
			<div style="height: 53px;"></div>
		</div>
	</div>-->
			<mt-popup v-model="search_show" popup-transition="fade" position="right" style="width:100%;height:100%;z-index:10000;background-color:#f5f5f5;">
				<mt-header fixed title="选择区域" style="background:#fff;color:#333;border-bottom:1px solid #e8e8e8;">
					<mt-button icon="back" @click="search_show=false" slot="left"></mt-button>
				</mt-header>
				<div style="height:46px;clear:both;"></div>

				<div id="popup">
					<!-- <div id="search-box">
					<div id="search">
						<yd-icon class="iconfont icon-sousuo1" custom size="16px" color="#999"></yd-icon>
						<input type="text" placeholder="请输入城市名">
					</div>
				</div> -->
					<div class="current-area">当前区域：{{currentCity}}-{{currentZone}}</div>
					<h1>已开放城市</h1>
					<div class="city-list">
						<div class="current-city">
							<div v-for="(item,index) in province">
								<div class="tbs" @click.stop='toggle($event,index)'>

									<div class="li2">
										<div class="icon">
											<yd-icon class="iconfont icon-icon_location" custom size="16px" color="#ff9800"></yd-icon>
										</div>
										<div class="name">{{item.name}}</div>
									</div>
									<div class="li4">
										<span>选择城市</span>
										<i class='fa' :class="{'fa-angle-down':sort==index,'fa-angle-right':sort!=index}"></i>
									</div>
								</div>
								<transition name="fade">
									<div class="tbs3" v-show='sort==index'>
										<div v-for="(val,i) in item.item" style="line-height:30px;border-bottom:1px;">
											<div class="tbs1" @click.stop='toggle1($event,i)'>
												<div class="li2">
													<!-- <div class="icon"><yd-icon class="iconfont icon-icon_location" custom size="16px" color="#ff9800"></yd-icon></div> -->
													<div class="name"><span>{{val.name}}</span></div>
												</div>
												<div class="li4">
													<i class='fa' :class="{'fa-angle-down':sort1==i,'fa-angle-right':sort1!=i}"></i>
												</div>
											</div>
											<transition name="fade">
												<div class="tbs3-1" v-show='sort1==i'>
													<!-- <button type="button">白云区</button>
                                        <button type="button">珠海区</button>
                                        <button type="button">番禹区</button> -->
													<button type="button" v-for="val1 in val.district" @click.prevent="zoneSearch(val.name,val1.name)">{{val1.name}}</button>
												</div>
											</transition>
										</div>
									</div>
								</transition>
							</div>

						</div>
					</div>

				</div>

			</mt-popup>
		</div>
	</div>
</template>

<script>
	import home from './home_controller';
	export default home;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
	@import '../../assets/css/index.scss';
	/*//弹窗样式*/
	
	#popup {
		overflow: auto;
		height: 688px;
		background-color: #f5f5f5;
		text-align: left;
		#search-box {
			background-color: #fff;
			height: 45px;
			padding: 0 14px;
			margin-bottom: 10px;
			padding-top: 9px;
			#search {
				display: flex;
				border: solid 1px #ebebeb;
				height: 28px;
				line-height: 28px;
				border-radius: 14px;
				padding: 0 10px;
				background-color: #fafafa;
			}
			input {
				line-height: 28px;
				border: none;
				color: #333;
				margin-left: 6px;
			}
		}
		.current-area {
			background-color: #fff;
			line-height: 45px;
			padding: 0 14px;
			color: #333;
			font-size: 14px;
		}
		h1 {
			line-height: 30px;
			padding: 0 14px;
			color: #999;
		}
		.city-list {
			position: relative;
			.left,
			.other-area {
				i {
					position: absolute;
					left: 14px;
				}
			}
			.current-city {
				background-color: #fafafa;
				.level-pro {
					background-color: #fff;
					display: flex;
					justify-content: space-between;
					line-height: 40px;
					padding: 0 14px 0 36px;
					font-size: 14px;
					color: #333;
					border-bottom: solid 1px #ebebeb;
					.right {
						span {
							color: #999;
						}
						i {
							color: #999;
							font-size: 18px;
							margin-left: 6px;
						}
					}
				}
				.level-city {
					display: flex;
					justify-content: space-between;
					background-color: #fafafa;
					line-height: 40px;
					padding: 0 14px 0 36px;
					font-size: 14px;
					border-bottom: solid 1px #ebebeb;
					i {
						color: #999;
						font-size: 18px;
					}
				}
				.level-area {
					padding: 10px 14px 20px 14px;
					border-bottom: solid 1px #ebebeb;
					button {
						width: 32%;
						margin-right: 1%;
						height: 30px;
						border: solid 1px #ebebeb;
						border-radius: 4px;
						margin-top: 12px;
						background-color: #fff;
					}
					button:nth-child(3n) {
						margin: 0;
					}
				}
			}
			.other-area {
				background-color: #fff;
				line-height: 40px;
				border-bottom: solid 1px #ebebeb;
				padding: 0 14px 0 36px;
				font-size: 14px;
			}
		}
		.tbs {
			position: relative;
			display: flex;
			justify-content: space-between;
			background: #fff;
			border-bottom: #e8e8e8 1px solid;
			height: 45px;
			line-height: 45px;
			float: left;
			width: 100%;
			background: #fff;
			font-size: 14px;
			padding: 0 14px;
			.left {
				font-size: 0.8rem;
				box-sizing: border-box;
				width: 50%;
				text-align: left;
				height: 45px;
				line-height: 45px;
				float: left;
				img {
					width: 30%;
					float: left;
				}
			}
			.right {
				width: 50%;
				text-align: right;
			}
			a {
				color: #000;
			}
			.relation {
				color: #666;
			}
			.id,
			.level {
				font-size: 0.9rem;
				line-height: 45px;
			}
			.fa.fa-search {
				color: #999;
				font-size: 20px;
			}
			i {
				font-size: 24px;
			}
			.img {
				margin: 10px 0;
			}
			.li1 {
				width: 50px;
				height: 50px; // margin-top:10px;
				// margin-left:10px;
				float: left;
				line-height: 50px;
				background: #ccc;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.li2 {
				width: 50%;
				display: flex;
				float: left;
				position: relative;
				p {
					margin-top: 7px;
					margin-left: 10px;
					text-align: left;
				}
				.name {
					position: absolute;
					left: 26px;
				}
			}
			.li3 {
				flex: 30%;
				width: 30%;
				span {
					border: #b1a6a6 solid 1px;
					padding: 5px 20px;
					border-radius: 7px;
					display: none;
				}
			}
			.li4 {
				// flex: 5%;
				// width: 5%;
				float: right;
				text-align: right;
				i {
					color: #999;
					font-size: 18px;
				}
				span {
					color: #999;
					margin-right: 6px;
				}
			}
		}
		.tbs3 {
			.left {
				width: 46%;
				text-align: left;
				height: 45px;
				display: inline-block;
				line-height: 45px;
				img {
					width: 30%;
				}
			}
			.left1 {
				width: 100%;
				text-align: left;
				height: 45px;
				padding-left: 13px;
				display: inline-block;
				line-height: 45px;
				img {
					width: 30%;
				}
			}
			.right {
				width: 46%;
				display: inline-block;
				text-align: right;
				height: 45px;
				line-height: 45px;
			}
		}
		.tbs1 {
			display: flex;
			justify-content: space-between;
			background: #fff;
			border-bottom: #e8e8e8 1px solid;
			padding: 0px 14px;
			float: left;
			width: 100%;
			background: #fafafa;
			line-height: 45px;
			font-size: 14px;
			.left {
				font-size: 0.8rem;
				box-sizing: border-box;
				width: 50%;
				text-align: left;
				height: 45px;
				line-height: 45px;
				float: left;
				img {
					width: 30%;
					float: left;
				}
			}
			.right {
				width: 50%;
				text-align: right;
			}
			a {
				color: #000;
			}
			.relation {
				color: #666;
			}
			.id,
			.level {
				font-size: 0.9rem;
				line-height: 45px;
			}
			.fa.fa-search {
				color: #999;
				font-size: 20px;
			}
			i {
				font-size: 24px;
			}
			.img {
				margin: 10px 0;
			}
			.li1 {
				width: 50px;
				height: 50px; // margin-top:10px;
				// margin-left:10px;
				float: left;
				line-height: 50px;
				background: #ccc;
				img {
					width: 100%;
					height: 100%;
				}
			}
			.li2 {
				width: 50%;
				display: flex;
				float: left;
				position: relative;
				p {
					margin-top: 7px;
					margin-left: 10px;
					text-align: left;
				}
				.name {
					position: absolute;
					left: 26px;
				}
			}
			.li3 {
				flex: 30%;
				width: 30%;
				span {
					border: #b1a6a6 solid 1px;
					padding: 5px 20px;
					border-radius: 7px;
					display: none;
				}
			}
			.li4 {
				// flex: 5%;
				// width: 5%;
				float: right;
				text-align: right;
				i {
					color: #999;
					font-size: 18px;
				}
			}
		}
		.tbs3-1 {
			padding: 0 14px 20px 14px;
			border-bottom: solid 1px #ebebeb;
			.left {
				width: 46%;
				text-align: left;
				height: 45px;
				display: inline-block;
				line-height: 45px;
				img {
					width: 30%;
				}
			}
			.left1 {
				width: 100%;
				text-align: left;
				height: 45px;
				padding-left: 13px;
				display: inline-block;
				line-height: 45px;
				img {
					width: 30%;
				}
			}
			.right {
				width: 46%;
				display: inline-block;
				text-align: right;
				height: 45px;
				line-height: 45px;
			}
			button {
				width: 32%;
				margin-right: 1%;
				height: 30px;
				border: none;
				border-radius: 4px;
				margin-top: 12px;
				background-color: #ebebeb;
				color: #333;
			}
			button:nth-child(3n) {
				margin: 0;
			}
		}
	}
	
	.scroll {
		position: static,
	}
	
	.fibben-scroll {
		position: fixed;
		z-index: 2001;
	}
</style>