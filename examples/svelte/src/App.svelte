<script>
    // -- pages
  import Index from './pages/Index.svelte';
  import About from './pages/About.svelte';
  const pages = { Index, About };

  function HashPage() {
    let newPage = window.location.hash.replace('#','') || 'Index';
    return pages[newPage];
  }

  let Page = HashPage();
  window.addEventListener('hashchange', ()=> Page = HashPage());
</script>

<nav>
  {#each Object.keys(pages) as page}
    <a href={'#' + page}>{page}</a>
  {/each}
</nav>

<svelte:component this={Page}/>
