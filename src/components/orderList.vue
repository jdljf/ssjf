<template>
  <div id="orderList" style="background: #fff;">
    <el-checkbox-group v-model="checkList" @change="multiplePayChange"  style="background: #f7f7f7;">
      <div class="shop" v-for="order in datasource">
        <div class="title">
          <el-checkbox :label="order.id" v-if="status == 1">&nbsp;</el-checkbox>
          <h4>订单号：{{order.order_sn}}</h4> <span>{{order.is_group_buying==1? order.group_status_name : order.status_name}}</span>
        </div>
        <router-link :to='fun.getUrl(detailUrl,{order_id:order.id, orderType:orderType})' v-for=" good in order.has_many_order_goods">
          <div class="goods">
            <div class="img"><img :src="good.thumb"></div>
            <div class="warp">
              <div class="inner">
                <div class="name">{{good.title}}</div>
                <div class="option">
                	规格: {{good.goods_option_title}}
                	<div> ×{{good.total}}</div>
                	<div class="money"> ￥{{good.price}}<span v-if="order.plugin_id == 40?true:false">/天</span></div>
				<div style="float: right;margin-top: 5px;"><del>¥{{good.goods_price}}</del></div>     
				
                </div>
                  </div>
                  <router-link :to="fun.getUrl('groupwait',{},{order_sn:order.group_order_sn})">
				<div class="goto" style="display:inline-block;color:#f15353;padding: 4px 5px;float:right;border-radius:5px;border: 1px solid #F15353;font-size: 13px;margin-top: 5px;"  v-if="order.group_status_name=='拼团中'">查看团</div>
				</router-link>
				<!--<span class="goto"   style="display:inline-block;color:#f15353;padding: 4px 5px;float:right;border-radius:5px;border: 1px solid #F15353;font-size: 13px;margin-top: 5px;" v-else-if="order.group_status_name=='拼团待付款'">去付款</span>-->         
            </div>
          </div>
        </router-link>
        <div class="title">
          
          <!--<span class="del"
                            v-if="order.button_models.length == 1"
                            @click="operation(order.button_models[0],order)">{{order.button_models[0].name}}</span>-->
        </div>
        <div class="allbt" v-if="order.button_models.length > 0">
          <span :class="{active: index%2 != 1 && item.name !== '删除订单'  ? true : false }" v-for="(item, index) in order.button_models" @click="operation(item,order)">{{item.name}}</span>
          <h4 style="flex: 1;text-align: left;font-size: 14px;">实付：<b>￥{{order.price}}</b></h4>
        </div>
      </div>
    </el-checkbox-group>
    <div class="qrcode">
      <mt-popup v-model="showQrcode" position="right" modal="false">
        <div>
          <img :src="qrcode" style="width:100%">
          <div style="height: 30px;">请核销员扫码</div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>
