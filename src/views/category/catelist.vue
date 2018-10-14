<template>
<div id="search" transition="fadeInLeft">
	<div id="soso" class="uou" :class="{'mout':amout}">
		<div class="search">
			<el-button slot="prepend" icon="arrow-left" @click='goback'></el-button>
			<!--<el-input style="height: 55px;" placeholder="搜索当前分类商品" v-model="inputs" autofocus @click.native="focus2()">
				<el-button slot="append" icon="search" @click='search'></el-button>
			</el-input>-->
			<div class="search-box">
			 	<i @click='search' class="iconfont icon-sousuo" style="margin: -5px 10px 0 0;font-size: 18px;" ></i>
				<input type="text" placeholder="搜索当前分类商品" v-model="inputs" autofocus @click="focus2()">			 
			</div>
	
	<!-- 弹窗 -->
			<yd-popup v-model="show1" position="right" height="100%" width="100%;">
				 <ul class="top-tab">
					 <li @click="hide">
						 <yd-icon class="iconfont icon-back" custom size="16px" color="#333" style="margin-top: -9px;"></yd-icon>
					 </li>
					 <li class="search-box">
						 <!--<input id="input2" type="text" placeholder="搜索您想要商品" v-model='searchvalue' ref="scontent">
						 <yd-icon class="iconfont icon-sousuo" custom size="18px" color="#a9a9a9"></yd-icon>-->
						<!--<span class="iconfont icon-sousuo" style="position: absolute;margin-top: -15px;"></span>
						<input id="input2" type="text" v-model='searchvalue' ref="scontent" placeholder="搜索">		-->
						
						<i class="iconfont icon-sousuo" style="margin: -5px 10px 0 0;font-size: 18px;" ></i>
						<input type="text" @keyup.enter="searchwords" placeholder="搜索您想要商品" v-model='searchvalue' ref="scontent">		
					 </li>
					 <li class="search-text">
						 <span @click='searchwords' style="margin-top: -9px;">搜索</span>
					 </li>
				 </ul>
				 <yd-tab  style="border-top:solid 1px #e2e2e2;">
					 <div></div>
						<!--<yd-tab-panel label="年龄" type="stats-bars">
							<ul class="age" style="width:100%;">
								<li class="select" @click='all'>全部</li>
								<li v-for='val,key in age.value' @click='screenage(val.id)'>{{val.name}}</li>
							</ul>	
						</yd-tab-panel>-->
						<yd-tab-panel label="品牌" style='justify-content: flex-start'>
							<div class="brand" >
								<div class="hot" >
									<h1>热门品牌</h1>
									<ul class="logo" >
										<li v-for='val,key in brand.data' @click='screenbrand(val.id)' >
											<img :src="val.logo" style='width:50px;height:50px;display:block;' >
											<span>{{val.name}}</span>
										</li>
									</ul>
								</div>						
							</div>
						</yd-tab-panel>	
						<yd-tab-panel  label="筛选" >
							<header style='font-size:14px;height:44px;line-height:44px'>
								<span style='float:left;margin:0 67% 0 4%'>分类</span>
								<span @click='showmore1'>更多<span class='icon'></span></span>
							</header>
							<ul :class="{showmoretype:moretype1}" style='overflow:hidden;border-bottom:solid 1px #e2e2e2;' id='check1'>
								<li v-for='val,key in type1.data' @click='changetype(val.id,key)' style='width:25%;height:44px;float:left;'>
									<span style='display:block;width:80%;height26px;line-height:26px;background:#e2e2e2;margin:auto;border-radius:3px' :class="{color:key==typekey}">{{val.name}}</span>
								</li>
							</ul>
							<header style='font-size:14px;height:44px;line-height:44px'>
								<span style='float:left;margin:0 58% 0 4%'>全部类目</span>
								<span @click='showmore2'>更多<span class='icon'></span></span>
							</header>
							<ul :class="{showmoretype:moretype2}" style='overflow:hidden;border-bottom:solid 1px #e2e2e2;' id='check2'>
								<li v-for='val,key in smalltype' @click='searchtype(val.id,key)' style='width:25%;height:44px;float:left;maigin-bottom:5px;'>
									<span style='display:block;width:80%;height26px;line-height:26px;background:#e2e2e2;margin:auto;border-radius:3px' :class="{color:key==activekey}">{{val.name}}</span>
								</li>
							</ul>
							<header style='font-size:14px;height:44px;line-height:44px'>
								<span style='float:left;margin:0 62.5% 0 4%'>子类目</span>
								<span @click='showmore3'>更多<span class='icon'></span></span>
							</header>
							<ul :class="{showmoretype:moretype3}" style='overflow:hidden;border-bottom:solid 1px #e2e2e2;' id='check3'>
								<li v-for='val,key in threetype' @click='searchthree(val.id,key)' style='width:25%;height:44px;float:left;maigin-bottom:5px;'>
									<span style='display:block;width:80%;height26px;line-height:26px;background:#e2e2e2;margin:auto;border-radius:3px' :class="{color:key==threekey}">{{val.name}}</span>
								</li>
							</ul>
						<div class="bottom">
							<div class="button">
								<button type="button" @click='searchreset'>重置</button>
								<button type="button" id="complete" @click='searchfilter'>完成</button>
							</div>
						</div>
						</yd-tab-panel>

						<yd-tab-panel  label="排序" >
							<div>
							<div>
								<div v-for='val,key in rank' @click='getrank(key)'  style='height:44px;line-height:44px;border-bottom:solid 1px #e2e2e2;border-radius:3px;color:#333;font-size:13px;text-align:left;text-indent:15px;'>{{val}}</div>
							</div>
						</div>
						</yd-tab-panel>
					</yd-tab>
			</yd-popup>
		<!-- 弹窗 -->
			<el-col :span="1">
				<i class="fa fa-th-large" v-show="view" @click="$store.commit('views')"></i>
				<i class="fa fa-th-list" v-show="!view" @click="$store.commit('views')"></i>
			</el-col>
		</div>
		<c-sort :goods='datas' v-on:sortIn="sortOut" text='搜索结果'></c-sort>

	</div>
	<div style="height: 25px;display: block;"></div>
	<!--<div class="page-loadmore-wrapper"  ref="wrapper" :style="{ height: wrapperHeight + 'px' }">-->
	<div class="page-loadmore-wrapper"  ref="wrapper">		
			<mt-loadmore :top-method2="loadTop"
			             @top-status-change2="handleTopChange"
			             :bottom-method="loadBottom"
			             :bottom-all-loaded="allLoaded"
			             ref="loadmore"
			             topPullText=''
			             topDropText=''
			             topLoadingText=''
			             bottomPullText=''
			             bottomDropText='下拉加载...'
			             bottomLoadingText='' 
			             >
			<c-goodsList :goods='datas' text='搜索结果' class='osll' :loading='loading'></c-goodsList>
		</mt-loadmore>
	</div>
