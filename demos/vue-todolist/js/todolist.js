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
        todos: [{
            name: 'aaa',
            completed: true
        }, {
            name: 'bbb',
            completed: false
        }],
        types: ['All', 'Active', 'Completed'],
        type: 'All'
    },
    computed: {
        filterTodos: function() {
            return filters[this.type.toLowerCase()](this.todos);
        }
    },
    methods: {
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
        showType: function(type) {
            this.type = type;
        },
        clearCompleted: function() {
            this.todos = filters.active(this.todos);
        }
    }
});
