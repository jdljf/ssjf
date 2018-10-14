<template >
    <div id="aftersales">
        <c-title :hide="false"
                 text='售后详情'></c-title>
        <div class="bar-header">
            <button class="lf icon chevron-left"></button>
            <span class="title">退款</span>
            <button class="rt icon more"></button>
            <button class="rt icon share"></button>
        </div>
    
        <div class="section">
    
            <div class="close">
                <div class="state">
                    <!--<button class="icon false lf"></button>-->
                    <b>{{status_name}}</b>
                    <p v-if="reject_reason">驳回原因：<span class="reason-new">{{reject_reason}}</span></p>
                </div>
                <div class="flow">
                    <h2> 退款申请流程：</h2>
                    <ul>
                        <li>1、发起退款申请</li>
                        <li>2、商家确认后退款到您的账户</li>
                        <li><p>如果商家未处理：请及时与商家联系</p></li>
                    </ul>
                </div>
                
                 
                

                <!--<p><b>时间:</b><span>{{refund_time}}</span></p>-->
            </div>
            <div class="line"></div>
            <div class="consult-detail">
                <h1>协商详情</h1>
                <ul class="list">
                    <li><span>售后类型：</span> <b> {{refund_type_name}}</b></li>
                    <!--<li><span>退货地址：</span> <b> {{refund_address}}</b></li>-->
                    <li><span>退款金额：</span> <b> ¥ {{price}}</b></li>
                    <li><span>退款原因：</span> <b> {{reason}}</b></li>
                    <li><span>退款说明：</span> <b> {{content}}</b></li>
                    <!--<li><span>售后说明：</span> <b> </b></li>-->
                    <!--<li><span>售后编号：</span> <b> {{alipay_batch_sn}}</b></li>-->
                    <li><span>申请时间：</span> <b> {{create_time}}</b></li>
                </ul>
            </div>
            
            <div id="bt"
                 v-for="button in button_models">
                <button @click="opration(button)">{{button.name}}</button>
    
            </div>
        </div>
    
    </div>
</template>
<script>
import order_aftersalescontroller from './order_aftersalescontroller';
export default order_aftersalescontroller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#aftersales {
    #list {
        margin-top: 52px;
        i {
            background: #DADADA;
            border-radius: 16px;
            padding: 2px 10px;
            font-size: .6rem;
        }
        p {
            text-align: left;
        }
        .mytall {
            position: relative;
            width: 80%;
            background: #DBD9B7;
            margin: 5px auto;
            border-radius: 4px;
            padding: 10px;
            margin-bottom: 15px;
            h4 {
                margin: 0;
                line-height: 1.7rem;
                text-align: left;
                border-bottom: #FFF 1px solid;
            }
            .atte {
                position: absolute;
                left: -9px;
                display: block;
                width: 0;
                height: 0;
                top: 10%;
                border-top: 10px solid transparent;
                border-right: 10px solid #DBD9B7;
                border-bottom: 10px solid transparent;
            }
        }
        .you {
            background: #B3D1C1;
            .attes {
                position: absolute;
                right: -9px;
                display: block;
                width: 0;
                height: 0;
                top: 10%;
                border-top: 10px solid transparent;
                border-left: 10px solid #B3D1C1;
                border-bottom: 10px solid transparent;
            }
        }
    }
}

.lf {
    float: left
}

.rt {
    float: right
}

a {
    text-decoration: none;
    color: #222222
}

li,
ul,
dl,
dd,
h1,
h2,
h3,
h4,
h5 {
    margin: 0;
    padding: 0;
}

li {
    list-style-type: none;
    display: list-item;
    text-align: -webkit-match-parent;
}

.bar-header {
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}

.bar-header .title {
    display: inline-block;
    line-height: 44px;
    font-size: 20px;
}

.section {
    width: 100%;
}

.section .close:after {
    display: table;
    content: '';
    clear: both;
}

.section .close {
    background: #fff;
}
.state{
    background: #ef5457;
    color:#fff;
    height:68px;
    padding:8px 14px;
    text-align: left;
    b{
        font-size: 1.1rem;
        margin-bottom:7px;
        display:block;
    }
    p{
    	font-size: 1rem;
    	.reason-new{
    		color: #FFF;
    	}
    }
}
.flow{
    text-align: left;
    h2{
        line-height: 36px;
        border-bottom:solid 1px #ebebeb;
        margin-left:14px;
        font-weight: normal;
        font-size:1.1rem;
        font-weight: 600;
        
    }
    ul{
        font-size:12px;
        padding:10px 14px;
    }
    li{
        line-height: 28px;
        font-size: 1rem;
        p{
            color:#8c8c8c;
            display: inline-block;
        }
    }
}

.section .close p {
    line-height: 18px;
    text-align: left;
}

.section .close p b {
    padding-right: 8px;
}

.section .close p span {
    /*color: #aaa;*/
}

// .section .line {
//     background: url(../../../assets/images/wave.png) repeat;
//     width: 100%;
//     height: 5px;
// }
.consult-detail{
    background-color: #fff;
    margin:10px 0 15px 0;
    h1{
        margin-left:14px;
        padding-right:14px;
        line-height: 36px;
        border-bottom:solid 1px #ebebeb;
        font-size: 1.1rem;
        font-weight: normal;
        text-align: left;
        font-weight: 600;
    }
    ul{
        padding:10px 14px;
        font-size:12px;
    }
    li{
        display: flex;
        line-height: 28px;
        font-size: 16px;
        span{
        	display: block;
        	width: 80px;
        }
        b{	
        	flex: 1;
            margin-left:10px;
            color:#8c8c8c;
            font-weight: normal;
        }
    }
}

.section .back {
    width: 100%;
    height: 20px;
}

.section .detail {
    line-height: 40px;
    font-weight: bold;
    background: #fff;
    font-size: 16px;
    margin-bottom: 20px;
    padding-left: 20px;
}

.section .list {
    text-align: left;
}

.section .list>div {
    line-height: 40px;
    background: #fff;
    border: 1px solid #aaa;
    border-bottom: 0;
    border-radius: 3px;
    padding-left: 15px;
}

.section .list>div:first-child {
    margin-bottom: 20px;
    border: 1px solid #aaa;
}

.section .list>div:last-child {
    border-bottom: 1px solid #aaa;
}

.section .list>div span {
    color: #888;
}

.section .list>p {
    text-align: right;
    padding-right: 10px;
}

.section .list .question {
    display: inline-block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    border: 1px solid #aaa;
    margin: 0 5px;
    text-align: center;
}


/*图标*/

button.icon {
    background: url(../../../assets/images/icon.png) no-repeat;
    width: 50px;
    height: 44px;
    border: 0;
    outline: 0;
}

button.chevron-left {
    background-position: 2px 4px
}

button.share {
    background-position: 0 -40px
}

button.more {
    background-position: 0 -77px
}

button.false {
    background-position: -52px 12px;
    height: 100%;
}

button.server {
    background-position: -54px -63px
}

#bt {
    display: flex;
    button {
        height:36px;
        background: #ef5457;
        border: none;
        color: #FFF;
        border-radius: 4px;
        width:92%;
        margin:5px auto;
        font-size: 17px;
    }
}
</style>