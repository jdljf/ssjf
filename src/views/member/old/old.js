import cTitle from 'components/title';
import { MessageBox } from 'mint-ui';
import { Indicator, Toast } from 'mint-ui';
export default {
  data() {
    return {
      	form: {
	        country:'86',
	        mobile: '',
	        code: '',
	        mobileErr: '',
	        password: '',
	        passwordErr: '',
	        confirm_password: '',
	        confirm_passwordErr: ''
    		},
    }
  },


  activated() {
     
  },
  mounted() {
   

  },

  methods:
  {
		verificationCode() {
		    let that = this;
		    if (this.fun.isTextEmpty(this.form.country)) {
		        this.$dialog.toast({
		            mes: '请输入国际区号',
		            timeout: 1500
		        });
		        return;
		    }
		    if (this.fun.isTextEmpty(this.form.mobile)) {
		        this.$dialog.toast({
		            mes: '请填写手机号',
		            timeout: 1500
		        });
		        return;
		    }
		
		    if (this.form.country=="86"&&this.fun.isMoblie(this.form.mobile)) {
		        this.$dialog.toast({
		            mes: '请填写正确的手机号',
		            timeout: 1500
		        });
		        return;
		    }
		
		    this.$dialog.loading.open('发送中...');
		    //发送获取验证码的请求
		    $http.get('member.register.sendCodeV2', { mobile: this.form.mobile ,state:this.form.country}).then((response) => {
		        this.$dialog.loading.close();
		        if (response.result == 1) {
		            that.sendCodeAnimation();
		        } else {
		            this.$dialog.toast({
		                mes: response.msg,
		                timeout: 1500
		            });
		        }
		    }, (response) => {
		        console.log(response.msg)
		    });
		},
		
		//发送验证码 倒计时
    sendCodeAnimation() {

        setTimeout(() => {
            this.start1 = true;
            this.$dialog.loading.close();
            this.$dialog.toast({
                mes: '已发送',
                icon: 'success',
                timeout: 1500
            });
        }, 1000);
    },
    
		sure_confirm() {
	    	let that=this;
	
			  if (this.diyStatus == 1) {
			      this.validation();
			
			      if (!this.isValidation) {
			          return;
			      }
			  }
		    if (this.fun.isTextEmpty(this.form.mobile)) {
		        this.$dialog.toast({
		            mes: '请填写手机号',
		            timeout: 1500
		        });
		        return;
		    }
	    
		    if (this.form.country=="86"&&this.fun.isMoblie(this.form.mobile)) {
		        this.$dialog.toast({
		            mes: '请填写正确的手机号',
		            timeout: 1500
		        });
		        return;
		    }
		    
		    if (this.fun.isTextEmpty(this.form.code)) {
		        this.$dialog.toast({
		            mes: '请填验证码',
		            timeout: 1500
		        });
		        return;
		    }
		    
		    $http.get('member.OldMember.mergeAccount', this.form, "提交中...").then((response) => {
		
		        if (response.result == 1) {
		        	console.log(response)
		        	this.$dialog.alert({
		        			mes: "绑定成功",
		        			callback: () => {
		        				this.$router.push(this.fun.getUrl('personvip',{selected:'1'}));
		        			}
		        	})	
		        } else {
		        	console.log('老用户不存在')
		            this.$dialog.alert({ mes: response.msg });
		        }
		    }, (response) => {
		        this.$dialog.alert({ mes: response.msg });
		    });
		}
  },
  components: { cTitle }
}
