
import cTitle from 'components/title';

import { MessageBox } from 'mint-ui';




export default {
  
  data() {
    return {
      
      name:"",
      mobile:"",
      address:"",
      express_sn:"",
      deposit_total:"",
      express:"",
      return_time:"",

      be_damaged:"",

      be_overdue:"",

      explain:"",

      return_deposit:"",

      return_mode:""
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
               
                this.name=response.data.lease_address.realname;
                this.mobile=response.data.lease_address.mobile;
                this.address=response.data.lease_address.address;
                this.express_sn=response.data.lease_express.express_sn;
                this.express=response.data.lease_express.express_company_name;
                this.deposit_total=response.data.deposit_total;

                this.return_time=response.data.return_time;
                this.be_damaged=response.data.be_damaged;
                this.be_overdue=response.data.be_overdue;

                this.explain=response.data.explain;

                this.return_deposit=response.data.return_deposit;

                this.return_mode=response.data.return_mode;


            }
        }).catch(error =>{
            console.log(error);
        })
    }
      
  },
  components: {cTitle}
}