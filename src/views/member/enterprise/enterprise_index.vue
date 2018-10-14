<template>
    <div id="enterprise">
        <c-title :hide="false" text='招商'></c-title>
        <div style="height:40px"></div>
        <div class="content">
            <!--<ul class="tab-btn">
                               <li :class="{active:isActive}" @click="changeActive(true)">我的供应商</li>
                               <li :class="{active:!isActive}" @click="changeActive(false)">供应商分红详情</li>
                           </ul>-->
    
            <el-tabs v-model="enterpriseBaseActiveName" @tab-click="enterpriseBaseHandleClick">
                <el-tab-pane label="招商员" name="enterprise">
                    <template>
                        <div class="share_holder">
                            <div class="header_box">
                                <ul class="left"><li class="lf">{{enterpriseInfo_1.realname}}</li></ul>
                                <ul class="right"><li class="rt">分红比例:{{enterpriseInfo_1.bonus_ratio}}%</li></ul>
                            </div>
    
                            <router-link :to="fun.getUrl('enterprise_supplier')">
                                <div class="list1 code">
                                    <span class="lf">我的供应商</span>
                                    <i class="fa fa-angle-right rt"></i>
                                    <span class="rt">{{enterpriseSupplier}}人</span>
                                </div>
                            </router-link>
    
                            <ul class="today_bonus">
                                <li v-for="item in enterpriseRatioDatas" :class="item.name">
                                    <span>{{item.money}}</span>
                                    <br>
                                    <b>{{item.data}}</b>
                                </li>
                                <li class="line">
                                    <div class="careat"></div>
                                </li>
                            </ul>
    
                        </div>
    
                        <div class="contentDetail">
                            <el-tabs v-model="enterpriseActiveName" @tab-click="enterpriseHandleClick">
                                <el-tab-pane label="全部" name="enterprise_first">
                                    <ul class='rationList'>
                                        <li v-for="elem in enterprise_first_content">
                                            <div class="detail">
                                                <span class="month">{{elem.create_month}}</span>
                                                <div class="info" v-for="item in elem.has_many_merchant">
                                                    <ul class="left">
                                                        <li>订单号：{{item.order_sn}}</li>
                                                        <li class="time">时间：{{item.created_at}}</li>
                                                    </ul>
                                                    <ul class="right">
                                                        <li>{{item.bonus_money}}</li>
                                                        <li class="state">{{item.status_name}}</li>
                                                    </ul>
                                                </div>
    
                                            </div>
    
                                        </li>
                                    </ul>
                                </el-tab-pane>
                                <el-tab-pane label="已结算" name="enterprise_second">
                                    <ul class='rationList'>
                                        <li v-for="elem in enterprise_second_content">
                                            <div class="detail">
                                                <span class="month">{{elem.create_month}}</span>
                                                <div class="info" v-for="item in elem.has_many_merchant">
                                                    <ul class="left">
                                                        <li>订单号：{{item.order_sn}}</li>
                                                        <li class="time">时间：{{item.created_at}}</li>
                                                    </ul>
                                                    <ul class="right">
                                                        <li>{{item.bonus_money}}</li>
                                                        <li class="state">{{item.status_name}}</li>
                                                    </ul>
                                                </div>
    
                                            </div>
    
                                        </li>
                                    </ul>
                                </el-tab-pane>
                                <el-tab-pane label="未结算" name="enterprise_third">
                                    <ul class='rationList'>
                                        <li v-for="elem in enterprise_third_content">
                                            <div class="detail">
                                                <span class="month">{{elem.create_month}}</span>
                                                <div class="info" v-for="item in elem.has_many_merchant">
                                                    <ul class="left">
                                                        <li>订单号：{{item.order_sn}}</li>
                                                        <li class="time">时间：{{item.created_at}}</li>
                                                    </ul>
                                                    <ul class="right">
                                                        <li>{{item.bonus_money}}</li>
                                                        <li class="state">{{item.status_name}}</li>
                                                    </ul>
                                                </div>
    
                                            </div>
    
                                        </li>
                                    </ul>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
    
                    </template>
    
                </el-tab-pane>
                <el-tab-pane label="招商中心" name="enterprise_centre">
                    <template>
                        <div class="share_holder">
                            <div class="header_box">
                                <ul class="left">
                                    <li class="lf" style="line-height:48px;text-align:center;" v-if="enterpriseCenterInfo_1.has_one_level">{{enterpriseCenterInfo_1.realname}}</li>
                                </ul>
                                <ul class="right">
                                    <li class="rt" v-if="enterpriseCenterInfo_1.has_one_level">{{enterpriseCenterInfo_1.has_one_level.level_name}} <br/>分红比例:{{enterpriseCenterInfo_1.has_one_level.bonus_ratio}}% 
                                      </li>
                                </ul>
                            </div>
    
                            <router-link :to="fun.getUrl('enterprise_center_supplier')">
                                <div class="list1 code">
                                    <span class="lf">我的供应商</span>
                                    <i class="fa fa-angle-right rt"></i>
                                    <span class="rt">{{enterpriseCenterSupplier}}人</span>
                                </div>
                            </router-link>
    
                            <ul class="today_bonus">
                                <li v-for="item in enterpriseCenterRatioDatas" :class="item.name">
                                    <span>{{item.money}}</span>
                                    <br>
                                    <b>{{item.data}}</b>
                                </li>
                                <li class="line">
                                    <div class="careat"></div>
                                </li>
                            </ul>
    
                        </div>



                          <div class="contentDetail">
                            <el-tabs v-model="enterpriseCenterActiveName" @tab-click="enterpriseCenterHandleClick">
                                <el-tab-pane label="全部" name="enterprise_center_first">
                                    <ul class='rationList'>
                                        <li v-for="elem in enterprise_center_first_content">
                                            <div class="detail">
                                                <span class="month">{{elem.create_month}}</span>
                                                <div class="info" v-for="item in elem.has_many_merchant">
                                                    <ul class="left">
                                                        <li>订单号：{{item.order_sn}}</li>
                                                        <li class="time">时间：{{item.created_at}}</li>
                                                    </ul>
                                                    <ul class="right">
                                                        <li>{{item.bonus_money}}</li>
                                                        <li class="state">{{item.status_name}}</li>
                                                    </ul>
                                                </div>
    
                                            </div>
    
                                        </li>
                                    </ul>
                                </el-tab-pane>
                                <el-tab-pane label="已结算" name="enterprise_center_second">
                                    <ul class='rationList'>
                                        <li v-for="elem in enterprise_center_second_content">
                                            <div class="detail">
                                                <span class="month">{{elem.create_month}}</span>
                                                <div class="info" v-for="item in elem.has_many_merchant">
                                                    <ul class="left">
                                                        <li>订单号：{{item.order_sn}}</li>
                                                        <li class="time">时间：{{item.created_at}}</li>
                                                    </ul>
                                                    <ul class="right">
                                                        <li>{{item.bonus_money}}</li>
                                                        <li class="state">{{item.status_name}}</li>
                                                    </ul>
                                                </div>
    
                                            </div>
    
                                        </li>
                                    </ul>
                                </el-tab-pane>
                                <el-tab-pane label="未结算" name="enterprise_center_third">
                                    <ul class='rationList'>
                                        <li v-for="elem in enterprise_center_third_content">
                                            <div class="detail">
                                                <span class="month">{{elem.create_month}}</span>
                                                <div class="info" v-for="item in elem.has_many_merchant">
                                                    <ul class="left">
                                                        <li>订单号：{{item.order_sn}}</li>
                                                        <li class="time">时间：{{item.created_at}}</li>
                                                    </ul>
                                                    <ul class="right">
                                                        <li>{{item.bonus_money}}</li>
                                                        <li class="state">{{item.status_name}}</li>
                                                    </ul>
                                                </div>
    
                                            </div>
    
                                        </li>
                                    </ul>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
    
    </div>
