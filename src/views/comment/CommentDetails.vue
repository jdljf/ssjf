<template>
	<div id="commentDetails">
		<c-title :hide="false" text='评价详情'></c-title>
		<div style="height: 40px;"></div>
		<div class="all">
		<div class="pj">
					<div layout="row" layout-align="start center" id="user" style="text-align: stretch;">
						<div class="userimg"><img :src="head_img_url" /></div>
						<div class="name">{{nick_name}}</div>
						<div class="spaet">{{created_at}}</div>	
					</div>
					<el-rate style="text-align: left;margin-top: 10px;" v-model="level"  disabled show-text text-color="#ff9900" >
						</el-rate>

						
					<p>{{content}}</p>
					
					
		</div>
		<div id="zjpj" v-if="append">
			<div class="zp" layout="row">
				<span>追评</span>
				<div class="spaet">{{append.created_at}}</div>
			</div>
			<p>{{append.content}}</p>
			<div class="pic" v-for="item in append.images">
				<div><img :src="item" /></div>
				
			</div>
		</div>
		<div class="pjgoods" v-if="has_one_order_goods">
			<div class="goods">
				<div class="img">
					 <img :src="has_one_order_goods.thumb">
				</div>
				<div class="warp">
				<ul class="inner">
					<li class="name">{{has_one_order_goods.title}}</li>
					
					<li class="option">
						规格: {{has_one_order_goods.goods_option_title}}
						
						<div class="product_price">￥{{has_one_order_goods.price}}</div>
						<div class="option"> ×{{has_one_order_goods.total}}</div>
					</li>
				</ul>
				
				</div>
			</div>
		</div>	

	</div>
	
		<div class="allpl" v-if="has_many_reply.length>0">
			<div class="tilse"><i class="fa fa-comment-o" style="font-size:19px;"></i>全部评论</div>
			
		<div class="pj">
					<div layout="row"
					     layout-align="start center"
					     id="user">
						<div class="userimg"><img :src="head_img_url" /></div>
						<div>{{nick_name}}</div>
						<div class="spaet">{{created_at}}</div>						
					</div>
					<p>{{content}}</p>
		</div>	
		<div class="pjhf" layout="row" layout-align="start center">
			<div class="pjtime">{{created_at}}</div>
			<span @click="submitReplyForComment">回复q</span>
		</div>
		<div class="othepj" v-if="has_many_reply.length>0">
			<div v-for="item in has_many_reply" class="pj" style="background: #efedf5;">
				<div layout="row"
				     layout-align="start center"
				     id="user">
					<div class="userimg"><img :src="item.head_img_url" /></div>
					<div>{{item.nick_name}}</div>
					<div class="spaet">{{item.created_at}}</div>						
				</div>
				<p>{{item.nick_name}}<span style="padding:0 5px;">回复</span>{{item.reply_name}}:{{item.content}}</p>
				<div class="pjhf" layout="row" layout-align="start center">
					<div class="pjtime">{{item.created_at}}</div>
					<span @click="replyToSomeOne(item)">回复3</span>
				</div>	
			</div>					
		</div>		
		</div>
		<div v-if="has_many_reply.length>0" id="callback" layout="row" layout-align="start center">
			<input v-model="reply_content" type="" :placeholder="reply_placeholder"/>
			<button @click="submitReply">提交</button>
		</div>		
	</div>
</template>
<script>
//CommentDetailsController
import CommentDetailsController from './CommentDetailsController';
export default CommentDetailsController;


</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#commentDetails {
	a {	color: #000;}
	.all{background: #FFF;padding: 0 10px;margin-bottom: 10px;}
	#callback{
		position: fixed;bottom: 0;width: 100%;background: #FFF;padding:10px 0;
		input{flex: 5; border: #919191 solid 1px;border-radius: 5px;line-height: 30px;padding-left: 5px;margin-left: 5px;}
		button{flex: 1;border: #dd191d solid 1px;border-radius: 5px;background: #e84e40;color: #FFF;line-height: 30px;margin: 0 10px;}
	}	
	.userimg{border-radius:50%;overflow: hidden; width: 40px; margin-right: 10px;
		img{display: block;width: 100%;height: 40px;}
	}
	.zp{
		span{color: #e84e40;}
	}
	#zjpj{border-bottom: #e8e8e8 solid 1px;background: #FFF;padding: 10px 0;font-size: 14px;}
	.spaet{color: #919191;flex: 3;text-align: right;font-size: 0.8rem}
	.pj {border-bottom: #e8e8e8 solid 1px;background: #FFF;padding: 10px 0;
		p {text-align: left;margin-top: 10px;line-height: 24px;font-size:14px;}
		img {width: 100%;}
		.name{
			font-size:0.9rem;
			color: #919191;
		}
	}
	.pic {display: flex;align-items: stretch;flex-flow: row wrap;padding: 10px;background: #FFF;
		div {flex: 33%;
			img {width: 90%;}
		}
	}.pjgoods{padding: 10px 0;background: #FFF;}
	


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
            
            width: 100%;
            box-sizing: border-box;
            background: #fff;
            .img {
                /*flex: 1;*/
                width: 30%;
                float: left;
                display: inline-block;
                /*background:blue;*/
                img {
                    width: 100%;
                    max-height: 100px;
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
				
				.price {
					width: 30%;
					align-items: center;
					text-align: right;
					box-sizing: border-box;
					float: left;
					p {
						margin-top: 0
					}
					
					.yijp {
						background: #888888;
						padding: 0 5px;
						color: #FFF;
					}
				}
				
			}
            .product_price {
				/*margin-bottom: 10px;*/
				font-size: 14px;
				color: #F15353;
			}
			


	/*	.price {flex: 2;display: flex;flex-direction: column;align-items: flex-end;
			font {flex: 3;}
			span {border: solid 1px #BFCBD9;border-radius: 13px;padding: 1px 10px;font-size: .8rem;line-height: 1.2rem;	margin: 0;background: #FFF;}
			.yijp {	background: #888888;padding: 0 5px;color: #FFF;	}
		}*/
		.option {
		    color: #888;
		    /*font-size: 0.4rem;*/
		    /*flex: 1;*/
		 	position: relative;
		    width: 100%;
		    font-size: 14px;
		    .product_price{
	  	  	  position: absolute;
		      right: 0;
		  	  bottom: 0;
		      color: #f15353;
		  }
	    }
		.option2 {color: #e84e40;font-size: .9rem;flex: 1;width: 100%;
				font {float: left;}
		}
	}
	.allpl{margin-top: 10px;margin-bottom: 50px;background: #FFF;padding: 10px;
		.tilse{text-align: left;line-height: 2rem;border-bottom: #e8e8e8 solid 1px;}
		.pjhf{padding: 10px 0;
			.pjtime{color: #919191;flex: 5;text-align: left;}
			span{padding: 1px 10px;border: solid 1px #BFCBD9; border-radius: 13px;}
		}
		.othepj{background: #efedf5;padding-left: 30px;padding-right: 10px;}
	}		
}
</style>