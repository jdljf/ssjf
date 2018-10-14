<template>
    <div id="alterAddress">
        <c-title :hide="false" text='我的信息'></c-title>
        <div style="height: 50px;"></div>
        <mt-field label="真实姓名" placeholder="请输入真实姓名" v-model='form.member_name'></mt-field>
        <mt-field label="身份证号码" placeholder="请输入身份证号码" v-model='form.member_card'></mt-field>
        <div class="address_addnav1" @click="saveInfo"><span>确认保存</span></div>
        <div style="margin-top:300px;text-align:center;"><span style="font-size:18px;line-height:20px;" @click="showRule"><yd-icon name="question" size="20px" color="#f15353"></yd-icon>使用说明</span></div>
     
        <yd-popup v-model="show1" position="center" width="90%">
            <div style="height:200px;width:100%;">
            <p style="text-align:left;margin:10px;font-size:22px;text-align:center;">{{explain_title}}</p>
            <p style="text-align:left;margin:10px;width:95%;word-wrap:break-word">{{explain_content}}</p>
            </div>
           
        </yd-popup>
    </div>
    
</template>
<script>
    import myinfo_controller from './myinfo_controller';
    export default myinfo_controller;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .address_addnav1 {
        width: 90%;
        margin: 50px auto;
        background: #f15353 !important;
        color: #fff !important;
        text-align: center;
        height: 44px !important;
        line-height: 44px !important;
        border-radius: 3px;
    }
    .address_addnav {
        width: 100%;
        padding: 0 3% 0 6% !important;
        position: fixed;
        bottom: 0;
        left: 0;
        color: #000 !important;
        text-align: center;
        height: 44px !important;
        line-height: 44px !important;
    }
    .red {
        color: red !important;
    }
    .popup-con {
        width: 100%;
    }
    #alterAddress .mint-field .mint-cell-title {
        text-align: left;
    }
    .address_addnav i {
        color: #fff;
        font-size: 22px;
        position: absolute;
        top: 50%;
        height: 18px;
        line-height: 18px;
        margin-left: -34px;
        margin-top: -9px;
    }
    .maleall {
        background: #FFF;
        text-align: left;
    }
    #alterAddress .males {
        line-height: 50px;
        display: flex;
        border-top: 1px solid #d9d9d9;
        margin-left: 10px;
    }
    .mydefault {
        line-height: 50px;
        display: flex;
        border-top: 1px solid #d9d9d9;
        margin-left: 10px;
        align-items: center;
    }
    .maleall span {
        font-size: 16px;
        vertical-align: middle;
        width: 105px;
        -webkit-box-flex: 0;
        -ms-flex: none;
        flex: none;
    }
    .address {
        flex: 1;
        line-height: 50px;
        .mint-button--default {
            line-height: 50px;
            text-align: left;
            font-size: 16px;
        }
    }
</style>