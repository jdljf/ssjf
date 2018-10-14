<template>
  <div id="love_record">
    <c-title :hide="false" :text='love_name+"激活记录"'></c-title>
    <div style="height: 40px;"></div>
  
    <mt-loadmore v-if="goload" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="coupon_loadmore" bottomPullText='' bottomDropText='下拉加载...' bottomLoadingText='' :autoFill='true' id='olis'>
      <div id="tbsd">
        <div class="tbs" v-for="list in listData" @click="goDetailed(list.id)">
          <div class="left"><span>激活ID:{{list.id}}</span>
            <br />
            <font color="#8c8c8c"><p>{{list.created_at}}</p></font>
          </div>
          <div class="right">
            <font color="red">+{{list.actual_activation_love}}元</font>
          </div>
        </div>
      </div>
  
    </mt-loadmore>
  </div>
</template>
<script>
import love_record_controller from './love_record_controller';
export default love_record_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#love_record {
  #money {
    color: red;
    font-size: 2rem;
    line-height: 4.5rem;
  }
  #dingjing {
    border: 1px solid #ccc;
    padding: 5px 10px;
    width: 50px;
    border-radius: 10px;
    margin: 0 auto;
    margin-bottom: 15px;
  }
  #tbsd {
    border-bottom: 1px solid #e2e2e2;
    margin-top: -1px;
  }
  .tbs {
    display: flex;
    align-items: center;
    background: #FFF;
    padding: 10px 12px;
    flex-flow: row wrap;
    border-top: #e2e2e2 1px solid;
    box-sizing: border-box;
    font-size: .8rem;
    .left {
      flex: 70%;
      text-align: left;
      span{
        line-height: 20px;
        display: inline-block;
      }
      p{
        line-height: 20px;
      }
    }
    .right {
      flex: 30%;
      text-align: right;
    }
  }
}
</style>