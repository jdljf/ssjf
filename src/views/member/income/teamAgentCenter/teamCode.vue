
<template>
    <div id="teamCode">
        <c-title :hide="false" text='我的激活码' tolink='codeHistory' totext='使用记录'></c-title>
        <div style="height:40px;"></div>
        <el-button type="text" @click="openDialog('123')">使用激活码</el-button>
        
        
        <ul class='rationList' v-for="item in codes">
            <li>
                <div class="left">
                    <span>激活码</span>
                </div>
                <div class="right">
                    {{item.code}}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>



import team_code_controller from './team_code_controller';
export default team_code_controller;
</script>

<style  lang="scss" rel="stylesheet/scss" scoped>
#teamCode {
    .el-button--text {
        color: #fff;
        background-color: #f15353;
        border-color: #f15353;
        width: 90%;
        margin: 10px;
    }
    .m_header {
        width: 100%;
        height: 45px;
        margin-top:45px;
        line-height: 45px;
        background: #fff;
        border-bottom: 1px solid #ccc;
        span {
            display: inline-block;
            width: 16px;
            height: 24px;
            float: left;
            font-size: 22px;
            font-weight: normal;
        }
        span.history {
            width: 20%;
            float: right;
            font-size: .8rem;
            font-weight: normal;
            color: #888;
        }
        span.title {
            width: 60%;
            font-size: 15px;
            font-weight: bold;
            box-sizing: border-box;
            padding-left: 30%;
        }
    }
    .rationList {
        li {
            background: #fff;
            padding: 10px;
            overflow: hidden;
            border-bottom: 1px solid #ddd;
            .left {
                float: left;
                color: #333;
                line-height: 28px;
                .num {
                    color: #999;
                    font-size: .8rem;
                    margin-left: 5px;
                }
            }
            .right {
                float: right;
                line-height: 28px;
            }
        }
    }
}
</style>
