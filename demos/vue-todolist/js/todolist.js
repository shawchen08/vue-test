var filters = {
    all: function(todos) {
        return todos;
    },
    active: function(todos) {
        return todos.filter(function(todo) {
            return !todo.completed;
        });
    },
    completed: function(todos) {
        return todos.filter(function(todo) {
            return todo.completed;
        });
    }
};

var app = new Vue({
    el: '#app',
    data: {
        newTodo: {
            name: '',
            completed: false
        },
        todos: [],
        types: ['All', 'Active', 'Completed'],
        type: 'All'
    },
    mounted: function() {
        this.$nextTick(function() {
            this.getData();
        });
    },
    computed: {
        filterTodos: function() {
            return filters[this.type.toLowerCase()](this.todos);
        }
    },
    methods: {
        getData: function() {
            var _this = this;
            this.$http.get('data/todosData.json').then(function(res) {
                _this.todos = res.data.result.todos;
            });
        },
        addTodo: function() {
            if (!this.newTodo.name) {
                return;
            }
            this.todos.push(this.newTodo);
            this.newTodo = {
                name: '',
                complete: false
            };
        },
        deleteTodo: function(index) {
            this.todos.splice(index, 1);
        },
        clearCompleted: function() {
            this.todos = filters.active(this.todos);
        }
    }
});
