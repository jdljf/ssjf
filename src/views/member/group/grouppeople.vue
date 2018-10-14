<template>
	<!--拼团人员页面-->
	<div id="grouplist">
		<c-title :hide="false" text='拼团人员'></c-title>
		<div style="height: 40px;"></div>
		<!--拼团人员列表-->

		<div v-for="item in persons">
			<div class="group-item">
				<div class="info">
					<div v-if="item.group_leder==1" class="after">团长</div>
					<img class="avatar" :src="item.img" />
				</div>
				<div class="group-item-state">
					<div class="group-item-name">{{item.name}}</div>
					<div class="group-item-time">开团时间：<span class="group-item-date">{{item.time}}</span></div>
				</div>
			</div>

		</div>
	</div>
</template>
<script>
	import grouppeople from './grouppeople.js';
	export default grouppeople;
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
	#grouplist {
		.group-item {
			display: flex;
			align-items: center;
			padding: 10px 10px;
			border-bottom: 2px solid #F7F7F7;
			background: #fff;
			.info {
				position: relative;
				.after {
					position: absolute;
					padding: 2px 7px;
					background-color: #DB2420;
					top: -10%;
					right: -20%;
					border-radius: 10px;
					color: #fff;
					font-size: 10px;
				}
				img {
					width: 50px;
					height: 50px;
					border-radius: 50%;
					border: 1px solid #fff;
				}
			}
			.group-item-state {
				flex: 1;
				font-size: 0;
				text-align: left;
				margin-left: 13px;
				.group-item-name {
					font-size: 1rem;
					font-family: MicrosoftYaHeiLight;
					font-weight: 600;
					line-height: 1.1rem;
					color: #4F4F4E;
					margin-bottom: 7px;
				}
				.group-item-time {
					line-height: 1.1rem;
					font-size: 0.8rem;
					border-radius: 4px;
					color: #CCCCCC;
				}
			}
		}
	}
</style>