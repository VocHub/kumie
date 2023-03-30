<script lang="ts">
  import 'github-markdown-css';
  import type { PageData } from './$types';
  import SvelteMarkdown from 'svelte-markdown';
  export let data: PageData;
</script>

<article class="markdown-body !bg-base-100 rounded-md p-4">
  <SvelteMarkdown source={data.changelog} />
</article>

<style lang="postcss">
  article :global(li)::before {
    content: '• ';
    @apply text-2xl;
  }
  /* your styles go here */
</style>
