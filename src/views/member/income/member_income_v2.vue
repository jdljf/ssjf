<template>
	<div id="income">
		<c-title :hide="false" text='收入'></c-title>
		<div style="height: 40px;"></div>
		<div id="userinfo">
			<ul>
				<li>
					<span>￥{{total_income}}</span>
					<br>累计收入</li>
				<li>
					<span>￥{{income}}</span>
					<br>可提现收入</li>
			</ul>
			<div class="tixi" @click="gotoIncome">
				<span>提现</span>
				<i class="fa fa-angle-right"></i>
			</div>

		</div>
		<div class="title">
			<div class="spare"></div>
			<h3>未提现收入</h3>
		</div>

		<!--ico : "ico-commission" income : 0 title : "分销商" type : "commission" type_name : "分销佣金"-->
		<!-- <ul id="gongge"> -->
		<template>
			<yd-grids-group :rows="3">
				<yd-grids-item :link="fun.getUrl('',{})" class="iconss" v-for="plug in plugs">
					<yd-icon slot="icon" :class="plug.ico "  custom size="24px"></yd-icon>
					<!-- <yd-icon slot="icon" :name="plug.ico" custom size="24px" color="#FF685D"></yd-icon> -->
					<ul slot="text" class="text">
						<li class="money"><small>￥</small>{{plug.income}}</li>
						<li class="name">{{plug.type_name}}</li>
					</ul>
					<!-- <span ></br><font></font></span> -->
				</yd-grids-item>
			</yd-grids-group>
		</template>
		<!-- <li v-for="plug in plugs">
				<i :class="plug.ico"></i>
				<yd-icon slot="icon" name="shouyintai" custom size="24px" color="#FF685D"></yd-icon>
				<br />{{plug.type_name}}
				<br />
				<font>￥{{plug.income}}</font>元
			</li> -->
		<!-- </ul> -->
		<p class="mszf">
			<router-link :to="fun.getUrl('presentationRecord')">提现明细
				<span></span>
				<i class="fa fa-angle-right"></i>
			</router-link>
		</p>
	</div>
</template>
<script>
	import member_incomecontroller from './member_income_v2_controller';
	export default member_incomecontroller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	$iconone: #D2C196;
	$icontwo: #4C7493;
	$iconthree: #D64D31;
	$iconfour: #88D951;
	$iconfive: #323232;
	$iconsix: #27B7F7;
	$iconseven: #837864;
	$iconeight: #B93E7E;
	$iconnine: #4EB7A4;
	$iconten: #BDD590;
	$iconeleven: #3361A9;
	$icontwelve: #2CCAFA;
	$iconthirteen: #FEED5C;
$bgcolorlist: $iconone $icontwo $iconthree $iconfour $iconfive $iconsix $iconseven $iconeight $iconnine $iconten $iconeleven $icontwelve $iconthirteen;
@for $i from 1 to length($bgcolorlist)+1 {
     .iconss:nth-child(#{$i}) {
      color: nth($bgcolorlist,$i);
    }
}
	#income {
		.yd-grids-3 .yd-grids-item:not(:nth-child(3n))::before{
			border-right: 0px;
		}
		.yd-grids-item::after{
			border-bottom: 0px;
		}
		#userinfo {
			background: #FFF;
			ul {
				display: flex;
				align-items: center;
				background: linear-gradient(to top, #FECD50, #F4AB2B);
			}
			ul li:last-child {
				border: 0;
			}
			ul li {
				color: #fff;
				text-align: center;
				display: block;
				flex: 1;
			}
			ul li span {
				color: #fff;
				font-size: 1.1rem;
				margin-bottom: 5px;
				display: inline-block;
			}
			ul li {
				width: 50%;
				margin: 16px 0;
				box-sizing: border-box;
				font-size: .8rem;
			}
			.tixi {
				color: #333;
				font-size: .94rem;
				padding: 0 14px;
				line-height: 44px;
				display: flex;
				justify-content: space-between;
				i {
					line-height: 44px;
					font-size: 24px;
					color: #c9c9c9;
				}
				a {
					color: #FFF;
				}
			}
		}
		.title {
			background-color: #fff;
			margin-top: 10px;
			border-bottom: solid 1px #ebebeb;
			height: 36px;
			line-height: 36px;
			padding: 0 14px;
			display: flex;
			.spare {
				width: 4px;
				height: 16px;
				border-radius: 1px;
				background-color: #D49626;
				margin-right: 8px;
				margin-top: 9px;
				h3 {
					font-size: .9rem;
				}
			}
		}
		#gongge {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			background: #FFF;
			padding: 10px 0;
			li {
				flex: 33% 0 0;
				flex-direction: row;
				i {
					font-size: 34px;
					color: #CCCCCC;
					margin: 10px 0;
				}
				font {
					color: #e84e40
				}
				a {
					color: #333;
					img {
						width: 23px;
						margin: 5px 0;
					}
				}
			}
		}
		.text {
			.money {
				color: #f15353;
				font-size: .875rem;
			}
			.name {
				color: #333;
				font-size: .75rem;
			}
		}
		.mszf {
			background: #FFF;
			padding: 0 14px;
			margin: 0;
			text-align: left;
			overflow: hidden;
			margin-top: 10px;
			margin-bottom: 50px;
			height: 44px;
			box-sizing: border-box;
			line-height: 44px;
			font-size: .94rem;
			color: #333;
			i {
				font-size: 24px;
				float: right;
				line-height: 44px;
				color: #c9c9c9;
			}
			span {
				float: left;
			}
			a {
				color: #333;
				display: block;
			}
		}
	}
</style>