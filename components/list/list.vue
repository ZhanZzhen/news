<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change">
		<swiper-item class="swiper-item" v-for="(item,index) in tabList" :key="index">
			<list-item @loadmore="loadmore" :load="load[index]" :list="listCatchData[index]"></list-item>
		</swiper-item>
		
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		components:{
			listItem
		},
		props:{
			tabList:{
				type:Array,
				default(){
					return []
				}
			},
			activeIndex:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				list:[],
				listCatchData:{},
				load:{},
				pageSize:10
			}
		},
		watch:{
			tabList(newVal){
				if(newVal.length === 0) return
				this.listCatchData = {}
				this.load = {}
				this.getList(this.activeIndex)
			}
		},
		methods: {
			loadmore(){
				if(this.load[this.activeIndex].loading === 'noMore')return
				this.load[this.activeIndex].page++
				this.getList(this.activeIndex)
				console.log('触发上拉加载')
			},
			change(e){
				const {current} = e.detail
				this.$emit('change',current)
				// 当数据不存在 或者 长度等于0的时候 获取数据
				if(!this.listCatchData[current] || this.listCatchData.length === 0){
					this.getList(current)
				}
				
			},
			async getList(current) {
				if(!this.load[current]) {
					this.load[current] = {
						page: 1,
						loading:'loading'
					}
				}
				const res= await this.$myRequest({
					name:'get_list',
					data:{
						name:this.tabList[current].name,
						page:this.load[current].page,
						pageSize:this.pageSize
					}
				})
					
				if(res.data.length === 0){
					let oldLoad = {}
					oldLoad.loading = 'noMore' 
					oldLoad.page=this.load[current].page
					this.$set(this.load,current,oldLoad)
					this.$forceUpdate()
					return
					
				}
				let oldList = this.listCatchData[current] || []
				oldList.push(...res.data)
				this.$set(this.listCatchData,current,oldList)
			}	
		}
	}
</script>

<style lang="scss">
	.home-swiper{
		height: 1444px;
		.swiper-item{
			height: 1444px;
			overflow: hidden;
			.list-scroll{
				height: 1444px;
			}
		}
	}
</style>
