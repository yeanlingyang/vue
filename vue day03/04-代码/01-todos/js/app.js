/* 
	1. 初始化vue
	2. 列表的渲染
	3. 删除功能
	4. 添加功能
	5. 修改功能
		5.1 给每一个lable都注册双击事件  dblclick
		5.2 让当前这个li有editing这个类, input框就能显示出来
		难点：怎么让点击的这个li有editing类
		5.3.1 首先需要一个属性，记录下来点击了任务的id ,初始 = -1 
		5.3.2 双击的时候，修改now 点击的任务的id  
		5.3.3 给li中的editing类添加判断  {edting: item.id === now}

		5.4.1 给input框双向数据绑定 <input class="edit" v-model="item.name">
		5.4.2 回车的时候，注册keyup事件 ，只需要editing类为false  只需要让now为-1
	
	6. 控制底部的显示和隐藏
		当任务列表的长度为0，没任务，底部就隐藏
		当任务列表的长度不为0，底部就显示

	7. 统计未完成的任务的数量

	8. 控制清空按钮的显示隐藏
		当有已经完成的任务，需要显示
		如果所有的任务都是没完成的，需要隐藏

	9. 点击清空按钮，把所有已经完成的任务清除


	10. 全选或者全不选功能
		根据下面所有的任务来控制toggle-all的checked的值
		当下面所有的任务都完成，就选中
		只要下面有任务没完成，就不选中

*/
(function (window) {
	const vm = new Vue({
		el: '.todoapp',
		data: {
			list: [
				{ id: 1, name: '学习', flag: false },
				{ id: 2, name: '找女朋友', flag: false },
				{ id: 3, name: '分手', flag: true}
			],
			todoName: '',
			// 用于记录点击任务的id
			now: -1,
			// 当前选中的底部
			current: 'all' 
		},
		methods: {
			delTodo(id) {
				// 只要把list中id对应的任务过滤掉
				this.list = this.list.filter(item => item.id !== id)
			},
			addTodo() {
				this.list.unshift({
					id: +new Date(),
					name: this.todoName,
					flag: false
				})
				this.todoName = ''
			},
			// 显示修改框
			showEdit(id) {
				this.now = id
			},
			editTodo() {
				this.now = -1
			},
			clearTodo() {
				// 做什么？
				// 点击清空按钮，把所有已经完成的任务清除, 保留所有未完成的任务
				this.list = this.list.filter(item => !item.flag)
			},
			change(type) {
				// console.log(type)
				// 修改了样式
				this.current = type

				// 点击切换类别，不能修改list，
				// 判断
				// if (type === 'active') {
				// 	// 选择未完成
				// 	// 把list变成没有完成的任务
				// 	this.list = this.list.filter(item => !item.flag)
				// } else if (type === 'completed') {
				// 	this.list = this.list.filter(item => item.flag)
				// }
			}
		},
		// 计算属性的值是不允许修改的？？？？？？
		// 为什么？？  不能计算属性使用v-model双向绑定
		computed: {
			isShowFooter() {
				// 当任务数量超过0，就显示footer
				return this.list.length > 0
			},
			unCompletedCount() {
				return this.list.filter(item => !item.flag).length
			},
			isShowClear() {
				return this.list.some(item => item.flag)
			},
			isCheckedAll: {
				get() {
					// 当所有的任务都完成了，表示都选中了
					return this.list.every(item => item.flag)
				},
				set(value) {
					// console.log(value)
					// value修改后的计算属性，，，，，，应该修改list中所有的任务的flag
					this.list.forEach(item => item.flag = value)
				}
			},
			// 用于显示的列表
			showList() {
				// 计算属性showList 要根据 current
				if (this.current === 'active') {
					return this.list.filter(item => !item.flag)
				} else if (this.current === 'completed') {
					return this.list.filter(item => item.flag)
				} else {
					return this.list
				}
			}
		}
	})
	window.vm = vm
})(window);
