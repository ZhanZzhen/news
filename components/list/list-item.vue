<template>
	<list-scroll @loadmore="loadmore" class="list-scroll">
			<list-card v-for="(item,index) in list" :key="item.id" :item="item"></list-card>
	<uni-load-more v-if="list.length === 0 || list.length > 7" iconType="snow" :status="load.loading || 'loading'"></uni-load-more>
	</list-scroll>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
				default(){
					return []
				}
			},
			load:{
				type:Object,
				default() {
					return {
						loading:'loading'
					}
				}
			}
		},
		methods:{
			loadmore(){
				this.$emit('loadmore')
			}
		}
	}
</script>

<style>
	.list-scroll {
		height: 100%;
	}
</style>
