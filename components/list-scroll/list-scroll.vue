<template>
		<view class="scroll">
			<scroll-view scroll-y="true" @scrolltolower=loadmore class="list-scroll" >
				<view>
					<slot></slot>
				</view>
			</scroll-view>
			
		</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			loadmore(){
				this.$emit('loadmore')
			}
		}
	}
</script>

<style lang="scss">
	.scroll{
		overflow: hidden;
		.list-scroll{
			height: 100%;
		}
	}
</style>
