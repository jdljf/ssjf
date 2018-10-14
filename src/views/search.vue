<template>
	<div id="search" transition="fadeInLeft">
		<div id="soso" class="uou" :class="{'mout':amout}">
			<div class="search">
				<el-button slot="prepend" icon="arrow-left" @click='goback'></el-button>
				<!--<el-input @keyup.enter.native="search" placeholder="请输入内容" v-model="inputs" autofocus>
					<el-button slot="append" icon="search" @click='search' ></el-button>
				</el-input>-->
				<div class="search-box">
				 	<i @click='search' class="iconfont icon-sousuo" style="margin: -5px 10px 0 0;font-size: 18px;" ></i>
					<input type="text" @keyup.enter="search" placeholder="请输入内容" v-model='inputs'>			 
				</div>
				<el-col :span="1">
					<i class="fa fa-th-large" v-show="view" @click="$store.commit('views')"></i>
					<i class="fa fa-th-list" v-show="!view" @click="$store.commit('views')"></i>
				</el-col>
			</div>
			<c-sort :goods='goods' v-on:sortIn="sortOut" text='搜索结果'></c-sort>
		</div>
		<div style="height: 92px;display: block;"></div>
		<mt-loadmore v-if="goload" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='true'>
			<c-goodsList :goods='goods' text='搜索结果' class='osll' :loading='loading'></c-goodsList>
		</mt-loadmore>

	</div>
</template>

<script>
import {mapState,mapMutations} from 'vuex';
import cGoodsList from 'components/goodsList';
import cSort from 'components/sort';
var n = 1;
export default {
	data() {
		return {
			title: '搜索',
			inputs: this.$route.params.kyes,
			amout: false,
			loading: false,
			allLoaded: true,
			goload: false,
			goods: [],
			order_by:'',
			order_field:''
		}
	},
	computed:{
		...mapState(['view']),

		zoneId(){
            if(this.$store.state.zoneId == ""){
                this.$store.commit('setZoneId', window.localStorage.getItem("zoneId"));
            }

            return this.$store.state.zoneId;
        }
	}, 
	
	mounted() {
		this.slider();
		this.show(event);
	},
	methods: {
		...mapMutations(['views']),
		sortOut(e){
			console.log('得到的信息',e)
			if (this.goods.length==0) {
				return;
			}
			n=1;
			this.goods = [];
			this.order_field = e.order_field;
			this.order_by = e.order_by;
			this.gotoSearch(n);			
		},
		search() {
			console.log('搜索')
			n = 1;
			this.loading = false; this.allLoaded = false;
			this.goods = [];
			this.goload = true;
			this.gotoSearch();
			
		},
		show(ev) {
			console.log('sssssssss')
            alert(ev.keyCode)
        },
		slider() {
			let that = this;
			window.onscroll = function () {
				var top = document.documentElement.scrollTop || document.body.scrollTop;
				if (top < 80) {
					that.amout = false;
				} else {
					that.amout = true;
				}
			}

		},
		// 加载更多
		loadBottom() {
			console.log('加载更多启动')
			this.gotoSearch(n);			
			this.$refs.loadmore.onBottomLoaded();
		},
		goback() {
			this.$router.go(-1);
		},
		gotoSearch(page = 1) {
			
			let json = { 'search[keyword]': this.inputs, 'page': page ,order_field:this.order_field,order_by:this.order_by,'search[couponid]':this.$route.params.coupon,'search[as_id]':this.zoneId};
			$http.get('goods.goods.search-goods', json).then((json) => {

				if (json.result == 1) {
					n++;
					
					// 搜索结果为空
					if (json.data.total.length <= 0) {this.loading = true; this.allLoaded = true; return;}
					// 如果当前页数大于总页数 就不加载了         
					if (json.data.current_page > json.data.last_page) {this.loading = true; this.allLoaded = true; return;}
					if (json.data.data.length < 20) {
						
						console.log('少于20条')
						this.loading = true; this.allLoaded = true; 
					}
					this.goods.push(...json.data.data);
					console.log('商品内容',this.goods);
				}
				else {
					this.doException(json);
				}
			});
		}
	},
	activated() {
		this.amout=false;
		this.datas = [];
		n = 1;
		if (this.$route.params.coupon) {
			this.search(n);	
		}
		if (this.$route.params.kyes) {
			this.search(n);	
		}
		//this.gotoSearch(n);
	},
	components: { cGoodsList, cSort }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#search {
	.osll{min-height: 100vh;overflow: scroll;}
	.uou {
		position: fixed;
		z-index: 99;
		top: 0px;
		transition: .2s;
		width: 100%;
		-webkit-transition: .2s;
	}
	.mout {
		top: -36px;
	}
}
	.search{
		overflow: hidden;
		background: #fff;
		border-bottom: 1px solid #f5f5f5;
		height: 50px;
		.el-button.el-button--default{    float: left;
			width: 10%;    border: none;
			padding-top: 21px;}
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
		.el-input.el-input-group.el-input-group--append .el-input-group__append{background: #f5f5f5;}
		.el-col-1{        
			margin: 20px 0px 0 0;
			color: #666;
			font-size: 16px;}
			
		.search-box{
		    float: left;
		    margin-left: 2%;
		    margin-right: 4%;
		    padding: 4px 5px;
		    margin-top: 11px;
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
			}
			input::-webkit-input-placeholder, input:-moz-placeholder, input:-ms-input-placeholder {
			    color: #d0d0d0;
			}
			i{
				line-height: 30px;
			}
		}	
	}
</style>
