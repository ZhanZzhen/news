'use strict';
const db = uniCloud.database()
const $ = db.command.aggregate
exports.main = async (event, context) => {
	let matchObj = {}
	const {
		user_id,
		page = 1,
		pageSize = 10
	} = event
	if (event.name !== '全部') {
		matchObj = {
			classify: event.name
		}
	}
	const userinfo = await db.collection('user').doc(user_id).get()
	const article_id_ids = userinfo.data[0].article_likes_ids
	
	//聚合 :更精细化的去处理数据 求和 分组 指定那些字段
	const list = await db.collection('article')
	.aggregate()
	// 追加字段
	.addFields({
		is_like:$.in(['$_id',article_id_ids])
	})
	.match(matchObj)
	.project({
		content:0
	})
	.skip(pageSize*(page-1))
	.limit(pageSize)
	.end()
	// let label = await db.collection('article')
	// .field({
	// 	content:false
	// })
	// .get()
	
	//返回数据给客户端
	return {
		code:200,
		msg:event.name,
		data:list.data
	}
};