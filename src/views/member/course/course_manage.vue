<template>
    <div id="course">
        <c-title :hide="false" text='我的课程'></c-title>
        <div style="width:100%;height:40px;"></div>
        <yd-cell-group style="margin-bottom:10px;">
            <yd-cell-item @click.native="gotoVip"  id="header">
                <div slot="left" class="touxiang">
                    <img :src="memberInfo.avatar" style="width:100%;height:100%;border-radius:25px;">
                </div>
                <span slot="left" style="font-weight:bold;">{{memberInfo.nickname}}</span>
                <span slot="right">会员等级:{{memberInfo.level_name}}</span>
            </yd-cell-item>
        </yd-cell-group>
        <div class="box">
            <router-link :to="fun.getUrl('CourseMy')">
                <div class="list" >
                    <yd-icon slot="icon" class="icon-member-mycourse" custom size="20px" color="#f15353"></yd-icon>
                    <span>我的课程</span>
                    <i class="fa fa-angle-right"></i>
                </div>
            </router-link>
            <router-link :to="fun.getUrl('CourseHistory')">
                <div class="list" >
                    <yd-icon slot="icon" class="icon-member-history" custom size="20px" color="#f15353"></yd-icon>
                    <span>课程观看历史</span>
                    <i class="fa fa-angle-right"></i>
                    <span style="float:right;margin-right:6px;color:#8c8c8c;font-size:14px;">更多</span>
                </div>
            </router-link>
            <router-link :to="fun.getUrl('CourseReward')">
                <div class="list" >
                    <yd-icon slot="icon" class="icon-member-reward" custom size="20px" color="#f15353"></yd-icon>
                    <span>我的打赏</span>
                    <i class="fa fa-angle-right"></i>
                </div>
            </router-link>
            <router-link :to="fun.getUrl('CourseIndex')">
                <div class="list" id="last" >
                    <yd-icon slot="icon" class="icon-member-course1" custom size="20px" color="#f15353"></yd-icon>
                    <span>全部课程</span>
                    <i class="fa fa-angle-right"></i> 
                </div>
            </router-link>
        </div>
         <!-- <yd-cell-group id="list" v-if="false">
            <yd-cell-item arrow  @click.native="gotoMycourse">
                <yd-icon slot="icon" class="icon-kechengzhongxin" custom size="20px" color="#f5ce30"></yd-icon>
                <span slot="left">我的课程</span>
                <span slot="right"></span>
            </yd-cell-item>
            <yd-cell-item arrow  @click.native="gotoHistroy">
                <yd-icon slot="icon" class="icon-lishi" custom size="20px" color="#29c07e" ></yd-icon>
                <span slot="left">课程观看历史</span>
                <span slot="right" style="margin-right:6px;color:#8c8c8c;">更多</span>
                <span slot="right"></span>
            </yd-cell-item>
            <yd-cell-item arrow @click.native="gotoReward">
                <yd-icon slot="icon" class="icon-giftfill" custom size="20px" color="#ff9600"></yd-icon>
                <span slot="left">我的打赏</span>
                <span slot="right"></span>
            </yd-cell-item>

             <yd-cell-item arrow @click.native="gotoIndex">
                <yd-icon slot="icon" class="icon-tubiaozhizuomoban-" custom size="20px" color="#ff9600"></yd-icon>
                <span slot="left">全部课程</span>
                <span slot="right"></span>
            </yd-cell-item>
        </yd-cell-group>  -->
    </div>
</template>

<script>
    import course_manage_controller from "./course_manage_controller";
    export default course_manage_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
    #header{
        padding:20px;
        background-color: #f15353;
        span{
            color:#fff;
        }
    }
    .touxiang {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        margin-right: 10px;
        border:solid 2px #fff;
        overflow:hidden;
    }
    #last{
        border:none;
    }
    .box{
        background-color: #fff;
        width:100%;
    
       .list{
           font-size:15px;
           height:44px;
           line-height: 44px;
            border-bottom: solid 1px #ebebeb;
            margin-left:14px;
            padding-right:14px;
            text-align: left;
            i.fa.fa-angle-right{
                line-height: 44px;
                font-size:24px;
                color:#c9c9c9;
                float:right;
            }
            span{
                margin-left:6px;
            }
        }
               
    }
    
    
</style>