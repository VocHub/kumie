<script lang="ts">
  export let src: string | null = null;
</script>

<header
  class="flex h-64 items-center justify-center text-center text-3xl font-extrabold">
  <!-- Large cover -->
  {#if src}
    <img {src} alt="resource cover" />
  {/if}
  <!-- <img src="" alt=""> -->
</header>
