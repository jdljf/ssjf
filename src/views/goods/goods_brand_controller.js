import { Loadmore } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import cTitle from 'components/title';




export default {
  data() {
    return {
      brandTit: "",
      brandLogo: "",
      desc: "",


      goodsList: [],
      loading: false,
      allLoaded: false,
      goload: true,
      isLoadMore: true,
      page: 1,
      total_page: 0,
    }
  },

  activated() {

    this.getData();

    this.initData();

    this.getInfo();

  },

  mounted() {



  },
  methods: {

    getInfo(){
      $http.get("goods.brand.get-brand-detail",{id:this.$route.params.id}).then(response =>{
        if(response.result == 1){
           this.brandTit = response.data.name;
           this.brandLogo = response.data.logo;
           this.desc = response.data.desc;
        }
      }).catch(error =>{
        console.log(error);
      })
    },

    getData() {
      $http.get("goods.brand.get-brand-goods", { id: this.$route.params.id}, "...").then(response => {
        if (response.result == 1) {
          
          this.goodsList = response.data.goods.data;

          this.total_page = response.data.goods.total;
        }
      }).catch(error => {
        console.log(error);
      })
    },

    getMoreData(page) {
      var that = this;
      if (this.page == this.total_page) {
        return;

      }
      if (this.page >= this.total_page) {
        that.loading = true;
        that.allLoaded = true;
        return;


      } else {
        this.page = this.page + 1;
        $http.get('goods.brand.get-brand-goods', { id: this.$route.params.id, page: this.page,as_id:this.zoneId}, '加载中...').then(function (response) {

          if (response.result == 1) {
            var myData = response.data.goods.data;
            that.loading = false;
            that.allLoaded = false;
            that.goodsList = that.goodsList.concat(myData);//数组拼接

          } else {
            that.page = that.page - 1;
            that.loading = true;
            that.allLoaded = true;
            that.isLoadMore = false;
            return;
          }
        }, function (response) {
          // error callback
        });

      }


    },

    loadTop() {
      this.initData();
      this.getData();
      this.$refs.coupon_loadmore.onTopLoaded();
    },

    loadBottom() {
      //	this.allLoaded = true;// 若数据已全部获取完毕,不在显示加载更多组件
      if (this.isLoadMore) {
        this.getMoreData(this.page);
        this.$refs.coupon_loadmore.onBottomLoaded();
      } else {
        console.log('没有更多数据');
      }
    },

    initData() {
      this.page = 1;
      this.total_page = 0;
      this.goload = true;
      this.loading = true;
      this.allLoaded = false;
      this.isLoadMore = true;
      this.goodsList = [];

      this.brandTit="";
      this.brandLogo="";
      this.desc="";

    },
  },

  computed: {
  },
  components: { cTitle }
}