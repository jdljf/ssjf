import cTitle from 'components/title';
import { Loadmore } from 'mint-ui';
//import cOrderList from './component/rentOrderList';
import { InfiniteScroll } from 'mint-ui';
import PullToRefresh from 'components/pull-to-refresh.vue';
import { Indicator, Toast } from 'mint-ui';
import avatar from 	'../../../assets/images/icon_I.png'
  
export default {
  data() {
    return {
    	persons:[],
    	aa:"",
    }
  },

  activated() {
  	this.persons= JSON.parse(this.$route.params.person);
  	this.aa=this.persons;
  

  },
  
  mounted() {

  },

  methods:
  {
  },
  computed: {
  	
  },
  components: { cTitle, PullToRefresh }
}