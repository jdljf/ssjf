
export default {
  props:['signlog'],
  data() {
    return {
        year:'',
        month:'',
        m:'',
        w:'',
    }; 
  },
  methods:{
    test(key){  
     return this.signlog.indexOf(key)+1
   },
   getnewDate(){
    let d = new Date(this.year,this.month,0);
    let  m=d.getDate();
    this.m=m
    let wx=new Date(this.year,this.month-1,1);
    let w1=wx.getDay()
    this.w=w1*14.27 
    let data={'month':this.month}
    $http.post('plugin.sign.Frontend.Modules.Sign.Controllers.sign-log.index',data).then((res)=>{
      this.signlog=res.data.sign_log
    })
   },
   put(){
     if(this.month<=1){
      this.year--
      this.month=12
     }else{
      this.month--
     }
    this.getnewDate()
   },
   add(){
    if(this.month>=12){
      this.year++
      this.month=1
     }else{
      this.month++
     }
     this.getnewDate()
   },
   getData(num){
    let date=new Date()
    let year=date.getFullYear()
    this.year=year
    let month=date.getMonth()+num
    this.month=month
    let d = new Date(year,month,0);
    let  m=d.getDate();
     this.m=m//获取一个月多少天
     let wx=new Date(year,month-1,1);//获取当月第一天是星期几
     let w1=wx.getDay()
    this.w=w1*14.27 
   }
  },
  created(){
    this.getData(1)

    },

}