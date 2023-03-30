<script lang="ts">
  import 'vidstack/styles/base.css';
  import 'vidstack/styles/ui/buttons.css';
  import 'vidstack/styles/ui/sliders.css';

  export let browser: boolean;
  onMount(() => browser && import('vidstack/define/media-player.js'));

  import type { MediaPlayerElement } from 'vidstack';
  import { onMount } from 'svelte';
  let player: MediaPlayerElement;

  export let src: string;
</script>

<div class="relative aspect-[16/9] w-4/5 md:w-3/5">
  <!-- svelte-ignore a11y-autofocus -->
  <media-player
    {src}
    controls
    autoplay
    autofocus
    aspect-ratio="16/9"
    class="w-full object-contain"
    bind:this={player}>
    <media-outlet />
  </media-player>
</div>