</div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';
import cGoodsList from 'components/goodsList';
import cSort from 'components/sort';
var n = 1;
export default {
	data() {
		return {
			title: '搜索',
			inputs: '',
			amout: false,
			loading: false,
			allLoaded: true,
			topStatus: '',
			bottomStatus: '',
			wrapperHeight: 0,
			order_by: '',
			order_field: '',
			datas: [],
			show1: false,
            show2: false,
            show3: false,
            show4: false,
			age:{},//年龄
			brand:{},//品牌
			type1:{},//一级分类
			smalltype:[],//二级分类
			threetype:[],//三级分类
			searchvalue:'',//关键字搜索
			filterstring:'',//销量价格评价
			sortstring:'',//商品类型
			sortingstring:'',//商品类型排序
			typekey:null,//样式开关
			activekey:null,
			threekey:null,
			sort:['评价','销量','价格'],
			sorting:['从高到低','从低到高'],
			rank:['销量从高到低','价格降序','价格升序','评论数从高到低'],
			moretype1:true,//更多内容显隐开关
			moretype2:false,
			moretype3:false,
		}
	},
	computed:{
		 ...mapState([
			'message', 'blurst', 'view'
		]),

		zoneId(){
            if(this.$store.state.zoneId == ""){
                this.$store.commit('setZoneId', window.localStorage.getItem("zoneId"));
            }

            return this.$store.state.zoneId;
        }
	},
	
	mounted() {
		this.slider();
	},
	created(){
		this.getage()//得到年龄
		this.getbrand()//得到品牌
		this.gettype()//得到分类
	},
	methods: {
		...mapMutations(['views']),
		getrank(key){
			switch(key){ 
				case 0 :
				this.sortstring='&order_field=show_sales'
				this.sortingstring='&order_by=desc'
				break;
				case 1 :
				this.sortstring='&order_field=price'
				this.sortingstring='&order_by=asc'
				break;
				case 2 :
				this.sortstring='&order_field=price'
				this.sortingstring='&order_by=desc'
				break;
				case 3 :
				this.sortstring='&order_field=comment_num'
				this.sortingstring='&order_by=desc'
				break;
			}
			this.searchfilter()
		},
		searchfilter(){//完成筛选
			$http.get('goods.goods.search-goods'+this.filterstring+this.sortstring+this.sortingstring).then((res)=>{
				this.datas=res.data.data
				this.hide()
			})
		},//重置筛选
		searchreset(){
			this.filterstring='';//分类过滤
			this.sortstring='';//商品搜索销量价格评价
			this.sortingstring='';//排序规则
			this.typekey=null;
			this.activekey=null;
			this.sortkey=null;
			this.sortingkey=null;	
			this.threekey=null;
		},
		searchwords(){//关键字搜索
			let data={'search[keyword]':this.searchvalue}
			this.screen(data)
		},
		showmore1(){
			let check1=document.querySelector('#check1')
			let boxheight=check1.offsetHeight
			if(boxheight>=88){
				this.moretype1=!this.moretype1
			}
		},
		showmore2(){
			let check2=document.querySelector('#check2')
			let boxheight=check2.offsetHeight
			if(boxheight>=88){
				this.moretype2=!this.moretype2
			}
		},
		showmore3(){
			let check3=document.querySelector('#check3')
			let boxheight=check3.offsetHeight
			if(boxheight>=88){
				this.moretype3=!this.moretype3
			}
		},
		searchtype(id,key){//二级分类
			this.filterstring='&search[category]='+id
			this.activekey=key
			this.threetype=this.smalltype[key].has_many_children
		},
		searchthree(id,key){
			this.filterstring='&search[category]='+id
			this.threekey=key
		},
		changetype(id,key){//改变分类
			this.filterstring=''
			this.smalltype=''
			this.threetype=''
			this.typekey=key//点亮图标
			let data={'parent_id':id}
			$http.get('goods.category.get-children-category',data).then((res)=>{
				this.smalltype=res.data.data
			})
		},
		gettype(){
			$http.get('goods.category.get-category').then((res)=>{
				this.type1=res.data
			})
		},
		screenbrand(id){//品牌筛选
			let data={'search[brand_id]':id}
			this.screen(data)
		},
		getbrand(){
			$http.post('goods.brand.get-brand').then((res)=>{
				this.brand=res.data
			})
		},
		screenage(id){//年龄筛选
			let data={'search[filtering]':id}
			this.screen(data)
		},
		screen(data){
			$http.get('goods.goods.search-goods',data).then((res)=>{
				this.datas=res.data.data
				this.hide()
			})
		},
		all(){
			let arr=this.age.value.map((res)=>{
				return res.id
			})
			let str=arr.join(',')
			let data={'search[filtering]':str}
			$http.get('goods.goods.search-goods',data).then((res)=>{
				this.datas=res.data.data
				this.hide()
			})
		},
		getage(){
			$http.get('goods.filtering.index').then((res)=>{
				this.age=res.data[0]
			})
		},
		hide(){
			this.show1=false
		},	
		sortOut(e) {
			if(this.datas.length == 0) {
				return;
			}
			console.log('得到的信息', e)
			n = 1;
			this.datas = [];
			this.order_field = e.order_field;
			this.order_by = e.order_by;
			this.gotoSearch(n);
		},
		handleTopChange(status) {
			this.topStatus = status;
		},
		//更新
		loadTop() {
			this.$refs.loadmore.onTopLoaded();
		},
		// 加载更多
		loadBottom() {
			console.log('加载更多启动')
			n++;
			this.gotoSearch(n);
			this.$refs.loadmore.onBottomLoaded();

		},

		slider() {
			let that = this;
			window.onscroll = function() {
				var top = document.documentElement.scrollTop || document.body.scrollTop;
				if(top < 80) {
					that.amout = false;
				} else {
					that.amout = true;
				}
			}

		},
		goback() {
			this.$router.go(-1);
		},
		search() {
			n = 1; 
			this.datas = [];
			this.gotoSearch(n,false);
		},
		gotoSearch(page = 1,j=true) {
			let srtArr = JSON.parse(this.$route.params.id);
			
			$http.get('goods.goods.search-goods', {
				'search[keyword]': this.inputs,
				'page': page,
				'search[category]': srtArr,
				order_field: this.order_field,
				order_by: this.order_by,
				'search[couponid]':this.$route.params.coupon,
				'search[as_id]':this.zoneId
			}).then((json) => {
				if(json.result == 1) {
					this.loading = false;
					this.allLoaded = false;
					// 搜索结果为空
					if(json.data.data.length <= 0) {
						this.loading = true;
						this.allLoaded = true;
						return;
					}
					// 如果当前页数大于总页数 就不加载了
					if(json.data.current_page > json.data.last_page) {
						this.loading = true;
						this.allLoaded = true;
						return;
					}
					this.datas.push(...json.data.data);

					if(json.data.data.length < 20) {
						this.loading = true;
						this.allLoaded = true;
						return;
					}
				} else {
					this.doException(json);
				}
			});
		},
		focus2() {
			this.show1 = true;
			this.$refs.scontent.focus();
		}
	},
	activated() {
		this.amout=false;
		this.slider();
		this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top; //keep分类不相同时，重载数据
		this.datas = [];
		this.order_field = '';
		this.order_by = '';
		n = 1;
		//this.loadMore();
		this.gotoSearch(n);
	},

	components: {
		cGoodsList,
		cSort
	}
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
/*// 弹窗样式*/
	#search{
		.search-box{
		    position: relative;
	        float: left;
			margin-left: 2%;
			margin-right: 4%;
		    width: 77%;
		    padding: 4px 5px;
    		margin-top: 9px;
    		display: flex;
    		justify-content: space-between;
    		height: 30px;
		    background-color: #f2f2f2;
			input{
				flex:3;
				border:none;
				color:#8c8c8c;
				/*text-align: center;*/
			}
			input::-webkit-input-placeholder, input:-moz-placeholder, input:-ms-input-placeholder {
			    color: #d0d0d0;
			}
			i{
				line-height: 30px;
			}
		}
		.showmoretype{
			height:88px!important;
		}
		.icon{
			display:inline-block;
			width:8px;
			height:8px;
			border:solid 1px #000;
			border-left:transparent;
			border-bottom:transparent;
			transform:rotate(135deg);
			margin-left:3px;
			position:relative;
			top:-2px;
		}
		.color{
			border:solid 1px #ff5e53;
			background:#fff!important;
			color:#ff5e53;
		}
		.btn{
			width:23%;
			height:26px;
			border:solid 1px #fff;
			border-radius: 4px;
			margin:0 5px;
				}
		.top-tab{
		    padding: 0 10px;
		    display: -ms-flexbox;
		    display: flex;
		    -ms-flex-pack: justify;
		    justify-content: space-between;
		    height: 50px;
		    line-height: 50px;
		    background: #fff;
			.search-text{
				font-size:.9rem;
			}
			.search-box{
			    position: relative;
			    margin-left: 4%;
			    margin-right: 4%;
			    padding: 4px 5px;
			    margin-top: 9px;
			    display: -ms-flexbox;
			    display: flex;
			    -ms-flex-pack: justify;
			    justify-content: space-between;
			    height: 30px;
			    width: 77%;
			    background-color: #f2f2f2;
				input{
					flex:3;
					border:none;
					color:#8c8c8c;
					/*text-align: center;*/
				}
				input::-webkit-input-placeholder, input:-moz-placeholder, input:-ms-input-placeholder {
				    color: #d0d0d0;
				}
				i{
					line-height: 30px;
				}
			}
		}
		.age{
			.select{
				color:rgb(255, 94, 83);
			}
			text-align: left;
			li{
				height:44px;
				line-height: 44px;
				border-bottom:solid 1px #e2e2e2;
				padding:0 14px;
				font-size:.875rem;
			}
		}
		.middle{
			padding:10px 0;
			border-bottom:solid 1px #e2e2e2;
			ul{
				display: flex;
				justify-content: space-between;
				padding:0 14px;
				line-height: 36px;
				height:36px;
				span{
					color:#8c8c8c;
				}
				i{
					font-size:18px;
					color:#c9c9c9;
					margin-left:6px;
				}
			}
			.button{
				padding:0 14px;
				.first,.second{
					display: flex;
					margin-top:10px;
					margin-bottom:10px;
					button:first-child{
						margin-right:5px;
					}
					button:last-child{
						margin-left:5px;
					}
					button:nth-child(2),button:nth-child(3){
						margin:0 5px;
					}
					button{
						width:23%;
						height:26px;
						border:solid 1px #e2e2e2;
						border-radius: 4px;
					}
				}
			}
		}
		.bottom{
			padding:0 14px;
			margin-top:10px;
			margin-bottom:10px;
			.button{
				display: flex;
				justify-content: flex-end;
				button{
					width:23%;
					height:26px;
					border:solid 1px #e2e2e2;
					border-radius: 4px;
				}
					button:first-child{
						margin-right:5px;
					}
					button:last-child{
						margin-left:5px;
					}
					#complete{
						background-color: #ff5e53;
						color:#fff;
						border:none;
					}
			}
		}
		.brand{
			.hot{
				h1{
					height:30px;
					line-height: 30px;
					text-align: left;
					padding:0 14px;
					font-size:.875rem;
					background-color: #f5f5f5;
					color:#8c8c8c;
					margin-bottom:10px;
				}
				ul{
					display: flex;
					flex-wrap: wrap;
					li{
						width:25%;
						margin:10px 0;
						span{
							font-size:.75rem;
						}
					}
				}
			}
		}
	}
	/* 弹窗样式结束*/
	#search{
		.osll{min-height: 100vh;padding-top: 66px;box-sizing: border-box;}
		@descendent wrapper {
        overflow: scroll;
    }
		.page-loadmore-wrapper2{height: 100vh;overflow: hidden;}
		.uou{position: fixed;z-index: 99;	top:0px;	transition: .2s;width: 100%;
		-webkit-transition: .2s;}
		.mout {

		top:-36px;
	}
		
	}
	.search{
		overflow: hidden;
		background: #fff;
		border-bottom: 1px solid #f5f5f5;
		height: 50px;
		.el-button.el-button--default{    float: left;
			width: 10%;    border: none;
			padding-top: 18px;}
		.el-input.el-input-group.el-input-group--append{    float: left;
			width: 80%;

			margin-left: 2%;
			height: 45px;
			}
	.el-input-group__append .el-button.el-button--default{    
			    background: #f5f5f5;
			    padding-top: 10px;
			    line-height: 20px;
			    padding-right: 29px;
			    border-top-left-radius: 0;
			    border-bottom-left-radius: 0;
			    border-radius: 0 15px 15px 0;
			}
	.el-input.el-input-group.el-input-group--append .el-input-group__append{background: #f2f2f2;}
	.el-col-1{   
		margin: 17px 0px 0 0;
	    color: #666;
	    font-size: 16px;
	    }

	}
	
</style>