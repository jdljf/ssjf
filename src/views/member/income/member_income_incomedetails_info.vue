<template>
    <div id="commission">
        <c-title :hide="false" text='收入详情'></c-title>
        <div style="height: 40px;"></div>
        <div class="atitem" v-if="info">
            <div class="title">{{info.title}}</div>
            <div style="height:10px;"></div>
            <div class="tbs" v-for="item in info.data" v-if="info">
                <div class="item1">{{item.title}}</div>
                <div class="item2">{{item.value}}</div>
            </div>
        </div>
    
        <div class="atitem" v-if="order">
            <div class="title">{{order.title}}</div>
            <div style="height:10px;"></div>
            <div class="tbs" v-for="item in order.data">
                <div class="item1">{{item.title}}</div>
                <div class="item2">{{item.value}}</div>
            </div>
    
        </div>
        <div class="atitem" v-if="goods">
            <div class="title">{{goods.title}}</div>
    
            <div>
                <div class="tbs goods-info" v-for="item in goods.data">
                    <div class="goods" v-for="g in item">
                        <div class="item1">{{g.title}}</div>
                        <div class="item2">{{g.value}}</div>
                    </div>
                </div>
            </div>
    
        </div>
    </div>
</template>
<script>
import member_income_incomedetails_info_controller from './member_income_incomedetails_info_controller';
export default member_income_incomedetails_info_controller;

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#commission {
    .times {
        text-align: left;
        text-indent: 10px;
        line-height: 2rem;
        border-bottom: #D9D9D9 solid 1px;
        font-weight: bold;
        font-size: 1rem;
        font {
            color: #008000;
            padding-left: 13px;
        }
        ;
    }
    .atitem {
        background: #FFF;
        padding-bottom:10px;
        .title {
            background: #f5f5f5;
            line-height: 30px;
            font-size:.875rem;
            padding:0 12px;
            text-align: left;
        }
        .tbs.goods-info {
            padding-top:10px;
        }
    }
    /*.goods{display: flex;align-items:center;flex-wrap:wrap;background:#fff;border-top:1px solid #f1f1f1;
		b{flex: 2; img{width: 50%;margin:10px 0  ;}}*/
    font {
        flex: 5;
        text-align: left;
        margin: 10px;
    }
    span {
        flex: 1;
        text-align: right;
        margin-right: 10px;
    }
}

.tbs {
    background: #FFF;
    overflow: hidden;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    padding:0 14px;
    line-height: 30px;
    .item1 {
        color: #8c8c8c;
        flex: 35%;
        text-align: left;
        box-sizing: border-box;
    }
    .item2 {
        flex: 65%;
        text-align: left;
        color: #333;
        text-align: right;
        .reg {
            color: #259B24;
        }
    }

    .goods {
        background: #FFF;
        overflow: hidden;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        line-height: 30px;
        width: 100%;
        .item1 {
            color: #888;
            flex: 35%;
            text-align: left;
            box-sizing: border-box;
        }
        .item2 {
            flex: 65%;
            text-align: left;
            color: #000;
            text-align: right;
            .reg {
                color: #259B24;
            }
        }
    }
}
</style>