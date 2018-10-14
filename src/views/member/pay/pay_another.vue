<template>
    <div id="pay-another">
        <c-title :hide="false" text='代付'></c-title>
        <div class="top-spare"></div>
        <div class="pay-box">
            <div class="order-info"><span>订单信息</span></div>
            <!-- <div class="pay-pro">
                    <div class="img"><img data-v-2c15d270="" src="http://release.yunzshop.com/attachment/images/2/2017/11/x3bW9mI3DLwl3LpG3dpi97wC51WCIe.jpg"></div>
                    <div class="title">
                        <div class="top">
                            <span class="title-left">智能空气净化器F700家用卧室客厅除甲醛去雾霾PM2.5烟尘</span><br>
                            <span class="title-right">￥100.00</span><br>
                        </div>
                        <div class="bottom">
                            <span class="title-left">规格</span><br>
                            <span class="title-right">+1</span>
                        </div>
                    </div>
                </div> -->
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
                            <span class="title-right">x{{item.total}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pay-sum"><span>共{{totalNum}}件商品&nbsp;&nbsp;实付：￥<span class="money">{{totalPrice}}</span></span>
            </div>
        </div>
        <div class="massage-box">
            <yd-step current="1">
                <yd-step-item style="color:#f15353;">
                    <span slot="bottom">留言并分享</span>
                </yd-step-item>
                <yd-step-item style="color:#f15353;">
                    <span slot="bottom">好友参与并付款</span>
                </yd-step-item>
                <yd-step-item style="color:#f15353;">
                    <span slot="bottom">代付成功</span>
                </yd-step-item>
            </yd-step>
            <textarea name="留言给好友" id="" cols="30" rows="10" v-model.lazy="shareContent"></textarea>
        </div>
        <div class="bottom-but" @click="shareTip">
            <Button>找小伙伴帮忙付款</Button>
        </div>
    </div>
</template>

<script>
    import pay_another_controller from './pay_another_controller';
    export default pay_another_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .top-spare {
        width: 100%;
        height: 44px;
    }
    .pay-box {
        background-color: #fff;
        border-top: solid 1px #e2e2e2;
        border-bottom: solid 1px #e2e2e2;
        width: 100%;
        padding: 0 12px;
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
                margin-left: 10px;
                font-size:.875rem;
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
                font-size: 18px;
            }
        }
    }
    .massage-box {
        border-bottom: solid 1px #e2e2e2;
        border-top: solid 1px #e2e2e2;
        margin-top: 4px;
        background-color: #fff;
        width: 100%;
        padding: 20px 10px 10px;
        textarea {
            border: none;
            background-color: #f9f9f9;
            border:solid 1px #e2e2e2;
            border-radius: 4px;
            width: 100%;
            line-height: 24px;
            height: 100px;
            color: #333;
            margin-top: 20px;
            padding-left:6px;
        }
    }
    .bottom-but {
        padding: 0 15px;
        button {
            border: none;
            width: 100%;
            height: 36px;
            line-height: 36px;
            background-color: #f15353;
            border-radius: 4px;
            color: #fff;
            font-size: .9rem;
            margin-top: 10px;
        }
    }
</style>