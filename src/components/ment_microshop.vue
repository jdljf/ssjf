<template>
<swipe style="height: 190px;">
  <swipe-item v-for="items in datas">
  	<ul>
			<li click= "goGoodsID" v-for="item in items">
				<router-link :to="fun.getUrl('micro_shop_share_carelist',{id:item.id})">
				<div class="image" v-if='item.thumb'><img :src="item.thumb" /></div>
				<div class="image" v-if='!item.thumb'><img src="../assets/images/img_default.png" /></div>
        <p class="text">{{item.name}}</p>
        </router-link>
     </li>
  </ul>
  </swipe-item>
</swipe>
<!--<mt-swipe :auto="0" :stopPropagation='true' :prevent='true' :continuous='false'>
  <mt-swipe-item v-for="items in datas">
  	<ul>
			<li click= "goGoodsID" v-for="item in items">
				<router-link :to="fun.getUrl('catelist',{id:item.id})">
				<div class="image" v-if='item.thumb'><img :src="item.thumb" /></div>
				<div class="image" v-if='!item.thumb'><img src="../assets/images/img_default.png" /></div>
        <p class="text">{{item.name}}</p>
        </router-link>
     </li>
  </ul>         
  </mt-swipe-item>

</mt-swipe>-->
</template>

<script>
	import { Swipe, SwipeItem } from 'c-swipe';
  export default {
    data() {

        return {
            
        }
    },
    props: ['datas'],
    
    mounted(){


    },
    methods:{

    },
    components: {Swipe, SwipeItem}
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
ul{
	margin: 0;padding: 0;
	 li{
	list-style: none;width: 25%;float: left;margin: 0;padding: 0;margin-bottom: 10px;
		a{color: #2b2f33;}
		.image{height: 14vw;overflow: hidden; line-height: 14vw;border-radius: 30%;}
		img{width: 50%;vertical-align: middle;    height: 90%;}
		p{margin: 0;padding: 0;font-size: 12px;    line-height: 20px;}
	}
}	
</style>