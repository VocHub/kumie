<script lang="ts">
  import { page } from '$app/stores';
  import { Link } from '@jet-black/ui';
</script>

<svelte:head>
  <meta name="description" content="Something broke - this is a page error" />

  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content="Jet-Black error page" />
  <meta
    itemprop="description"
    content="Something broke - this is a page error" />
  <meta itemprop="image" content="https://jet-black.xyz/500.jpg" />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content="https://jet-black.xyz" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Jet-Black error page" />
  <meta
    property="og:description"
    content="Something broke - this is a page error" />
  <meta property="og:image" content="https://jet-black.xyz/500.jpg" />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Jet-Black error page" />
  <meta
    name="twitter:description"
    content="Something broke - this is a page error" />
  <meta name="twitter:image" content="https://jet-black.xyz/500.jpg" />
</svelte:head>

<section
  class="flex h-full flex-col items-center justify-center gap-12 text-3xl font-extrabold">
  <h1 class="text-error text-7xl">Error</h1>
  <p class="text-error">I guess shit hit the fan...</p>

  <span class="text-error-content bg-error rounded-md px-4 py-2 text-5xl">
    {$page.status}
  </span>
  <p>Message - <span class="text-secondary"> {$page.error?.message}</span></p>
  <p>
    Could you report this <Link
      class="link text-primary"
      href="https://github.com/Azure-Blade/Jet-Black/issues">here</Link> ? Thanks!
  </p>
</section>
