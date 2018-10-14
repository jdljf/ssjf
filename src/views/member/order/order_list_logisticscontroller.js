import cTitle from 'components/title';
 import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      value: '',
      express_info: [],
      company_name: '',
      express_sn: '',
      thumb: '',
      tel: '',
      status_name: '',
      thumb:'',
     arrays:[]
    };
  },
  methods: {
    getExpress() {
      var that = this;
      $http.get('dispatch.express', { order_id:this.$route.params.order.id,"i": this.fun.getKeyByI(), "type": this.fun.getTyep()}, '正在获取快递信息...').then(function (response) {
      
       console.log(response);   
        if (response.result == 1) {    	
    		// myData = response.data;
    		that.arrays = response.data; 
	        console.log(that.arrays);
	        that.express_info = response.data[0].data	
	        console.log(that.express_info)
         } else {
            MessageBox.alert(response.msg);
          }
      }, function (response) {
        // error callback
      });

    }

  },
  activated () {
    this.toi = this.fun.getKeyByI();
    this.getExpress();
    
  },
  components: { cTitle }
};
