import { Injectable } from '@angular/core';
import { Todo } from './../class/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoDataService {
  lastId=0;
  todos: Todo[] = []
  constructor() { }

  addTodos(todo: Todo): TodoDataService{
    if(!todo.id){
      todo.id = ++this.lastId;
    }
    const todos = this.getAllTodos();
    todos.push(todo);
    return this;
  }

  getAllTodos(): Todo[] {
    const storageItem = JSON.parse(window.localStorage.getItem('app-totdos'));
    if(storageItem === null){
      return [];
    } else{
      return storageItem.todos;
    }
  }
}
