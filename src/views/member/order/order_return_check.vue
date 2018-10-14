<template>
	<div id="refund">
		<c-title :hide="false" text='退还商品'></c-title>
		<div style="height:42px;"></div>
		<div id="state">
			<span>商品状态:</span>
			<span>{{order_status}}</span>
		</div>
		<div class="return-money">
			<ul class="money">
				
				<li>
					<span class="left">押金预计退还金额</span>
					<span class="right">￥{{deposit_total}}</span>
				</li>
			</ul>
			<p class="prompt">提示：最终退款金额已商品退还确认后为准</p>

			<p class="prompt">提示：点击"开始申请"按钮开始申请</p>

			<yd-button size="large" type="danger" @click.native="applyData">开始申请</yd-button>
		</div>
	</div>
</template>

<script>
    import refund from './order_return_check_controller';
	export default refund;
        
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#refund{
	#state{
		display: flex;
		justify-content: space-between;
		background-color: #f15353;
		color:#fff;
		padding:0 14px;
		height:60px;
		text-align: left;
		span{
			font-size:16px;
			font-weight: bold;
			line-height: 60px;
		}
	}
	.return-money{
		background-color:#fff;
		padding:0 14px;
	}
	.money{
		padding:10px 0;	
		border-bottom:solid 1px #e2e2e2;
		li{
			line-height: 30px;
			display: flex;
			justify-content: space-between;
			font-size:.875rem;
		}
		.right{
			color:#f15353;
		}
	}
	.prompt{
		color:#8c8c8c;
		text-align: left;
		line-height: 36px;
	}
	.state{
		background-color: #fff;
		height: 100px;
		text-align: left;
		ul{
			display: flex;
			justify-content: space-between;
			margin-left:14px;
			padding-right:14px;
			border-bottom:solid 1px #e2e2e2;
			li{
				line-height: 36px;
			}
			b{
				font-size:16px;
				color:rgb(179, 55, 55);
			}
			span{
				font-size:16px;
				font-weight: bold;
			}
		}
		
	}
	.line{
		height:5px;
		background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAFCAYAAABIHbx0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ODgzMDVGNzkxODNFMTFFNzgzMUFCNTA1QTc5NTYyNkUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6ODgzMDVGN0ExODNFMTFFNzgzMUFCNTA1QTc5NTYyNkUiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4ODMwNUY3NzE4M0UxMUU3ODMxQUI1MDVBNzk1NjI2RSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4ODMwNUY3ODE4M0UxMUU3ODMxQUI1MDVBNzk1NjI2RSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pg4RkxIAAACySURBVHjaZNC9DgFBFIbhXdyERqUTpQtYEp1OUOjUdAo/icotbKFFQiMSaoUoFFQj0W+rlxAS78i3yYSTPJliZr45Z3xjjKdqYYwH6jh6/1VGiCdquMQbKa0dtBEgiznyuDshRcxQRRpbFHCzmwnkMEAJV2zUzdAJsaELNLDHElM9+G3GZ7SdDk2cixmcUdEYa/R0Ma4kVjbDTmTT+jj9/EWEpg6+0FUXbr31TyMcPgIMAD2cJ8vkaoIFAAAAAElFTkSuQmCC) repeat;
	}
	.refund-add{
		text-align: left;
		font-size:.875rem;
		line-height: 24px;
		margin-bottom:10px;
	}
	.add-box{
		margin-bottom:20px;
		.addr {
			border-top:solid 1px #e2e2e2;
			display: flex;
			justify-content: space-between;
			flex-flow: row wrap;
			align-items: center;
			background: #fff;
			padding:16px 0;
			.icon{
				font-size:.875rem;
			display: flex;
			i{
				line-height: 24px;
				margin-right:10px;
			}
			}
			i {
			font-size: 16px;
			color: #333;
			}
			.fa-angle-right{
			font-size:24px;
			color:#c9c9c9;
			}
			p {
			flex: 6;
			text-align: justify;
			font-weight: bold;
			line-height: 1.5rem;
			padding-right: 1rem;
			color: #333333;
			span {
				font-size: 0.9rem;
				font-weight: normal;
				color: #666;
			}
			}
		}
	}
	.refund-express{
		width:100%;
		display: flex;
		text-align: left;
		font-size:.875rem;
		span{
			width:21%;
			line-height: 26px;
		}
		select{
			width:79%;
			border:solid 1px #e2e2e2;
			background-color: #fff;
			height:26px;
			border-radius: 3px;
			padding:0 4px;
			color:#8c8c8c;
		}

	}
	.express-member{
		span{
			line-height: 26px;
			width:21%;
		}
		display: flex;
		justify-content: space-between;
		text-align: left;
		font-size:.875rem;
		margin-top:20px;
		input{
			background-color: #fff;
			border:solid 1px #e2e2e2;
			width:79%;
			height: 26px;
			border-radius: 3px;
			padding:0 4px;
		}
	}
	.remarks{
		display: flex;
		justify-content: space-between;
		text-align: left;
		font-size:.875rem;
		display: flex;
		margin-top:20px;
		span{
			margin-right:10px;
		}
		textarea{
			width:79%;
			background-color: #fafafa;
			border:solid 1px #e2e2e2;
			border-radius: 4px;
			padding:4px;
			height:68px;
		}
	}
	.submit{
		margin-top:20px;
		input{
			width:60%;
			height:2rem;
			color:#fff;
			background-color: #f15353;
			border:none;
			border-radius: 4px;
			font-size:.875rem;
		}
	}

}
	

</style>