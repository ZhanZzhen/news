export  const myRequest = (options) => {
	return new Promise((resolve,reject) => {
		const dataObj ={
			user_id:'60471681b510d00001f06695',
			...options.data
		}
		uniCloud.callFunction({
				name:options.name,
				data:dataObj,
			success: (res)=>{
				if(res.result.code !== 200){
					return uni.showToast({
						title:"获取数据失败！"
					})
				}
				resolve(res.result)
			},
			fail: (err) => {
				uni.showToast({
					title:"获取接口失败！"
				})
				reject(err)
			}
		})
	})
}