</template>

<script>
import enterprise_index_controller from './enterprise_index_controller';
export default enterprise_index_controller;
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
* {
    box-sizing: border-box
}

#enterprise {
    .share_holder {
        .header_box {
            padding:16px 12px;
            box-sizing: border-box;
            background: #f15353;
            color: #fff;
            overflow: hidden;
            display: flex;
            justify-content: space-between;
            li{
                line-height: 24px;
            }
        }

        .today_bonus {
            width: 100%;
            height: 82px;
            background: #fff;
            padding: 16px 0;
            box-sizing: border-box;
            position: relative;
            border-bottom: 1px solid #e2e2e2;

            li.line {
                position: absolute;
                width: 1px;
                height: 52px;
                background: #ddd;
                top: 16px;
                right: 34%;

                .careat {
                    width: 6px;
                    height: 6px;
                    border: 1px solid #ddd;
                    border-left: 0;
                    border-bottom: 0;
                    -webkit-transform: rotate(45deg);
                    -moz-transform: rotate(45deg);
                    -ms-transform: rotate(45deg);
                    -o-transform: rotate(45deg);
                    transform: rotate(45deg);
                    background: #fff;
                    position: absolute;
                    top: 23px;
                    right: -3px;
                }
            }
            li {
                
                text-align: center;
                float: left;

                span {

                    font-size: 17px;
                    line-height: 26px;
                    margin-bottom:10px;
                    display: inline-block;
                }
                b {
                    font-size: 11px;
                    color: #333;
                }
            }

            li.data {
                width: 22%;

                span {
                    color: #ffa800;
                }
            }
            li:first-child,
            li:nth-child(2) {
                border-right: 1px solid #e2e2e2;
            }

            li.mounth {
                width: 33%;

                span {
                    color: #fc6a70;
                }
            }
        }
    }
    .code {
        margin-bottom: 10px;
        height: 44px;
        background: #fff;
        padding:0 15px;
        font-size: 15px;
        line-height: 44px;
        color: #333;
        text-align: left;
        box-sizing: border-box;
        span.rt {
            color: #8c8c8c;
            font-size:14px;
        }

        i {
            float: right;
            line-height: 44px;
            display: inline-block;
            font-size: 24px;
            margin-left:6px;
            color: #c9c9c9;
            text-align: center;
            background-size: 20px;
        }
    }


    .content {

        /*.tab-btn{
            margin:0 20px 10px;
            clear:both;
            overflow:hidden;
            li{
                display:inline-block;
                width:50%;
                height:35px;
                line-height:35px;
                float:left;
                background:#fff;
                color:#f15353;
            }
            li:nth-child(1){
                border-top-left-radius:6px;
                border-bottom-left-radius:6px;
            }
            li:nth-child(2){
                border-top-right-radius:6px;
                border-bottom-right-radius:6px;
            }
            li.active{
                background:#f15353;
                color:#fff;
            }
        }*/
        .ratioNav {
            padding: 0px;
            margin: 0px;
            height: 38px;
            width: 100%;
            background: #fff;
            border-bottom: 1px solid #e2e2e2;
            border-top: 1px solid #e2e2e2;

            li {
                float: left;
                width: 33%;
                text-align: center;
                line-height: 35px;
                font-size: 14px;
                color: #666;
            }
        }
        .rationList {
            padding: 0px;
            margin: 0px;
            li {
                background: #ffffff;
                span.month {
                    display: block;
                    text-align: left;
                    line-height: 36px;
                    padding:0 12px;
                    font-size:.875rem;
                    background: #f0f0f0;
                }
                .info {
                    border-bottom: 1px solid #e2e2e2;
                    overflow: hidden;
                    padding: 10px 12px;
                    font-size:.875rem;
                    .left {
                        width: 70%;
                        float: left;
                        text-align: left;
                        box-sizing: border-box;
                        li{
                            line-height: 24px;
                        }
                        .time{
                            font-size:.75rem;
                            color:#8c8c8c;
                        }
                        span {
                            font-size: 14px;
                            font-weight: 400;
                            color: #333;
                        }
                        p {
                            font-size: 12px;
                            color: #999;
                        }
                        span.created {
                            font-size: 12px
                        }
                        h4 {
                            font-weight: normal;
                            b {
                                font-weight: normal;
                                color: #f15353
                            }
                        }
                    }
                    .right {
                        float: left;
                        width: 30%;
                        color: #20b86a;
                        text-align: right;
                        li{
                            line-height: 24px;
                        }
                        .state{
                            font-size:.75rem;
                            color:#8c8c8c;
                        }
                        p {
                            margin: 0;
                            padding: 0;
                            font-size: 12px;
                            color: #888;
                        }
                        b {
                            font-weight: normal;
                        }
                        b.created {
                            line-height: 35px;
                        }
                    }
                }
            }
        }
    }
}
</style>