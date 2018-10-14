<template>
	<div>
	<div class="store-list"  @click="toRouter(items.id)" v-for="items in stores" :style="{'background-color':datas.params.bgcolor}">
		<div class="store-img" @click.stop="toSeller(items.id)">
			<a class="store-logo" >
				<!--<img :src="{{d.imgurl}}">-->
				<img :src="items.thumb">
			</a>
			<div class="store-category" >

				<span @click.stop="toClassify(items.has_one_category.id)" class="da store-category-name" :style="{'color':datas.params.catecolor}">{{items.has_one_category.name}}</span>
			</div>
		</div>
		<div class="store-intro" >
			<div class="a8q ">
				<h2 class="" :style="{'color':datas.params.namecolor}">{{items.store_name}}</h2>

			</div>
			<div class="a06 a8r">
				<strong class="i8">
					<span class="da" :style="{'color':datas.params.shipcolor}">{{items.dispatch}}</span>
				</strong>
			</div>
			<div class="a8v">
				<p class="a8d">
					<span class="a79 clearfix"><i></i><i></i><i></i><i></i><i class="zo"></i></span>
				</p>
				<p class="a8w" v-show="datas.params.showsale == 1">
					<span class="line_split"></span>月售{{items.order_total}}单
				</p>
			</div>
			<div class="a8v" v-show="datas.params.showscore == 1" >
				<p class="a8w" :style="{'color':datas.params.salecolor}">
				<span style="margin-right:10px;" v-if="items.store_point.point_switch == 0?false:true">{{items.store_point.point}}</span><span v-if="items.store_point.point_deduct_switch == 0?false:true">{{items.store_point.max_point_deduct}}</span>
				</p>
			</div>
			<div class="a8v" v-show="datas.params.showlove == 1">
				<p class="a8w" :style="{'color':datas.params.salecolor}">
				<span style="margin-right:10px;" v-if="items.store_love.award==1?true:false">{{items.store_love.award_proportion}}</span><span v-if="items.store_love.deduction==1?true:false">{{items.store_love.deduction_proportion}}</span>
				</p>
			</div>
		</div>
		<div class="store_honor_box">
			<div class="store_honor_icon1">
				<a :href="'tel:' + items.mobile">
				<i class="fa fa-phone" aria-hidden="true" :style="{'color':datas.params.telcolor}" style="font-size: 16px;margin-right: 15px;"></i>
				</a>
				<i @click.stop="nav(items)" class="fa fa-location-arrow" aria-hidden="true"  :style="{'color':datas.params.navcolor}" style="font-size: 16px;"></i>
			</div>
			<span class="store_honor_icon1"  :style="{'color':datas.params.discolor}" style="font-size: 12px;">距离{{items.distance}}{{items.unit}}</span>
		</div>
	</div>
		<div id="allmap"></div>

	</div>

