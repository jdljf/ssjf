import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { mapState, mapMutations } from 'vuex';
export default {
	props: {
		currentAddress: String
	},
	data() {
		return {
			arrays: [],
			arraysone: [],
			_id: "",
			uids: "",
//			returnshow: true,
		};
	},
	methods: {
		getExpresss() {
			var that = this;
			that.uids = that.$route.params.name;
			var url1 = "https://wx.forty-nineunion.com/addons/yun_shop/api.php?i=3&mid=0&type=5&shop_id=null&route=member.member.getNextLevel&i=3&type=5&member_id=" + that.uids;
			$http.get(url1).then(response => {
				console.log(response.data.data);
				that.arrays = response.data.data;
				console.log("TAG", "请求11111   ====", that.arraysone.length);
				that.arraysone.push(response.data.data);
			}, response => {
				console.log("error");
			});
		},
		nextPage(id, length) {
			if(!length) {
				return false;
			}
			console.log("TAG", "请求222222   ====", this.arraysone.length);
			var that = this;
			var url = "https://wx.forty-nineunion.com/addons/yun_shop/api.php?i=3&mid=0&type=5&shop_id=null&route=member.member.getNextLevel&i=3&type=5&member_id=" + id;
			$http.get(url).then(response => {
				that.arrays = response.data.data;
				that.arraysone.push(response.data.data);
			}, response => {
				console.log("error");
			});
		},
		goback() {
			var that = this;
			console.log("tag", "长度为 = ", that.arraysone.length);
			console.log("tag", "zhi = ", that.arraysone);
			
			if(that.arraysone.length - 2 <0) {
				that.arraysone = that.arraysone.splice(0, 0);
				that.$router.go(-1);	
//				that.returnshow = false;	
			} else {
				that.arrays = that.arraysone[that.arrays.length - 2];
				that.arraysone = that.arraysone.splice(0, that.arraysone.length - 1);
				console.log("tag", "截取长度 = ", that.arraysone.length);
				console.log("tag", "截取zhi = ", that.arraysone);
			}
		},
	},
	mounted: function() {

	},

	created() {

	},
	activated() {
		this.getExpresss();
		this.uids = this.$route.params.name;
		this._id = this.$route.params.id;
	},
	components: {
		cTitle
	}
};