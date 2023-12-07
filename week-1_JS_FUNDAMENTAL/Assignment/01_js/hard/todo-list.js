/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
    constructor() {
        this.todoList = [];
    }

    add(str) {
        this.todoList.push(str);
    }

    remove(index) {
        // we have to remove from the array as per the list
        if (index >= 0 && index < this.todoList.length) {
            this.todoList.splice(index, 1);
        }
    }

    update(index, updateValue) {
        if (index >= 0 && index < this.todoList.length) {
            this.todoList[index] = updateValue;
        }
    }

    getAll() {
        return this.todoList;
    }

    get(index) {
        if (index >= 0 && index < this.todoList.length) {
            return this.todoList[index];
        }
        return null;
    }

    clear() {
        this.todoList.length = 0;
    }
}

module.exports = Todo;
