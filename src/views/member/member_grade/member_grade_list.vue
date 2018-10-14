<template>
    <div id="member-grade">
       <c-title :hide="false" text='会员权益'></c-title>
        <div style="height:40px;"></div>
        <div class="header">
            <div class="use-header">
                <div class="img">
                    <img :src="memberInfo.avatar">
                </div>
                <ul>
                    <li class="name">{{memberInfo.nickname}}</li>
                    <li>等级名称:{{memberInfo.level_name}}</li>
                </ul>
                <!-- <div class="button">
                    <input type="button" value="退款迁移"  @click="gotoRefundsMigration"/>
                    <i class="fa fa-angle-right"></i>
                </div> -->
            </div>
            <div class="time" v-if="memberInfo.validity == 0?false:true">
                <yd-icon class="iconfont icon-naozhong" custom size="18px" color="#f5d59c"></yd-icon>
                <font><span>有效期：</span>{{memberInfo.validity}}天</font>
            </div>
        </div>
        <div class="current" v-if="(memberInfo.level_id == 0?false:true)">
            <div class="title-box">
                    <div class="left"></div>
                    <span>会员权益</span>
                    <div class="right"></div>
            </div>
            <ul>
                    <li><div class="circur"></div>全场{{right.discount}}折（特殊商品除外）</li>
                    <li><div class="circur"></div>全场运费减免{{right.freight_reduction}}%</li>
                    <li><div class="circur"></div>租赁商品免租金数量：{{right.rent_free}}件</li>
                    <li><div class="circur"></div>租赁商品免押金数量：{{right.deposit_free}}件</li>
            </ul>
        </div>
        <div v-for="item in levelList" v-if="isNotNull(item.goods)">
            <div class="member-box">
                <div class="top">
                    <h1>{{item.level_name}}</h1>
                </div>
                <div class="title-box">
                    <div class="left"></div>
                    <span>会员权益</span>
                    <div class="right"></div>
                </div>
                <ul>
                    <li v-if="isNotNull(item.discount)"><div class="circur"></div>全场{{item.discount}}折（特殊商品除外）</li>
                    <li v-if="isNotNull(item.freight_reduction)"><div class="circur"></div>全场运费减免{{item.freight_reduction}}%</li>
                    <li><div class="circur"></div>租赁商品免租金数量：{{isNotNull(item.rent_free)?item.rent_free:0}}件</li>
                    <li><div class="circur"></div>租赁商品免押金数量：{{isNotNull(item.deposit_free)?item.deposit_free:0}}件</li>
                </ul>
                <div class="bottom">
                    <span><h1><small>￥</small>{{item.goods.price}}</h1></span>
                    <button @click="buy(item.goods.id)">{{item.id == memberInfo.level_id?"立即续费":"立即购买"}}</button>
                </div>
            </div>
        </div>
       
        <!-- <div class="member-box">
            <div class="top">
                <h1>等级名称</h1>
            </div>
            <div class="title-box">
                <div class="left"></div>
                <span>会员权益</span>
                <div class="right"></div>
            </div>
            <ul>
                <li><div class="circur"></div>全场68折（特殊商品除外）</li>
                <li><div class="circur"></div>全场运费减免N%</li>
                <li><div class="circur"></div>租赁商品免租金数量：20件</li>
                <li><div class="circur"></div>租赁商品免押金数量：20件</li>
            </ul>
            <div class="bottom">
                <span><h1><small>￥</small>99</h1></span>
                <button>立即升级</button>
            </div>
        </div> -->
        <div class="introduce" v-if="isNotNull(shopDesc)">
            <h2>【商城名称】介绍</h2>
            <p v-html="shopDesc"></p>
        </div>
        <div style="height:45px;background-color:#f2f2f2"></div>
        <a class="service" :href="cservice">
            <yd-icon class="iconfont icon-wodekefu" custom size="20px" color="#f5d59c"></yd-icon>
            <span>联系客服</span>
        </a>
    </div>


</template>


