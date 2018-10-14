<template>
	<!--拼团页面-->
	<div id="groupwait">
		<c-title :hide="false" text='等待拼团'></c-title>
		<div style="height: 40px;"></div>
		<div>
			<div class="group-inviate">
				<img class="avatar" src="../../../assets/images/pt.png" />

				<div class="group-inviate-state">
					<div class="inviate-success">开团成功啦！</div>
					<div class="inviate-friend">还需{{group_num-personlength}}位小伙伴参团，快来邀请好友参团</div>
				</div>
			</div>

			<div class="goods" @click="nogotoDetail(groupgoods.goods_id)">
				<div class="img"><img :src="groupgoods.thumb" /></div>
				<div class="warp">
					<div class="inner">
						<div class="name">{{groupgoods.title}}</div>
						<div class="option">
							<img style="width: 20px;height: 20px;position: absolute;top:0px;" src="../../../assets/images/litpt.png" />
							<span style="margin-left: 24px;" @click="appShare">{{group_num}}人团</span>
							<span class="money">¥{{groupgoods.goods_price}}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="people">
				<div class="end-times" v-if="timeshow1">距离<span class="end-time" ref="myh3" v-if="dd!=0">{{dd}}</span>:<span class="end-time" ref="myh3">{{hh}}</span>:<span class="end-time">{{mm}}</span class="end-time">:<span class="end-time">{{ss}}</span>结束</div>
				<div class="end-times" v-if="timeshow">拼团时间已经过了咯!赶快去其他商品拼团吧！</div>
				
				<div class="peoples" ref="mybox">
					<div v-for="ele in groupperson" class="people-item">
						<div v-if="ele.is_group_leader==1" class="after">团长</div><img :src="ele.belongs_to_member.avatar" />
					</div>
					<div class="people-item" @click="gotoPerson">
						<div class="points" style="line-height: 50px;">
							<span class="point"></span>
							<span class="point"></span>
							<span class="point"></span>
						</div>
					</div>
				</div>
				<div style="width: 85%;margin-left: 7.5%;margin-bottom: 20px;">
				<progressbar :rest="widths"  :barwidth="width"></progressbar>
				</div>
				<div class="rule-title">
					<span class="line"></span>
					<span class="txt">拼团规则</span>
					<span class="line"></span>
				</div>
				<div class="rule">
					<div class="bar"></div>
					<div class="rule_detail" style="left: 0;">
						<div class="rule_num">1</div>
						<div class="rule_scr">选择商品</div>
					</div>
					<div class="rule_detail" style="left: 27%;">
						<div class="rule_num">2</div>
						<div class="rule_scr">开团/参团</div>
					</div>
					<div class="rule_detail" style="left: 54%;">
						<div class="rule_num">3</div>
						<div class="rule_scr">邀请好友</div>
					</div>
					<div class="rule_detail" style="left: 81%;">
						<div class="rule_num">4</div>
						<div class="rule_scr">人满成团</div>
					</div>
				</div>
			</div>
			<div id="foot">
				<div class="more-group" @click="gotolist">更多拼团</div>
				<div class="more-group"   v-if="showbtn" style="background: #FC9022;" @click="gotoDetail(groupgoods.goods_id)">去购买</div>
				<div class="inviate-group" v-if="joinshow" @click="shareWeixin">邀请好友参团</div>
			</div>
		</div>
	</div>
