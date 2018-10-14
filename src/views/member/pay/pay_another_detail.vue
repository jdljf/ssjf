<template>
    <div id="pay-another">
        <c-title :hide="false" text='代付详情'></c-title>
        <div class="top-spare"></div>
        <div class="detail-box">
            <div class="detail-top">
                <div class="img"><img :src="payerImg"></div>
                <span>{{payerName}}&nbsp;&nbsp;请您帮忙代付一笔订单</span>
            </div>
            <h1>￥{{totalPrice}}</h1>
            <div class="line"></div>
            <h2>好友代付说明</h2>
            <ul>
                <li style="color:#f15353;font-weight:bold;">代付前请先电话或当面核实好友身份在代付,避免遇到诈骗行为</li>
            </ul>
        </div>
        <div class="pay-box">
            <div class="order-info"><span>订单信息</span></div>
            <div v-for="items in goodList">
                <div class="pay-pro" v-for="item in items.has_many_order_goods">
                    <div class="img"><img :src="item.thumb"></div>
                    <div class="title">
                        <div class="top">
                            <span class="title-left">{{item.title}}</span><br>
                            <span class="title-right">￥{{item.price}}</span><br>
                        </div>
                        <div class="bottom">
                            <span class="title-left">规格:{{item.goods_option_title}}</span><br>
                            <span class="title-right">X{{item.total}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pay-sum"><span>共{{totalNum}}件商品&nbsp;&nbsp;实付：￥<span class="money">{{totalPrice}}</span></span>
            </div>
        </div>
        <div class="pay-btn" v-for="btn in btns">
            <Button :class="[btnclass(btn.value)]" @click="confirmPay(btn)">{{btn.name}}</Button>
        </div>
        <!-- <div class="zhi"><Button>支付宝支付</Button></div>  
                <div class="yu"><Button>余额支付</Button></div>   -->
        <yd-keyboard v-model="popupSpecs" title="安全键盘" input-text="请输入支付密码" :callback="keyboardDone" ref="keyboardDemo1"></yd-keyboard>
    </div>
</template>

<script>
    import pay_another_detail_controller from './pay_another_detail_controller';
    export default pay_another_detail_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .top-spare {
        width: 100%;
        height: 44px;
    }
    .detail-box {
        border-top: solid 1px #e2e2e2;
        border-bottom: solid 1px #e2e2e2;
        padding: 10px;
        width: 100%;
        background-color: #fff;
        .detail-top {
            display: flex;
            .img {
                width: 48px;
                height: 48px;
                background-color: #888;
                border-radius: 50%;
                margin-right: 10px;
                img {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    border-radius: 50%;
                }
            }
            span {
                line-height: 48px;
                flex: 3;
                text-align: left;
            }
        }
        h1 {
            font-size: 1.6rem;
            color: #f15353;
            font-weight: bold;
            margin: 20px 0;
        }
        .line {
            width: 100%;
            height: 1px;
            background-color: #e2e2e2;
            margin-bottom: 4px;
        }
        h2 {
            line-height: 28px;
            text-align: left;
        }
        ul {
            text-align: left;
        }
    }
    .pay-box {
        border-top: solid 1px #e2e2e2;
        border-bottom: solid 1px #e2e2e2;
        background-color: #fff;
        width: 100%;
        padding: 0 12px;
        margin-top: 4px;
        .order-info {
            width: 100%;
            border-bottom: solid 1px #e2e2e2;
            display: flex;
        }
        .order-info span {
            line-height: 44px;
            text-align: start;
            font-size: .9rem;
            color: #333;
        }
        .pay-pro {
            width: 100%;
            margin-top: 12px;
            display: flex;
            border-bottom: solid 1px #e2e2e2;
            padding-bottom: 12px;
            .img {
                flex: 1;
                width: 64px;
                height: 88px;
                background-color: green;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .title {
                flex: 3;
                margin-left: 8px;
                .top {
                    display: flex;
                    width: 100%;
                    .title-left {
                        flex: 3;
                        text-align: left;
                    }
                    .title-right {
                        flex: 1;
                        text-align: right;
                    }
                }
                .bottom {
                    display: flex;
                    margin-top: 10px;
                    width: 100%;
                    color: #888;
                    .title-left {
                        flex: 3;
                        text-align: left;
                    }
                    .title-right {
                        flex: 1;
                        text-align: right;
                    }
                }
            }
        }
        .pay-sum {
            line-height: 44px;
            text-align: right;
            font-size: 14px;
            .money {
                font-weight: bold;
                color: #f15353;
                font-size: 16px;
            }
        }
    }
    .pay-btn {
        margin: 10px 12px;
        button {
            border: none;
            width: 100%;
            height: 36px;
            border-radius: 4px;
            color: #fff;
            font-size: .9rem;
        }
    }
    .wei-btn {
        background-color: #13ce66;
    }
    .zhi-btn {
        background-color: #46b4ed;
    }
    .yu-btn {
        background-color: #f15353;
    }
</style>