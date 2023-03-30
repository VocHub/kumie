<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import Layout from '$lib/layouts/base/Layout.svelte';
  import Router from './Router.svelte';
  $: {
    document.documentElement.setAttribute('data-theme', $theme);
    document.documentElement.classList.value = $theme;
  }
</script>

<Layout>
  <Router />
</Layout>
