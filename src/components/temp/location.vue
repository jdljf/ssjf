<template>
	<div class="location-search" :style="{'border-color':datas.params.bordercolor}"  id="menu">
		<div class="location" :style="{ 'color': datas.params.color2}" @click='tolocation'>
			<i class="fa fa-map-marker" style="margin-right:4%"></i>{{address}}<i class="fa fa-chevron-down" style="margin-left: 4%;
    font-size: 12px;
    vertical-align: middle;
    margin-top: -0.2rem;"></i>
		</div>
		<div @click='tosearch' class="search-form-box"  :style="{'color':datas.params.color}" style="border: 1px solid #cacaca;margin-top: 10px;">
			<i class="fa fa-search"></i> {{datas.params.placeholder || '附近商家商品'}}
		</div>
	</div>
</template>
<script>

  export default {
    props: ['datas'],
    data() {
      return {
        mid:this.fun.getKeyByMid(),
		address:'',
		city:'',
		point:{},
      }
    },
  mounted() {
	  console.log('mounted',this.datas);
	  this.ready();
  },
  created() {

  },
  activated() {
      console.log('activated');
      this.ready();
  },
    methods:{
        ready: function () {
            //this.getLocation();

            //var myLocation = window.localStorage.getItem('myLocation');
            var myLocation = this.$store.state.o2oLocation;

            this.$store.commit('setReferer', window.location.href);
			//console.log('path::::::', this.$route.path);
            if (myLocation.point) {
                this.address = myLocation.title;
                this.city = myLocation.city;
                this.point = myLocation.point;
                console.log('temp myLocation:', myLocation);

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
                    console.log('您的位置ok：', r);
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
                    window.localStorage.setItem("myLocation",JSON.stringify(pos));
                    //that.getStores();
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
        tosearch() {
            console.log(this.point);
            this.$router.push(this.fun.getUrl('o2oSearch', {city:this.city, point:JSON.stringify(this.point)}));
            //this.$router.push('/search');
        },
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.location-search {
		z-index: 99;
		margin: auto;
		text-align: center;
		width: 100%;
		height: 50px;
		line-height: 50px;
		background: #fff;
	}

	.location-search .location {
		width: 30%;
		color: #999;
		/*height: 100%;
		line-height: 34px;*/
		overflow: hidden;
		text-align: left;
		padding-left: 5%;
		font-size: 0.9rem;
		float: left;
		box-sizing: border-box;
	}
	.location-search .search-form-box {
		margin: 0 0 0 15%;
		width: 50%;
		color: #ccc;
		border-radius: 15px;
		height: 30px;
		line-height: 30px;
		overflow: hidden;
		text-align: left;
		padding-left: 10px;
		font-size: 0.9rem;
		float: left;
		box-sizing: border-box;
	}
</style>