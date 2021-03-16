<template>
	<view class="label">
		<view class="label-box">
			<view class="label-header">
				<view class="label_title">我的标签</view>
				<view  class="label_edit" @click="edit">
					{{isEdit?'编辑':'完成'}}
				</view>

			</view>
			<view class="label-content">
				<uni-load-more v-if="loading" status="loading" iconType="snow" ></uni-load-more>
				<view v-if="!loading" class="label-content_item" v-for="(item,index) in labelList" :key="item.name">
					{{item.name}}
					<uni-icons v-if="!isEdit" type="clear" class="icons-close" size="20" color="red" @click="del(index)"></uni-icons>
				</view>
				<view class="no-data" v-if="labelList.length === 0 && !loading">
					当前没有数据！
				</view>
			</view>
		</view>
		<view class="label-box">
			<view class="label-header">
				<view class="label_title">标签推荐</view>
			</view>
			<view class="label-content">
				<uni-load-more v-if="loading" status="loading" iconType="snow" ></uni-load-more>
				<view  v-if="!loading" class="label-content_item" v-for="(item,index) in list" :key="item.name" @click="add(index)">
					{{item.name}}
				</view>
				<view class="no-data" v-if="list.length === 0 && !loading">
					当前没有数据！
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isEdit:true,
				labelList:[],
				list:[],
				loading:false
				
			}
		},
		onLoad() {
			this.getLabel()
		},
		methods: {
			async getLabel(){
				this.loading = true
				const res = await this.$myRequest({
					name:'get_label',
					data:{
						type:'all'
					}	
				})
				this.labelList = res.data.filter(item => item.current)
				this.list = res.data.filter(item => !item.current)
				this.loading = false
			},
			edit(){
				if(this.isEdit){
					this.isEdit = false
					
				}else{
					this.isEdit = true
					this.setUpdateLabel(this.labelList)
				}
			},
			add(index){
				if(this.isEdit) return 
				this.labelList.push(this.list[index])
				this.list.splice(index,1)
			},
			del(index){
				this.list.push(this.labelList[index])
				this.labelList.splice(index,1)
			},
			async setUpdateLabel(label){
				let newArrIds = []
					label.forEach(item => {
						newArrIds.push(item._id)
					})
					uni.showLoading({
					})
				console.log(newArrIds)
				const res = await this.$myRequest({
					name:'update_label',
					data:{
						label:newArrIds	
					}
						
				})
				uni.hideLoading()
				uni.showToast({
					title:"更新成功",
					icon:'none'
				})
				uni.$emit('labelChange')
				

			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
	}
	.label {
		.label-box{
			background-color: #fff;
			margin-top: 10px;
			.label-header{
				display: flex;
				justify-content: space-between;
				padding: 10px 15px;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5f5 solid;
				.label_edit{
					color: #30b33a;
					font-weight: 700;
				}
			}
			.label-content{
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;	
				.label-content_item{
					position: relative;
					padding: 2px 5px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
					.icons-close{
						position: absolute;
						top: -12px;
						right: -8px;
					}
				}
				.no-data{
					width: 100%;
					text-align: center;
					padding: 50px 0;
					color: #999;
					font-size: 14px;
				}
			}
		}
	}
</style>
