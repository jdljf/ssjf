<template>
  <div id="detailed">
    <c-title :hide="false"
             :text="integral?integral:'积分'+'明细'"></c-title>
    <div style="height: 40px;"></div>
    <mt-navbar v-model="selected">
      <mt-tab-item id=""
                   @click.native="swichTabTItem">全部</mt-tab-item>
      <mt-tab-item id="1"
                   @click.native="swichTabTItem">收入</mt-tab-item>
      <mt-tab-item id="-1"
                   @click.native="swichTabTItem">支出</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="">
        <!--<div class="times">2017年3月</div>-->
  
        <!--Object after_point : "2645.00" before_point : "2644.00" created_at : "2017-04-12 15:12:29" deleted_at : 0 id : 15 member_id : 1 order_id : 0 point : "1.00" point_income_type : 1 point_mode : "后台充值" remark : "后台充值[1]积分" uniacid : 2 updated_at : "2017-04-12 15:12:29-->
        <div class="tbs"
             v-for="item in all">
          
          <ul class="item2">
              <li>{{item.mode_name}}</li>
              <li>{{integral?integral:'积分'}}：{{item.after_point}}</li>
              <li class="item1">{{item.updated_at}}</li>
          </ul>
          <div class="item3"
               v-if="item.point<0"><span class="add">{{item.point}}</span></div>
          <div class="item3"
               v-if="item.point>0"><span class="reduce">+{{item.point}}</span></div>
  
        </div>
  
      </mt-tab-container-item>
      <mt-tab-container-item id="1">
        <div class="tbs"
             v-for="item in income">
          
          <ul class="item2">
              <li>{{item.mode_name}}</li>
              <li>{{integral?integral:'积分'}}：{{item.after_point}}</li>
              <li class="item1">{{item.updated_at}}</li>
          </ul>
          <div class="item3"
               v-if="item.point<0"><span class="add">{{item.point}}</span></div>
          <div class="item3"
               v-if="item.point>0"><span class="reduce">+{{item.point}}</span></div>
  
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="-1">
        <div class="tbs"
             v-for="item in out">
          
          <ul class="item2">
              <li>{{item.mode_name}}</li>
              <li>{{integral?integral:'积分'}}：{{item.after_point}}</li>
              <li class="item1">{{item.updated_at}}</li>
          </ul>
          <div class="item3"
               v-if="item.point<0"><span class="add">{{item.point}}</span></div>
          <div class="item3"
               v-if="item.point>0"><span class="reduce">+{{item.point}}</span></div>
  
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import member_integraldetailcontroller from './member_integrallistcontroller';
export default member_integraldetailcontroller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#detailed {
  a {
    color: #000;
  }
  .mint-navbar {
    margin-bottom: 2px;
  }
  .mint-navbar .mint-tab-item {
    padding: 14px 0;
  }
  .times {
    text-align: left;
    text-indent: 10px;
    line-height: 2rem;
    background: #dddddd;
  }
  .tbs {
    background: #FFF;
    overflow: hidden;
    display: flex;
    align-items: flex-start;
    padding: 10px 14px;
    border-bottom: 1px solid #ebebeb;
    font-size:.875rem;
    .item1 {
      color: #8c8c8c;
      font-size:.75rem;
    }
    .item2 {
      flex: 2;
      text-align: left;
      li{
        line-height: 20px;
      }
    }
    .item3 {
      font-size:16px;
      .add {
        color: #259b24;
      }
      .reduce {
        color: #f15353;
      }
    }
  }
}
</style>