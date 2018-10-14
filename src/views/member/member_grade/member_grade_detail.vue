<template>
    <div id="member-grade">
       <c-title :hide="false" text='会员权益'></c-title>
       <div style="height:40px;"></div>
       <div class="name">
           <h1>{{levelName}}</h1>
           <span>升级后有效期{{day}}天</span>
       </div>
       <div class="grade-box">
           <!-- <div class="plate">
               <ul>
                   <li class="top">子等级名称</li>
                   <li class="member">￥<span>99</span></li>
                   <li>
                       <div class="shape"></div>
                   </li>
               </ul>
               <ul>
                   <li class="top">子等级名称</li>
                   <li class="member">￥<span>99</span></li>
               </ul>
               <ul>
                   <li class="top">子等级名称</li>
                   <li class="member">￥<span>99</span></li>
               </ul>
           </div> -->
           <div class="detail" v-html="agreementCon">
               
           </div>
       </div>
       <div style="height:52px"></div>
       <div class="bottom">
           <span>应付款：￥{{goodsPrice}}</span>
           <button type="button" aria-placeholder="立即购买" @click="buy">立即购买</button>
       </div>
       
    </div>


</template>


<script>
	import member_grade_detail_controller from "./member_grade_detail_controller";
	export default member_grade_detail_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#member-grade{
    .name{
        background-color: #3b3b4f;
        color:#fff;
        padding:16px 14px;
        text-align: left;
        h1{
            font-size:1.25rem;
            margin-bottom:10px;
        }
        span{
            padding:2px 10px;
            background-color: rgb(87, 87, 109);
            border-radius: 13px;
            font-size:.75rem;
        }
    }
    .grade-box{
        background-color: #fff;
        padding:16px 14px;
        .plate{
            display: flex;
            ul{
                position: relative;
                width:32%;
                border-radius: 4px;
                padding:20px 0;
                .top{
                    font-size:.875rem;
                    line-height: 24px;
                }
                .member{
                    font-size:.875rem;
                    span{
                        font-size:2rem;
                    }
                }
                .shape{
                    width:20%;
                    height:20px;
                    background-color: #ff9800;
                    border-radius: 2px;
                    transform: rotate(45deg);
                    position: absolute;
                    bottom:-6px;
                    left:40%;
                }
            }
            ul:first-child{
                background-color: #ff9800;
                color:#fff;
            }
            ul:nth-child(2),ul:nth-child(3){
                background-color: #fff;
                border:solid 1px #ff9800;
                color:#333;
            }
            ul:nth-child(2){
                margin:0 10px;
            }
        }
        .detail{
            width:100%;
            height:340px;
            color:#333;
            font-size:.875rem;
            padding:10px;
            border:solid 1px #e2e2e2;
            margin-top:16px;
            text-align: left;
            background-color: #fff;
            border-radius: 4px;
        }
    }
    .bottom{
        width: 100%;
        height:49px;
        background-color: #fff;
        line-height: 49px;
        position:fixed;
        display: flex;
        bottom:0;
        font-size:1rem;
        border-top:solid 1px #e2e2e2;
        button{
            background-color: #f15353;
            border:none;
            flex:30%;
            color:#fff;
        }
        span{
            flex:70%;
            text-align: left;
            padding-left:14px;
        }
    }
}

</style>


