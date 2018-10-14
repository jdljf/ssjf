// import { Loadmore } from 'mint-ui';
// import { Indicator, Toast } from 'mint-ui';
// import { MessageBox } from 'mint-ui';
import cTitle from 'components/title';


export default {
  data() {
    return {
      levelName:"",
      day:"",
      agreementCon:"",
      goodsPrice:"",
      buyId:0
    }
  },

  activated() {

    this.init();

    this.getDetailData();

  },

  mounted() {

    

  },
  methods: {

    init(){
      this.levelName="";
      this.day="";
      this.agreementCon="";
      this.goodsPrice="";
      this.buyId=0;
    },
    
    //获取数据
    getDetailData(){
      $http.get("member.member-level.upgrade-detail",{id:this.$route.params.id},"...").then(response =>{
        console.log(response);
        if(response.result == 1){
            this.levelName=response.data.level_name;
            this.day=response.data.validity;
            this.agreementCon=response.data.interests_rules;
            this.goodsPrice=response.data.goods.price;
            this.buyId=response.data.goods.id;
        }
      }).catch(error =>{
        console.log(error);
      })
    },


    //购买
    buy(){
      this.$router.push(this.fun.getUrl("goods",{id:this.buyId}));
    }
  },
  components: {cTitle}
}