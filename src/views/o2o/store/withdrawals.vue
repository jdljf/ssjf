<template >
    <div id="balance_recharge">
        <c-title :hide="false" text='提现'></c-title>
        <div style="height: 50px;"></div>
        <div class="my_wrapper">
            <span>可提现金额：</span>
            <div class="my-value"><span>{{income.sure_withdraw_money}} </span> 元</div>
        </div>

        <!--<mt-button type="primary" size="large" @click="confirm">确认提现</mt-button>-->
        <div id="payBtnList">
            <div class="mod_btns" id="wechatpay">
                <a @click="confirm()" class="mod_btn bg_wechat">确认提现</a>
            </div>
        </div>
    </div>
</template>
<script>
  import withdrawals_controller from './withdrawals_controller';
  export default withdrawals_controller;

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
    #balance_recharge{
        .my_wrapper{background: #FFF; overflow: hidden; display: flex; padding:0 14px;line-height:48px;
            span{width:100px;text-align: left;
                font-size: 16px;line-height: 48px;}
            .my-value{flex: 2;text-align: left; span{color: red;}}
        }

    }
    .mint-field .mint-cell-title {
        width: 80px;
        -webkit-box-flex: 0;
        -ms-flex: none;
        flex: none;
        text-align: left;
        margin-left: 15px;}

    #payBtnList {
        .mod_btns {  margin: 10px 0;height: 40px;  line-height: 40px;  font-size: 1rem;
            .mod_btn{display: block;width: 92%;margin: 20px 4%;border-radius: 4px;}
            .mod_btn.bg_wechat {background: #26ce29;color: #fff;}
            .mod_btn.bg_ali {background: #22aaed;color: #fff;}

        }}
</style>