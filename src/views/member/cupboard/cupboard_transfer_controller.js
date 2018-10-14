
import { MessageBox } from 'mint-ui';


export default {
  data() {
    return {
      
    }
  },

  activated() {

   this.getCupboardData();

  },

  mounted() {

   
    

  },
  methods: {
     //获取数据
    getCupboardData(){
      $http.get("plugin.cabinet.Frontend.Modules.Lattice.Controllers.scan.index",{mark:this.$route.params.mark},"跳转中...").then(response =>{
        if(response.result == 1){
          if(response.data.operator == "operator"){
            this.$router.push(this.fun.getUrl('CupboardOperator',{ id:response.data.cabinet_id,name:response.data.cabinet_name,mark: response.data.mark}));
          }else if(response.data.operator == "member"){
            if(!this.fun.isTextEmpty(response.data.goods_id)){
              this.$router.push(this.fun.getUrl('CupGoods',{ id:response.data.goods_id,mark: response.data.mark}));
            }else{
              this.$router.push(this.fun.getUrl('home', {}));
            }
          }
        }else{
          this.$router.push(this.fun.getUrl('home', {}));
          MessageBox("提示",response.msg);
        }
      }).catch(error =>{
        console.log(error)
      })
    }
  },
  components: {}
}