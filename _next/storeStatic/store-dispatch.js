'use strict';

/**
 * Create store concept, with extra action registration from modules
 * and client sandboxing for model/actions/subscriptions allowed
*/
export default function createStore(initialModel={}, userActions) {
  const model = initialModel
  const defaultActions = {
    'start' : ()=>{}, // just to trigger all subscribers
  }
  const actions = {...defaultActions, ...userActions};
  const subscribers = new Set()

  Object.entries(actions).forEach(([actionName,actionFn])=>{
    actions[actionName] = ({payload,model}) =>{

    }
  });

  // optional: action/model history, rollback, forward (redux time travel interface)
  // redux devtools integration: https://youtu.be/nImE4P8Wc_M?t=436

  function createClient({clientName, submodel=model, allowedDispatchs=null, allowedSubscriptions=null}) {

    const userActions =  new Proxy( actions, {
      get (actionObj, actionName) {
        return function (...actionArgs) {
          actionObj[actionName].apply(store, actionArgs);
          runSubs(actionName, actionArgs);
        }
      }
    });


    function subscribe(listener, actions=null) {
      // TODO: check actions in allowedSubscribes, if not return
      subscribers.add((action,payload)=>{
        // TODO: if not action in actions, rturn
        listener({action,payload,model:getModel()})
      })
      // unsubscribe
      return ()=>subscribers.delete(listener);
    }

    function dispatch(action, payload={}) {
      // TODO: check if action in allowedDispatchs
      // TODO: store current state
      // TODO: action or event
      console.log(`action received: ${clientName}.${action}`, payload);
      if (!actions[action]) { return {error: 'unknown action'} }
      actions[action]({payload, model:submodel})
      console.log(`action done: ${clientName}.${action}`, payload);
      subscribers.forEach(s=>s(action, payload)); // render, update
    }

    function getModel() { 
      return Object.freeze(JSON.parse((JSON.stringify(submodel))))
    }

    // extra syntax sugar
    // TODO: allowedDispatch
    // Object.keys(actions).forEach
    // let send = {}

    const storeClient = {
      clientName,
      subscribe,
      dispatch,
      _actions: actions
    }

    return storeClient;
  }  // createClient

  return {
    createClient,
    _actions: actions
  };
} // createStore




