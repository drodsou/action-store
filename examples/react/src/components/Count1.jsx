import {useStore} from '../../../../createStoreReact';
import _store  from '../../../createStoreExample';

globalThis.store = _store;

export default function Count1 () {
  const store = useStore(_store);

  return (
    <div>
      <button onClick={()=>store.action.inc()}
        style={{color:store.computed.color()}}
      >
        C1: {store.state.count}
      </button>
    </div>
  );
}