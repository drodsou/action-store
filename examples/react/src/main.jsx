import React from 'react'
import ReactDOM from 'react-dom'
import './main.css'

// -- pages
import Index from './pages/Index';
import About from './pages/About';
const pages = { Index, About };

function HashPage() {
  let newPage = window.location.hash.replace('#','') || 'Index';
  // console.log('newPage', pages[newPage]);
  return (pages[newPage] || ( ()=><div>404 Not found page: {newPage}</div>) )
}


function Main () {
  const [Page, setPage] = React.useState(HashPage); // useState executes HashPage() on call... (?)

  React.useEffect(()=>{
    window.addEventListener('hashchange', ()=> setPage(HashPage));
  },[]);

  return (
    <>
      <nav>{Object.keys(pages).map((e,i)=><a key={i} href={'#'+e}>{e}</a>)}</nav>
      <Page />
    </>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
)
