<template>
	<view class="home">
		<navbar></navbar>
		<tab :list="tabList" @tab="tab" :tabIndex=tabIndex></tab>
		<!-- 内容 -->
		<view class="home-list"><list :tabList=tabList :activeIndex="activeIndex" @change="change"></list></view>
		
	</view>
</template>

<script>
	// import navbar from '@/components/navbar/navbar.vue'?
	export default {
		// components:{
			// navbar
		// },
		data() {
			return {
				title: 'Hello',
				tabList:[],
				tabIndex:0,
				activeIndex:0
			}
		},
		onLoad() {
			uni.$on('labelChange',()=>{
				this.tabList = [],
				this.tabIndex = 0,
				this.activeIndex = 0
				this.getLabel()
			})
			this.getLabel()
		},
		methods: {
			async getLabel() {
				const res= await this.$myRequest({
					name:'get_label',
				})
				res.data.unshift({
					name:'全部'
				})
				this.tabList = res.data
			},
			tab(index){
				this.activeIndex = index
			},
			change(current){
				this.activeIndex = current
				this.tabIndex = current
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		display: flex;
	}
	.home{
		display: flex;
		flex-direction: column;
		flex: 1;
		.home-list{
			flex: 1;
			box-sizing: border-box;
		}
		
	}
</style>
