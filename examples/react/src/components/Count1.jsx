import {useStore} from '../../../../createStoreReact';
import _store  from '../../../createStoreExample';

globalThis.store = _store;

export default function Count1 () {
  const store = useStore(_store);

  return (
    <>
      <button onClick={()=>store.action.inc()}
        style={{backgroundColor:store.computed.color()}}
      >
        C1: {store.state.count}
      </button>
    </>
  );
}