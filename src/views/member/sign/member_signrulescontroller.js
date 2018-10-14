import cTitle from 'components/title';
export default {
  data() {
    return { 
      rules:'',
    };
  },
  methods: {
  },
  created(){
    $http.get('plugin.sign.Frontend.Controllers.explain.index').then((res)=>{
      this.rules=res.data.explain_content
    })
  },
  components: { cTitle }
}