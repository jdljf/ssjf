// import { Loadmore } from 'mint-ui';
// import { Indicator, Toast } from 'mint-ui';
// import { MessageBox } from 'mint-ui';
import cTitle from 'components/title'


export default {
  data() {
    return {
      levelList:[],
      //客服
      cservice: '',

      //会员信息
      memberInfo:{},

      right:{},

      shopDesc:""


    }
  },

  activated() {

   this.init();

   this.getLevelUpData();

  },

  mounted() {

    

  },
  methods: {
    //获取升级等级数据
    getLevelUpData(){
      $http.get("member.member-level.index",{},"...").then(response =>{
        console.log(response);
        if(response.result==1){
          this.levelList=response.data.data;
          this.memberInfo=response.data.member_data;
          this.right=response.data.member_data.rights;
          //console.log(this.fun.isTextEmpty(this.levelList[0].discount));
          this.cservice=this.fun.isTextEmpty(response.data.cservice)?"javascript:;":response.data.cservice;

          this.shopDesc=response.data.shop_description;

          //this.shopDesc="111111";

        }
        
      }).catch(err =>{
        console.log(err);
      })
    },

    isNotNull(data){
      return !(this.fun.isTextEmpty(data))
    },

    // gotoDetail(){
    //   this.$router.push(this.fun.getUrl("MemberGradeListDetail"));
    // },

    gotoRefundsMigration(){
      this.$router.push(this.fun.getUrl("MemberRefundsMigration"));
    },

    init(){
      this.levelList=[];
      this.cservice="";
      this.memberInfo={};
      this.right={};
      this.shopDesc="";
    },

    
    buy(val){
      this.$router.push(this.fun.getUrl("goods",{id:val}));
    }

    
  },
  components: {cTitle}
}