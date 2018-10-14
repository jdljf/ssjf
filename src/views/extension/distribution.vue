<template>
    <div class="distribution" id="distribution">
        <c-title :hide="false" text='分销商' ></c-title>
        <div style="height:40px;"></div>
        <div class="header">
            <div class="user">
                <div class="user-head">
                    <img :src="userAvatar">
                    <!--<img v-lazy="userAvatar">-->
                </div>
                <div class="user-info">
                    <div data-v-30855510="" class="user-name">{{userName}}[会员ID:{{vipId}}]</div>
                    <div data-v-30855510="" class="user-other">{{ mail_distrbution_name }} {{distrbution_name}}<br> {{ $yzt('distribution.distrbution_tiem') }}：{{distrbution_tiem}}</div>
                </div>
            </div>
        </div>
        <div class="myrelationship">
    
            <!--<router-link  :to="{name:'myRelationship',query:{i:toi}}"-->
            <router-link :to="fun.getUrl('myRelationship',{})">
    
                <div class="list1" style="margin: 0px;">
                    {{ $yzt('distribution.team') }}
    
                    <i class="fa fa-angle-right"></i>
                    <span>{{count}}人</span>
                </div>
            </router-link>
        </div>
        <div class="scale">
            <div class="list1" style="margin: 0px;">
                {{ $yzt('distribution.default-rate') }}
    
                <!--Notification 通知   可自动关闭 -->
    
                <i class="fa fa-question-circle" aria-hidden="true" @click="msg"></i>
    
                <!--提示内容    标题：默认分销比例   内容：因商品、供应商可以独立设置佣金，您最终获得的佣金可能与此比例不同 -->
                <!--Notification 通知   结束 -->
    
            </div>
            <div class="list2" style="margin: 0px;">
                {{ $yzt('distribution.first-level') }}
                <span>{{first_level}}%</span>
            </div>
            <div class="list2" style="margin: 0px;" v-if="false">
                {{ $yzt('distribution.second-level') }}
                <span>{{second_level}}%</span>
            </div>
            <div class="list2" style="margin: 0px;" v-if="false">
                {{ $yzt('distribution.third-level') }}
                <span>{{third_level}}%</span>
            </div>
        </div>
        
        <div class="title">
            <div class="spare"></div>
            <h3>佣金</h3>
        </div>
        
        <ul id="gongge">
            <li>
    
                <!--<router-link :to="{name:'commission',query:{i:toi}}">-->
                <router-link :to="fun.getUrl('commission',{})">
                    <i class="iconfont icon-zanwushouyi"></i>
                    <span>{{ $yzt('distribution.expect') }}</span>
                    <br>
                    <b>{{expect}}</b>元
                </router-link>
            </li>
            <li>
    
                <!--<router-link :to="{name:'unsettled',query:{i:toi}}">-->
                <router-link :to="fun.getUrl('unsettled',{})">
                    <i class="iconfont icon-weitixian"></i>
                    <span>{{ $yzt('distribution.unliquidated') }}</span>
                    <br>
                    <b>{{unliquidated}}</b>元
                </router-link>
            </li>
            <li>
    
                <!--<router-link :to="{name:'alreadySettled',query:{i:toi}}">-->
                <router-link :to="fun.getUrl('alreadySettled',{})">
                    <i class="iconfont icon-yijiesuan"></i>
                    <span>{{ $yzt('distribution.liquidated') }}</span>
                    <br>
                    <b>{{liquidated}}</b>元
                </router-link>
            </li>
            <li>
    
                <!--<router-link :to="{name:'notPresent',query:{i:toi}}">-->
                <router-link :to="fun.getUrl('notPresent',{})">
                    <i class="iconfont icon-weitixian"></i>
                    <span>{{ $yzt('distribution.not_yet_withdrawed') }}</span>
                    <br>
                    <b>{{not_yet_withdrawed}}</b>元
                </router-link>
            </li>
            <li>
    
                <!--<router-link :to="{name:'present',query:{i:toi}}">-->
                <router-link :to="fun.getUrl('present',{})">
                    <i class="iconfont icon-yitixian"></i>
                    <span>{{ $yzt('distribution.withdrawed') }}</span>
                    <br>
                    <b>{{withdrawed}}</b>元
                </router-link>
    
            </li>
    
            <li v-if="false">
    
                <router-link :to="fun.getUrl('manage',{})">
                    <i class="iconfont icon-yitixian"></i>
                    <span>{{ $yzt('distribution.manage') }}</span>
                    <br>
                    <b>{{manage}}</b>元
                </router-link>
    
            </li>
        </ul>
        <div class="title">
            <div class="spare"></div>
            <h3>{{ $yzt('distribution.ordername') }}</h3>
        </div>
        <ul id="distribution-order">
            <li>
                <!--<router-link :to="{name:'distributionOrder',params:{selected:'0'},query:{i:toi}}">-->
                <router-link :to="fun.getUrl('distributionOrder',{selected:'0'})">
                    <i class="iconfont icon-caidan"></i>
                    <br>{{ $yzt('distribution.all_order') }}
                </router-link> </li>
                <li>
                    <!--<router-link :to="{name:'distributionOrder',params:{selected:'1'},query:{i:toi}}">-->
                    <router-link :to="fun.getUrl('distributionOrder',{selected:'1'})">
                        <i class="iconfont icon-weifukuan" aria-hidden="true"></i>
                        <br>{{ $yzt('distribution.no_pay_order') }}
                    </router-link>
                </li>
                <li>
                    <!--<router-link :to="{name:'distributionOrder',params:{selected:'2'},query:{i:toi}}">-->
                    <router-link :to="fun.getUrl('distributionOrder',{selected:'2'})">
                        <i class="iconfont icon-weifukuan" aria-hidden="true"></i>
                        <br>{{ $yzt('distribution.pay_order') }}
                    </router-link>
                </li>
                <li>
                    <!--<router-link :to="{name:'distributionOrder',params:{selected:'3'},query:{i:toi}}">-->
                    <router-link :to="fun.getUrl('distributionOrder',{selected:'3'})">
                        <i class="iconfont icon-wancheng2"></i>
                        <br>{{ $yzt('distribution.complate_order') }}
                    </router-link>
                </li>
        </ul>
    </div>
