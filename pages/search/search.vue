<template>
	<view class="home">
		<navbar :isSearch="isSearch" @isSearchC="isSearchC" @input="change" v-model="value"></navbar>
		<view class="home-list">
			<view class="label-box" v-if="is_history">
					<view class="label-header">
						<text class="label-title">搜索历史</text>
						<text class="label-clear" @click="clear">清空</text>
					</view>
				
				<view v-if="historyLists.length>0" class="label-content">
					<view class="label-content_item" v-for="(item,index) in historyLists" :key="index" @click="bind(item.name)">
						{{item.name}}
					</view>
				</view>
				<view v-else class="no-data">
					没有搜索历史
				</view>
			</view>
			<view class="serach_history" v-else>
					<list-scroll class="list-scroll">
						<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
						<view class="" v-if="list.length > 0">
							<list-card @clickcard="setHistory" v-for="(item,index) in list" :key="item.id" :item="item"></list-card>
						</view>	
						<view v-if="list.length === 0 && !loading" class="no-data" >
							没有搜索到相关数据
						</view>
					</list-scroll>
			</view>
			
			
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				isSearch:true,
				is_history:true,
				list:[],
				value:"",
				val:'',
				loading:false
			}
		},
		computed:{
			...mapState(['historyLists'])
		},
		onLoad() {
		},
		methods: {
			change(value){
				this.value = value
				if(!value){
					clearInterval(this.timer)
					this.mark = false
					this.getSearch(value)
					return
				}				
				if(!this.mark){
					this.mark = true
					this.timer = setTimeout(()=>{
						this.mark = false
							this.getSearch(value)
					},1000)
				}
			},
			isSearchC(){
				this.isSearch = !this.isSearch
			},
			async getSearch(value) {
				if(!value){
					this.list = []
					this.is_history = true
					return
				}
				this.is_history = false
				this.loading = true
				const res= await this.$myRequest({
					name:'get_search',
					data:{
						value:value
					}
				})
				this.loading = false
				this.list = res.data
			},
			setHistory(){
				this.$store.dispatch('set_history',{
					name:this.value
				})
			},
			clear(){
				this.$store.dispatch('clear_history')
				uni.showToast({
					title:"清空完成"
				})
			},
			bind(name){
				this.value = name
				this.getSearch(this.value)
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
		background-color: #f5f5f5;
	}
	.home{
		display: flex;
		flex-direction: column;
		flex:1;
		.label-box{
			background-color: #fff;
			margin-bottom: 10px;
			.label-header{
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px #f5f5f5 solid;
				.label-title{
					color: $mk-base-color;
				}
				.label-clear{
					color: #30b33a;
					font-weight: 700;
				}
			}
		}
		.label-content{
			display: flex;
			flex-wrap: wrap;
			padding: 15px;
			padding-top: 0px;
			.label-content_item{
				padding: 2px 10px;
				margin-top: 12px;
				margin-right: 10px;
				font-size: 14px;
				color: #666;
				
				border-radius: 5px;
				border: 1px #666 solid;
			}
		}
		.no-data{
			line-height: 200px;
			height: 200px;
			text-align: center;
			font-size: 12px;
			background-color: #FFFFFF;
			color: #666;
			
		}
	}
</style>
