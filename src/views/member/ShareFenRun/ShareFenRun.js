import cTitle from 'components/title';
import { Indicator, Toast } from 'mint-ui';
export default {
	data() {
		return {
		  order_sn:'',
		  sharedetails:{},
		}
	},
		activated() {
	     this.getNetData();
	},
	methods: {
		getNetData() {
			let that=this;
			that.order_sn = that.$route.params.name;
			$http.get('order.detail.detail&order_sn='+that.order_sn, {}).then(function(response) {
				if(response.result == 1) {
					that.sharedetails=response.data;
					console.log('单号是',that.sharedetails.order_sn);
					console.log('单号是',that.sharedetails.id);
					console.log('单号是',that.sharedetails.create_time);
					console.log('单号是',that.sharedetails.uid);
				}
			})
		},
	},
	 components: {
		cTitle
	}
}