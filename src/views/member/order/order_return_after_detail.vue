<template>
    <div id="refund">
        <c-title :hide="false" text='售后详情'></c-title>
        <div style="height:40px;"></div>
        <!-- <div id="state">
            <span>商品状态:</span>
            <span>{{order_status}}</span>
        </div> -->
        
            <div class="return-address">
                <h1>归还地址:</h1>
                <ul>
                    <li><i class="fa fa-map-marker" style="margin-right:5px;"></i></li>
                    <li class="info">
                        <span>{{address}}</span><br>
                        <span>收件人:{{name}} {{mobile}}</span>
                    </li>
                </ul>
            </div>
            <ul class="express">
                <li class="address">
                    <span class="left">退还快递:</span><span class="right">{{express}}</span>
                </li>
                <li class="address">
                    <span class="left">快递单号:</span><span class="right">{{express_sn}}</span>
                </li>
                <li class="address">
                    <span class="left">退还时间:</span><span class="right">{{return_time}}</span>
                </li>
            </ul>
            
            <ul class="deposit">
                <li class="address">
                    <span class="left">押金金额:</span><span class="right">￥{{deposit_total}}</span>
                </li>

                <li class="address">
                    <span class="left">押金扣除(逾期):</span><span class="right">￥{{be_overdue}}</span>
                </li>

                <li class="address">
                    <span class="left">押金扣除(破损):</span><span class="right">￥{{be_damaged}}</span>
                </li>


                <li class="address">
                    <span class="left">说明:</span><span class="right">{{explain}}</span>
                </li>

                <li class="address">
                    <span class="left">退还押金金额:</span><span class="right">￥{{return_deposit}}</span>
                </li>

                <li class="address">
                    <span class="left">退还方式:</span><span class="right">{{return_mode}}</span>
                </li>
            </ul>

             

            
        
    </div>
</template>

<script>
    import order_return_sure_controller from './order_return_after_detail_controller';
    export default order_return_sure_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    #refund {
            .return-address{
                background-color: #fff;
                padding-left:14px;
                text-align: left;
                h1{
                    line-height: 36px;
                    font-size:.875rem;
                    font-weight:normal;
                    color:#8c8c8c;
                }
                ul{
                    font-size:.875rem;
                    display: flex;
                    span{
                        display: inline-block;
                    }
                    i{
                        font-size:16px;
                        color:#666;
                        margin-top:10px;
                    }
                    .info{
                        padding:10px 0;
                        margin-left:10px;
                        span:first-child{
                            margin-bottom:10px;
                        }
                    }
                } 
            }
        .express{
            margin-top:10px;
            background-color: #fff;
            padding:10px 14px;
            font-size:.875rem;
            .address{
                display: flex;
                line-height: 30px;
                justify-content: space-between;
                .left{
                    color:#8c8c8c;
                }
            }
        }
        .deposit{
            margin-top:10px;
            background-color: #fff;
            padding:10px 14px;
            font-size:.875rem;
            .address{
                display: flex;
                justify-content: space-between;
                line-height:30px;
                .left{
                    color:#8c8c8c;
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
        
    }
</style>