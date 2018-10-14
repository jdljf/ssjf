import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
import PullToRefresh from 'components/pull-to-refresh.vue';
import { Indicator, Toast } from 'mint-ui';
import { Loadmore } from 'mint-ui';
import { InfiniteScroll } from 'mint-ui';
import avatar from '../../../assets/images/icon_I.png'
export default {
	props: {
		currentAddress: String
	},
	data() {
		return {
			arrays: [],
			arraysone: [],
			subord: [],
			id: "",
			uid1: '',
			lowlength: '',
			page: 1,
			allLoaded: false,
			jiazaiload: false,
			tag: true,
			toal: '',
			cpage: '',
			allpage: '',
			nickname: '',
			baner1: true,
			baner2: false,
			isA: true,
			isB: false,
			avatar: avatar,
			people:[],
			uids:''
		};
	},
	methods: {
		actives(e) {
			var str = e.currentTarget.dataset.name;
			console.log('zz', str);
			if(str == 'noactive') {
				this.getinfo();
				this.baner1 = true;
				this.baner2 = false;
				this.isA = true;
				this.isB = false;

			} else if(str == 'active') {
				this.getSubord();
		this.getPeople();
				
				this.baner2 = true;
				this.baner1 = false;
				this.isA = false;
				this.isB = true;
			}
		},
		getPeople() {
			let that = this;
			$http.get('member.OldMember.memberListCal').then(function(response) {
				console.log(response)
				if(response.result == 1) {
					that.people = response.data;
					console.log('数量',that.people)
				} else {

				}

			}, function(response) {
				console.log(response)
			});
		},
		initData() {
			this.page = 1; //初始化分页
			this.allLoaded = false; //初始化加载更多
			this.jiazaiload = false;

		},
		//获取下级的个人信息包括名字，头像，电话号码等
		getSubord() {
			let that = this;
			let json = {
				page: this.page
			};
			$http.get('member.OldMember.memberList', json, "加载中...").then(function(response) {
				if(response.result == 1) {
					console.log(response)
					that.isMorePage(response.data.last_page);
					if(that.page == 1) {
						that.subord = [];
						that.subord = response.data.data;
					} else {
						if(response.data.data != null && response.data.data.length > 0) {
							that.subord = that.subord.concat(response.data.data);
						} else {
							that.isMorePage(0);
							Toast("暂无数据");
						}
					}
				} else {
					Toast(response.msg);
					that.isMorePage(0);
				}
			}, function(response) {
				console.log(response);
				that.isMorePage(0); //制造不可分页
			});
		},
		getinfo() {
			var that = this;
			that.uids = this.$route.params.name,
				that.uid1 = that.uids;
			$http.get('member.member.getUserInfo').then(function(response) {
				if(response.result == 1) {
					var myData = response.data;
					that.uid1 = myData.uid;
					console.log('我的id是', that.uid1);
					localStorage.setItem("uid1", that.uid1);
				}
			});
			this.getExpresss();
		},
		getdata() {
			var that = this;
			let json1 = {
				nickname: this.nickname
			};
			var id = localStorage.getItem("uid1");
			let url = "member.member.getNextLevel&i=3&type=5&member_id=" + id;
			$http.get(url, json1, '...加载中').then((response) => {
				if(response.result == 1) {
					that.isMorePage(response.data.last_page);
					that.arrays = response.data.data;
				}
			});
		},
		getExpresss() {
			var that = this;
			that.uids = that.$route.query.member_id;
			var id = localStorage.getItem("uid1");
			var url1 = "member.member.getNextLevel&i=3&type=5&member_id=" + that.uids;
			console.log(url1)
			let json = {
				page: this.page,
			};
			console.log('qwe1', json);
			$http.get(url1, json, "加载中...").then(function(response) {
				if(response.result == 1) {
					that.tag = true;
					that.cpage = response.data.per_page;
					that.toal = response.data.total;
					that.isMorePage(response.data.last_page);
					console.log("TAG", "请求11111   ====", that.arraysone.length);
					//					that.arraysone.push(response.data.data);
					if(that.page == 1) {
						that.arrays = [];
						that.arrays = response.data.data;
					} else {
						if(response.data.data != null && response.data.data.length > 0) {
							that.arrays = that.arrays.concat(response.data.data);
						} else {
							that.isMorePage(0);
							Toast("暂无更多数据啦");
						}
					}
					that.arraysone.push(response.data.data);
				} else {
					that.isMorePage(0);
					Toast("暂无更多数据啦");
				}
			}, function(response) {
				console.log(response);
				that.isMorePage(0);
			});
		},
		isMorePage(allpage) {
			this.jiazaiload = this.page < allpage ? true : false;
		},
		add_morepeo() {
			console.log('点击加载更多')
			this.page = this.page + 1;
			this.getSubord()
		},
		add_more() {
			this.page++;
			this.getExpresss();
			Toast('正在加载中');

		},
		nextPage(id, length) {
			if(!length) {
				return false;
			}
			console.log("TAG", "请求222222   ====", this.arraysone.length);
			var that = this;
			var url = "member.member.getNextLevel&i=3&type=5&member_id=" + id;
			$http.get(url).then(response => {
				that.isMorePage(0);
				that.arrays = response.data.data;
				that.arraysone.push(that.arrays);

			}, response => {
				console.log("error");
			});
		},
		goback() {
			var that = this;
			this.getExpresss();
			console.log("tag", "长度为 = ", that.arraysone.length);
			console.log("tag", "zhi = ", that.arraysone);
			if(that.arraysone.length - 2 < 0) {

				that.arraysone = that.arraysone.splice(0, 0);
				console.log('cha', that.arraysone);
				that.$router.go(-1);
			} else {
				that.arrays = that.arraysone[that.arraysone.length - 2];
				that.arraysone = that.arraysone.splice(0, that.arraysone.length - 1);
				console.log("tag", "截取长度 = ", that.arrays);
				console.log("tag", "截取zhi = ", that.arraysone);
			}
		},
	},

	mounted: function() {},

	created() {

	},
	activated() {
		//		this.getExpresss();
		//		this.nickname='';
		//		this.page=1;
//		this.getSubord();

		this.nickname = "";
		this.mobile = "";
		this.uids = this.$route.query.name,
		this.uid1 = this.uids;
		this.$refs['inputs'].focus()
		this.getinfo();
		this.initData();


		//		this.scroll();
		//		this.uids = this.$route.params.name;


	},
	components: {
		cTitle,
		PullToRefresh
	}
};