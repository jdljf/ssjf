
import { MessageBox } from 'mint-ui';
import cTitle from 'components/title';



export default {
  data() {
    return {
      cup_name:"",
      cup_id:"",
      cup_code:""

    }
  },

  activated() {

   this.initWeixin();

   this.cup_name=this.$route.params.name;
   
   this.cup_id=this.$route.params.id;

   this.cup_code="";

  },

  mounted() {

    

  },
  methods: {
    initWeixin(){
      $http.post("member.member.wxJsSdkConfig",{},).then(response =>{
        if(response.result == 1){
          this.weixinConfig(response.data);
          //this.config=response.data.config;
        }
      }).catch(error =>{
        console.log(error);
      })
    },

     weixinConfig(data){
       wx.config(data.config);
     },

    scanCode() {
      var that=this;
      wx.scanQRCode({
        needResult: 1,
        scanType: ["qrCode", "barCode"],
        success: function (res) {
          //console.log(res)
          //alert(JSON.stringify(res));
          //var result = JSON.stringify(res);
          //window.location.href = res.resultStr;
          let arr=[];
          arr=res.resultStr.split(",");
          that.cup_code=arr[1];
        },
        fail: function (res) {
          console.log(res)
          alert("扫码失败");
        }
      });
      
     
      
     
    },
    
    //投放
    delivery(){
      if(this.fun.isTextEmpty(this.cup_code)){
        MessageBox("商品条形码不能为空");
        return
      }
      $http.get("plugin.cabinet.Frontend.Modules.Lattice.Controllers.put-goods.index",{mark:this.$route.params.mark,product_sn:this.cup_code},"投放中...").then(response =>{
        if(response.result == 1){
          console.log(response);
          MessageBox("提示",response.msg);
          this.$router.go(-1);
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