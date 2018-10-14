
import cTitle from 'components/title';

import { MessageBox } from 'mint-ui';




export default {
  
  data() {
    return {
      order_status:"",
      name:"",
      mobile:"",
      address:"",
      express_sn:"",
      deposit_total:"",
      express:""
    }
  },

  activated() {

   this.getDetail();

  },

  mounted() {

    

  },
  methods: {
    //获取详情
    getDetail(){
        $http.get("plugin.lease-toy.api.retreat.return.returnDetail",{order_id:this.$route.params.id},"...").then(response =>{
            console.log(response);
            if(response.result == 1){
                this.order_status=response.data.return_name;
                this.name=response.data.lease_address.realname;
                this.mobile=response.data.lease_address.mobile;
                this.address=response.data.lease_address.address;
                this.express_sn=response.data.lease_express.express_sn;
                this.express=response.data.lease_express.express_company_name;
                this.deposit_total=response.data.deposit_total;

            }
        }).catch(error =>{
            console.log(error);
        })
    }
      
  },
  components: {cTitle}
}