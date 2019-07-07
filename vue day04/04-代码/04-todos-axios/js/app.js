/* 
	1. 初始化vue

	2. 任务列表的渲染
		2.1 发送ajax请求，获取到任务的列表数据，赋值给list  
			created钩子函数中发送请求
		2.2 使用v-for指令去渲染列表
	
	3. 删除功能
		1. 给删除按钮注册点击事件
		2. 发送ajax请求，删除对应的id
		3. 重新渲染（要不要）

	4. 添加功能
		1. 给文本框双向数据绑定
		2. 注册keyup事件
		3. 发送ajax请求添加数据
		4. 成功的时候重新渲染， 输入的内容清空
	
	5. 修改任务的状态
		1. 给checkbox注册change事件
		2. 发送请求，修改对应id任务的状态
		3. 重新渲染
	
	6. 修改任务的名字
		1. 给label注册双击事件
		2. 记录双击的那个任务的id
		3. 控制当前li的editing类型
		4. 给修改的input框双向绑定
		5. 回车修改 给input注册keyup事件 先让now变成-1，发送ajax请求

	7. 清空已经完成的任务
		1. 注册事件
		2. 需要删除的任务可以会有多个    ids: [1, 2, 3]
*/
(function (window) {
	const vm = new Vue({
		el: '.todoapp',
		data: {
			list: [],
			todoName: '',
			now: -1
		},
		created() {
			this.getTodoList()
		},
		methods: {
			// 获取任务的列表
			getTodoList() {
				// 发送ajax请求，获取所有的任务
				axios({
					method: 'get',
					url: 'http://localhost:3000/todos?_sort=id&_order=desc'
				}).then(res => {
					this.list = res.data
				})
			},
			delTodo(id) {
				axios({ 
					method: 'delete',
					url: `http://localhost:3000/todos/${id}`
				}).then(res => {
					// 咋办
					// console.log('删除成功')
					// 删除数据成功，代表服务器已经数据已经删除成功。
					// 重新发送一个请求，获取最新的任务列表
					this.getTodoList()
				})
			},
			addTodo() {
				// 发送请求，添加
				axios({ 
					method: 'post',
					url: 'http://localhost:3000/todos',
					data: {
						name: this.todoName,
						flag: false
					}
				}).then(res => {
					// 重新渲染
					this.getTodoList()
					this.todoName = ''
				})
			},
			changeState(id, flag) {
				this.editTodo(id, {flag})
			},
			showEdit(id) {
				this.now = id
			},
			// 根据id来修改对应的数据
			editTodo(id, data) {
				axios({
					method: 'patch',
					url: `http://localhost:3000/todos/${id}`,
					data: data
				}).then(res => {
					this.getTodoList()
				})
			},
			updateTodo(id, name) {
				this.now = -1
				this.editTodo(id, {name})
			},
			clearTodo() {
				// 1. 确定哪些任务需要删除
				// 2. 循环，挨个删除
				this.list.filter(item => item.flag).forEach(item => this.delTodo(item.id))
			}
		},
		computed: {
			isShowFooter() {
				return this.list.length > 0
			},
			count() {
				// 统计未完成的任务的数量
				return this.list.filter(item => !item.flag).length
			},
			isShowClear() {
				// 当有任务完成的时候，为true
				return this.list.some(item => item.flag)
			}
		}
	})
	window.vm = vm
})(window);
