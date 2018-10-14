<template>
	<div id="helpcenter">
		<c-title :hide="false" text='帮助中心'></c-title>
		<div style="height:40px;"></div>
		<div class="list">
				<ul>
					<li @click='show(key)' v-for='val,key in title'>
						<span>{{val}}</span>
						<i class="fa fa-angle-right"></i>
					</li>
				</ul>
		</div>
		<transition name='fade'>
			<div class='message' v-if='showbox'>
				<header><span class='icon'  @click='hide'></span>帮助详情</header>
				<div class='msgbox' v-html='msg'>
				</div>
			</div>
		</transition>
		<a :href="cservice">
			<div class="sver">
					<ul>
							<li><i class="iconfont icon-kefu"></i></li>
							<li>人工客服</li>
					</ul>
				<i class="fa fa-angle-right"></i>
			</div>
		</a>
	</div>
</template>


<script>

import cTitle from '../../components/title';
 export default {
	data() {
		return {
			dataget:[],
			title:[],
			msgarr:[],
			msg:'',
			sharedata:'',
			cservice:'',
			showbox:false,
        }
	},    
    methods:{
		show(key){
			this.msg=this.msgarr[key]
			this.showbox=true
		},
		//初始化分享设置
		getData(){
      	let that = this;
     	 $http.get('plugin.help-center.api.share.index').then(function (response) {
          if(response.result == 1) {
            that.sharedata=response.data.data
            that.initShare()
          		}  
      		})
    	},
    	initShare() {
      	let that = this;
      	console.log(document.location.href);
      	let _url = document.location.href;
     	 $http.post('member.member.wxJsSdkConfig',{url:_url}).then(function (response) {   
       	 if (response.result == 1) {
			that.initCservice(response.data.shop.cservice)
						that.share(response.data);
      	  } else {

       	 }
     	 	}, function (response) {
       	 	console.log(response);
      		});
    	},
		share(data) {
				let that = this;
     	wx.config(data.config);
     	wx.ready(function () {
				let _title = that.sharedata.title?that.sharedata.title:data.shop.name
				let _link = document.location.href + "&share_tag=2";
				_link = that.fun.isMid(_link, data.info.uid);
        let _imgUrl =that.sharedata.icon?that.sharedata.icon:data.shop.logo
        let _desc = that.sharedata.description?that.sharedata.description:data.shop.copyright
        wx.showOptionMenu();
        wx.onMenuShareTimeline({
          title: _title, // 分享标题
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          success: function () {
            Toast("分享成功");
          },
          cancel: function () {
            Toast("取消分享");
          }
        });
        wx.onMenuShareAppMessage({
          title: _title, // 分享标题
          desc: _desc, // 分享描述
          link: _link, // 分享链接
          imgUrl: _imgUrl, // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            Toast("分享成功");
          },
          cancel: function () {
            Toast("取消分享");
          }
        });
      });
    },
	//配置客服
	initCservice(newCservice) {
      if (!this.fun.isTextEmpty(newCservice)) {
        this.cservice = newCservice;
        return;
      }
      if (!this.fun.isTextEmpty(this.$store.state.temp.mailInfo) && !this.fun.isTextEmpty(this.$store.state.temp.mailInfo.cservice)) {
        this.cservice = this.$store.state.temp.mailInfo.cservice;
        return;
      }
	},
	 hide(){
	 this.showbox=false
 	},
 },
	created(){
		$http.get('plugin.help-center.api.content.info').then((res)=>{
			this.dataget=res.data.set_data
			this.dataget.map((response)=>{
				this.title.push(response.title)
				this.msgarr.push(response.content)
				this.msg=this.msgarr[0]
			})
		})
		this.getData()
		this.initCservice("")
	},
	components:{cTitle}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
#helpcenter{
	table td{
		border-style:solid!important;
	}
	.fade-enter-active,.fade-leave-active{
		transition: all 0.3s
	}
	.fade-enter,.fade-leave-to{
		transform: translateX(100%)
	}
	.list{
		margin-top:10px;
		ul{
			background-color: #fff;
			li{
				display: flex;
				justify-content: space-between;
				height: 40px;
				line-height: 40px;
				padding:0 14px;
				font-size:15px;
				border-bottom:solid 1px #ebebeb;
			}
		}
		i{
					font-size:24px;
					color:#c9c9c9;
					line-height: 40px;
				}
	}
	.sver{
		margin-top:10px;
		background-color: #fff;
		display: flex;
		justify-content: space-between;
		height: 40px;
		line-height: 40px;
		padding:0 14px;
		font-size:15px;
		ul{
			display: flex;
		}
		i:first-child{
			font-size:20px;
			margin-right:10px;
			color:#666;
		}
		i{
			font-size:24px;
			color:#c9c9c9;
			line-height: 40px;
		}
	}
	.message{
		width:100%;
		position:absolute;
		background: #fff;
		top:0;
		min-height:100%;
		overflow: hidden;
		z-index:999;
		.msgbox{
		line-height:20px;
		box-sizing: border-box;
		padding-top:10px;
		}	
		header{
			height:40px;
			width:100%;
			line-height: 40px;
			font-size:14px;
			font-weight: bolder;
			position:relative;
			border-bottom:solid 1px #ebebeb;	
			.icon{
			position: absolute;
			display: block;
			float:left;
			width:0.65rem;
			height:0.65rem;
			border:solid 0.1rem rgba(0,0,0,0.5);
			transform: rotate(45deg);
			border-right:transparent;
			border-top: transparent;
			margin:15px ;
			}

		}
	}
}
</style>