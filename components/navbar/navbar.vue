<template>
	<view class="navbar" >
		<view class="nav-fixed">
			<view :style="{height:statusBarHeight+'px'}"></view>
			<view v-if="!isSearch" class="navbar-content"  :style="{height:navbarHeight+'px',width:windowWidth+'px'}" @click="open">
				<view class="navbar-serach">
					<view class="navbar-serach_icon">
						<uni-icons type="search" size="26" color="#999"  ></uni-icons>
					</view>
					<view class="navbar-serach_text">
						uni-app、vue
					</view>
				</view>
			</view>	
			<view v-else class="navbar-content"  :style="{height:navbarHeight+'px',width:windowWidth+'px'}" >
				<view class="navbar-content_search-icons">
					<uni-icons type="back" size="22" color="#fff" @click="goback"></uni-icons>
				</view>
				
				<view class="navbar-serach">
					<input type="text" value="" v-model="val"  @input="inputChange" placeholder="请输入搜索内容"/>
				</view>
				
			</view>
		</view>
		<view :style="{height:statusBarHeight+navbarHeight+'px'}">
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			isSearch:{
				type:Boolean,
				default(){
					return false
				}
			},
			value:{
				type:[String,Number],
				default: ''
				
			}
		},
		data() {
			return {
				statusBarHeight:20,
				navbarHeight:45,
				windowWidth:375,
				val:'',
				isSea:false
			};
		},
		watch:{
			value(newVal){
				this.val = newVal
			}
		},
		created() {
			// 获取手机系统
			const info = uni.getSystemInfoSync()
			// 设置状态栏高度
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			// 获取 胶囊位置
			//#ifndef H5 || APP-PLUS || MP-ALIPAY
			const menubuuton = uni.getMenuButtonBoundingClientRect()
			this.navbarHeight = (menubuuton.bottom - this.statusBarHeight) + (menubuuton.top - this.statusBarHeight)
			this.windowWidth = menubuuton.left
			//#endif
		},
		methods:{
			open(){
				uni.navigateTo({
					url:'/pages/search/search'
				})
			
			},
			inputChange(e){
				const {value} = e.detail 
				this.$emit('input',value)
			},
			goback(){
				uni.switchTab({
					 url: '/pages/tabbar/index/index',
				})
				this.$emit('isSearchC')
			}

		}
	}
</script>

<style lang="scss">
	@import '../../common/css/icons.css';
	.navbar{
		.nav-fixed{
			position: fixed;
			top: 0;
			left: 0;
			z-index: 99;
			width: 100%;
			background-color: $mk-base-color;
			.navbar-content{
				display: flex;
				justify-content: center;
				align-items: center;
				height: 45px;
				padding: 0 15px;
				box-sizing: border-box;
				.navbar-serach{
					display: flex;
					align-items: center;
					width: 100%;
					height: 30px;
					border-radius: 30px;
					padding: 0 10px;
					background-color: #fff;
					input{
						width: 100%;
					}
					.navbar-serach_icon{
						margin-right: 10px;
					}
					.navbar-serach_text{
						font-size: 12px;
						color: #999;
						margin-left: 10px;
					}
				}
			}
			
		
		}
	}
</style>
