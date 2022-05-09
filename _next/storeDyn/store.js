'use strict';

/**
 * Create store concept, with extra action registration from modules
 * and client sandboxing for model/actions/subscriptions allowed
*/
export default function createStore(initialModel={}) {
  const model = initialModel
  const actions = {
    'start' : ()=>{}, // just to trigger all subscribers
  }
  const subscribers = new Set()

  // optional: action/model history, rollback, forward (redux time travel interface)
  // redux devtools integration: https://youtu.be/nImE4P8Wc_M?t=436

  function createClient({clientName, submodel=model, allowedDispatchs=null, allowedSubscriptions=null}) {

    function register(actionName, actionFn) {
      if (actions['actionName']) { return { error: 'action already exists' } }

      actions[actionName] = (payload) => {
        //TODO: try catch, (auth already done in dispatch)
        actionFn({payload, model:submodel}); // submodelCopy will be mutated by action
        // TODO: maybe archive current whole model and action y state history

      }
      // unregister
      return ()=>delete actions['actionName'];
    }

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
      actions[action](payload)
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
      getModel,   // alternate: plain 'model:submodel' obj if more performance needed in trusted scenarios
                  // don't do a getter as destructuring would ruin it
      subscribe,
      register,
      dispatch,
      
    }

    return storeClient;
  }  // createClient

  return {
    createClient
  };
} // createStore




