<script lang="ts">
  import { afterNavigate } from '$app/navigation';
  import { onMount } from 'svelte';

  let mounted = false;
  let animate = true;
  onMount(() => {
    mounted = true;
  });

  afterNavigate(({ from }) => (animate = from === null));
</script>

<svelte:head>
  <meta
    name="description"
    content="Jet-Black is a zero compromise platform for watching all of your favorite content media types" />

  <!-- Google / Search Engine Tags -->
  <meta itemprop="name" content="Jet-Black" />
  <meta
    itemprop="description"
    content="Jet-Black is a zero compromise platform for watching all of your favorite content media types" />
  <meta itemprop="image" content="https://jet-black.xyz/logo.jpg" />

  <!-- Facebook Meta Tags -->
  <meta property="og:url" content="https://jet-black.xyz" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Jet-Black" />
  <meta
    property="og:description"
    content="Jet-Black is a zero compromise platform for watching all of your favorite content media types" />
  <meta property="og:image" content="https://jet-black.xyz/logo.jpg" />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Jet-Black" />
  <meta
    name="twitter:description"
    content="Jet-Black is a zero compromise platform for watching all of your favorite content media types" />
  <meta name="twitter:image" content="https://jet-black.xyz/logo.jpg" />
</svelte:head>

<div
  class="relative flex h-full flex-col items-center justify-center space-y-4">
  <h1
    class="text-3xl opacity-100 transition-opacity duration-300"
    class:!opacity-0={!mounted && animate}>
    Welcome to
  </h1>
  <img
    class:!opacity-0={!mounted && animate}
    src="/logo-typography.png"
    class="w-3/4 max-w-2xl object-contain drop-shadow-2xl filter
      delay-500 duration-500 dark:invert md:w-96"
    alt="logo" />
</div>
