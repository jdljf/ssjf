import cTitle from 'components/title';
import { Loadmore } from 'mint-ui';
import cOrderList from 'components/orderList';
import { InfiniteScroll } from 'mint-ui';
import PullToRefresh from 'components/pull-to-refresh.vue'
export default {
	data() {
		return {
			toi: this.fun.getKeyByI(),
			topStatus: '',
			bottomStatus: '',
			getAllLoaded: false,
			//当前的订单状态
			selected: 0,
			//上一次的订单状态
			last_status: 0,
			loading: false,
			allLoaded: false,
			goload: false,
			isLoadMore: true,
			action: '',
			l_index: '',
			//全部订单
			orderList: [],
			//待付款
			waitPayList: [],
			//评团中
			waitSendList: [],
			//成功团
			waitReceiveList: [],
			//失败团
			waitCompleteList: [],
			order_ids: [],
			checkList: [],
			//是否开启合并支付
			isMultiplePay: false,
			page: 1,
			total_page: 0,
			detailUrl: 'orderdetail',
			orderType: 'shop',
			totalss: false,
			showmsg: false
		};
	},
	methods: {
		swichTabTItem() {
			this.initData();
			this.getOrderList(this.selected);

		},
		//顶部状态发生变化相应事件
		handleTopChange(status) {
			this.topStatus = status;
		},
//		底部状态发生变化相应事件
		handleBottomChange(status) {
			this.allLoaded = false; // 若数据已全部获取完毕,不在显示加载更多组件
			this.bottomStatus = status;
		},
		initData() {
			this.page = 1;
			this.goload = true;
			this.total_page = 0;
			this.loading = true;
			this.allLoaded = false;
			this.isLoadMore = true;

		},
		//更新
			loadTop() {
				this.allLoaded = false;
				this.initData();
				this.getOrderList(this.selected);
				this.$refs.loadmore.onTopLoaded();
			},
			// 加载更多
			loadBottom() {
				//	this.allLoaded = true;// 若数据已全部获取完毕,不在显示加载更多组件
				if (this.isLoadMore) {
					console.log('加载更多');
					this.getMoreData(this.page, this.selected);
					this.$refs.loadmore.onBottomLoaded();
				} else {
					console.log('没有更多数据');
				}
			},
		getOrderList(index) {
			if(this.$route.params.orderType && this.$route.params.orderType == 'cashier') {
				this.orderType = 'cashier';
				this.detailUrl = 'cashierOrderdetail';
			} else if(this.$route.params.orderType && this.$route.params.orderType == 'store') {
				this.orderType = 'store';
				this.detailUrl = 'storeOrderdetail';
			}
			console.log('list:::', this.orderType);
			//this.action;
			if(index == 0) {
				this.action = 'order.group-buying-list';
				if(this.orderType == 'cashier') {
					this.action = 'plugin.store-cashier.frontend.Order.list';
				} else if(this.orderType == 'store') {
					this.action = 'plugin.store-cashier.frontend.store.center.order-list.index';
				}
			} else if(index == 1) {
				this.action = 'order.group-buying-list.wait-pay';
				if(this.orderType == 'cashier') {
					this.action = 'plugin.store-cashier.frontend.Order.list.waitPay';
				} else if(this.orderType == 'store') {
					this.action = 'plugin.store-cashier.frontend.store.center.order-list.waitPay';
				}
			} else if(index == 2) {
				this.action = 'order.group-buying-list.pending';
				if(this.orderType == 'store') {
					this.action = 'plugin.store-cashier.frontend.store.center.order-list.waitSend';
				}
			} else if(index == 3) {
				this.action = 'order.group-buying-list.completed';
				if(this.orderType == 'store') {
					this.action = 'plugin.store-cashier.frontend.store.center.order-list.waitReceive';
				}
			} else if(index == 4) {
				this.action = 'order.group-buying-list.faild';
				if(this.orderType == 'cashier') {
					this.action = 'plugin.store-cashier.frontend.Order.list.Completed';
				} else if(this.orderType == 'store') {
					this.action = 'plugin.store-cashier.frontend.store.center.order-list.Completed';
				}
			}

			this.getNetData(this.action, index);

		},
		//			toDetail(order) {
		//				console.log(order);
		//
		//				this.$router.push(this.fun.getUrl('orderdetail', { order_id: order.id, isDetail: true }));
		//			},
		//			//确认收货订单
		//			cofirmOrderAction(order) {
		//
		//				if (this.selected == 0) {
		//					//全部订单列表
		//					this.getOrderList(this.selected);
		//
		//				} else {
		//
		//					this.waitReceiveList.splice(this.waitReceiveList.indexOf(order), 1);
		//
		//
		//				}
		//			},
		//			//待付款状态下-多订单合并支付,order_ids-订单id数组
		//			toMultiplePay() {
		//				//type-1订单支付，type-2订单合并支付
		//
		//				this.$router.push(this.fun.getUrl('orderpay', { status: 2, order_ids: encodeURI(this.order_ids) }));
		//				var child = this.$refs.mychild;
		//				//调用子组件的方法
		//				child.setCheckList();
		//				this.isMultiplePay = false;
		//
		//			},
		//			//接收到合并多订单支付的通知方法
		//			multiplePayAction(order_ids) {
		//
		//				this.order_ids = order_ids;
		//				if (order_ids.length > 0) {
		//					this.isMultiplePay = true;
		//
		//				} else {
		//					this.isMultiplePay = false;
		//
		//				}
		//			},
		//			//发起http请求
		getNetData(api, index) {
			//alert(api,index);
			var that = this;

			$http.get(api, {
				page: 1,
				"i": this.fun.getKeyByI(),
				"type": this.fun.getTyep()
			}, '正在获取订单...').then(function(response) {
				if(response.result == 1) {
					var myData = response.data;
						
					that.total_page = myData.total;
					if(index == 0) {
						that.orderList = myData.data;
						if(myData.total == 0) {
							console.log('没有数据');
							that.totalss = true,
								that.showmsg = false
						} else {
							that.totalss = false,
								that.showmsg = true
						}
					} else if(index == 1) {
						that.waitPayList = myData.data;
						if(myData.total == 0) {
							that.totalss = true;
							that.showmsg = false

						} else {
							that.showmsg = true

							that.totalss = false;
						}
					} else if(index == 2) {
						that.waitSendList = myData.data;
						if(myData.total == 0) {
							console.log('没有数据');
							that.totalss = true,
								that.showmsg = false
						} else {
							that.totalss = false,
								that.showmsg = true
						}
					} else if(index == 3) {
						that.waitReceiveList = myData.data;
						if( myData.total==0){
                      	console.log('没有数据');
                      	that.totalss= true,
			            that.showmsg=false
                      }else{
                      	that.totalss= false,
			            that.showmsg=true
                      }

					} else if(index == 4) {
						that.waitCompleteList = myData.data;
						if( myData.total==0){
                      	console.log('没有数据');
                      	that.totalss= true,
			            that.showmsg=false
                      }else{
                      	that.totalss= false,
			            that.showmsg=true
                      }

					}

				}
			}, function(response) {
				// error callback
			});

		},
		getMoreData(page, index) {
			var that = this;
			if(this.page == this.total_page) {
				console.log('总数', this.total_page);
				return;
			}
			if(this.page >= this.total_page) {
				that.loading = true;
				that.allLoaded = true;
				return;

			} else {
				this.page = this.page + 1;
				$http.get(this.action, {
					page: this.page,
					"i": this.fun.getKeyByI(),
					"type": this.fun.getTyep()
				}, '正在获取更多订单...').then(function(response) {

					if(response.result == 1) {
						var myData = response.data;

						that.loading = false;
						that.allLoaded = false;
						if(index == 0) {

							that.orderList = that.orderList.concat(myData.data); //数组拼接

						} else if(index == 1) {
							that.waitPayList = that.waitPayList.concat(myData.data);

						} else if(index == 2) {
							that.waitSendList = that.waitSendList.concat(myData.data);

						} else if(index == 3) {
							that.waitReceiveList = that.waitReceiveList.concat(myData.data);

						} else if(index == 4) {
							that.waitCompleteList = that.waitCompleteList.concat(myData.data);

						}

					} else {
						that.page = that.page - 1;
						that.loading = true;
						that.allLoaded = true;
						that.isLoadMore = false;
						return;
					}
				}, function(response) {
					// error callback
				});

			}

		}
	},
	computed: {

	},
	created() {
		this.last_status = this.selected;
	},
	mounted() {
		this.toi = this.fun.getKeyByI();

	},
	updated() {

	},
	activated() {
		this.toi = this.fun.getKeyByI();
		console.log('ccccc::', this.$route.params);
		if(this.$route.params.orderType && this.$route.params.orderType == 'cashier') {
			this.orderType = 'cashier';
			this.detailUrl = 'cashierOrderdetail';
		} 
		else if(this.$route.params.orderType && this.$route.params.orderType == 'store') {
			this.orderType = 'store';
			this.detailUrl = 'storeOrderdetail';
		}
		else {
			this.orderType = 'shop';
			this.detailUrl = 'orderdetail';
		}
		this.selected = this.$route.query.status; 
		this.initData();
		this.getOrderList(this.selected)
	},
	components: {
		cTitle,
		cOrderList,
		PullToRefresh
	}
}