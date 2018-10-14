import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';



export default {
  data() {
    return {
      cup_name:"",
      cup_id:""
    }
  },

  activated() {
    this.cup_name=this.$route.params.name;

    this.cup_id=this.$route.params.id;
   
    window.localStorage.removeItem('cupImg');

  },

  mounted() {

    

  },
  methods: {
    //清空
    empty(){
      $http.get("plugin.cabinet.Frontend.Modules.Lattice.Controllers.take.index",{mark:this.$route.params.mark},"操作中...").then(response =>{
        if(response.result == 1){
          console.log(response);
          window.localStorage.setItem("cupImg",response.data.goods_thumb);
          this.$router.push(this.fun.getUrl('CupboardEmpty',{ id:this.$route.params.id,name:this.$route.params.name,mark: this.$route.params.mark}));
        }else{
          MessageBox("提示",response.msg);
          this.$router.go(-1);
        }
      }).catch(error =>{
        console.log(error);
      })
      
    },

    //投放
    delivery(){
      $http.get("plugin.cabinet.Frontend.Modules.Lattice.Controllers.put.index",{mark:this.$route.params.mark},"操作中...").then(response =>{
        if(response.result == 1){
          console.log(response);
          this.$router.push(this.fun.getUrl('CupboardDelivery',{ id:this.$route.params.id,name:this.$route.params.name,mark: this.$route.params.mark}));
        }else{
          MessageBox("提示",response.msg);
          this.$router.go(-1);
        }
      }).catch(error =>{
        console.log(error);
      })
     
    }
  },
  components: {cTitle}
}