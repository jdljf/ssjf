import cTitle from 'components/title';
export default {
  data() {
    return {
        continue_days:'',//连续签到天数
        sign_total:'',//累计签到天数
        cumulative:'',//累计奖励
        sign_log:'',//签到记录
        sign_name:'',//签到名字
        integral:'',
    };
  },
  methods: {
    getData(){
      $http.get('plugin.sign.Frontend.Modules.Sign.Controllers.sign-log.log').then((res)=>{
        this.continue_days=res.data.continue_days
        this.sign_total=res.data.sign_total
        this.cumulative=window.localStorage.integral+res.data.cumulative.substr(2)
        this.integral=window.localStorage.integral
        this.sign_log=res.data.sign_log
        this.sign_name=res.data.sign_name
        this.fun.setWXTitle(this.sign_name+'记录')
      })
    }
  },
  created(){
   this.getData()
  },
  watch: {
    $route(to) {
      if(to.name=='signrecord'){
        this.getData()
      }    
    }
},
  components: { cTitle }
}