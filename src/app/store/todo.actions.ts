import { Action } from '@ngrx/store';
import { Todo } from './../class/todo';

export const ActionTypes = {
    ADD_TODO: 'ADD_TODO' ,  
    UPDATE_TODO: 'UPDATE_TODO' ,
    TOGGLE_TODO: 'TOGGLE_TODO' ,
    DELETE_TODO: 'DELETE_TODO' ,
    LOAD_TODO: 'LOAD_TODO'
};

export class AddTodo implements Action{
    readonly type = ActionTypes.ADD_TODO;

    constructor(public payload: any) {}
}

export class UpdateTodo implements Action{
    readonly type = ActionTypes.UPDATE_TODO;

    constructor(public payload: { id: number;newTodo: Todo}) {}
}

export class ToggleTodo implements Action{
    readonly type = ActionTypes.TOGGLE_TODO;

    constructor(public payload: Todo) {}
}

export class DeleteTodo implements Action{
    readonly type = ActionTypes.DELETE_TODO;

    constructor(public payload: { id: number }) {}
}

export class LoadTodo implements Action{
    readonly type = ActionTypes.LOAD_TODO;

    constructor(public payload: any = null) {}
}
export type TodoActions = AddTodo | UpdateTodo | ToggleTodo;
