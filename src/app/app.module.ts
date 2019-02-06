import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TodoDataService } from './services/todo-data.service';
import { todoReducer } from './store/todo.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    FormsModule,
    StoreModule.forRoot({
      todos: todoReducer
    }),
    StoreDevtoolsModule.instrument()
  ],
  providers: [TodoDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