<script>
	import member_grade_list_controller from "./member_grade_list_controller.js";
	export default member_grade_list_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#member-grade{
    background-color: #fff;
    .header{
        margin-bottom:16px;
        width:100%;
        .use-header{
            background-color:#3b3b4f;
            padding:20px;
            position:relative;
            display:flex;
            .img{
                width:60px;
                height:60px;
                border:solid 2px #fff;
                border-radius:50%;
                margin-right:16px;
                overflow:hidden;
                img{
                    width:100%;
                }
            }
            ul{
                text-align:left;
                li{
                    line-height:28px;
                    color:#fff;
                    font-size:.9rem;
                }
                .name{
                    font-weight:bold;
                }
            }
            .button{
                width:21%;
                height:26px;
                background-color: #fff;
                border-radius:13px;
                display:flex;
                justify-content:space-between;
                padding:0 8px;
                position:absolute;
                margin-top:17px;
                right:10px;
                
                input{
                    border:none;
                    color:#efcb7b;
                }
                i{
                    color:#efcb7b;
                    font-size:20px;
                    line-height:26px;
                }
            }
        }
        .time{
            background-color:rgba(59,59,79,0.8);
            text-align:left;
            height:36px;
            padding:0 20px;
            font{
                font-size:.9rem;
                line-height:36px;
                color:#f5d59c;
                span{
                    font-weight:bold;
                }
            }
            i{
                margin-right:10px;
            }
        }
    }
    .current{
        padding:0 14px;
        ul{
            padding:0px 16px;
            margin-bottom:10px;
            li{
                line-height: 30px;
                text-align: left;
                display: flex;
                font-size:.875rem;
                .circur{
                    width:8px;
                    height:8px;
                    border-radius: 50%;
                    background-color: #f5d59c;
                    margin-top:11px;
                    margin-right:10px;
                }
            }
        }

    }
    .member-box{
    margin:0 14px 16px 14px;
    background-color:#fff;
    border-radius: 6px; 
    box-shadow: 0px 2px 8px 0.4px rgba(0, 0, 0, 0.2);
    }
    .top{
        margin-bottom:10px;
        height:40px;
        line-height: 40px;  
        background-color: #f5d59c;
        border-radius: 6px 6px 0 0;
        color:#333;
        font-size:1rem;
        h1{
            text-align: left;
            margin-left:12px;
        }
    }
    .title-box{
        display: flex;
        justify-content: space-between;
        .left{
            margin-left:14px;
            width:32%;
            height:1px;
            background-color: #ccc;
            margin-top:15px;
        }
        span{
            font-size:1rem;
            line-height: 30px;
        }
        .right{
            width:32%;
            height:1px;
            background-color: #ccc;
            margin-top:15px;
            margin-right:14px;
        }
    }
    .bottom{
        height:40px;
        line-height: 40px;
        background-color: #f5d59c ;
        border-radius:0 0 6px 6px;
        color:#333;
        position:relative;
        h1{
            font-size:1rem;
            text-align: left;
            margin-left:12px;
        }
    }
    button{
        height:26px;
        padding:0 10px;
        border:none;
        color:#f5d59c;
        background-color: #3b3b4f;
        border-radius: 4px;
        position:absolute;
        right:14px;
        top:7px;
    }
    .member-box{
            ul{
            padding:0px 16px;
            margin-bottom:10px;
            li{
                line-height: 30px;
                text-align: left;
                display: flex;
                font-size:.875rem;
                .circur{
                    width:8px;
                    height:8px;
                    border-radius: 50%;
                    background-color: #bbb;
                    margin-top:11px;
                    margin-right:10px;
                }
            }
        }
    }
    
    .introduce{
        background-color: #fff;
        border-bottom: solid 1px #e2e2e2;
        h2{
            margin-left:14px;
            padding-right:14px;
            font-size:.9rem;
            line-height: 36px;
            border-bottom: solid 1px #e2e2e2;
            text-align: left;
        }
        p{
            margin:0 14px;
            line-height: 20px;
            text-align: left;
            padding:10px 0;
        }
    }
    .service{
        position:fixed;
        bottom:0;
        width:100%;
        height:40px;
        line-height: 40px;
        background-color: #3b3b4f;
        display: flex;
        justify-content:center;
        span{
            margin-left:10px;
            color:#f5d59c;
            font-size:.9rem;
        }
    }
    
}

</style>


