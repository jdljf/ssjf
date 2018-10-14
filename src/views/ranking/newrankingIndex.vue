<template>
	<div id="sharerankdeatil">
		<c-title class="aa"  :hide="false" text='组织龙虎榜'></c-title>
		<div style="height: 40px;"></div>
		<div class="context">
			<div class="top">
				<span>排名</span>
				<span>姓名</span>
				<span>组织</span>
				<span>销售额</span>
			</div>
			<div class="texts">
				<div class="lis1" v-if="shows">
						<span class="num1"><b>{{contentlist.self.rank}}</b><img  :src="contentlist.self.avatar"/></span>
						<span class="name1">{{contentlist.self.nickname}}</span>
						<span class="origin">{{contentlist.self.team}}</span>
						<span class="moneys">{{contentlist.self.total}}</span>
					</div>
				<ul>
					
					<li class="lis2" v-for="item in dataAll">
						<span class="num"><b class="b">{{item.rank}}</b><img  :src="item.avatar"/></span>
						<span class="name">{{item.nickname}}</span>
						<span class="origin">{{item.team}}</span>
						<span class="moneys" style="line-height: 20px;">{{item.total}}</span>
					</li>
				</ul>
			</div>
			<div v-if="nonum" style="line-height: 40px;">暂无数据</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';
	import progressbar from 'components/progress';
	import cTitle from 'components/title';
	import cRootlist from 'components/rootlist';
	import cCarcontent from 'components/carcontent';
	import BScroll from 'better-scroll';
	import Fun from '../../fun';
	import { Loadmore } from 'mint-ui';
	import { Indicator, Toast } from 'mint-ui';
	import PullToRefresh from 'components/pull-to-refresh.vue';
	import { InfiniteScroll } from 'mint-ui';

	export default {
		data() {
			return {
				contentlist: [],
				dataAll: [],
				shows: true,
				nonum: false
			}
		},

		methods: {
			getContentlist() {
				var that = this;
				$http.get("member.member.getTeamLongHuBang").then((response) => {
					if(response.result == 1) {
						that.contentlist = response.data;
						that.dataAll = response.data.dataAll
						if(that.contentlist == false) {
							that.nonum = true
						}
						if(that.contentlist.self ==false) {
						console.log('数据是11', that.contentlist.self);
							that.shows = false
						}
						console.log('数据是', that.dataAll);
					}

				});
			},

		},

		created() {

		},
		mounted() {},
		activated() {

			this.getContentlist();
			//			console.log('方法调用了====activated=====');

		},
		components: {
			cTitle,
			cCarcontent,
			progressbar,
			PullToRefresh
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.is-fixed{
		background: #DBBAA0;
	}
	#sharerankdeatil {}
	
	.aa {
		color: #855B41;
	}
	
	.top {
		display: flex;
	}
	
	.top span {
		flex: 1;
		color: #DBBAA0;
		background: #FFFFFF;
		padding: 10px;
	}
	
	.texts {}
	
	ul {}
	
	.lis2,
	.lis1 {
		width: 100%;
		display: flex;
		background: #fff;
		padding: 30px 0px 30px 0px;
		color: #714324;
	}
	
	.lis1 {
		background: #DBBAA0;
	}
	
	.lis2 span,
	.lis1 span {
		flex: 1;
	}
	
	.num,
	.num1 {
		position: relative;
		font-weight: bold;
		font-size: 18px;
		margin-left: -10px;
		
	}
	
	.lis2:nth-child(1) .num:nth-child(1) .b {
		background: linear-gradient(120deg, #FECD52 20%, #FFFCF5 40%, #FEE051 80%);
		width: 2rem;
		height: 2rem;
		display: inline-block;
		line-height: 2rem;
		border: 2.5px solid #FCCA4F;
		border-radius: 50%;
		margin-top: -5px;
	}
	
	.lis2:nth-child(2) .num:nth-child(1) .b {
		background: linear-gradient(120deg, #ABA9AA 20%, #FFFCF5 40%, #848489 80%);
		width: 2rem;
		height: 2rem;
		display: inline-block;
		line-height: 2rem;
		border: 2.5px solid #848489;
		border-radius: 50%;
		margin-top: -5px;
	}
	
	.lis2:nth-child(3) .num:nth-child(1) .b {
		background: linear-gradient(120deg, #E79A77 20%, #FFFCF5 40%, #FA6139 80%);
		width: 2rem;
		height: 2rem;
		display: inline-block;
		line-height: 2rem;
		border: 2.5px solid #FA6139;
		border-radius: 50%;
		margin-top: -5px;
	}
	
	.name,
	.name1 {
		margin-left: 25px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.num img,
	.num1 img {
		position: absolute;
		border-radius: 50%;
		width: 2.5rem;
		height: 2.5rem;
		right: -20px;
		background: #DBBAA0;
		top: -10px;
	}
</style>