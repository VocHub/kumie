<script lang="ts">
  export let href: string;
  export let active = false;
  export let newTab = false;
  export let disabled = false;
  export let replaceState = false;
  let _class = '';
  export { _class as class };
</script>

<!-- TODO: Replace state is not working -->
<!-- data-sveltekit-replacestate={replaceState ? true : null} -->
<a
  {href}
  data-sveltekit-replacestate={replaceState ? true : null}
  target={newTab ? '_blank' : null}
  class={`${_class} btn btn-outline`}
  class:btn-disabled={disabled}
  class:btn-active={active}>
  <slot />
</a>
