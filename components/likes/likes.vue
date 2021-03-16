<template>
	<view class="likes" @click="likeTap(item._id)">
		<uni-icons :type="like?'heart-filled':'heart'"></uni-icons>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article_id:0,
				like:true
			};
		},
		props:{
			item:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		created(){
			this.like = this.item.is_like
		},
		watch:{
			item(newVal){
				this.like = this.item.is_like
			}
		},
		methods:{
			likeTap(){
				this.like = !this.like
				this.updateLikes()
			},
			async updateLikes(){
				uni.showLoading({
						title:this.like?'收藏成功':'取消收藏'
				})
				const res = await this.$myRequest({
					name:'update_like',
					data:{
					"article_id":this.item._id
					},
				})
				uni.hideLoading()
			}
		}
	}
</script>

<style lang="scss">
	.likes{
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		width: 20px;
		height: 20px;
		top: 0;
		right: 5px;
		color: #f07f7f;
	}

</style>