</template>
<script>

	import groupwait from './groupwait.js'
	export default groupwait
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#groupwait {
		/*显示开团成功*/
		.group-inviate {
			display: flex;
			align-items: center;
			padding: 10px 10px;
			/*border-bottom: 1px solid #ccc;*/
			background: #FAFAFA;
			.avatar {
				width: 50px;
				background: #90ABDD;
				border-radius: 50%;
				border: 1px solid #fff;
			}
			.group-inviate-state {
				flex: 1;
				font-size: 0;
				text-align: left;
				margin-left: 13px;
				.inviate-success {
					font-size: 1rem;
					font-family: MicrosoftYaHeiLight;
					font-weight: 600;
					line-height: 1.1rem;
					color: #222;
					margin-bottom: 7px;
				}
				.inviate-friend {
					line-height: 1.1rem;
					font-size: 0.8rem;
					border-radius: 4px;
					color: #ccc;
				}
			}
		}
		.goods:after {
			content: "";
			display: block;
			clear: both;
		}
		.goods {
			padding: 20px 10px;
			/*width: 100%;*/
			box-sizing: border-box;
			background: #FFFFFF;
			border-top: 1px solid #ebebeb;
			border-bottom: 1px solid #ebebeb;
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
			.warp {
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
						width: 100%;
						text-align: left;
						color: #333333;
						margin-bottom: 10px;
						white-space: normal;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						/*autoprefixer: off*/
						-webkit-box-orient: vertical;
						/*autoprefixer: on*/
						font-size: .9rem;
						height: 2.5rem;
						line-height: 1.3rem;
					}
				}
				.price {
					width: 30%;
					align-items: center;
					text-align: right;
					color: #333333;
					box-sizing: border-box;
					float: left;
					font-size: 14px;
					.money {
						margin-bottom: 10px;
						font-size: 1rem;
					}
				}
			}
			.option {
				color: #888;
				/*font-size: 0.4rem;*/
				/*flex: 1;*/
				position: relative;
				width: 100%;
				font-size: .8rem;
				height: 2rem;
				.numb {
					position: absolute;
					right: 0;
					bottom: 1.2rem;
					line-height: 1.6rem;
				}
				.specifications {
					position: absolute;
					left: 0;
					bottom: 0;
					font-size: .8rem;
					width: 120px;
					overflow: hidden;
				}
				.money {
					margin-left: 6px;
					font-size: 1.2rem;
					color: #F4283C;
				}
			}
		}
		/*拼团人员*/
		.people {
			background: #fff;
			margin-top: 10px;
			/*padding: 20px;*/
			.end-times {
				padding-top: 10px;
				color: #666;
				.end-time {
					font-size: 0.8rem;
					height: 1rem;
					width: 1rem;
					background: #000000;
					color: #fff;
					border-radius: 4px;
					padding: 0 4px;
					margin: 0 5px;
				}
			}
			.peoples {
				display: flex;
				padding: 20px 0;
				/*height: 90px;*/
				overflow: hidden;
				flex-flow: wrap;
				.people-item {
					position: relative;
					margin: 10px 3%;
					border-radius: 50%;
					width: 14%;
				    background: #ECECEC;
					.after {
						position: absolute;
						padding: 2px 7px;
						background-color: #DB2420;
						top: -10%;
						right: -20%;
						border-radius: 10px;
						color: #fff;
						font-size: 10px;
						z-index: 10;
					}
					img {
						display: block;
						width: 100%;
						height: 100%;
						border-radius: 50%;

					}
					.points {
						.point {
							display: inline-block;
							width: 5px;
							height: 5px;
							background: #666;
							border-radius: 50%;
						}
					}
				}
			}
			.progress_bar {
				margin: 0px 10px 20px;
				border: 1px solid #FF4500;
				background: #FFA07A;
				height: 10px;
				.ready_bar {
					width: 50%;
					height: 100%;
					background: #ff4500;
				}
			}
			.rule-title {
				font-size: 0.8rem;
				text-align: center;
				color: #999;
				.line {
					display: inline-block;
					width: 50px;
					border: 1px solid #ccc;
				}
				.txt {
					color: black;
					vertical-align: middle;
					vertical-align: -20%;
					margin: 0 10px;
				}
			}
			.rule {
				position: relative;
				display: flex;
				justify-content: center;
				align-content: center;
				min-height: 130px;
				margin: 15px 20px 0;
				.bar {
					width: 81%;
					position: absolute;
					border-top: 2px solid #CCCCCC;
					top: 0.4rem;
				}
				.rule_detail {
					flex: 1;
					position: absolute;
					.rule_num {
						height: 1rem;
						width: 1rem;
						margin: 0px auto 5px;
						border-radius: 50%;
						border: 1px solid #CCCCCC;
						background: #FFF;
						line-height: 1rem;
					}
					.rule_scr {}
				}
			}
		}
		/*拼团商品*/
		/*.list{
		display: flex; background: #ffffff;padding:10px 12px;border-bottom:solid 1px #e2e2e2;
		.imgs{flex:1.5;box-sizing: border-box;margin-right:10px;   
		overflow: hidden;
				img {width: 100%;}
			}
		.option {
	      color: #888;
	      position: relative;
	      width: 100%;
	      font-size: 1rem;
	      height: 2rem;
	      .numb{
	      	position: absolute;
	      	right: 0;
	      	bottom: 1.2rem;
	      	line-height: 1.6rem;
	    }
	      .specifications{
	      	position: absolute;
	      	left: 0;
	      	bottom: 0;
	      	font-size: .8rem;
	      	width: 120px;
	      	overflow: hidden;
	    }
	      .money{
	      	position: absolute;
	      	right: 0;
	      	bottom: 0;
	      	color: #f15353;
	    }
	}
	}*/
		/*购买和邀请朋友拼团*/
		#foot {
			position: fixed;
			bottom: -3px;
			width: 100%;
			border-top: 0px solid #e2e2e2;
			z-index: 2;
			padding: 0;
			height: 55px;
			display: -ms-flexbox;
			display: flex;
			-ms-flex-align: center;
			align-items: center;
			background: #FFF;
			.more-group,
			.inviate-group {
				flex: 1;
				background: #FFA07A;
				height: 55px;
				text-align: center;
				border: none;
				color: #fff;
				-ms-flex: 3;
				flex: 3;
				font-size: 15px;
				line-height: 55px;
			}
			.inviate-group {
				background: #FF4500;
			}
		}
	}
</style>