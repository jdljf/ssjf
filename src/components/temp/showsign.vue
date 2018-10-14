<template>
  <div id="showsign">
    <img v-bind:src="signdata.bgimg" style='width:100%;height:100%;display:block' onerror="this.src='https://dev3.yunzshop.com/addons/yun_shop/plugins/designer/assets/images/init-data/init-image-3.jpg'">
    <div @click='signnow' v-bind:style="{'background':signdata.bgcolor}">
      <h1  v-bind:style="{'color':signdata.textcolor,'font-weight':signdata.fontweight,'font-size':signdata.fontsize}">{{signdata.text}}</h1>
      <span>{{signdata.button_hint}}</span>  
    </div>
    <header>
      <span>{{signdata.award==1?'今日签到奖励:'+signdata.award_content:''}}</span>
    </header>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
 export default {
    props: ['datas'],
    data(){
      return{
        signdata:{},
      }
    },
    mounted(){
      this.signdata=this.datas.params
    },
    methods:{
      signnow(){   
      $http.get('plugin.sign.Frontend.Modules.Sign.Controllers.sign.sign').then((res)=>{
        if(res.result==1){
          this.signdata.text='已签到'    
          this.signdata.button_hint=(this.signdata.button_hint.replace(/[^0-9]/ig,"")+1)+'天' 
          let reslink=res.data.success_url
          MessageBox.alert(res.msg).then((res)=>{
          setTimeout(function(){
            self.location=reslink
          },1000)  
            })
        }else if(res.result==0){
          MessageBox.alert(res.msg)
        }
          })
      },
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#showsign{  
    width:100%;
    height:13rem;
    z-index:100;
    position:relative;
    div{
      width:4.7rem;
      height:4.7rem;
      border-radius:50%;
      position:absolute;
      top:20%;
      left:37.9%;
      h1{
        margin:0.7rem 0 0.5rem 0;
      }
  }
  header{
      width:100%;
      position:absolute;
      top:70%;
      left:0;
      color:#fff;
      height:1.9rem; 
      span{
        display:inline-block;
        line-height:1.9rem;
        background:rgba(138,138,138,0.4);
        padding:0 0.5rem;
        border-radius:0.5rem;
        
      }
  }
    
}

</style>