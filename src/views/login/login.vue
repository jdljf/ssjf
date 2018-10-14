<template>

	<div id="login">
		<div class="logins">
			<c-title :hide="false" text='用户登录'></c-title>
			<!--<yd-cell-group style="margin-top:50px;">
				<yd-cell-item >
					<span style="width: 70px;text-align: left;" slot="left">手机号：</span>
					<yd-input slot="right" required v-model="form.mobile" max="20" placeholder="请输入手机号"></yd-input>
				</yd-cell-item>
				<yd-cell-item>
					<span style="width: 70px;text-align: left;" slot="left">密码：</span>
					<yd-input slot="right" type="password" v-model="form.password" placeholder="请输入密码"></yd-input>
				</yd-cell-item>
			</yd-cell-group>-->
			<!--<span class="log"><img class="imgs" src="../../assets/images/log.jpeg"></span>-->
			<!--<div class="userinfo">
				<div class="username"><img class="img" src='../../assets/images/userimg.png'></img><input class="input" type="phone" required v-model="form.mobile" max="20" placeholder="请输入手机号" /></div>
				<div class="passwad"><img class="img" src='../../assets/images/passwad.png'></img><input class="input" type="password" v-model="form.password" placeholder="请输入密码" /></div>
				<div class="regs" @click="register" type="primary">用户注册</div>
				<div class="btnlog">
					<div class="btnlogin" @click="mobile_login" type="danger">登陆</div>
				</div>
				<div class="forgets" @click="gotoPwd">忘记密码?</div>
			</div>-->
      <ul style="padding: 0;margin-top:50px;">
	
		<li class="bind-item">
			<div class="bind-item-title">手机号</div>
			
			<input class="bind-input" type="tel" slot="right" placeholder="请输入手机号码" required v-model="form.mobile">
			
			<yd-sendcode slot="right" v-model="start1" @click.native="verificationCode" type="warning"></yd-sendcode>
		
		</li>
		<li class="bind-item">
			<div class="bind-item-title">验证码</div>
			
			<input class="bind-input" slot="right" type="text" placeholder="请输入验证码" v-model.trim="form.code">
		</li>
	</ul>
			<yd-button-group>
				<yd-button size="large" @click.native="mobile_login" type="danger">登录</yd-button>
				<yd-button size="large" @click.native="register" type="primary">注册</yd-button>
			<!--<p class="forget"><router-link :to="fun.getUrl('findpwd')">忘记密码</router-link></p> -->

			<!--<p class="forget" @click="gotoPwd">忘记密码</p>-->

			</yd-button-group>

			<!-- <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model.trim="form.mobile" :attr="{ maxlength: 11 }" :state='form.mobileErr'></mt-field>
            <mt-field label="密码" placeholder="请输入密码" type="password" v-model.trim="form.password" :state='form.passwordErr'></mt-field>

            </div>
            <div id="bts">
            <mt-button type="danger" @click="mobile_login" size="large">登录</mt-button>
            <mt-button type="default" @click="register" size="large">注册</mt-button>
            <p class="forget"><router-link :to="fun.getUrl('findpwd')">忘记密码</router-link></p>
            </div> -->

			<!--v-if="wetach_login==1"-->
			<div class="vip_main" v-if="wetach_login==1">
				<div class="title">一键登录</div>
				<div class="weixin vip1" @click="weixin">
					<div class="ico1">
						<i class="fa fa-qrcode"></i>
					</div>
					<div class="text">
						<div class="t1">微信登录</div>
						<div class="t2">微信快捷通道一键登录商城</div>
					</div>
				</div>
			</div>
<!--
			<div class="weixin"><img class="img" @click="weixin" src='../../assets/images/weixins.png'></img>
				<div style="color: #fff;">微信一键登陆</div>
			</div>-->
		</div>
	</div>
</template>

