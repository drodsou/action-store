import {useStore} from '../../../../createStoreReact';
import _store  from '../../../createStoreExample';

export default function Count2 () {
  const store = useStore(_store);

  return (
    <>
      <button onClick={()=>store.action.inc()}
        style={{backgroundColor:store.computed.color('orange','teal')}}
      >
        C2: {store.state.count}
      </button>
    </>
  );
}