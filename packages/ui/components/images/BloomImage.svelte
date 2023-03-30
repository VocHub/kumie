<script lang="ts">
  export let src: string;
  let _class = '';
  export { _class as class };
</script>

<div class={`relative z-0 h-full w-full ${_class}`}>
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img
    {src}
    draggable="false"
    class="absolute -z-50 h-full w-full object-cover blur-2xl"
    alt="cover image for bloom effect" />
  <!-- svelte-ignore a11y-img-redundant-alt -->
  <img
    draggable="false"
    {src}
    alt="cover image"
    class="h-full w-full rounded-md object-cover" />
</div>
