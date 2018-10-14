<template>
	<div id="income">
		<div class="supplier">
			<c-title :hide="false" text='门店申请'></c-title>
			<div style="height: 40px;"></div>
			<div class="banner">
				<img src="../../../assets/images/o2oapply.png">
			</div>
			<div class="main" v-if="o2o_status==1">
				<!-- <div class="main" v-if="o2o_status==1"> -->
				<!--申请   -->
				<!-- <div class="welcome">
								<div class="text">
									<h1>请填写申请信息</h1>
								</div>
								<div class="info">
									<div class="info-btn">
										<input type="text" placeholder="设置账号" class="inp" v-model="applyModel.username">
										<input type="password" placeholder="设置密码" class="inp" v-model="applyModel.password">
										<input type="text" placeholder="请填写真实姓名" class="inp" v-model="applyModel.realname">
										<input type="number" placeholder="请填写手机号码" class="inp" v-model="applyModel.mobile">
									</div>
								
									<div class="info-box">
									
										<ul class="picture">
											<li class="left">地理位置：<span style="display:block;">经度:{{applyModel.lng}}</span><span style="display:block;">纬度:{{applyModel.lat}}</span></li>
											<li class="right"><i class="fa fa-angle-right"></i></li>
										</ul>
				
									</div>
								
									<input type="submit" value="申请" class="btn" @click="setApplyData">
								</div>
							</div> -->
				<!-- 填写申请信息 -->
				<yd-cell-group title="账号信息">
					<yd-cell-item>
						<span slot="left">设置账号：</span>
						<input slot="right" type="text" placeholder="设置账号" v-model="applyModel.username" />
					</yd-cell-item>
					<yd-cell-item>
						<span slot="left">设置密码：</span>
						<input slot="right" type="password" placeholder="设置密码" v-model="applyModel.password" />
					</yd-cell-item>
					<yd-cell-item>
						<span slot="left">姓名：</span>
						<input slot="right" type="text" placeholder="请填写真实姓名" v-model="applyModel.realname" />
					</yd-cell-item>
					<yd-cell-item>
						<span slot="left">手机号：</span>
						<input slot="right" type="number" placeholder="请填写手机号码" v-model="applyModel.mobile" />
					</yd-cell-item>
				</yd-cell-group>
				<yd-cell-group title="门店信息">
					<yd-cell-item>
						<span slot="left">门店名称：</span>
						<input slot="right" type="text" placeholder="门店名称" v-model="applyModel.storeName"></input>
					</yd-cell-item>
					<!-- <div class="yd-cell-item">
								<div class="yd-cell-left"><span class="yd-cell-icon"></span> <span data-v-5eba54ac="">门店图片:</span></div>
								<div class="yd-cell-right imageRight">
									<el-upload class="avatar-uploader" :action="uploadUrl" :on-preview="handlePreview" :limit="1" :show-file-list="false" :on-exceed="handleExceed" :before-upload="beforeUpload" :on-success="handleStoreSuccess">
										
										<img v-if="imageUrl" :src="imageUrl" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon imageRight">上传图片</i>
									</el-upload>
								</div>
							</div> -->
					<yd-cell-item arrow>
						<span slot="left">所属类型：</span>
						<input slot="right" type="text" @click.stop="showCategory" v-model="categoryName" readonly placeholder="请选择类型">
					</yd-cell-item>
					<yd-cell-item arrow>
						<span slot="left">所在城市：</span>
						<input slot="right" type="text" @click.stop="addressShow = true" v-model="addressName" readonly placeholder="请选择城市">
					</yd-cell-item>
					<yd-cell-item arrow v-if="strShow">
						<span slot="left">街道：</span>
						<input slot="right" type="text" @click.stop="streetShow = true" v-model="street" readonly placeholder="请选择街道">
					</yd-cell-item>
					<yd-cell-item>
						<span slot="left">详细地址：</span>
						<yd-input @change.native="searchByStationName(addressName)" slot="right" type="text" v-model="applyModel.address" placeholder="街道楼排号等"></yd-input>
					</yd-cell-item>
					<yd-cell-item>
						<span slot="left">地理位置：</span>
						<span slot="left" style="color: #D64D31;font-size: 0.8rem;">经度:{{applyModel.lng}} 纬度:{{applyModel.lat}}</span>
					</yd-cell-item>
					<!--<div>要查询的地址：</div>
					<input id="text_" type="text" value="宁波天一广场" style="display: block;"/>-->
					<!--<div>查询结果(经纬度)：</div>
					<input id="result_" type="text" />
    				<input type="button" value="查询" @click="searchByStationName(addressName);" style="display: block;"/>-->
					<div id="container"></div>
					<yd-cell-item arrow>
						<span slot="left">营业开始时间:</span>
						<yd-datetime type="time" v-model="applyModel.beginTime" slot="right"></yd-datetime>
					</yd-cell-item>
					<yd-cell-item arrow>
						<span slot="left">营业结束时间:</span>
						<yd-datetime type="time" v-model="applyModel.endTime" slot="right"></yd-datetime>
					</yd-cell-item>
					<!--<yd-cell-item>
									<span slot="left">营业执照:</span>
									<input slot="right" id="inp" type="file" value="上传图片" multiple @click="getImgUpload" name="input"/>
								</yd-cell-item>-->
					<!-- <div class="yd-cell-item">
								<div class="yd-cell-left"><span class="yd-cell-icon"></span> <span data-v-5eba54ac="">营业执照:</span></div>
								<div class="yd-cell-right imageRight">
									<el-upload class="upload-demo" :action="uploadUrl" :on-preview="handlePreview" :on-remove="handleAptiRemove" :file-list="fileList2" list-type="picture" :on-exceed="handleExceed" :before-upload="beforeUpload" :on-success="handleAptiSuccess">
										<el-button size="small" type="primary">点击上传</el-button>
									</el-upload>
								</div>
							</div> -->
					<!-- <yd-cell-item>
									<span slot="left">申请协议:{{agreement}}</span>
									<yd-checkbox v-model="agreementChoose" slot="right">&nbsp;</yd-checkbox>
								</yd-cell-item> -->
							
					
					<!-- <div class="apply">
									<el-checkbox v-model="agreementChoose" slot="right">&nbsp;</el-checkbox>
									<div class="text">
										<span>申请协议：</span>
										<p class="red" v-html="agreement"></p>
									</div>
								</div> -->
					<!-- <yd-cell-item arrow @click.native="showAgreement">
							<span slot="left">申请协议（点击查看协议）</span>
						</yd-cell-item>
						<yd-cell-item>
							<span slot="left">是否同意申请协议：</span>
							<el-checkbox v-model="agreementChoose" slot="right">&nbsp;</el-checkbox>
						</yd-cell-item> -->
					<div style="clear:both"></div>
					<div style="height:50px;text-align:left;padding-left:13px;line-height:50px;">
						<span style="font-size:15px;">门店图片：</span>
					</div>
					<div>
						<div>
							<el-upload :action="uploadUrl" :on-preview="handlePreview" :limit="1" list-type="picture-card" :show-file-list="false" :on-exceed="handleExceed" :before-upload="beforeUpload" :on-success="handleStoreSuccess">
								<img v-if="imageUrl" :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus"></i>
							</el-upload>
						</div>
					</div>
					<div style="height:50px;text-align:left;padding-left:13px;line-height:50px;">
						<span style="font-size:15px;">营业执照：</span>
					</div>
					<div>
						<div>
							<el-upload class="upload-demo" :action="uploadUrl" :on-preview="handlePreview" :on-remove="handleAptiRemove" :file-list="fileList2" list-type="picture-card" :on-exceed="handleExceed" :before-upload="beforeUpload" :on-success="handleAptiSuccess">
								<i class="el-icon-plus"></i>
							</el-upload>
						</div>
					</div>

					<yd-cell-item>
						<yd-textarea slot="right" placeholder="备注信息：" maxlength="100" v-model="applyModel.remark"></yd-textarea>
					</yd-cell-item>

					<yd-cell-item>
							<span slot="left">是否同意申请协议：</span>
							<el-checkbox v-model="agreementChoose" slot="right">&nbsp;</el-checkbox>
						</yd-cell-item>
				</yd-cell-group>
				<!-- <yd-cell-group name="门店图片">
						
					</yd-cell-group> -->
				<!-- <yd-cell-grounp name="营业执照">
					<div style="background:#fff;">
					</div>
				</yd-cell-grounp> -->
				<!-- 申请信息结束 -->
				<!--文字说明；后台设置-->
				<div style="clear:both;margin-top:15px;"></div>
				<input type="submit" value="申请" class="btn" @click="setApplyData">
				<div class="vip_main" v-if="!(o2o_info==null||o2o_info==''||o2o_info==undefined)">
					<!-- <div class="title">门店说明</div> -->
					
						<yd-cell-item>
							<span slot="left">申请协议：</span>
						</yd-cell-item>

						
					
					<div class="vip">
						<div class="text">
							<div id="t1" v-html='o2o_info'></div>
							<!--<div class="t2">拥有专属推广二维码，用于推广客户；</div>-->
						</div>
					</div>
					
						
					
				</div>
				
			</div>
			<!--申请后展示-->
			<div class="success" v-if="o2o_status==2">
				<div class="ico"><i class="fa fa-check"></i></div>
				<div class="text">您的申请已经提交，请等待审核！</div>
				<a @click="goHome()">
					<div class="sub">去商城逛逛</div>
				</a>
			</div>
			<!--审核通过后展示，文字后台设置 -->
			<div class="success" v-if="o2o_status==3">
				<div class="ico"><i class="fa fa-check"></i></div>
				<div class="text">您已通过审核</div>
				<a @click="goHome()">
					<div class="sub">去商城逛逛</div>
				</a>
			</div>
		</div>
		<!-- 门店类别列表 -->
		<yd-popup v-model="categoryShow" position="right" width="100%">
			<yd-navbar title="选择类别" height="40px" fontsize="14px" fixed>
				<span slot="left">
								<yd-navbar-back-icon @click.native="categoryShow = false"></yd-navbar-back-icon>
							</span>
			</yd-navbar>
			<div style="clear:both;margin-top:40px;"></div>
			<yd-cell-item arrow v-for="item in categoryList" @click.native="chooseCategory(item)">
				<span slot="left">{{item.name}}</span>
			</yd-cell-item>
		</yd-popup>
		<!-- 街道地址 -->
		<yd-cityselect v-model="addressShow" :callback="addressCallback" :items="area"></yd-cityselect>
		<yd-popup v-model="streetShow" position="right" width="100%">
			<yd-navbar title="选择街道" height="40px" fontsize="14px" fixed>
				<span slot="left">
								<yd-navbar-back-icon @click.native="streetShow = false"></yd-navbar-back-icon>
							</span>
			</yd-navbar>
			<div style="clear:both;margin-top:40px;"></div>
			<yd-cell-item arrow v-for="item in districtVal" @click.native="streetConfirm(item)">
				<span slot="left">{{item.areaname}}</span>
			</yd-cell-item>
		</yd-popup>
		<!-- 申请协议 -->
		<!-- <yd-popup v-model="agreementShow" position="right" width="100%">
			<yd-navbar title="申请协议" height="40px" fontsize="14px" fixed>
				<span slot="left">
								<yd-navbar-back-icon @click.native="agreementShow = false"></yd-navbar-back-icon>
							</span>
			</yd-navbar>
			<div style="clear:both;margin-top:40px;"></div>
			<div v-html="agreement">
			</div>
		</yd-popup> -->
	</div>