<script>
	import login_controller from "./login_controller";
	export default login_controller;
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
	#login {
		/*height: 100vh;
		background: linear-gradient(to top, #303C53, #418A99);
		width: 100%;
		overflow: hidden;*/
		.logins {
			/*margin-top: 40px;*/
			.bind-item{
		display: flex;
		flex-flow: row nowrap;
		border-bottom: 1px solid #E5E2DF;
		height: 53px;
		padding: 0 16px;
		font-size: 16px;
		color: #444;
		justify-content: center;
	    background: #FFFFFF;
	    align-items: center;
		.bind-item-title{
			width: 4rem;
			text-align: left;
			min-width: 4rem;
		}
		.bind-input{
			display: block;
			flex-grow: 1;
			border: none;
			font-size: 1rem;
			color: #666;
			-moz-appearance: textfield;
			-webkit-appearance: none;
			min-width: 100px;
			.identity-select-btn{
				font-size: 30px;
				line-height: 100%;
				vertical-align: middle;
				color: #ff3b53;
				height: 33px;
			}
		}
		.verification{
			text-align: center;
		    font-size: 13px;
		    display: inline-block;
		    white-space: nowrap;
		    display: inline-block;
		    background: #ffb400;
			line-height: 30px;
			color: #fff;
			border-radius: 4px;
		    padding: 0 10px;
		}
		.right{
			text-align: right;
		}
	}
			/*.weixin {
				position: absolute;
				bottom: 60px;
				left: 0;
				right: 0;
				bottom: 20px;
				.img {
					width: 30px;
				}
			}*/
			.userinfo {
				margin-top: 180px;
				position: relative;
				.username {
					width: 100%;
					.input {
						width: 80%;
						line-height: 35px;
						border: 1px solid #fff;
						padding-left: 40px;
						margin-bottom: 10px;
						border-radius: 5px;
						color: #fff;
					}
					.img {
						position: absolute;
						width: 25px;
						top: 5px;
						left: 12%;
					}
				}
				.passwad {
					position: relative;
					width: 100%;
					.input {
						width: 80%;
						line-height: 35px;
						border: 1px solid #fff;
						padding-left: 40px;
						margin-bottom: 10px;
						color: #fff;
						border-radius: 5px;
					}
					.img {
						position: absolute;
						width: 25px;
						top: 5px;
						left: 12%;
					}
				}
				.regs {
					text-align: left;
					margin-left: 2.4rem;
					color: #fff;
				}
				.btnlog {
					margin-top: 40px;
					text-align: center;
					.btnlogin {
						background: #00C3D5;
						display: inline-block;
						padding: 10px 80px;
						color: #fff;
						font-size: 16px;
						border-radius: 5px;
					}
				}
				.forgets {
					text-align: center;
					color: #fff;
					margin-top: 20px;
				}
			}
			h1 {
				color: #42b983;
			}
			.mint-button--large {
				margin-top: 10px;
			}
			#bts {
				margin: auto 5px;
			}
			.forget {
				line-height: 40px;
				float: right;
				a {
					color: #999;
				}
			}
			.vip_main {
				background: #ffffff;
				margin-top: 50px;
				.title {
					padding: 10px;
					font-size: 0.8rem;
					border-bottom: 1px solid #eeeeee;
					text-align: center;
				}
				.weixin {
					padding: 15px 10px;
					overflow: hidden;
					font-size: 0.8rem;
					color: #999;
					.ico1,
					.ico2 {
						width: 15%;
						float: left;
					}
					.ico1 {
						i {
							background: #32cd32;
						}
					}
					.ico2 {
						i {
							background: #fece00;
						}
					}
					.text {
						float: left;
						width: 85%;
						.t1 {
							font-size: 0.95rem;
							color: #333;
							margin-bottom: 5px;
							text-align: left;
						}
						.t2 {
							text-align: justify;
						}
					}
					i {
						background: #32cd32;
						height: 36px;
						width: 36px;
						border-radius: 18px;
						color: #fff;
						text-align: center;
						line-height: 38px;
						font-size: 1.2rem;
					}
				}
				.vip1 {
					border-bottom: 1px solid #eeeeee;
				}
			}
		}
	}
</style>