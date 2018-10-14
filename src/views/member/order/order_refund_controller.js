
import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';




export default {
  
  data() {
    return {
      refundMoney:"",
      address:[],
      checked:{},
      options:[],
      express:"",
      expressCode:"",
      expressSN:"",
      popupVisible:false,
      //订单id
      orderId:"",
      //租赁订单id
      id:"",

      //订单状态
      order_status:0,

      //审核状态
      check_status:""
    }
  },

  activated() {

   this.applyData();
   this.getAddress();
   this.getExpress();

  },

  mounted() {

    

  },
  methods: {
    //申请退还
    applyData(){
      $http.get("plugin.lease-toy.api.retreat.return.index",{order_id:this.$route.params.id},"申请中...").then(response =>{
        console.log(response);
        if(response.result == 1){
          this.refundMoney=response.data.deposit_total;
          this.orderId=response.data.order_id;
          this.id=response.data.id;
          this.order_status=response.data.return_status;
          this.check_status=response.data.return_name;
        }
      }).catch(error =>{
        console.log(error);
      })
    },

    //获取归还地址
    getAddress(){
      $http.get("plugin.lease-toy.api.return-address.index",{}).then(response =>{
        console.log(response);
        if(response.result == 1){
          if(this.fun.isTextEmpty(response.data)){
            MessageBox.alert("请填写退还地址");
            this.$router.go(-1);
          }else{
            this.address=response.data;
            this.address.forEach(item => {
              if(item.is_default == 1){
                console.log(item);
                this.checked=item;
              }
            });
          }
        }
      }).catch(error =>{
        console.log(error);
      })
    },

    chooseAddress(){
      console.log(this.checked)
    },

    expressShow(){
      this.popupVisible=true;
    },

    expressChoose(val){
      this.initExpress();
      this.express=val.name;
      this.expressCode=val.code;
      this.popupVisible=false;

    },

    initExpress(){
      this.express="";
      this.expressCode=""
    },

    //获取快递
    getExpress(){
      $http.get("dispatch.express-list",{}).then(response =>{
        console.log(response);
        if(response.result == 1){
          this.options=response.data.express_companies;
        }
      }).catch(error =>{
        console.log(error);
      })
    },

    //提交审核
    submit(){
     

      if (this.fun.isTextEmpty(this.checked.address)) {
        MessageBox.alert("请选择归还地址");
        return;
      }

      if (this.fun.isTextEmpty(this.express)) {
        MessageBox.alert("请选择退还快递");
        return;
      }

      if (this.fun.isTextEmpty(this.expressCode)) {
        MessageBox.alert("快递code不能为空");
        return;
      }

      if (this.fun.isTextEmpty(this.expressSN)) {
        MessageBox.alert("快递编号不能为空");
        return;
      }

      let json={
        order_id:this.orderId,
        lease_id:this.id,
        express_code:this.expressCode,
        express_company_name:this.express,
        express_sn:this.expressSN,
        address:this.checked.address,
        mobile:this.checked.mobile,
        realname:this.checked.contact_name,
      }

      $http.get("plugin.lease-toy.api.retreat.return.submit-return",json,"提交中...").then(response =>{
        console.log(response)
        if(response.result == 1){
          MessageBox.alert("提交成功");
          this.$router.go(-1);
        }else{
          MessageBox.alert("提交失败");
          this.$router.go(-1);
        }
      }).catch(error =>{
        console.log(error);
      })

    }
  },
  components: {cTitle}
}