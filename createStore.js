/**
* Minimal vanilla javascript state/actions store (Elm inspired, compatible with Svelte store and React/Preact)
* use the same reactive store no matter the framework you happen to be using
*/
export function createStore(state={}) {

  // -- subscriptions
  const subs = new Set();
  function runSubs (actionName, actionArgs) {
    for (let sub of subs) {
      sub({state: store.state, computed: store.computed, actionName, actionArgs}); 
    }
  }

  function createActionProxy(obj) {
    return new Proxy( obj, {
      get (actionObj, actionName) {
        console.log('get', actionObj, actionName)
        if (typeof actionObj[actionName] === 'object') {
          return createActionProxy(actionObj[actionName]);
        }
        return function (...actionArgs) {
          actionObj[actionName].apply(store, actionArgs);
          runSubs(actionName, actionArgs);
        }
      }
    })
  }


  const store = {
    _subs : subs,         // debug
    _runSubs : runSubs,   // debug

    state: state,
    computed: {},



    //-- we watch actions, not state changes per se, so you're free 
    //-- to make several state changes per action without triggering subscriptions/renders
    //-- also actions are more concise and readable, as state change is straightforward
    action:  createActionProxy({}),

    // svelte compatible for state AND computed, without need for derived stores (!)
    subscribe(fn, runOnSubscribe=true) {
      subs.add(fn);
      if (runOnSubscribe) { fn({state:store.state, computed: store.computed }); } // svelte expects fn to run on subscription by default, to get store value (!)
      return ()=>subs.delete(fn); // unsubscribe
    },
  }

  return store;
}