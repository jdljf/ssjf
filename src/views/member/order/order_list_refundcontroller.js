import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      toi: this.fun.getKeyByI(),
      title: '退款申请',
      reasontype:[['不想要了','卖家缺货','其他'],['物流太慢','商家态度不好','其他'],['订单信息错误','商品不符合要求']],
      refundtype:['退款（仅退款不退货）','退款退货','换货'],
      reasonarr:['不想要了','卖家缺货','其他'],
      form:
      {
        //type-1 表示订单退款 type-2 表示修改退款
        type: 1,
        //退款原因
        reason: '',
        //申请类型
        refund_type: '',
        //退款原因
        content: '',
        order_id: '',
        refund_id: '',
        price: '0',
        "i": this.fun.getKeyByI(), "type": this.fun.getTyep()
      },

      //处理方式
      refundTypes: [],
      //退款原因
      reasons: [],
      money: 0.00,
      show1:false,
      show2:false,
      order: {},	//订单显示商品供选择退款     
      count: 0.00,
      total: 0,
      checkList: [],  //
      allCheckList: [],
    };
  },
  methods:
  {
    changetext(val){
    	console.log(this.form.price)
      this.form.reason=val
      this.show1=false
    },
    changetype(key){
      this.form.refund_type=key
      this.show2=false
//    this.reasonarr.length = 0
      console.log(this.reasonarr)
      this.reasonarr = this.reasontype[key]
      console.log(this.reasontype[key])
      console.log(this.reasonarr)
      this.show1= true
//    this.form.reason = this.reasontype[key]
    },
    
    getPrice(evt){
    	var iKeyCode = window.event?evt.keyCode:evt.which; 
    	if((iKeyCode>=48) && (iKeyCode<=57) || (iKeyCode>=96) && (iKeyCode<=105) || (iKeyCode>=37) && (iKeyCode<=40) ||iKeyCode===8|| iKeyCode==46) {

	    } else {    
	        if (window.event) {    
	            //IE 
	            event.returnValue = false;    
	        } else {    
	            //Firefox
	            evt.preventDefault();    
	        }    
	    }
    },

    //限制最大退款价格
 		limitMax(event){
//  	console.log(event)
    	var prices = this.form.price; 
    	this.form.price = this.form.price.replace(/\D/g,'');
    	if(parseInt(this.form.price) > parseInt(this.money)){
    		console.log(this.form.price)
    		console.log(parseFloat(this.form.price))
    		console.log(parseFloat(this.money))
    		this.form.price = parseInt(this.money)
    	}
    }, 
    
    //提交退款申请
    confirmRefund() {
      console.log(this.form);
      var that = this;
      var action;
      if (this.$route.params.type == 1) {
        action = 'refund.apply.store';
      } else {
        action = 'refund.edit.store';

      }
      
// 		if (isNaN(parseInt(this.form.price))) {MessageBox.alert('退款金额请输入纯整数数字');}
//    if (this.refund_type == "") {MessageBox.alert('请选择退款方式')}
      if (this.form.price == "0" || this.form.price == "") {MessageBox.alert('请选择退款商品')}
      $http.post(action, this.form, '正在提交申请').then(function (response) {
        if (response.result == 1) {

          MessageBox.alert(response.msg, '');
          that.$router.go(-1);

        } else {
          MessageBox.alert(response.msg);
					if (response.msg == "reason 不能为空。") {
						MessageBox.alert('请选择退款原因');
					}
					if (response.msg == "refund type 不能为空。") {
						MessageBox.alert('请选择退款方式');
					}
					if (response.msg == "price 不能为空。") {
						MessageBox.alert('请输入纯整数数字退款金额');
					}
        }
      }, function (response) {
        // error callback
      });
    },
    //获取退款信息
    getRefundInfo() {
      var that = this;
      $http.get('refund.apply', { order_id: this.$route.params.order_id }, "").then(function (response) {
        if (response.result == 1) {
          var mydata = response.data;
        	that.order = response.data.order;
        	console.log(that.order)
          that.money = parseInt(mydata.order.price);
          that.refundTypes = mydata.refundTypes;
          that.reasons = mydata.reasons;
        } else {
          MessageBox.alert(response.msg);
        }
      }, function (response) {
        MessageBox.alert(response);
      });
    },
    getAlterInfo() {
      var that = this;
      $http.get('refund.edit', { refund_id: this.$route.params.order_id }, "").then(function (response) {
        if (response.result == 1) {
          var mydata = response.data;
          that.money = parseInt(mydata.refundApply.price);
          that.refundTypes = mydata.refundTypes;
          that.reasons = mydata.reasons;
          that.form.content = mydata.refundApply.content;
          that.form.reason = mydata.refundApply.reason;
          that.form.refund_type = mydata.refundApply.refund_type_name;
          that.form.refund_type = mydata.refundApply.refund_type;
        } else {
          MessageBox.alert(response.msg);
        }
      }, function (response) {
        MessageBox.alert(response);
      });

    },
    
    //全选
		allSelect(event) {
			console.log("全选");
			this.checkList = event.target.checked ? this.allCheckList : [];
			console.log(this.allCheckList);
			console.log(this.checkList);
			//计算总价格
			this.countTotalPrice();
		},
    
    allSelectHandle(value) {
			console.log(value.length);
			let checkedCount = value.length;
//			this.checkAll = checkedCount === this.goods.length;
			console.log(this.checkList);
			//计算总价格
			this.countTotalPrice();
		},
    
    //计算总价格&总数
		countTotalPrice() {
			this.count = 0;//初始化
			this.total = 0.00;//初始化
			this.count = this.checkList.length;

			for (var i = 0; i < this.checkList.length; i++) {
//					this.total += (this.checkList[i].payment_amount * 1);
					this.total += parseFloat(this.checkList[i].payment_amount)
			}

			this.total = Number(this.total.toString().match(/^\d+(?:\.\d{0,2})?/));
			console.log(this.total)
			console.log(this.form)
			this.form.price = this.total;
		},
    
    //跳转商品详情
		toGoodsInfo(goods) {
			//this.$router.push({ name: 'goods', params: { id: goods.goods_id }, query: { i: this.toi } });
			this.$router.push(this.fun.getUrl('goodsO2O', { id: goods.goods_id ,o2o:"o2o"}));
		},


  },
  created() {
    //this.money = this.$route.params.order_id;


  },
  activated() {
    this.money = 0;
    //console.log(this.$route.params.order_id);
    this.toi = this.fun.getKeyByI();
    this.form.order_id = this.$route.params.order_id;
    this.form.refund_id = this.$route.params.order_id;
    this.count = 0;//初始化
		this.total = 0.00;//初始化
    if (this.$route.params.type == 2) {
      //修改申请
      this.title = '修改申请';
      this.getAlterInfo();

    } else {
      this.title = '退款申请';
      this.getRefundInfo();
    }
  },
  computed: {
  	
  },
  components: { cTitle }
};
