<template>
    <div id="refund">
        <c-title :hide="false" text='退还商品'></c-title>
        <div style="height:40px;"></div>
        <div id="state">
            <span>商品状态:</span>
            <span>{{order_status}}</span>
        </div>
        <div class="content">
            <div class="address">
                <p>归还地址:</p>
                <p style="margin-top:10px;padding-left:5px;">
                    <p><i class="fa fa-map-marker" style="margin-right:5px;float:left;"></i>收件人:{{name}} {{mobile}}</p>
                    <p style="margin-top:3px;">{{address}}</p>
                </p>
            </div>
            <div class="address">
                <p>退还快递:<span style="float:right">{{express}}</span></p>
            </div>
            <div class="address">
                <p>快递单号:<span style="float:right">{{express_sn}}</span></p>
            </div>
            <div class="address">
                <p>退还金额:<span style="float:right">￥{{deposit_total}}</span></p>
            </div>
        </div>
    </div>
</template>

<script>
    import order_return_sure_controller from './order_return_sure_controller';
    export default order_return_sure_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    #refund {
        background: #ffffff;
        .address {
            margin-top: 10px;
            p {
                text-align: left;
                font-size: 14px;
                line-height: 14px;
                span {
                    font-size: 12px;
                    line-height: 12px;
                }
            }
        }
        #state {
            display: flex;
            justify-content: space-between;
            background-color: #f15353;
            color: #fff;
            padding: 0 14px;
            height: 60px;
            text-align: left;
            span {
                font-size: 16px;
                font-weight: bold;
                line-height: 60px;
            }
        }

        .content{
            padding: 0px 10px 0px 10px;
        }
    }
</style>