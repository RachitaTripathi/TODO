import { Component, OnInit } from '@angular/core';
import { Todo } from './class/todo';
import { TodoDataService } from './services/todo-data.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppState } from './store/app.states';
import { Store } from '@ngrx/store';
import * as TodoActions from './store/todo.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{  
  todos$: Observable<Todo[]>
  getTodos = [];
  newTodo: Todo = new Todo();
  editForm: FormGroup;
  todo: any;
  titleValue: string;
  dateValue: string;
  isEdited = false;

  constructor(
    private todoService: TodoDataService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private store: Store<AppState>
    ){
        this.todos$ = this.store.select('todos');
  }
  get todos () { 
    //return this.todoService.getAllTodos();
    return this.todos$;
  }

  ngOnInit() {
    this.getTodos = this.todoService.getAllTodos();
    this.getTodos.forEach(todo =>
      {
        this.store.dispatch(new TodoActions.LoadTodo(todo))
      });
  }

  addTodo(){
    
    if(this.newTodo.title && this.newTodo.date){  
      this.store.dispatch(new TodoActions.AddTodo(this.newTodo));
      this.todoService.addTodos(this.newTodo);
      console.log(this.newTodo);
      this.newTodo = new Todo();
      this.newTodo.title = '';
      this.newTodo.date = '';  
    }
  }

  completeTodo(todo){
    this.todoService.completeTodo(todo);
    this.store.dispatch(new TodoActions.ToggleTodo(todo));
  }
  deleteTodo(todo){
    this.todoService.deleteTodoById(todo.id);
    this.store.dispatch(new TodoActions.DeleteTodo({ id: todo.id }));
  }
  initForm(todo){
    if(todo.date.year && todo.date.month){
      this.editForm = this.fb.group({
        title: [`${todo.title}`, Validators.required],
        date: [`${todo.date.year}-${todo.date.month}-${todo.date.day}`, Validators.required]
      });
    }
    
    if(todo.date && !todo.date.month){
      this.editForm = this.fb.group({
        title: [`${todo.title}`, Validators.required],
        date: [`${todo.date}`, Validators.required]
      });
    }
  }
  open(content, todo){
    console.log(todo);
    this.isEdited = false;
    this.initForm(todo);
    this.todo = {
      id: todo.id,
      title: todo.title,
      date: todo.date,
      complete: todo.complete
    };
    if(todo.date.year && todo.date.month){
      this.titleValue = `${todo.title}`;
      this.dateValue = `${todo.date.year}-${todo.date.month}-${todo.date.day}`;
    }
    if(todo.date && !todo.date.month){
      this.titleValue = `${todo.title}`;
      this.dateValue = `${todo.date}`;
    }
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }

  updateTodo(){
    this.todoService.updateTodo(this.todo.id, this.editForm.value);
    const updatedTodo = {
      id: this.todo.id,
      title: this.editForm.value.title,
      date: this.editForm.value.date,
      complete: false
    };
    this.store.dispatch(new TodoActions.UpdateTodo({
      id: this.todo.id, 
      newTodo: updatedTodo}));
    this.isEdited = true; 
    setTimeout(() => {
      this.modalService.dismissAll();
    }, 3000);   
  }
}