</template>
<script>
	import store_apply_controller from "./store_apply_controller";
	export default store_apply_controller;
</script>
<style lang="scss" rel="stylesheet/scss">
	.el-upload-list__item {
		padding: 0 !important;
	}
	.el-input__icon.el-icon-caret-top {
		color: #b8b8b8;
	}
	.avatar {
		width: 100%;
		height: 100%;
	}
	.imageRight {
		justify-content: flex-start;
		padding-left: 10px;
		text-align: left !important;
	}
	.el-input__inner {
		border: 1px solid #b8b8b8;
		font-size: 12px;
	}
	.el-select {
		display: block;
		margin-bottom: 8px;
		width: 100%;
		height: 2rem;
		border-radius: 5px;
		box-sizing: border-box;
		outline: none;
	}
	#income {
		h3 {
			background: #f5f5f5;
			margin: 0;
			padding: 0 10px;
			text-align: left;
			font-weight: normal;
			font-size: 0.8rem;
			height: 2rem;
			box-sizing: border-box;
			line-height: 2rem;
			span {
				color: #999;
			}
		}
	}
	a {
		text-decoration: none;
		color: #222;
	}
	input {
		border-width: 0;
	}
	.supplier .banner img {
		width: 100%;
	}
	.supplier .main {
		position: relative;
		top: -4px;
	}
	.welcome {
		padding-bottom: 10px;
		.text {
			line-height: 36px;
			height: 36px;
			background-color: #fff;
			h1 {
				font-size: 0.9rem;
			}
		}
		.info {
			.info-btn {
				padding: 10px;
				background-color: #fff;
				input {
					display: block;
					margin-bottom: 8px;
					width: 90%;
					height: 2rem;
					border-radius: 5px;
					padding: 0 5px;
					box-sizing: border-box;
					outline: none;
					margin: 10px auto;
				}
			}
			.inp {
				border: 1px solid #b8b8b8;
			}
			.inp:focus {
				border-color: #f55955;
				box-sizing: border-box;
			}
			span {
				color: #f55955;
			}
			.btn {
				background: #499BFB;
				color: #ffffff;
				margin-bottom: 8px;
				width: 90%;
				height: 2rem;
				border-radius: 5px;
				padding: 0 5px;
				box-sizing: border-box;
				text-align: center;
				font-size: 0.8rem;
				line-height: 2rem;
				margin: 0 auto;
				i {
					display: inline-block;
				}
			}
			.btn:focus {
				background: #d8403c;
			}
			.info-box {
				background-color: #fff;
				padding-bottom: 20px;
				margin-top: 10px;
				padding-left: 14px;
				margin-bottom: 20px;
				ul {
					display: flex;
					line-height: 44px;
					height: 44px;
					font-size: 0.875rem;
					border-bottom: solid 1px #e2e2e2;
					.left {
						width: 20%;
						font-size: 0.9rem;
					}
					.right {
						width: 80%;
						font-size: 0.9rem;
						color: #8c8c8c;
					}
				}
				ul:last-child {
					border: none;
				}
				.name {
					.right {
						padding-right: 14px;
						text-align: left;
						input {
							width: 100%;
						}
					}
				}
				.picture {
					.right {
						padding-right: 14px;
						text-align: right;
						i {
							line-height: 44px;
							font-size: 24px;
							color: #c9c9c9;
						}
					}
				}
				.city {
					display: flex;
					line-height: 44px;
					padding-right: 14px;
					.btn {
						font-size: 0.9rem;
						padding: 0;
						height: 43px;
						display: flex;
						justify-content: space-between;
						background-color: #fff;
						width: 79%;
						line-height: 44px;
						input {
							flex: 2;
						}
						i {
							line-height: 44px;
							font-size: 24px;
							color: #c9c9c9;
						}
					}
					.left {
						width: 21%;
					}
				}
				.time {
					padding-right: 14px;
					display: flex;
					height: 44px;
					line-height: 44px;
					.left {
						width: 21%;
					}
					.right {
						width: 79%;
						display: flex;
						justify-content: space-between;
						input {
							flex: 2;
						}
						i {
							line-height: 44px;
							font-size: 24px;
							color: #c9c9c9;
						}
					}
				}
				.select {
					padding-right: 14px;
					.left {
						width: 21%;
					}
					.right {
						width: 79%;
						display: flex;
						justify-content: space-between;
						select {
							color: #8c8c8c;
							flex: 2;
							border: none;
							border-radius: 4px;
							option {
								color: #333;
							}
						}
						i {
							line-height: 44px;
							font-size: 24px;
							color: #c9c9c9;
						}
					}
				}
				.remarks {
					display: flex;
					padding-right: 14px;
					width: 100%;
					margin-top: 10px;
					span {
						width: 21%;
						font-size: 0.9rem;
						color: #333;
					}
					textarea {
						width: 79%;
						height: 48px;
						padding: 4px;
						border: solid 1px #e2e2e2;
						background-color: #fafafa;
						border-radius: 4px;
					}
				}
			}
		}
	}
	.supplier .main .vip_main {
		background: #ffffff;
		margin: 15px 0;
		.title {
			padding: 10px;
			font-size: 0.8rem;
			border-bottom: 1px solid #eeeeee;
			text-align: center;
		}
		.vip {
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
	.main {
		padding-bottom: 18px;
		padding-top: 18px;
		.btn {
			width: 90%;
			background: #499BFB;
			color: #ffffff;
			height: 2rem;
			border-radius: 4px;
			padding: 0 5px;
			box-sizing: border-box;
			text-align: center;
			font-size: 0.9rem;
			line-height: 2rem;
			margin: 0 12px;
		}
		.apply {
			line-height: 44px;
			margin: 0 12px 0 12px;
			display: flex;
			.text {
				font-size: 0.875rem;
				.red {
					color: #f15353;
				}
			}
		}
	}
	.supplier .success {
		height: 200px;
		padding-top: 65px;
		background: #ffffff;
		.ico {
			height: 65px;
			width: 65px;
			margin: auto;
			border: 3px solid #32cd32;
			border-radius: 4rem;
			color: #32cd32;
			font-size: 2.3rem;
			text-align: center;
			line-height: 4rem;
		}
		.text {
			height: 2rem;
			margin-top: 30px;
			color: #666;
			line-height: 1.6rem;
			text-align: center;
		}
		a .sub {
			height: 2rem;
			width: 80%;
			background: #f55955;
			margin: 20px auto;
			border-radius: 2rem;
			color: #fff;
			line-height: 2rem;
			text-align: center;
			font-size: 0.9rem;
			margin-bottom: 20px;
		}
		a .sub:focus {
			background: #d8403c;
		}
		.avatar-uploader .el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
		}
		.avatar-uploader .el-upload:hover {
			border-color: #409eff;
		}
		.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 178px;
			height: 178px;
			line-height: 178px;
			text-align: center;
		}
		.avatar {
			width: 178px;
			height: 178px;
			display: block;
		}
		.el-upload-list__item .is-success {
			width: 80%;
			height: 100px;
		}

		

		
	}
</style>

