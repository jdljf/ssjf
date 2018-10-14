
import cTitle from 'components/title';

import { MessageBox } from 'mint-ui';




export default {
  
  data() {
    return {
      deposit_total:"",
      order_status:""
    }
  },

  activated() {

   this.getData();

  },

  mounted() {

    

  },
  methods: {
     //申请退还
     applyData(){
        $http.get("plugin.lease-toy.api.retreat.return.leaseApply",{order_id:this.$route.params.id},"申请中...").then(response =>{
          console.log(response);
          if(response.result == 1){
            MessageBox.alert("申请成功");
            this.$router.go(-1);
          }else{
            MessageBox.alert(response.msg);
            this.$router.go(-1);
          }
        }).catch(error =>{
          console.log(error);
        })
      },


      getData(){
        $http.get("plugin.lease-toy.api.retreat.return.index",{order_id:this.$route.params.id},"申请中...").then(response =>{
          console.log(response);
          if(response.result == 1){
            this.deposit_total=response.data.deposit_total;
            this.order_status=response.data.return_name;
          }
        }).catch(error =>{
          console.log(error);
        })
      }

      //获取预计退还数据
      
  },
  components: {cTitle}
}