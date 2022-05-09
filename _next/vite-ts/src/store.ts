'use strict';

/**
 * Create store concept, with extra action registration from modules
 * and client sandboxing for model/actions/subscriptions allowed
 * for simplicity, no diferentiation event vs command, all actions
*/
export default function createStore<
  TModel extends Object,
  TActions extends {[key:string]:Function}
>(
  initialModel : TModel, userActions : TActions
) {
  const model = initialModel
  const defaultActions = {
    'started' : ()=>{}, // techincally an 'event', past tense, no logic, just trigger subscribers
  }
  const actions = {...defaultActions, ...userActions};
  const subscribers = new Set()


  // optional: action/model history, rollback, forward (redux time travel interface)
  // redux devtools integration: https://youtu.be/nImE4P8Wc_M?t=436
  // type CreateClientArgs = 
  type CreateClientArgs = {
    name:string, 
    submodel?: Partial<typeof model>, 
    allowedActions?: null|string[],
    allowedSubs?: null|string[]
  }; 
  const createClient = function (
    {name, submodel=model, allowedActions=null, allowedSubs=null} : CreateClientArgs
  ) {
    const clientName = name;

    function getModelRO() { 
      return Object.freeze(JSON.parse((JSON.stringify(submodel))))
    }

    // -- instead of dispatch("action",props), we do.action(props), easier for typescript
    const clientActions =  new Proxy( actions, {
      get (actions:TActions, action: string) {
        // TODO: check if action in allowedActions for this client
        // -- this what ends in store.action.xx
        return function (props: Object) {
          console.log(`action received: ${clientName}.${action}`, props);
          if (!(action in actions)) {
            console.error(`ERROR: action '${action}' does not exist,`, 
              (new Error().stack||'').split('\n')[2].replace(/http.?:\/\/[^\/]*/,'').trim()
            );
            return;
          }
          actions[action](props, submodel);
          console.log(`action done: ${clientName}.${action}`, props);
          subscribers.forEach(s=>s({action, props, model:getModelRO()})); // render, update
          
        }
      }
    });

    type SubscriptionListener = (_:{action?:string, props?:object, model?: TModel}) => Function

    function subscribe(listener: SubscriptionListener, actionsSubscribed ?: string[]) {
      // TODO: check actions in allowedSubscribes, if not return
      subscribers.add(listener)
      // unsubscribe
      return ()=>subscribers.delete(listener);
    }

    const storeClient = {
      clientName,
      subscribe,
      do: clientActions,
      // TODO: event : clientEvents, just trigger subscriber without 
      // no getState/getModel needed, just inside subscribers(ro) and actions(rw)
      
      // ael: (qs,evt,act,propsFn={})=> document.querySelector(qs).addEventListener(evt, 
      //   (e)=>storeClient.do[act](typeof propsFn === 'object' ? propsFn : propsFn(e)))

    }

    return storeClient;
  }  // createClient

  return {
    createClient,
    _actions: actions  // debug typecheck
  };
} // createStore




