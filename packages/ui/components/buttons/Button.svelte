<script lang="ts">
  export let onClick = () => console.log('Button click not bound');
  export let disabled = false;
  export let active = false;
  let _class = '';
  export { _class as class };
</script>

<button
  on:click={onClick}
  class:btn-disabled={disabled}
  class:btn-active={active}
  class={_class}>
  <slot />
</button>
