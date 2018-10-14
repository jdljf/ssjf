<template>
	<div id="bread">
		<!--<ul class="fe-mod bread-nav" :style="{'color':datas.params.color,'background-color':datas.params.bgcolor}">
            <li v-on:click="gotodiy(index)" aria-hidden="true" v-for="(item, index) in datas.data" class="bread-item" :class="item.active == 1 ? 'active' : ''" >
                <a >
                    {{item.name}}
                </a>
            </li>
        </ul>-->
		<div class="nav" :style="{'color':datas.params.color,'background-color':datas.params.bgcolor}">
			<p class="ppitem" v-for="(item,$index) in datas.data" aria-hidden="true" @click="toggle($index)" :class="{active:$index==active}">{{item.name}}</p>
		</div>
	</div>
</template>
<script>
	export default {
		props: ['datas'],
		data: function() {
			return {
				active: 0,
			}
		},
		mounted() {},
		methods: {
			toggle: function(index) {
				this.active = index;
				console.log(this.datas.data[index].link)
				var page_id = this.GetLocationParam('page_id', this.datas.data[index].link)
				//				window.location.href = this.datas.data[index].link
				//				console.log(this.datas.data[index].link.replace('http://wx.forty-nineunion.com/addons/yun_shop','http://localhost:8081'))
				//				window.location.href = this.datas.data[index].link.replace('http://wx.forty-nineunion.com/addons/yun_shop','http://localhost:8081')
				this.$router.push({
					name: 'Diy1',
					query: {
						page_id: page_id,
						i: 3
					}
				})
			},
			GetLocationParam(param, url) {
				var uri = url
				var re = new RegExp("" + param + "=([^&?]*)", "ig");
				var page_id = ((uri.match(re)) ? (decodeURI(uri.match(re)[0].substr(param.length + 1))) : '');
				if(page_id == null || page_id == 'undefined' || page_id == "") {
					return 3
				} else {
					return page_id
				}
			},
			gotodiy(index) {
				console.log(this.datas.data[index].link)
				var page_id = this.GetLocationParam('page_id', this.datas.data[index].link)
				//				window.location.href = this.datas.data[index].link
				//				console.log(this.datas.data[index].link.replace('http://wx.forty-nineunion.com/addons/yun_shop','http://localhost:8081'))
				//				window.location.href = this.datas.data[index].link.replace('http://wx.forty-nineunion.com/addons/yun_shop','http://localhost:8081')
				this.$router.push({
					name: 'Diy1',
					query: {
						page_id: page_id,
						i: 3
					}
				})
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	.nav {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: middle;
		-ms-flex-align: middle;
		align-items: middle;
		overflow: auto;
		background: #fff;
		.ppitem {
		/*float: left;*/
		text-align: center;
		font-size: 12px;
		-ms-flex-negative: 0;
		flex-shrink: 0;
		padding:3px 6px;
		margin: 0px 7px;
	}
	
	.ppitem.active {
		color: #88613E !important;
		border-bottom: 2px solid #88613E;
	}
	}
	

	
	.bread-item {
		display: inline-block;
		margin-right: 20px;
		font-size: .8rem;
		padding: 0 5px 3px;
		color: #515050;
	}
	
	.bread-item.active {
		color: #88613E!important;
		border-bottom: 2px solid #88613E;
	}
	
	.bread-nav {
		background: #ffffff;
		font-size: 14px;
		color: #333333;
		padding: 1px 6px 5px;
		overflow-x: auto;
		white-space: nowrap;
		position: relative;
		margin-bottom: 0;
		overflow: auto;
		touch-action: pan-x;
		/*消除警告Unable to preventDefault inside passive event listener due to target being treated as passive*/
	}
</style>