</template>
<script>

    export default {
        props: ['datas'],
        data() {
            return {
                mid:this.fun.getKeyByMid(),
                toi:this.fun.getKeyByI(),
                location:this.$store.state.o2oLocation,
				point:{},
				city:'',
                stores:[],
                address:'',
            }
        },
        mounted() {
            console.log('store-mounted',this.datas);
            console.log('==========mounted-location=========',this.location);
            //this.ready();
			if (this.location.point == undefined) {
                console.log('info===== not exists location.');

                this.ready();
			} else {
			    this.point = this.location.point;
			    this.city = this.location.city;
			}
            this.getStores();

        },
        created() {

        },
        activated() {
            console.log('activated');
            console.log('activated-location',this.location);
            if (this.location.point == undefined) {
                console.log('info===== not exists location.');
                this.ready();
            } else {
                this.point = this.location.point;
                this.city = this.location.city;
            }
            this.getStores();
        },
        methods:{

            toSeller(id){
                this.$router.push({name:'HomeSeller',params:{store_id:id},query:{i:this.toi}})
            },

            //跳转至分类
            toClassify(id){
                console.log(location.href);
                this.$router.push(this.fun.getUrl('o2oCategory',{id:id}));
            },

            nav(store){
                //console.log(store.longitude);
                //return;
                var map = new BMap.Map("allmap");
                var point = new BMap.Point(store.longitude,store.latitude);
                map.centerAndZoom(point, 16);
                map.enableScrollWheelZoom();

                /*var myIcon = new BMap.Icon("myicon.png",new BMap.Size(30,30),{
                    anchor: new BMap.Size(10,10)
                });*/

                var myIcon = new BMap.Icon(
                    'http://webmap0.map.bdstatic.com/wolfman/static/common/images/us_cursor_9517a2b.png', // 百度图片
                    new BMap.Size(10,22), // 视窗大小
                    {
                        imageSize: new BMap.Size(144,92), // 引用图片实际大小
                        imageOffset:new BMap.Size(-10,0)  // 图片相对视窗的偏移
                    }
                );

                var marker=new BMap.Marker(point,{icon: myIcon});
                map.addOverlay(marker);

                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        var mk = new BMap.Marker(r.point);
                        map.addOverlay(mk);
                        //map.panTo(r.point);//地图中心点移到当前位置
						//130.37229,46.818283
                        var latCurrent = r.point.lat;
                        var lngCurrent = r.point.lng;


                        location.href="https://api.map.baidu.com/direction?origin="+latCurrent+","+lngCurrent+"&destination="+store.latitude+","+store.longitude+"&mode=driving&region=全国&output=html";
                        //location.href="https://api.map.baidu.com/direction?origin="+latCurrent+","+lngCurrent+"&destination=46.818283,130.37229&mode=driving&region=全国&output=html";

                    }
                    else {
                        alert('failed'+this.getStatus());
                    }
                },{enableHighAccuracy: true})


                map.addOverlay(marker);
                //todo, 接口里没有地址信息，就先不创建marker了
                var licontent="<b>"+store.address.detailed_address+"</b><br>";
                licontent+="<span><strong>地址：</strong>"+store.address.detailed_address+"</span><br>";
                licontent+="<span><strong>电话：</strong>"+store.mobile+"</span><br>";
                var opts = {
                    width : 200,
                    height: 80,
                };
                var  infoWindow = new BMap.InfoWindow(licontent, opts);
                marker.openInfoWindow(infoWindow);
                marker.addEventListener('click',function(){
                    marker.openInfoWindow(infoWindow);
                });
			},

            toRouter(id){
                this.$router.push({name:'o2oStore',params:{store_id:id},query:{i:this.toi}})
            },
            ready: function () {
                //this.getLocation();

                var myLocation = this.$store.state.o2oLocation;;

                if (myLocation.point) {
                    this.address = myLocation.title;
                    this.city = myLocation.city;
                    this.point = myLocation.point;
                    console.log('myLocation:', myLocation);
                    this.$store.commit('updateLocation', myLocation);

                    //初始化数据
                    //this.getStores();
                    //this.getStoresCategory();
                } else{
                    console.log('location不存在');
                    this.getLocation();
                }
            },

            getLocation: function () {
                var that = this;

                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        var mk = new BMap.Marker(r.point);
                        console.log('temp stores 您的位置ok：', r);
                        that.address = r.address.city;
                        that.city = r.address.city;

                        that.point = r.point;
                        var pos = {
                            address:that.address,
                            city:that.city,
                            title:that.address,
                            point:that.point,
                        }
                        //this.balance = this.$store.state.balance;
                        that.$store.commit('updateLocation', pos);
                        that.$store.commit('setLocation', pos);
                        //window.localStorage.setItem("myLocation",JSON.stringify(pos));
                        that.getStores();
                    }
                    else {
                        //todo, 获取收货地址
                        that.getMyAddress();
                    }
                },{enableHighAccuracy: true})
            },

            getMyAddress () {
                if (0) {
                    //todo, 失败则跳转
                    this.$router.push(this.fun.getUrl('o2oLocation'));
                }
            },


            tolocation() {
                this.$router.push(this.fun.getUrl('o2oLocation'));
            },

            getStores() {
                var that = this;
                //that.getStoresCategory();
				var num = (this.datas.params.num === undefined || this.datas.params.num == 0) ? 5 : this.datas.params.num;
                $http.get('plugin.store-cashier.frontend.store.store.get-store-list', {kwd:'', lng:this.point.lng,lat:this.point.lat,city_name:this.city}).then((response) => {
                    if (response.result == 1) {
                        console.log('stores:', response.data);
                        that.stores = response.data.store_list;
                        that.stores = that.stores.slice(0, num);
                    } else {
                        console.log(response.msg)
                    }
                }), (response) => {
                    //alert('网络错误，请稍后再试！')
                }
            },
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.p1{
		position: relative !important;
	}
	.store-category-name{
		width: 55px;
		display: block;
		word-wrap: break-word;
	}
	.store-list {
		position: relative;
		padding: 15px 10px;
		min-height: 70px;
		border-top: 1px solid #e7e9e4;
		/*width: 97%;*/
		background: #fff;
		font-size: 12px;
		/*font-size: .9rem;*/
		color: #333;
		text-align: left;
	}

	.store-img {
		position: relative;
	}

	.store-img .store-logo {
		position: absolute;
		left: 10px;
		top: 0;
		bottom: 0;
		float: none;
		width: 64px;
		height: 64px;
	}

	.store-img img {
		float: left;
		width: 100%;
		height: 100%;
		border-radius: 4px;
		border: 1px solid #e8e8e8;
		display: inline-block;
		margin-right: 8px;
	}

	.store-intro {
		display: inline-block;
		position: relative;
		margin-left: 90px;
	}

	.store-intro .a8q {
		height: 20px;
		line-height: 20px;
		overflow: hidden;
		display: -webkit-box;
		display: -ms-box;
		display: -ms-flexbox;
		display: flex;
		-moz-flex: 1;
		-ms-flex: 1;
		-webkit-box-flex: 1;
		flex: 1;
	}

	.store-intro .a8q h2{
		font-size: 16px;
		color: #333;
		/*overflow: hidden;*/
		text-overflow: ellipsis;
		white-space: nowrap;
		display: inline-block;
		margin-top: 0;
		font-weight: bold;
		-moz-flex: 1;
		-ms-flex: 1;
		-webkit-box-flex: 1;
		flex: 1;
	}

	.store-intro .a8q .store_honor_icon1 {
		display: inline-block;
		width: 88px;
		height: 20px;
		font-size: 12px;
		text-align: right;
		margin-right: 2px;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: 16px auto;
	}

	.store-intro .a8r {
		font-size: 0;
		padding-top: 10px;
		overflow: hidden;
	}

	.store-intro .a8r .i8{
		display: inline-block;
		border: 1px solid #16A9ff;
		font-size: 0;
		border-radius: 2px;
		color: #16a9ff;
		line-height: 0;
		height: 15px;
		overflow: hidden;
	}

	.store-intro .a8r .i8 .da {
		display: inline-block;
		line-height: 1;
		padding: 2px;
		font-size: 10px;
	}

	.store-intro .a8v {
		height: 14px;
		margin-top: 8px;
		overflow: hidden;
		font-size: 0;
	}

	.store-intro .a8v .a8d {
		height: 12px;
		/*padding-top: 2px;*/
		overflow: hidden;
		display: inline-block;
		position: relative;
	}

	.store-intro .a8v .a8d .a79 {
		display: inline-block;
		font-size: 0;
	}

	.store-intro .a8v .a8d .a79 i {
		display: inline-block;
		width: 10px;
		height: 10px;
		background-position: 0 0;
		background-image: url(//static-o2o.360buyimg.com/daojia/new/images/icon/newStar.png);
		background-repeat: no-repeat;
		background-size: auto 10px;
		margin-right: 1px;
	}

	.store-intro .a8v .a8d .a79 .zo {
		background-position: -10px 0;
	}

	.store-intro .a8v .a8w {
		font-size: 11px;
		line-height: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #999;
		display: inline-block;
	}

	.store-intro .a8v .a8w .line_split {
		display: inline-block;
		width: 8px;
		height: 10px;
		background: url(//static-o2o.360buyimg.com/daojia/new/images/index/icon_line_split.jpg) no-repeat center 2px;
	}

	.store_honor_box{
		display: inline-block;
		position: absolute;
		top: 10px;
		text-align: right;
		right: 10px;
	}

	.store_honor_icon1{
		display: block;
	}

	.store-category{
		position: absolute;
		top: 70px;
		left: 18px;
	}
</style>