<script>
  import {
    Actionsheet
  } from "mint-ui";
  import {
    MessageBox
  } from "mint-ui";
  export default {
    //select_inde-当前选择行,datasource-数据源,currentdata-当前选择的数据
    props: ["datasource", "status","getAllLoaded", "orderType", "detailUrl"],
    data() {
      return {
        isShow: false,
        toi: this.fun.getKeyByI(),
        checkList: [],
        loading: false,
        allLoaded: false,
        goload: true,
        qrcode: "",
        showQrcode: false,
        order_sn:''
        //   actions:[],
        //   sheetVisible:''
      };
    },
    methods: {
       	gotodetailpin(order_sn){
       		console.log('评团订单是',order_sn);
    		   this.$router.push(this.fun.getUrl("groupwait", {
          order_sns: order_sn
        }));
       		console.log('评团订单是',order_sn);
        
      	},
      setCheckList() {
        this.checkList = [];
      },
      operation(btn, order) {
      	console.log(btn)
        //this.actions=[{name:"无理由",method:"sheetAction"},{name:"不退了",method:"sheetAction"}];
        if (btn.value == 8) {
          this.checklogistics(order, btn);
        } else if (btn.value == 12) {
          this.deleteOrder(order, btn);
        } else if (btn.value == 10) {
          this.comment(order, btn);
        } else if (btn.value == 1) {
          this.toPay(order, btn);
        } else if (btn.value == 13) {
          //退款
          this.toRefund(order, btn);
        } else if (btn.value == 9) {
          //取消订单
          this.cancleOrder(order, btn);
        } else if (btn.value == 5) {
          //确认订单
          this.confirmOrder(order, btn);
        } else if (btn.value == 18) {
          //退款中
          this.toRefundDetail(order, btn);
        } else if (btn.value == 30) {
          //我的团
          this.toGroup(order, btn);
        } else if (btn.value == "cashierPay") {
          //退款中
          this.cashPayOrder(order, btn);
        } else if (btn.value == "verification_code") {
          this.verification(order, btn);
        } else if (btn.value == 20) {
          this.verificationCash(order, btn);
        }
      },
      //多订单合并支付的响应方法
      multiplePayChange(value) {
        this.$emit("MultiplePayNotification", this.checkList);
      },
      toDetail(order) {
        this.$emit("ToDetailNotification", order);
      },
      //查看物流
      checklogistics(item, btn) {
        this.$router.push(this.fun.getUrl("logistics", {
          order: item
        }));
      },
      cashPayOrder(item, btn) {
        MessageBox({
          title: "提示",
          message: "确定此订单已付款?",
          showCancelButton: true
        }).then(action => {
          if (action == "confirm") {
            // this.datasource.splice(this.datasource.indexOf(item), 1);
            this.sentRequest(
              btn.api, {
                order_id: item.id,
                order_pay_id: this.order_pay_id,
                i: this.fun.getKeyByI(),
                type: this.fun.getTyep()
              },
              false
            );
          }
        });
      },
      verification(item, btn) {
        this.$router.push(
          this.fun.getUrl("orderVerification", {
            order_id: item.id,
            api: btn.api
          })
        );
      },
      verificationCash(item, btn) {
        MessageBox({
          title: "提示",
          message: "确定此订单已付款?",
          showCancelButton: true
        }).then(action => {
          if (action == "confirm") {
            // this.datasource.splice(this.datasource.indexOf(item), 1);
            this.sentRequest(
              btn.api, {
                order_id: item.id,
                order_pay_id: this.order_pay_id,
                i: this.fun.getKeyByI(),
                type: this.fun.getTyep()
              },
              false
            );
          }
        });
      },
      //取消订单
      cancleOrder(item, btn) {
        MessageBox({
          title: "提示",
          message: "确定取消此订单?",
          showCancelButton: true
        }).then(action => {
          if (action == "confirm") {
            //删除当前选中的地址
            this.datasource.splice(this.datasource.indexOf(item), 1);
            this.sentRequest(btn.api, {
              order_id: item.id
            }, false);
          }
        });
      },
      //删除订单
      deleteOrder(item, btn) {
        MessageBox({
          title: "提示",
          message: "确定删除此订单?",
          showCancelButton: true
        }).then(action => {
          if (action == "confirm") {
            //删除当前选中的地址
            this.datasource.splice(this.datasource.indexOf(item), 1);
            this.sentRequest(btn.api, {
              order_id: item.id
            }, false);
          }
        });
      },
      toPay(item, btn) {
        //status-2合并支付 type-1订单支付
        this.$router.push(
          this.fun.getUrl("orderpay", {
            status: 2,
            order_ids: item.id
          })
        );
      },
      //评价订单
      comment(item, btn) {
        this.$router.push(this.fun.getUrl("comment", {
          order: item
        }));
      },
      //确认收货
      confirmOrder(item, btn) {
        MessageBox({
          title: "提示",
          message: "您确定收到货物?",
          showCancelButton: true
        }).then(action => {
          if (action == "confirm") {
            //this.$emit('ConfrimOrderNotification');
            //调用接口通知服务器收到货物请求
            var that = this;
            $http.get(btn.api, {
              order_id: item.id
            }, "操作中...").then(
              function(response) {
                if (response.result == 1) {
                  that.$emit("ConfrimOrderNotification", item);
                } else {
                  MessageBox.alert(response.msg);
                }
              },
              function(response) {
                // error callback
              }
            );
          } else {}
        });
      },
      //追加评价
      reCommend(item, btn) {},
      toRefundDetail(item, btn) {
        this.$router.push(
          this.fun.getUrl("aftersales", {
            refund_id: item.refund_id
          })
        );
      },
      //退款
      toRefund(item, btn) {
        //refund
        this.$router.push(
          this.fun.getUrl("refund", {
            order_id: item.id,
            type: 1
          })
        );
      },
      //查看团
      toGroup(item, btn) {
        //refund
        this.$router.push(
          this.fun.getUrl("groupwait", {
            order_id: item.id,
            type: 1
          })
        );
      },
      sentRequest(action, params, isIndicator) {
        var that=this;
        $http.get(action, params, "").then(
          function(response) {
            if (response.result == 1) {
              MessageBox.alert(response.msg, "提示");
              if (window.history.length <= 1) {
                that.$router.push(that.fun.getUrl("home", {}));
              } else {
                that.$router.go(-1);
              }
            } else {
              MessageBox.alert(response.msg, "提示");
            }
          },
          function(response) {
            // error callback
          }
        );
      },
      sheetAction() {
        console.log(this.sheetVisible);
      },
      //更新
      loadTop() {
        // this.initData();
        // this.getOrderList(this.selected);
        alert("刷新");
        this.$refs.loadmore.onTopLoaded();
      },
      // 加载更多
      loadBottom() {
        console.log("加载更多");
        this.$refs.loadmore.onBottomLoaded();
        //this.allLoaded = true;// 若数据已全部获取完毕,不在显示加载更多组件
        if (this.getAllLoaded) {
          this.allLoaded = false;
        } else {
          this.allLoaded = true;
        }
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#orderList{
  .mint-navbar .mint-tab-item{
    padding:14px 0;
  }
}
.olis {
  height: 100vh;
}
.shop {
  background: #fff;
  margin-top: 10px;
  /*border-bottom: 1px solid #ebebeb;
  border-top: 1px solid #ebebeb;*/
  a {
    color: #000000;
  }
  .title:after {
    content: "";
    display: block;
    clear: both;
  }
  .title {
    padding: 0 14px;
    display: flex;
    align-items: center;
    h4 {
      text-align: left;
      font-weight: normal;
      line-height: 36px;
      flex: 8;
      font-size: 0.875rem;
      b {
        font-size: 1.1rem;
        color: #f15353;
      }
    }
    span {
      color: #f15353;
      text-align: right;
      margin-right: 1px;
      /*flex: 2;*/
      font-size:.875rem;
    }
  }
  span.del {
    border-radius: 14px;
    border: 1px solid #f15353;
    text-align: center;
    padding: 4px 10px;
    font-size: 0.7rem;
  }
  .allbt {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    /*border-top: 1px solid #ebebeb;*/
    height: 50px;
    /*padding-right:14px;*/
    padding: 0 10px;
    flex-direction: row-reverse;
    span {
      border-radius: 5px;
	    margin-left: 10px;
	    border: 1px solid #ccc;
	    padding: 6px 5px;
	    text-align: center;
    	font-size: 13px;
    	color: #000;
    }
    .active{
    	border-color: #f15353;
    	color: #f15353;
    }
    .allbt {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      border-top: 1px solid #e2e2e2;
      height: 44px;
      h4{
      	text-align: left;
      }
      span {
        border-radius: 4px;
        border: 1px solid #666;
        margin: 0 10px 0 0;
        padding: 4px 10px;
        text-align: center;
        font-size: 0.7rem;
      }
      span:last-child {
        color: #f15353;
        border: 1px solid #f15353;
      }
    }
  }
  .goods:after {
    content: "";
    display: block;
    clear: both;
  }
  .goods {
    /*display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-align: stretch;
              -ms-flex-align: stretch;
              align-items: stretch;
              -webkit-box-orient: horizontal;
              -webkit-box-direction: normal;
              -ms-flex-flow: row wrap;
              flex-flow: row wrap;
              */
    /*padding: 10px;*/
   	padding: 20px 0;
   	margin: 0 10px;
    /*width: 100%;*/
    box-sizing: border-box;
    background: #FFFFFF;
    border-top: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    .img {
      /*flex: 1;*/
      width: 30%;
      float: left;
      display: inline-block;
      /*background:blue;*/
      img {
        width: 100%;
      	max-height: 100px;
      }
    }
    .warp {
      width: 70%;
      float: left;
      display: inline-block;
      .inner {
        width: 100%;
        float: left;
        box-sizing: border-box;
        padding-left: 8px;
        text-align: left;
        .name {
        	width: 100%;
          text-align: left;
          color: #333333;
          margin-bottom: 20px;
          white-space: normal;
          overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					/*autoprefixer: off*/
					-webkit-box-orient: vertical;
					/*autoprefixer: on*/
					font-size: 1.1rem;
					height: 2.5rem;
	    		line-height: 1.3rem;
				}
      }
      .price {
        width: 30%;
        align-items: center;
        text-align: right;
        color: #333333;
        box-sizing: border-box;
        float: left;
        font-size: 14px;
        .money {
          margin-bottom: 10px;
          font-size: 1rem;
        }
      }
    }
    .option {
      color: #888;
      /*font-size: 0.4rem;*/
      /*flex: 1;*/
     	position: relative;
      width: 100%;
      font-size: 1rem;
      height: 2rem;
      .numb{
      	position: absolute;
      	right: 0;
      	bottom: 1.2rem;
      	line-height: 1.6rem;
      }
      .specifications{
      	position: absolute;
      	left: 0;
      	bottom: 0;
      	font-size: .8rem;
      	width: 120px;
      	overflow: hidden;
      }
      .money{
      	position: absolute;
      	right: 0;
      	bottom: 0;
      	color: #f15353;
      }
    }
  }
  #tbs {
    display: flex;
    align-items: center;
    background: #fff;
    flex-flow: row wrap;
    padding: 10px;
    line-height: 1.5rem;
    border-bottom: 1px solid #d9d9d9;
    .left {
      text-align: left;
      flex: 50%;
      color: #858585;
    }
    .right {
      text-align: right;
      flex: 50%;
    }
    .add {
      color: #259b24;
    }
    .reduce {
      color: #e51c23;
    }
  }
}
</style>
