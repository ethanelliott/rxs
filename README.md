# RxS

<p align="center">
  A super simple, type-safe, and blazingly fast RxJS store.
</p>
<br/>

![npm (scoped)](https://img.shields.io/npm/v/@ee-tools/rxs?style=for-the-badge)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@ee-tools/rxs?style=for-the-badge)
![Libraries.io dependency status for latest release, scoped npm package](https://img.shields.io/librariesio/release/npm/@ee-tools/rxs?style=for-the-badge)
![npms.io (final)](https://img.shields.io/npms-io/quality-score/@ee-tools/rxs?style=for-the-badge)
![npms.io (final)](https://img.shields.io/npms-io/popularity-score/@ee-tools/rxs?style=for-the-badge)
![NPM](https://img.shields.io/npm/l/@ee-tools/rxs?style=for-the-badge)
![Libraries.io SourceRank](https://img.shields.io/librariesio/sourcerank/npm/@ee-tools/rxs?style=for-the-badge)
![npm](https://img.shields.io/npm/dw/@ee-tools/rxs?style=for-the-badge)
![Dependents (via libraries.io), scoped npm package](https://img.shields.io/librariesio/dependents/npm/@ee-tools/rxs?style=for-the-badge)
![Snyk Vulnerabilities for npm scoped package](https://img.shields.io/snyk/vulnerabilities/npm/@ee-tools/rxs?style=for-the-badge)


## Introduction

RxS (Reactive Store) is a super light-weight implementation of a store that is fully reactive through RxJS.

Using RxS, you can create a store with some initial state, react to changes to that state, select specific elements from that state, and then mutate the state or describe re-usable actions.

## Installation

To install RxS, just run:

```bash
yarn add @ee-tools/rxs
```

or

```bash
npm install @ee-tools/rxs
```

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
  store = createStore(initialState, {
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

## API

### `createStore()`

This method is called with the initial state and any associated actions to mutate the state. Similar to how redux introduces a single object for the entire state application and allows reacting on it, this returned store implements the RxJS Observable, as well as a few helper methods.

**Example**

```typescript
const initialState = { count: 0 };

const store$ = createStore(initialState);

// The store object returned by createStore is also an RxJS Observable, 
// so you can subscribe to changes on the entire store!

store$.subscribe((state) => console.log(state))
```

#### `mutate()` 

This method on the store allows you to directly mutate the entire state. It accepts a method that gives you the current state and expects you to return a new state.

**Example**

```typescript

const store = createStore({count: 0});

store.mutate((state) => {
  state.count++;

  return state;
});
```

#### `select()`

Select will allow you to pick a value from the root store object, and get an observable for all changes to that specific value.

**Example**

```typescript
const store = createStore({count: 0});

const count$ = store.select('count');
//      ^?  Observable<number>
```

#### `dispatch()`

Dispatch allows you to initiate one of the predefined actions against the store. It accepts two arguments; the first is the name of the action, and the second is the optional parameter to provide to your action.

**Example**

In this example we are going to also demonstrate defining the actions to increment and decrement the count.

```typescript
const initialState = {count: 0};

const store = createStore(initialState, {
  increment: (state) => {
    state.count++;

    return state;
  },
  decrement: (state) => {
    state.count--;

    return state;
  },
  setCount: (state, count) => {
    state.count = count;

    return state;
  }
});

// Now that we have all of these actions, we can call them anywhere!

store.dispatch('increment');

store.dispatch('decrement');

store.dispatch('setCount', 100);

```
