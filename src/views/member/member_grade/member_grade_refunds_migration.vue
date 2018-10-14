<template>
    <div id="member-grade">
       <c-title :hide="false" text='退款迁移'></c-title>
       <div style="height:40px;"></div>
        <div class="box">
            <ul>
                <li class="time"><font>您的会员余额有效期：</font><span>2018-12-31</span></li>
                <li class="balance"><font>折合金额：</font><span>XX元</span></li>
                <li class="formula">折合金额=剩余有效期天数（取整）*每周期金额</li>
            </ul>
            <div class="region">
                <h1>当前分站区域：广东省-广州市-白云区</h1>
                <div class="select">
                    <el-select style="width:100%;height:30px" placeholder="请选择迁入分站区域" placement="top">
                        <el-option value="">广东省-广州市-白云区</el-option>
                        <el-option value="">广东省-广州市-天河区</el-option>
                        <el-option value="">广东省-广州市-海珠区</el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <div class="button">
            <input type="button" value="申请迁移">
        </div>
        
    </div>


</template>


<script>
	import member_grade_refunds_migration from "./member_grade_refunds_migration_controller";
	export default member_grade_refunds_migration;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
#member-grade{
    .box{
        padding-top:14px;
        background-color: #fff;
        ul{
            margin:0 14px;
            background: #efcb7b ;
            border-radius: 6px;
            padding:16px;
            text-align:left;
            li{
                font-size:1rem;
                line-height:30px;
            }
            font{
                font-weight:bold;
            }
            .time{
                margin-bottom:10px;
            }
            .balance{
                span{
                  font-weight:bold; 
                }
            }
            .formula{
                font-size:.875rem;
                color:#fff;
                line-height:24px;
            }
        }
        .region{
            background-color: #fff;
            padding:10px 14px;
            h1{
                font-size:.9rem;
                text-align:left;
                margin:10px 0 ;
            }
            .select{
                width:80%;
                margin-bottom:10px;
                display:flex;
                border-radius:4px;
                text-align:left;
                Option{
                    padding:0 6px;
                }
            }
            .el-scrollbar li{
                text-align: left;
            }
        }
        
        
    }
    .button{
        margin-top:40px;
            input{
                width:68%;
                height:40px;
                border-radius:6px;
                border:none;
                background-color:#f15353;
                color:#fff;
                font-weight:bold;
                font-size:.9rem;
            }
        }
    
}

</style>


