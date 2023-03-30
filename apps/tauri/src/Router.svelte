<script lang="ts">
  import Router from 'svelte-spa-router';
  import Index from '$routes/Index.svelte';
  import Versions from '$routes/Versions.svelte';

  const routes = {
    '/': Index,
    '/versions': Versions
  };
</script>

<Router {routes} />
