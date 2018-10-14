<template>
    <div id="distributionOrder">
        
        <c-title :hide="false" :text='mailTitle'></c-title>
        

        <template>
           
            <mt-navbar v-model="selected" fixed style="margin-top: 40px;">
                <mt-tab-item id="0" @click.native="swichTabTItem">全部</mt-tab-item>
                <mt-tab-item id="1" @click.native="swichTabTItem"> 待付款</mt-tab-item>
                <mt-tab-item id="2" @click.native="swichTabTItem">已付款</mt-tab-item>
                <mt-tab-item id="3" @click.native="swichTabTItem">已完成</mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected" style="margin-top: 92px;">
                <mt-tab-container-item id="0">

                    <div class="order" v-for="(item,index) in statusData0">
                        <font @click="toggle($event,index)" class="or">
                            <div class="tbs" v-if="item.order">
                                <ul class="item2">
                                    <li>{{item.order.order_sn}}({{item.hierarchy}}级)</li>
                                    <li>{{item.order.create_time}}</li>
                                </ul>
                                <ul class="item3">
                                    <li>+{{item.commission}}</li>
                                    <!--分销佣金-->
                                    <li class="red">{{item.order.status_name}}</li>
                                </ul>
                            </div>
                        </font>
                        <!--点击展开    ——Collapse 折叠面板   手风琴效果，每次只能展开一个面板-->
                        <div class="order_detail" :class="{'opens':index==display}" v-if="open_order_detail==1||open_order_buyer==1">
                            <div class="team_list" v-if="open_order_buyer==1">
                                <div class="img" v-if="item.member">
                                    <img :src="item.member.avatar">
                                </div>
                                <div class="info" v-if="item.member">{{item.member.nickname}}
                                    <br>
                                    <span>微信号:</span>
                                </div>
                            </div>
                            <div class="team_goods" id="distribution-goods" v-for="goods in item.order_goods" v-if="open_order_detail==1">
                                <div class="img">
                                    <img :src="goods.thumb">
                                </div>
                                <div class="inner">
                                    <div class="name">{{goods.title}}</div>
                                </div>
                                <div class="price">
                                    <b>￥{{(goods.goods_price/goods.total)}}
                                        <br> ×{{goods.total}}</b>
                                    <div class="Total">￥{{goods.goods_price}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="1">
                    <div class="order" v-for="(item,index) in statusData1">
                        <font @click="toggle($event,index)">
                            <div class="tbs" v-if="item.order">
                                <ul class="item2">
                                    <li>{{item.order.order_sn}}({{item.hierarchy}}级)</li>
                                    <li>{{item.order.create_time}}</li>
                                </ul>
                                <ul class="item3">
                                    <li>+{{item.commission}}</li>
                                    <!--分销佣金-->
                                    <li class="red">{{item.order.status_name}}</li>
                                </ul>
                            </div>
                        </font>
                        <!--点击展开    ——Collapse 折叠面板   手风琴效果，每次只能展开一个面板-->
                        <div class="order_detail" :class="{'opens':index==display}" v-if="open_order_detail==1||open_order_buyer==1">
                            <div class="team_list" v-if="open_order_buyer==1">
                                <div class="img" v-if="item.member">
                                    <img :src="item.member.avatar">
                                </div>
                                <div class="info" v-if="item.member">{{item.member.nickname}}
                                    <br>
                                    <span>微信号:</span>
                                </div>
                            </div>
                            <div class="team_goods" id="distribution-goods" v-for="goods in item.order_goods" v-if="open_order_detail==1">
                                <div class="img">
                                    <img :src="goods.thumb">
                                </div>
                                <div class="inner">
                                    <div class="name">{{goods.title}}</div>
                                </div>
                                <div class="price">
                                    <b>￥{{(goods.goods_price/goods.total)}}
                                        <br> ×{{goods.total}}</b>
                                    <div class="Total">￥{{goods.goods_price}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <div class="order" v-for="(item,index) in statusData2">
                        <font @click="toggle($event,index)">
                            <div class="tbs" v-if="item.order">
                                <ul class="item2">
                                    <li>{{item.order.order_sn}}({{item.hierarchy}}级)</li>
                                    <li>{{item.order.create_time}}</li>
                                </ul>
                                <ul class="item3">
                                    <li>+{{item.commission}}</li>
                                    <!--分销佣金-->
                                    <li class="red">{{item.order.status_name}}</li>
                                </ul>
                            </div>
                        </font>
                        <!--点击展开    ——Collapse 折叠面板   手风琴效果，每次只能展开一个面板-->
                        <div class="order_detail" :class="{'opens':index==display}" v-if="open_order_detail==1||open_order_buyer==1">
                            <div class="team_list" v-if="open_order_buyer==1">
                                <div class="img" v-if="item.member">
                                    <img :src="item.member.avatar">
                                </div>
                                <div class="info" v-if="item.member">{{item.member.nickname}}
                                    <br>
                                    <span>微信号:</span>
                                </div>
                            </div>
                            <div class="team_goods" id="distribution-goods" v-for="goods in item.order_goods" v-if="open_order_detail==1">
                                <div class="img">
                                    <img :src="goods.thumb">
                                </div>
                                <div class="inner">
                                    <div class="name">{{goods.title}}</div>
                                </div>
                                <div class="price">
                                    <b>￥{{(goods.goods_price/goods.total)}}
                                        <br> ×{{goods.total}}</b>
                                    <div class="Total">￥{{goods.goods_price}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <div class="order" v-for="(item,index) in statusData3">
                        <font @click="toggle($event,index)">
                            <div class="tbs" v-if="item.order">
                                <ul class="item2">
                                    <li>{{item.order.order_sn}}({{item.hierarchy}}级)</li>
                                    <li>{{item.order.create_time}}</li>
                                </ul>
                                <ul class="item3">
                                    <li>+{{item.commission}}</li>
                                    <!--分销佣金-->
                                    <li class="red">{{item.order.status_name}}</li>
                                </ul>
                            </div>
                        </font>
                        <!--点击展开    ——Collapse 折叠面板   手风琴效果，每次只能展开一个面板-->
                        <div class="order_detail" :class="{'opens':index==display}" v-if="open_order_detail==1||open_order_buyer==1">
                            <div class="team_list" v-if="open_order_buyer==1">
                                <div class="img" v-if="item.member">
                                    <img :src="item.member.avatar">
                                </div>
                                <div class="info" v-if="item.member">{{item.member.nickname}}
                                    <br>
                                    <span>微信号:</span>
                                </div>
                            </div>
                            <div class="team_goods" id="distribution-goods" v-for="goods in item.order_goods" v-if="open_order_detail==1">
                                <div class="img">
                                    <img :src="goods.thumb">
                                </div>
                                <div class="inner">
                                    <div class="name">{{goods.title}}</div>
                                </div>
                                <div class="price">
                                    <b>￥{{(goods.goods_price/goods.total)}}
                                        <br> ×{{goods.total}}</b>
                                    <div class="Total">￥{{goods.goods_price}}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </mt-tab-container-item>
            </mt-tab-container>
        </template>

    </div>
</template>
<script>
import distributionOrder from './distributionOrder_controller';
export default distributionOrder;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#distributionOrder {
    .order {
        .tbs {
            background: #FFF;
            overflow: hidden;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #e2e2e2;
            line-height: 1.3rem;
            padding: 10px 12px;
            font-size:.875rem;
            li{
                line-height: 24px;
            }
            .item2 {
                flex: 2;
                text-align: left;
                color: #666;
            }
            .item3 {
                text-align: right;
                .red {
                    color: #f15353;
                }
                p {
                    margin: 0;
                    color: #222;
                }
            }
        }
        .order_detail.opens {
            display: block;
        }
        .order_detail {
            display: none;
            overflow: hidden;
            .team_list {
                background-color:#fff;
                padding: 10px 12px;
                overflow: hidden;
                .img {
                    width: 14%;
                    float: left;
                    text-align: left;
                    height: 0;
                    padding-bottom: 14%;
                    position: relative;
                    img {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                    }
                }
                .info {
                    height: 40px;
                    width: 80%;
                    float: left;
                    font-size: 0.857rem;
                    color: #222;
                    line-height: 1.429rem;
                    text-align: left;
                    padding: 0 10px;
                    span {
                        color: #666666;
                    }
                }
            }
        }
    }

    #distribution-goods {
        background-color:#fff;
        display: flex;
        align-items: stretch;
        flex-flow: row wrap;
        padding: 10px 12px;
        border-top: 1px solid #e2e2e2;
        margin-bottom:6px;
        .img {
            flex: 1;
            img {
                width: 100%;
            }
        }
        .inner {
            flex: 5;
            padding: 0 10px;
            display: flex;
            align-items: flex-start;
        }
        .name {
            flex: 5;
            text-align: justify;
        }
        .price {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            b {
                flex: 3;
                text-align: right;
                color: #666;
                font-size: 0.786rem;
                font-weight: normal;
            }
            .evaluate-yet {
                margin: 0;
                color: #888;
                float: right;
                line-height: 1.6rem;
            }
        }
    }
}
</style>