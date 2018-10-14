<template>
	<div id="goodslist">
		<!-- <h3><div class="title">{{text}}</div><div class="spas"></div></h3> -->
		<div class="mai">
			<div class="main" v-show='view'>			
				<dl v-for="item in goods" @click.stop="gotoDetail(item.goods_id)">	
					<!-- <router-link :to="fun.getUrl('goods',{ id: item.goods_id })"> -->
					<dt v-if="item.thumb"><img v-lazy="item.thumb" @click.stop="gotoDetail(item.goods_id)"/></dt>
					<dt v-if="!item.thumb"><img src="../assets/images/img_default.png"/></dt>
					<dd class="m-text">{{item.title}}</dd>
					<dd class="s3"><p class="s1"><span class="s"><small>￥</small><em>{{(item.member_discount!=false&&item.member_discount.discount_value!=0?item.member_discount.discount_value:item.price)}}</em></span><span class="s2" >￥{{item.price}}</span> </p>

					</dd>
					<!-- </router-link> -->
				</dl>			
			</div>
			<div class="main2" v-show='view==false'>
					<div class="list" v-for="items in goods"  @click.stop="gotoDetail(items.goods_id)">
						<div class="imgs">
							<!-- <router-link :to="fun.getUrl('goods',{ id: items.goods_id })" v-if='items.thumb'><img v-lazy="items.thumb"/></router-link>
							<router-link :to="fun.getUrl('goods',{ id: items.goods_id })" v-if='!items.thumb'><img src="../assets/images/img_default.png"/></router-link> -->
							<img v-lazy="items.thumb" v-if='items.thumb' @click.stop="gotoDetail(items.goods_id)"/>
							<img src="../assets/images/img_default.png" v-if='!items.thumb'/>
						</div>
						<div class="shop_info">
							<ul>
								<!-- <h4><router-link :to="fun.getUrl('goods',{ id: items.goods_id })">{{items.title}}</router-link></h4>
								<span><router-link :to="fun.getUrl('goods',{ id: items.goods_id })">￥{{items.price}}</router-link></span>	 -->
								<li class="title">
									{{items.title}}</li>
								<li class="member" style="color: red;text-decoration: none;padding-top: 10px;"><small>￥</small>{{(items.member_discount!=false&&items.member_discount.discount_value!=0?items.member_discount.discount_value:items.price)}}</li>
								<li style="color: #CCCCCC;padding: 10px 5px;"><del >¥{{items.price}}</del></li>
							</ul>
						</div>						
					</div>
			</div>	
		</div>

		<div class="loadNomore" v-show='loading'><img :class="{'big-no-img': goods.length<=0?true:false}" src="../assets/images/no-more-product.png"/></div>
	</div>
</template>

<script>
	import { Lazyload } from 'mint-ui';
	import { InfiniteScroll } from 'mint-ui';
	import { mapState } from 'vuex';
	export default {
		props: ['goods', 'text', 'loadMore','loading','disabledt'],
		data() {
			return {
				list:[0],
				toi:this.fun.getKeyByI(),
				types:this.fun.getTyep(),
            }
		},
		methods: {
			bgoo(){
				//this.$router.push({name:'goods',params:{id:8},query:{i:2}});
				this.$router.push(this.fun.getUrl('goods',{id:13}));
			},
			//跳转至详情
			gotoDetail(id){
				event.preventDefault();
				$http.get("goods.goods.get-goods",{id:id},"加载中...").then(response =>{
                if(response.result == 1){
                    if(response.data.is_course == 1){
						console.log("goolist .......")
                        this.$router.push(this.fun.getUrl('CourseDetail',{goods_id:id}));
                    }else if(response.data.goods_type == 1){
						this.$router.push(this.fun.getUrl('goodsO2O', { id: id ,"tag":"o2o",store_id: response.data.store_id}));
                    }else{
						console.log("goolist .......")
						 this.$router.push(this.fun.getUrl('goods',{id:id}));
					}
                }
				}).catch(error =>{
					console.log(error);
				})
			}
		},
		computed: mapState(["view"])
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#goodslist {
		background: #f5f5f5;

		a{color: #2b2f33;}
		.main2{
			/*margin-top: 30px;*/
			.list{display: flex; background: #ffffff;padding:10px 12px;border-bottom:solid 1px #e2e2e2;}
			.imgs{flex:1.5;box-sizing: border-box;margin-right:10px;   
			overflow: hidden;
					img {width: 100%;}
				}
			.shop_info{flex:3;
						text-align: left;
						ul{
							display: flex;
							justify-content: space-between;
							margin-bottom:10px;
							flex-direction: column;
						}
				.title{font-size:.9rem;
				flex:3;
				 display: -webkit-box;
				 -webkit-box-orient: vertical;
				 -webkit-line-clamp:2;
				 overflow: hidden;
				 }
				.member{font-size:1rem;color:#f15353;flex:1;
				/*text-align: right;margin-left:10px;*/
				 a{color: #f23030; font-weight: bold;
				margin-top: 10px;}}
			}
			
		}
		.loadNomore {
			position: relative;
			width: 100%;
			height: 4rem;
			background: #f5f5f5;
			img {
				position: absolute;
				/*top: 5px;*/
				left: 0;
				right: 0;
				width: 3.5rem;
			}		
			.big-no-img{
				top: 130px;
				width: 30%;
				height: auto;
			}
		}
		h3 {
			width: 80%;
			position: relative;
			margin:0 auto 20px;
			height: 20px;
			padding: 10px 0 0;
			.title {
				width: 60%;
				text-align: center;
				padding: 0 10px;
				background: #F5F5F5;
				position: absolute;
				z-index: 9;
				left: 0;
				right: 0;
				margin: auto;
				font-size: 14px;
				color: #666;
			}
			.spas {
				border-bottom: 1px solid #d9d9d9;
				position: absolute;
				z-index: 5;
				top: 20px;
				width: 100%;
			}
		}
		.mai {
			width: 100%;
			overflow: hidden;
		}
		.main {
			overflow: hidden;
			margin-right: -1px;
			background: #f5f5f5;
            /*margin-top: 20px;*/
			dl:nth-child(2n){margin-right: 0}

			dl {
				padding: 0;
				/*border-bottom: 1px solid #f5f5f5;
				border-right: 1px solid #f5f5f5;*/
				box-sizing: border-box;
				-moz-box-sizing: border-box;
				-webkit-box-sizing: border-box;
				float: left;
				margin-bottom: 1vw;
				margin-right: 1vw;
				background: #fff;
				width: 49.3vw;

				dt{height: 50vw;line-height: 82vw;}
				dt{width:100%;
					height:0px;
					padding-bottom:100%;
					position:relative;
				img {
					width: 100%;

					right:0;
					height:100%;
					position:absolute;
				}}
				.s3 {
					height: 25px;
					display: block;
					/* line-height: 30px; */
					text-align: left;
					margin: 0 5px;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 1;
					word-break: break-all;
					overflow: hidden;

				}
				dd {
					margin: 0;
					.s1 {margin:0;
						.s {color: #F55955;
						font-size: 1rem;
						vertical-align: middle;}


						em{font-size: 16px;font-style: normal}
					}
					.s2 {
						text-decoration: line-through;
						vertical-align: middle;
						color: #888;
						font-size: 12px;
						margin-left: 10px;
					}
				}
				.m-text {
					font-size: .9rem;
					margin: 5px;
					height: 42px;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					word-break: break-all;
					overflow: hidden;
					line-height: 1.34rem;
					text-align: justify;
				}
			}
		}
	}
</style>