</template>
<script>
import distribution from './distribution_controller';
export default distribution;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.distribution {
    a {
        color: #000;
    }
    .header {
        height: auto;
            background: linear-gradient(to top, #FECD50, #F4AB2B);
        background-size: 100% 100%;
        padding: 20px;
        position: relative;
        .user {
            display: flex;
            .user-head {
                height: 52px;
                width: 52px;
                background: #fff;
                border-radius: 50%;
                border: 2px solid #fff;
                box-sizing: content-box;
                overflow: hidden;
                img {
                    width:100%;
                }
            }
            .user-info {
                color: #fff;
                text-align: left;
                margin-left:10px;
                .user-name {
                    font-weight:bold;
                    font-size: 0.9rem;
                    line-height: 30px;
                }
                .user-other {
                    font-size: 0.75rem;
                    opacity: 0.5;
                }
            }
        }
    }
    .scale {
        height: auto;
        width: 100%;
        background: #fff;
        margin-top: 10px;
        .list1 {
            height: 44px;
            box-sizing: content-box;
            background: #fff;
            padding:0 12px;
            font-size: .9rem;
            line-height: 44px;
            color: #333;
            text-align: left;
            border-bottom:solid 1px #e2e2e2;
            i {
                color: #FECD51;
                font-size: 1.2rem;
                float: right;
                line-height: 44px;
            }
        }
        .list2 {
            height: 44px;
            box-sizing: content-box;
            background: #fff;
            padding:0 12px;
            font-size: 0.9rem;
            line-height: 44px;
            color: #888;
            text-align: left;
            span {
                float: right;
                color: #FDB22F;
            }
        }
    }
    .myrelationship {
        a {
            .list1 {
                height: 44px;
                background: #fff;
                padding: 0 12px;
                font-size: 15px;
                line-height: 44px;
                box-sizing: content-box;
                color: #242424;
                text-align: left;
                i {
                    line-height: 44px;
                    color:#c9c9c9;
                    font-size: 24px;
                    float: right;
                }
                span {
                    line-height: 44px;
                    color: #8c8c8c;
                    font-size: 14px;
                    float: right;
                    padding-right: 10px;
                }
            }
        }
    }
   
    .title{
        margin-top:10px;
        display: flex;
        height:36px;
        line-height: 36px;
        background-color: #fff;
        padding:0 10px;
        border-bottom:solid 1px #e2e2e2;
        .spare{
            width:4px;
            height:16px;
            background-color: #f15353;
            margin-right:6px;
            margin-top:9px;
            border-radius: 1px;
        }
        h3{
            font-size:.875rem;
        }
    }
    #gongge {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        background: #FFF;
        column-count: 3;
        padding-bottom: 10px;
        padding-top:10px;
        li {
            width: 33%;
            text-align: center;
            margin-bottom: 10px;
            margin-top: 10px;
            font-size: 0.8rem;
            i{
                font-size:26px;
                color:#999;
                display: inline-block;
                margin-bottom:6px;
                width:100%;
                color: orangered;
            }
            a span {
                color: #333;
                font-size:12px;
            }
            b{
                color:#f15353;
                font-size:16px;
            }
        }
    }
}

#distribution-order {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    background: #FFF;
    column-count: 4;
    padding-bottom: 10px;
    li {
        width: 25%;
        text-align: center;
        margin-bottom: 10px;
        font-size: 0.8rem;
        color: #666;
        i {
            font-size: 1.7rem;
            color: orange;
            margin: 15px 0 7px 0;
            display: inline-block;
            
        }
    }
}
</style>