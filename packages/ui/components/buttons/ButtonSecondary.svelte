<script lang="ts">
  export let onClick = () => console.log('Button click not bound');
  export let active = false;
  let _class = '';
  export { _class as class };
</script>

<button
  on:click={onClick}
  class:btn-active={active}
  class={`btn btn-outline btn-rounded btn-accent ${_class}`}>
  <slot />
</button>
