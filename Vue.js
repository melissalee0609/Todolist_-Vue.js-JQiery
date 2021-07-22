//頁面全局點擊
Vue.prototype.globalClick = function (callback) {
    document.onclick = function () {
        callback();
    }
}
var app = new Vue({
    el: '#app',
    data: {
        consHide:true,
        newTaskTag: "private",
        newTaskName: '',
        chosen: "all",
        chooseHide: true,
        noTask: true,
        showInput: false,
        catchTodo: {},
        catchTitle: '',
        listTodo: [],
        isAllow: true,
        todoListId: [],
        todoList: [
            // {
            //     id: "1",
            //     list_tag: "private",
            //     task_name: "123",
            //     complete: false,
            // },
            // {
            //     id: "222",
            //     list_tag: "work",
            //     task_name: "3",
            //     complete: false,
            // },
        ]
    },
    methods: {
        addTodo: function () {
            // const vm = this;
            // let tag = vm.newTaskTag
            var tag = this.newTaskTag;
            var title = this.newTaskName;
            var timestamp = Math.floor(Date.now());

            this.todoList.push({
                id: timestamp,
                list_tag: tag,
                task_name: title,
                complete: false,
            });
            this.newTaskName = '';
        },
        tagHide: function () {
            this.chooseHide = !this.chooseHide
        },
        doneCheck: function (item) {
            if (this.isAllow == true && this.showInput == false) {
                item.complete = !item.complete;
            }
        },
        editTodo: function (item) {
            this.isAllow = false
            if (!item.complete) {
                this.showInput = !this.showInput;
                this.catchTodo = item
                
                if (this.showInput) {
                    document.addEventListener("click", this.onGlobalClick);
                }
            }
        },
        onGlobalClick: function (e) {
            this.isAllow = true
            if (e.target.className != "modify-input") {
                this.showInput = false;
                document.removeEventListener("click", this.onGlobalClick)
            }
        },
        
        removeTodo: function (todoItem) {
            //-----Way1-----//
            // var newIndex = this.todoList.findIndex(function (item) {
            //     return todoItem.id == item.id
            // })
            // console.log("newIndex", newIndex);
            // this.todoList.splice(newIndex, 1);

            //-----Way2-----//
            const newtodolist = [...this.todoList];
            this.todoList = newtodolist.filter((item) => item.id !== todoItem.id)

            if(this.todoList.length == 0){
                this.consHide = false
            }
        },

        deleteAll: function () {
            var chosen = this.chosen
            if (chosen == 'all') {
                this.todoList = [];
                this.consHide = false;
            } else {
                todoListId = []
                listTodoId = []
                
                //將同樣標籤的分在同一個陣列
                this.todoList.forEach(function (item) {
                    todoListId.push(item.id)
                    if (item.list_tag == chosen) {
                        this.listTodo.push(item)
                        listTodoId.push(item.id)
                    }
                });
                //將全部的todoList 和 標籤選後的 listTodo做差集
                
                // let array = this.todoList.concat(this.listTodo)
                // console.log("array",array)

                let result = this.todoList.filter(function (item) {
                    return (todoListId.indexOf(item.id) === -1) || (listTodoId.indexOf(item.id) === -1)
                })
                //將todoList清空後 重新加入差集過後的物件回傳到原陣列
                this.todoList = [];
                // var todoList = this.todoList;
                result.forEach(function (item) {
                    console.log(this,this.todoList)
                    this.todoList.push(item)
                })

                if(todoList.length == 0){
                    this.consHide = false
                }
            }
        },
        mounted: function () {
            this.globalClick(this.doneEdit)
        }

    },

    computed: {
        conStyle: function () {
            return {
                'display': this.consHide ? 'none' : 'inline-block'
            }
        },
        taskStyle: function () {
            return {
                'display': this.showInput ? 'none' : 'inline-block'
            }
        },
        inputStyle: function () {
            return {
                'display': this.showInput ? 'inline-block' : 'none'
            }
        },
        removeStyle: function () {
            return {
                'display': this.filterTodo.length > 1 ? 'inline-block' : 'none'
            }
        },

        noTaskStyle: function () {
            return {
                'color': 'rgb(170, 170, 170)',
                'margin': '0px 0px 1.5rem',
                'display': this.filterTodo.length == 0 ? 'inline-block' : 'none',
            }
        },

        filterTodo: function () {
            listTodo = [];
            if (this.chosen == "all") {
                this.todoList.forEach(function (item) {
                    listTodo.push(item)
                });
                return listTodo
            } else {
                tag = this.chosen;
                this.todoList.forEach(function (item) {
                    if (item.list_tag == tag) {
                        listTodo.push(item)
                    }
                });
                return listTodo
            }
        }
    }
});