//window.localStorage.isWeiXin
import { mapState, mapMutations } from 'vuex';
import { Field, Button } from 'mint-ui';
import cTitle from 'components/title';
export default {
	
	//name: 'login',
	data() {
		return {
			form: {
				country:'86',
				code: '',
				mobile: '',
				mobileErr: '',
				password: '',
				passwordErr: '',
				uuid: 0,
				mid:0,
				userimg:'../../assets/images/userimg.png'
			},
			mydata: '',
			isApp: false,
			apptoken: '',
			wetach_login: false
		}
	},

	components: {
		cTitle
	},
	mounted() {

	},

	methods: {
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
		    $http.get('member.register.sendCodeV3', { mobile: this.form.mobile ,state:this.form.country}).then((response) => {
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
		login(data) {
			var that = this;
			$http.post('member.login.index', data,"").then((response)=>{
				if(response.result == 1) {
					window.localStorage.myuserinfo = response.data;
                    console.info('--会员信息--');
					console.info(response.msg);
                    that.$store.commit('setLoginStatus', response.data.status);
                    if (that.fun.isApp()) {
                        YDB.SetUserRelationForPush(response.msg.uid);
                    }
					if (response.data.url) {
						window.location.href = response.data.url;
					} else {
                        that.$router.push(this.fun.getUrl('home'));
					}
				}else{
                    that.$store.commit('alerts', response.msg);
				}
			});
			
		},
		mobile_login () {

			if(this.fun.isTextEmpty(this.form.mobile))
			{
				this.$dialog.toast({
                    mes: '请填写手机号',
                    timeout: 1500
                });
				return;
			}

//			if(this.fun.isTextEmpty(this.form.password))
//			{
//				this.$dialog.toast({
//                  mes: '请填写密码',
//                  timeout: 1500
//              });
//				return;
//			}
			  if (this.fun.isTextEmpty(this.form.code)) {
		        this.$dialog.toast({
		            mes: '请填验证码',
		            timeout: 1500
		        });
		        return;
		    }

			this.form.uuid = YDB_UUID;
			
			this.form.mid = this.fun.isTextEmpty(window.localStorage.getItem("mid")) == null ? 0:window.localStorage.getItem("mid");

			console.log(this.form.mid);

			this.login(this.form);
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
		register(){
			console.log('想登陆',this.wetach_login)		
				this.weixin();
//				this.$router.push(this.fun.getUrl('register'));
		},
		weixin(){
			var that = this;
			var i = that.fun.getKeyByI();
			var mid = that.fun.getKeyByMid();
			var type = that.fun.getTyep();
			var accessUrl = that.fun.getSiteRoot() + "/addons/yun_shop/api.php?i=" + i + "&mid=" + mid + "&type=" + type + "&route=member.login.index&uuid=" + YDB_UUID;
			YDB.WXLogin(0, accessUrl);
			console.log('输入是',accessUrl);
			
		},
		init_login() {
            var that = this;
            if (!that.fun.isApp()) {
			console.log('这是在网上上的不能调试',11);
            	return;
			}
			if (!YDB_isWXApp) {
                return;
			}
			if (that.apptoken) {
                that.login({apptoken:this.apptoken});
			} else {
				$http.get('member.login.index', {'show_wechat_login':true}).then((response)=>{
					if(response.result == 1) {
						that.wetach_login = response.data.wetach_login;
						console.log('为1',response.data.wetach_login);
						console.log('为34',response.data);
						
					}else{
						console.log('为2',11);
						
					}
				});
			}
		},

		//跳转修改密码
		gotoPwd(){
			this.$router.push(this.fun.getUrl("findpwd"));
		}
	},
	activated(){
		this.apptoken = this.$route.query.apptoken;
		this.init_login();
	}
}