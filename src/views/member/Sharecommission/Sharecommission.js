import cTitle from 'components/titlecopy';
import { Indicator, Toast } from 'mint-ui';
var currentTabIndex = "0";
//标记 防止重复加载
var is_first_content = false;
var is_second_content = false;
var is_third_content = false;
export default {
	data() {
		return {
			detailist1: {},
			shareinfo: {},
			myshareinfo: {},
			order_sns: '',

			mailLanguage: "",
			mailTeamDividendTitle: "",
			mailDividend: "",

			level_name: "",
			dividend_ratio: "",
			next_dividend_ratio: "",

			ratioDatas: [],

			activeName: 'first',
			first_content: [],
			second_content: [],
			third_content: [],
			settlement:[],
			detailshow:false
		}
	},

	activated() {
		this.initMailLanguage();
		this.initData(); //初始化参数
		this.getData(); //初始化数据
		this.initInfo(); //初始化info数据
		this.setDataByTabIndex();
	},

	methods: {

		initMailLanguage() {
			this.mailLanguage = this.fun.initMailLanguage();
			this.fun.setWXTitle(this.fun.setMailLanguage("股东提成分润中心", this.mailLanguage.team_dividend.team_agent_centre));
			this.mailTeamDividendTitle = this.fun.setMailLanguage("股东提成分润中心", this.mailLanguage.team_dividend.team_agent_centre);
			this.mailDividend = this.fun.setMailLanguage("提成", this.mailLanguage.team_dividend.dividend);

		},

		//初始化参数
		initData() {

			this.level_name = "";
			this.dividend_ratio = "";
			this.next_dividend_ratio = "";

			this.ratioDatas = [];

			currentTabIndex = "0";
			is_first_content = false;
			is_second_content = false;
			is_third_content = false;

			this.activeName = 'first';

			this.first_content = [];
			this.second_content = [];
			this.third_content = [];
		},
		
		toDetail() {
           this.$router.push(this.fun.getUrl('Sharedetails'),{});
		},
		//初始化info数据
		initInfo() {
			let that = this;
			$http.get('shareholderDividend.shareholder.get-dividend-list', {}).then(function(response) {
				if(response.result == 1) {
					that.shareinfo = response.data;
					
				} else {
					Toast(response.msg);
				}
			}, function(response) {
				Toast(response.msg);
			});
		},

		//初始化数据
		getData() {
			let that = this;
			$http.get('shareholderDividend.shareholder.get-dividend-statistic', {}, '').then(function(response) {
				if(response.result == 1) {
					 that.settlement=response.data;
					console.log('数据是',that.settlement);
					//组装数据

				} else {
					Toast(response.msg);
				}
			}, function(response) {
				Toast(response.msg);
			});
		},
     searchdetail(e){
            	var that=this;

            	that.detailshow=!that.detailshow;
            	console.log('11',	that.detailshow);
            	
            },
		//获取佣金列表
		getDividendList(dividend_type) {
			let that = this;
			let json = {
				"dividend_type": dividend_type
			};
			$http.get('plugin.team-dividend.api.team-dividend.get-dividend-list', json, '获取中').then(function(response) {
				if(response.result == 1) {
					switch(dividend_type) {
						case "0":
							that.first_content = response.data;
							break;
						case "1":
							that.second_content = response.data;
							break;
						default:
							break;
					}
				} else {
					Toast(response.msg);
				}
			}, function(response) {
				Toast(response.msg);
			});
		},

		//直推奖
		getDividendListByType2() {
			let that = this;
			let json = {};
			$http.get('plugin.team-dividend.api.team-dividend.get-reward', json, '获取中').then(function(response) {
				if(response.result == 1) {
					that.third_content = response.data;
				} else {
					Toast(response.msg);
				}
			}, function(response) {
				Toast(response.msg);
			});
		},

		//		设置选择后的数据
		setDataByTabIndex() {
			if(currentTabIndex == "0" && !is_first_content) {
				is_first_content = true;
				this.getDividendList("0");
			} else if(currentTabIndex == "1" && !is_second_content) {
				is_second_content = true;
				this.getDividendList("1");
			} else if(currentTabIndex == "2" && !is_third_content) {
				is_third_content = true;
				this.getDividendListByType2();
			}
		},

		//tab 点击
		handleClick(tab, event) {
			//点击同tab 不刷新界面
			if(currentTabIndex == tab.index) {
				return;
			} else {
				currentTabIndex = tab.index;
			}
			this.setDataByTabIndex();
		},
	},
	components: {
		cTitle
	}

}