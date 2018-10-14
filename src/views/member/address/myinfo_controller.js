import { Field } from 'mint-ui';
import { Picker } from 'mint-ui';
import addre from 'assets/address/addressinfo';
import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Switch } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';

const address = addre;
export default {
  data() {
    return {
      form:
      {
        toi: this.fun.getKeyByI(),
        member_name: '',
        member_card: '',
      },

      explain_title:'',
      explain_content:'',

      show1:false
    }
  },
  methods: {
  	kyebey(e){
  		console.log('::::::::::444444',e);
  		e.scrollIntoViewIfNeeded();
  	},

    open() {
      this.$alert('这是一段内容', '标题名称', {
        confirmButtonText: '确定',
        message: this.explain_content,
        title: this.explain_title
      })
    },
    addCartReq(_goodsId, _optionsId, _total) {
      let that = this;

      let json = { goods_id: _goodsId, total: _total, option_id: _optionsId, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
      $http.get('member.member-cart.store', json, "添加中...").then(function (response) {
        console.log(response.data)
        if (response.result == 1) {
          that.$router.go(-1);
          Toast(response.msg);
        } else {
          Toast(response.msg);
        }

      }, function (response) {
        console.log(response)
      });
    },
    saveInfo(){
      let that = this;
      console.log('route', this.$route.params);
      var _goodsId = this.$route.params.goodsId;
      var _optionsId = this.$route.params.optionsId;
      var _total = this.$route.params.total;
      var submitActionTag = this.$route.params.tag;

      let json = { member_name: this.form.member_name, member_card: this.form.member_card, "i": this.fun.getKeyByI(), "type": this.fun.getTyep() };
      $http.get('from.div-from.updateMemberInfo', json, "添加中...").then(function (response) {
        console.log(response.data)
        if (response.result == 1) {
          //Toast(response.msg);
          if (submitActionTag == 'cart') {
            that.addCartReq(_goodsId, _optionsId, _total);
            return;
          }

          that.$router.push(that.fun.getUrl('goodsorder', { tag: submitActionTag, goodsId: _goodsId, optionsId: _optionsId, total: _total }));

        } else {

          Toast(response.msg);
        }

      }, function (response) {
        console.log(response)
      });
    },

    //获取会员信息
    getMember(){
      
      $http.get("from.div-from.getMemberInfo","...").then(response =>{
        console.log(response);
        if(response.result == 1){
          this.form.member_name=response.data.realname;
          this.form.member_card=response.data.idcard;
          
        }else{
          this.show1=false;
        }
       
      }).catch(error =>{
        console.log(error)
      })
    },

    //获取规则

    // getRule(){
      
    //   $http.get("from.div-from.explain","...").then(response =>{
    //     var that=this;
    //     if(response.result == 1){
          
    //       this.explain_title=response.explain_title;
    //       this.explain_content=response.explain_content;

    //     }else{
    //       this.show1=false;
    //     }
    //   }).catch(error=>{
    //     console.log(error)
    //   })
      
    // },

    showRule(){
      this.show1=true;
    }




  },
  mounted() {

    var provinces = [];
    var province = localStorage.getItem("province");
    provinces = JSON.parse(province);
    this.provinceoptions = provinces;

  },
  activated() {

    this.member_name = '';
    this.member_card = '';
    this.show1=false;
    this.toi = this.fun.getKeyByI();
    let that = this;
    $http.get('from.div-from.explain', {}, "添加中...").then(function (response) {
      console.log(response.data)
      if (response.result == 1) {
        that.explain_title = response.data.explain_title;
        that.explain_content = response.data.explain_content;
      } else {
        Toast(response.msg);
      }

    }, function (response) {
      console.log(response)
    });

    this.getMember();

    

  },
  components: { cTitle }
};