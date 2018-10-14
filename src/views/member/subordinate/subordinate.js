import cTitle from 'components/title';
import { Loadmore } from 'mint-ui';
//import cOrderList from './component/rentOrderList';
import { InfiniteScroll } from 'mint-ui';
import PullToRefresh from 'components/pull-to-refresh.vue';
import { Indicator, Toast } from 'mint-ui';
import avatar from 	'../../../assets/images/icon_I.png'

export default {
  data() {
    return {
      people: [],	  //人数的数据
      subord: [],	  //下级的数据
      avatar: avatar, //下级头像没有时候的默认图片
      flag: 0,		  //第几页。数据不能一次加载完成需要分页	
      allLoaded: false //判断是否还有分页
    }
  },

  activated() {
    this.init()
  },
  
  mounted() {
    this.toi=this.fun.getKeyByI();

  },

  methods:
  {
	//初始化数据和得到数据
	init () {
	  this.page = 1;			//初始化分页
	  this.allLoaded = false;	//初始化加载更多
      this.getPeople(); //获取总人数，激活人数，未激活人数数据
      this.getSubord(); //获取下级的个人信息包括名字，头像，电话号码等 
	},
	
    //获取总人数，激活人数，未激活人数数据
    getPeople () {
      let that = this;

      $http.get('member.OldMember.memberListCal').then(function (response) {
        console.log(response)
        if (response.result == 1) {
          that.people = response.data;
          console.log(that.people)
        }
        else {

        }

      }, function (response) {
        console.log(response)
      });
    },
    
	//获取下级的个人信息包括名字，头像，电话号码等
	getSubord (){
	  let that = this;
	  let json = {page: this.page};
	  $http.get('member.OldMember.memberList', json, "加载中...").then(function (response) {
		if (response.result == 1) {
		  console.log(response)
		  that.isMorePage(response.data.last_page);//判断是否有分页
		  if (that.page == 1) {
			that.subord = [];//清空数据源
			that.subord = response.data.data;
//		  	console.log(that.subord)
		  } 
		  else {
			if (response.data.data != null && response.data.data.length > 0) {
				that.subord = that.subord.concat(response.data.data);//数组拼接
			} 
			else {
				that.isMorePage(0);//制造不可分页
				Toast("暂无数据");
			}
		  }
	    } 
	    else {
		  Toast(response.msg);
		  that.isMorePage(0);//制造不可分页
	    }
      }, function (response) {
		console.log(response);
		that.isMorePage(0);//制造不可分页
	  });
	},
	
	//判断是否具有分页
	isMorePage (last_page) {
	  this.allLoaded = this.page < last_page ? true : false;
	},
	
	//更新
	loadTop() {
	  console.log('更新')
	  this.$refs.loadmore.onTopLoaded();//结束动画
	},
	
	// 加载更多
	loadBottom() {
		console.log('加载更多')
	  this.page = this.page + 1;//分页增加
//	  this.$refs.loadmore.onBottomLoaded();//结束动画
	},
	
	//点击加载更多
	add_more () {
		console.log('点击加载更多')
		this.page = this.page + 1;
		this.getSubord ()
 	}
  },
  computed: {
  	
  },
  components: { cTitle, PullToRefresh }
}