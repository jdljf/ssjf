<template>
    <div id="area-select">
        <c-title :hide="false" text='区域选择'></c-title>
        <div style="height:40px;"></div>
        <div class="search-box">
            <div class="search">
                <yd-icon class="iconfont icon-sousuo1" custom size="16px" color="#999"></yd-icon>
                <input type="text" placeholder="请输入城市名">
            </div>
        </div>
        <div class="current-area">当前区域：广州市-白云区</div>
        <h1>已开放城市</h1>
        <div class="city-list">
            <div class="current-city">
                <!-- <div v-for="(item,index) in province">
                                        <div class="tbs" @click='toggle($event,index)'>
                                            <div class="li2">
                                                <span>{{item.name}}</span>
                                                <div class="li4">
                                                    <i class='fa' :class="{'fa-angle-down':sort==index,'fa-angle-right':sort!=index}"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <transition name="fade">
                                          
                                               <div class="tbs3" v-show='sort==index'>
                                                    <div v-for="(val,i) in item.item1">{{val.name}}</div>
                                                </div>
                                            
                                             <div class="tbs3" v-show='sort==index'>1111</div>
                                        </transition>
                                    </div> -->
                <div v-for="(item,index) in province">
                    <div class="tbs" @click='toggle($event,index)'>
                        
                        <div class="li2">
                            <div class="icon"><yd-icon class="iconfont icon-icon_location" custom size="16px" color="#ff9800"></yd-icon></div>
                            <div class="name">广东省</div>
                        </div>
                        <div class="li4">
                            <span>选择城市</span>
                            <i class='fa' :class="{'fa-angle-down':sort==index,'fa-angle-right':sort!=index}"></i>
                        </div>
                    </div>
                    <transition name="fade">
                        <div class="tbs3" v-show='sort==index'>
                            <div v-for="(val,i) in item.item1" style="line-height:30px;border-bottom:1px;">
                                <div class="tbs1" @click='toggle1($event,i)'>
                                    <div class="li2">
                                        <!-- <div class="icon"><yd-icon class="iconfont icon-icon_location" custom size="16px" color="#ff9800"></yd-icon></div> -->
                                        <div class="name"><span>广州市</span></div>
                                    </div>
                                    <div class="li4">
                                        <i class='fa' :class="{'fa-angle-down':sort1==i,'fa-angle-right':sort1!=i}"></i>
                                    </div>
                                </div>
                                <transition name="fade">
                                    <div class="tbs3-1" v-show='sort1==i'>
                                        <button type="button">白云区</button>
                                        <button type="button">珠海区</button>
                                        <button type="button">番禹区</button>
                                        <button type="button">天河区</button>
                                    </div>
                                </transition>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import home_zone_controller from './home_zone_controller';
    export default home_zone_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
    #area-select {
        // .search-box{
        //     background-color: #fff;
        //     height:45px;
        //     padding:0 14px;
        //     margin-bottom:10px;
        //     padding-top:9px;
        //     .search{
        //         display: flex;
        //         border:solid 1px #ebebeb;
        //         height:28px;
        //         line-height: 28px;
        //         border-radius: 14px;
        //         padding:0 10px;
        //         background-color: #fafafa;
        //     }
        //     input{
        //         line-height: 28px;
        //         border:none;
        //         color:#333;
        //         margin-left:6px;
        //     }
        // }
        // text-align: left;
        // .current-area {
        //     background-color: #fff;
        //     line-height: 45px;
        //     padding: 0 14px;
        //     color: #333;
        //     font-size: 14px;
        // }
        // h1 {
        //     line-height: 30px;
        //     padding: 0 14px;
        //     color: #999;
        // }
        .city-list {
            position: relative;
            .left,
            .other-area {
                i {
                    position: absolute;
                    left: 14px;
                }
            }
            .current-city {
                background-color: #fafafa;
                .level-pro {
                    background-color: #fff;
                    display: flex;
                    justify-content: space-between;
                    line-height: 40px;
                    padding: 0 14px 0 36px;
                    font-size: 14px;
                    color: #333;
                    border-bottom: solid 1px #ebebeb;
                    .right {
                        span {
                            color: #999;
                        }
                        i {
                            color: #999;
                            font-size: 18px;
                            margin-left: 6px;
                        }
                    }
                }
                .level-city {
                    display: flex;
                    justify-content: space-between;
                    background-color: #fafafa;
                    line-height: 40px;
                    padding: 0 14px 0 36px;
                    font-size: 14px;
                    border-bottom: solid 1px #ebebeb;
                    i {
                        color: #999;
                        font-size: 18px;
                    }
                }
                .level-area {
                    padding: 10px 14px 20px 14px;
                    border-bottom: solid 1px #ebebeb;
                    button {
                        width: 32%;
                        margin-right: 1%;
                        height: 30px;
                        border: solid 1px #ebebeb;
                        border-radius: 4px;
                        margin-top: 12px;
                        background-color: #fff;
                    }
                    button:nth-child(3n) {
                        margin: 0;
                    }
                }
            }
            .other-area {
                background-color: #fff;
                line-height: 40px;
                border-bottom: solid 1px #ebebeb;
                padding: 0 14px 0 36px;
                font-size: 14px;
            }
        }
        .tbs {
            position: relative;
            display: flex;
            justify-content: space-between;
            background: #fff;
            border-bottom: #e8e8e8 1px solid;
            height:45px;
            line-height: 45px;
            float: left;
            width: 100%;
            background: #fff;
            font-size:14px;
            padding:0 14px;
            .left {
                font-size: 0.8rem;
                box-sizing: border-box;
                width: 50%;
                text-align: left;
                height: 45px;
                line-height: 45px;
                float: left;
                img {
                    width: 30%;
                    float: left;
                }
            }
            .right {
                width: 50%;
                text-align: right;
            }
            a {
                color: #000;
            }
            .relation {
                color: #666;
            }
            .id,
            .level {
                font-size: 0.9rem;
                line-height: 45px;
            }
            .fa.fa-search {
                color: #999;
                font-size: 20px;
            }
            i {
                font-size: 24px;
            }
            .img {
                margin: 10px 0;
            }
            .li1 {
                width: 50px;
                height: 50px; // margin-top:10px;
                // margin-left:10px;
                float: left;
                line-height: 50px;
                background: #ccc;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .li2 {
                width:50%;
                display: flex;
                float: left;
                position: relative;
                p {
                    margin-top: 7px;
                    margin-left: 10px;
                    text-align: left;
                }
                .name{
                    position: absolute;
                    left:26px;
                }
            }
            .li3 {
                flex: 30%;
                width: 30%;
                span {
                    border: #b1a6a6 solid 1px;
                    padding: 5px 20px;
                    border-radius: 7px;
                    display: none;
                }
            }
            .li4 {
                // flex: 5%;
                // width: 5%;
                float: right;
                text-align: right;
                i{
                    color:#999;
                    font-size:18px;
                }
                span{
                    color:#999;
                    margin-right:6px;
                }
            }
        }
        .tbs3 {
            .left {
                width: 46%;
                text-align: left;
                height: 45px;
                display: inline-block;
                line-height: 45px;
                img {
                    width: 30%;
                }
            }
            .left1 {
                width: 100%;
                text-align: left;
                height: 45px;
                padding-left: 13px;
                display: inline-block;
                line-height: 45px;
                img {
                    width: 30%;
                }
            }
            .right {
                width: 46%;
                display: inline-block;
                text-align: right;
                height: 45px;
                line-height: 45px;
            }
        }
        .tbs1 {
            display: flex;
            justify-content: space-between;
            background: #fff;
            border-bottom: #e8e8e8 1px solid;
            padding: 0px 14px;
            float: left;
            width: 100%;
            background: #fafafa;
            line-height: 45px;
            font-size:14px;
            .left {
                font-size: 0.8rem;
                box-sizing: border-box;
                width: 50%;
                text-align: left;
                height: 45px;
                line-height: 45px;
                float: left;
                img {
                    width: 30%;
                    float: left;
                }
            }
            .right {
                width: 50%;
                text-align: right;
            }
            a {
                color: #000;
            }
            .relation {
                color: #666;
            }
            .id,
            .level {
                font-size: 0.9rem;
                line-height: 45px;
            }
            .fa.fa-search {
                color: #999;
                font-size: 20px;
            }
            i {
                font-size: 24px;
            }
            .img {
                margin: 10px 0;
            }
            .li1 {
                width: 50px;
                height: 50px; // margin-top:10px;
                // margin-left:10px;
                float: left;
                line-height: 50px;
                background: #ccc;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .li2 {
                width:50%;
                display: flex;
                float: left;
                position: relative;
                p {
                    margin-top: 7px;
                    margin-left: 10px;
                    text-align: left;
                }
                .name{
                    position: absolute;
                    left:26px;
                }
            }
            .li3 {
                flex: 30%;
                width: 30%;
                span {
                    border: #b1a6a6 solid 1px;
                    padding: 5px 20px;
                    border-radius: 7px;
                    display: none;
                }
            }
            .li4 {
                // flex: 5%;
                // width: 5%;
                float: right;
                text-align: right;
                i{
                    color:#999;
                    font-size:18px;
                }
            }
        }
        .tbs3-1 {
            padding:0 14px 20px 14px;
            border-bottom:solid 1px #ebebeb;
            .left {
                width: 46%;
                text-align: left;
                height: 45px;
                display: inline-block;
                line-height: 45px;
                img {
                    width: 30%;
                }
            }
            .left1 {
                width: 100%;
                text-align: left;
                height: 45px;
                padding-left: 13px;
                display: inline-block;
                line-height: 45px;
                img {
                    width: 30%;
                }
            }
            .right {
                width: 46%;
                display: inline-block;
                text-align: right;
                height: 45px;
                line-height: 45px;
            }
                    button {
                        width: 32%;
                        margin-right: 1%;
                        height: 30px;
                        border: none;
                        border-radius: 4px;
                        margin-top: 12px;
                        background-color: #ebebeb;
                        color:#333;
                    }
                    button:nth-child(3n) {
                        margin: 0;
                    }
        }

        
    }
    .fade-enter-active {
        transition: 0.5s;
    }
    .fade-enter,
    .fade-leave-active {
        opacity: 0;
        height: 0px;
    }

    .choose{
        border:1px solid red;
    }
</style>