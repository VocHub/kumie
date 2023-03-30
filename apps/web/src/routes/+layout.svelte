<script lang="ts">
  import '@jet-black/tailwind/styles';

  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  import { theme } from '$lib/stores/theme';

  import type { PageData } from './$types';
  import MobileNav from './MobileNav.svelte';
  import DesktopNav from './DesktopNav.svelte';
  export let data: PageData;

  let mounted = false;

  onMount(() => {
    mounted = true;
    theme.init(data.theme);
  });

  $: {
    if (browser) {
      document.documentElement.setAttribute('data-theme', $theme);
      document.documentElement.classList.value = $theme;
    }
  }
</script>

<div class="bg-base-100 flex h-screen flex-col md:items-center ">
  <header>
    <!-- TODO: Make this into a single component without duplicating things -->
    <MobileNav />
    <DesktopNav />
  </header>

  <main class="flex-1 md:w-3/4">
    <slot />
  </main>
</div>
