<script lang="ts">
  import { page } from '$app/stores';
  import { LinkButton } from '@jet-black/ui';
</script>

<svelte:head>
  <meta
    name="description"
    content="Browser and search the anime category of Jet-Black" />

  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content="Anime" />
  <meta
    itemprop="description"
    content="Browser and search the anime category of Jet-Black" />
  <meta itemprop="image" content="/anime.jpg" />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content="https://jet-black.xyz" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Jet-Black" />
  <meta
    property="og:description"
    content="Browser and search the anime category of Jet-Black" />
  <meta property="og:image" content="https://jet-black.xyz/anime.jpg" />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Jet-Black" />
  <meta
    name="twitter:description"
    content="Browser and search the anime category of Jet-Black" />
  <meta name="twitter:image" content="https://jet-black.xyz/anime.jpg" />
</svelte:head>

<nav class="my-8 mx-auto flex max-w-max flex-wrap justify-center gap-4">
  <LinkButton
    href="/anime/latest"
    replaceState={true}
    active={$page.url.pathname === '/anime/latest'}
    class="btn-sm w-24">Latest</LinkButton>
  <LinkButton
    href="/anime/trending"
    replaceState={true}
    active={$page.url.pathname === '/anime/trending'}
    class="btn-sm w-24">Trending</LinkButton>
  <LinkButton
    href="/anime/search"
    replaceState={true}
    active={$page.url.pathname.includes('/anime/search')}
    class="btn-sm w-24">Search</LinkButton>
  <LinkButton
    href="/anime/subscriptions"
    replaceState={true}
    active={$page.url.pathname === '/anime/subscriptions'}
    class="btn-sm w-24"
    disabled={true}>Subscription</LinkButton>
  <LinkButton
    href="/anime/favorites"
    replaceState={true}
    active={$page.url.pathname === '/anime/favorites'}
    class="btn-sm w-24"
    disabled={true}>Favorites</LinkButton>
</nav>
<slot />
