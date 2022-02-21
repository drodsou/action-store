import {useStore} from '../../../../createStoreReact';
import _store  from '../../../createStoreExample';

export default function Count2 () {
  const store = useStore(_store);

  return (
    <div>
      <button onClick={()=>store.action.inc()}>
        C2: {store.state.count}
      </button>
    </div>
  );
}