import { Component } from '@angular/core';
import { Todo } from './class/todo';
import { TodoDataService } from './services/todo-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {  
  newTodo: Todo = new Todo();
  constructor(private todoService: TodoDataService){

  }
  get todos () { 
    return this.todoService.getAllTodos();
  }
  addTodo(){
    
    if(this.newTodo.title && this.newTodo.date){
      this.todoService.addTodos(this.newTodo);
      console.log(this.newTodo);
      this.newTodo = new Todo();
      this.newTodo.title = '';
      this.newTodo.date = '';  
    }
  }

  completeTodo(todo){
    this.todoService.completeTodo(todo);
  }
  deleteTodo(todo){
    this.todoService.deleteTodoById(todo.id);
  }
}
