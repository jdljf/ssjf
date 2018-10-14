<template>
    <div id="all">
            <div id="member">
                <c-title :hide="false" text='门店中心'></c-title>
                <div style="width:100%;height:40px;"></div>
                <div class="header">
                    <!--<div class="back"><i class="mintui mintui-back" @click="goback"></i></div>-->
                    <div class="user">
                        <div class="user-head">
                            <img :src="store.thumb">
                        </div>
                        <div data-v-21e0c5a4="" class="cashier-name" style="">{{store.name}}</div>
                        <div class="user-info">
                            <router-link :to="fun.getUrl('storeWithdrawals')">
                            <div class="user-name">
                                <div class="b-tixian">
                                    <yd-icon class="iconfont icon-tixian2" custom size="16px" color="#fff"></yd-icon>
                                    <span>提现</span>
                                </div>
                            </div>
                            </router-link>
                        </div>
                        <div class="clearfix"></div>
                    </div>
                </div>
                <div id="userinfo">
                    <ul>
                        <li>
                                <span><small>￥</small>{{income.money_total}}</span>
                                <br>累计实收金额
                        </li>

                        <li>
                                <span><small>￥</small>{{income.sure_withdraw_money}}</span>
                                <br>可提现金额
                        </li>
                    </ul>
                </div>


                <div class="cart">

                    <router-link :to="fun.getUrl('storeOrderlist',{ status:'0', orderType: 'store' })">
                        <div class="list1" style="border:none;">
                            <yd-icon class="iconfont icon-member-order2" custom size="20px" color="#f15353"></yd-icon>
                            我的订单
                            <i class="fa fa-angle-right"></i>
                        </div>
                    </router-link>
                    <router-link :to="fun.getUrl('presentationRecord')">
                        <div class="list1">
                            <yd-icon class="iconfont icon-member-withdrawals" custom size="20px" color="#f15353"></yd-icon>
                            提现记录
                            <i class="fa fa-angle-right"></i>
                        </div>
                    </router-link>

                    

                </div>
                <div style="height: 10px;clear: both;"></div>
              
            </div>
        <div id="ewm" ref="hook" @click="openQrCode('none')">

            <div class="pic">

                <img :src="poster" alt="">

            </div>

        </div>
        <div id="jpg"></div>
    </div>
</template>

<script>
import store_manage_controller from "./store_manage_controller";
export default store_manage_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/css/cashier.scss";
    i:first-child{
        margin-right:6px;
        color:#f15353;
        font-size:18px;
    }
    .clearfix{clear:both;}
</style>