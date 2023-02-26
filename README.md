# RxS
<p align="center">
  A super simple, type-safe, and blaizngly fast RxJS store.
</p>
<br/>

## Introduction

RxS (Reactive Store) is a super light-weight implementation of a store that implements reactivity through RxJS.

Using RxS, you can create a store with some initial state, react to changes to that state, select specific elements from that state, and then mutate the state or describe re-usable actions. 

## Example

Let's say you have an angular application and a component with some state that you want to react to.

```typescript
import { Component } from '@angular/core';
import { store } from '@ee-tools/rxs';

// Setup some initial state
const initialState = { name: 'Initial Name' };

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
})
export class AppComponent {
  // Create a store using the initial state and an action to change the name
  store = store(initialState, {
    changeName: (state, newName: string) => {
      state.name = newName;

      return state;
    },
  });

  // select the name value from the store as an observable to be used in the application
  name$ = this.store.select('name');

  constructor() {}

  // define a method on the component to trigger an action from the store
  action(): void {
    this.store.dispatch('changeName', 'Ethan');
  }
}

```
