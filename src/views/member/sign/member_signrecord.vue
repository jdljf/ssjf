<template>
  <div id="signrecord">
    <c-title :hide="false"
             v-bind:text="sign_name+'记录'"></c-title>
			 <div style="height:40px;"></div>
    <div class='sign-records'>
		  <span>连续{{sign_name}}:{{continue_days}}</span>
      <span>累计{{sign_name}}:{{sign_total}}</span>
     <p class='records'>累计获得奖励:{{cumulative}}</p>
	  </div>
      <ul>
        <li v-for='val,key in sign_log'>
          <div>
            <span class='icon'>
            <img src='../../../assets/iconfont/gou.svg'>
            </span>
          <span>{{val.created_at}}</span>
        </div>
        <p>
          <span>{{sign_name}}成功</span>
          <span>{{integral+val.award_content.substr(2)}}</span>
        </p>
        </li>
      </ul>   
  </div>
</template>
<script>
import member_signrecordcontroller from './member_signrecordcontroller';
export default member_signrecordcontroller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#signrecord{
	.sign-records{
		display: flex;
		justify-content: space-between;
		background:#99cc99;
		box-sizing:border-box;
		padding:0.4rem 1.5rem;
		line-height:2rem;
    height:5rem;
    position:relative;
    color:#fff;
    .records{
      position:absolute;
      left:1.4rem;
      top:2.3rem;
    }
					
	}
  ul{
    margin-top:0.7rem;
    background:#fff;
    box-sizing:border-box;
    padding:0 0.34rem;
    li{
      height:3.5rem;
      border-bottom:solid 1px #e5e5e5;
      div{
        float:left;
        width:100%;
        color:#8a8a8a;
        line-height:2rem;
        text-align:left;
        margin-left:0.5rem;
        .icon{
           margin-right:0.25rem;
           img{
             background:#99cc99;
             border-radius:50%;
             width:0.85rem;
             height:0.85rem;
             position:relative;
             top:0.1rem;
           }
        }
      }
      p{
        span{
          &:nth-child(1){
            color:#99cc99;
            float:left;
            margin-left:1.7rem;
          }
          &:nth-child(2){
            color:#4c4b4d;
            float:right;
          }
          
        }
      }
        
    }
  }   
}

</style>