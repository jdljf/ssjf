import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
export default {
    data() {
        return {
            goodList:[],
            totalNum:0,
            goodNum:0,
            totalPrice:0,
            shareContent:"",
            shareTit:"",
            shareUrl:"",
            shareImg:""
        }
    },

    watch:{
        
        shareContent:function(newVal,oldVal){
            console.log(newVal,oldVal);
            if(newVal==oldVal){
                return;
            }else{
                if(this.fun.isTextEmpty(newVal)){
                    return;
                }else{
                    this.getShareInfo1();
                }
                
            }
        } 
    },
    methods: {
        //获取订单详情
        getOrderDetail(){
            $http.get('order.another-pay-detail',{order_id:this.$route.params.order_id,pid:window.localStorage.getItem("uid")}).then(response =>{
                console.log(response);
                if(response.result == 1){
                    this.goodList=response.data;
                   
                    let priceSum=0,numSum=0;

                    response.data.forEach(val => {
                       
                       return numSum+=val.goods_total;
                    });

                    this.totalNum=numSum;
                    this.getPrice();

                    
                   

                }else{
                    MessageBox.alert(response.msg, '提示');
                    this.$router.go(-1);
                }
            }).catch(error =>{
                console.log(error)
            })
        },

        shareTip(){
            MessageBox.alert("请点击右上角分享！")
        },

        //获取默认分享数据
        getShareInfo(){
            $http.get('member.member.anotherShare',{order_ids:this.$route.params.order_id}).then(response =>{
                console.log(response);
                if(response.result == 1){
                    this.shareTit=response.data.title;
                    this.shareUrl=response.data.url;
                    this.shareImg=response.data.img;
                    this.shareContent=response.data.content;
                    this.initShare();
                }
            }).catch(error =>{
                console.log(error)
            })
        },

        //微信分享
        initShare() {
            let that = this;
            
            let _url = this.shareUrl;
            let json = { url: _url};
            $http.post('member.member.wxJsSdkConfig', json).then(function (response) {
              console.log(response)
              if (response.result == 1) {
                that.share(response.data);
              } else {
      
              }
            }, function (response) {
              console.log(response);
            });
        },

        share(data) {
            let that = this;
            wx.config(data.config);
            wx.ready(function () {
                let _title = that.shareTit;

                let _link = that.shareUrl;


                let _imgUrl = that.shareImg;

                let _desc = that.shareContent;

                wx.showOptionMenu();
                wx.onMenuShareTimeline({
                    title: _title, // 分享标题
                    link: _link, // 分享链接
                    imgUrl: _imgUrl, // 分享图标
                    success: function () {
                        Toast("分享成功");
                    },
                    cancel: function () {
                        Toast("取消分享");
                    }
                });



                wx.onMenuShareAppMessage({
                    title: _title, // 分享标题
                    desc: _desc, // 分享描述
                    link: _link, // 分享链接
                    imgUrl: _imgUrl, // 分享图标
                    type: 'link', // 分享类型,music、video或link，不填默认为link
                    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                    success: function () {
                        Toast("分享成功");
                    },
                    cancel: function () {
                        Toast("取消分享");
                    }
                });
            });
        },

        init(){
            this.goodList=[];
            this.totalNum=0;
            this.totalPrice=0;
            this.goodNum=0;
            this.shareContent="";
            this.shareTit="",
            this.shareUrl="",
            this.shareImg=""
        },


        //输入分享数据分享
        getShareInfo1(){
            $http.get('member.member.anotherShare',{order_ids:this.$route.params.order_id}).then(response =>{
                console.log(response);
                if(response.result == 1){
                    this.shareTit=response.data.title;
                    this.shareUrl=response.data.url;
                    this.shareImg=response.data.img;
                    // this.fun.isTextEmpty(this.shareContent)?response.data.content:this.shareContent;
                    this.initShare();
                }
            }).catch(error =>{
                console.log(error)
            })
        },

        //获取实付价格
        getPrice(){
            $http.get("order.merge-pay.anotherPayOrder",{order_ids:this.$route.params.order_id,pid:window.localStorage.getItem('uid')}).then(response =>{
                console.log(response);
                if(response.result == 1){
                    this.totalPrice=response.data.order_pay.amount;
                }
            }).catch(error =>{
                console.log(error);
            })
        }
        
       

    },
    activated() {
        this.init();
        
        this.getShareInfo();
        // if(this.$route.params.order_id.indexOf(',')){
        //     console.log("有逗号");
        // }else{
        //     console.log("无逗号");
            
        // }

        this.getOrderDetail();

    },
    components: { cTitle }
};