<script lang="ts">
  export let href: string;
  export let newTab = false;
  let _class = '';
  export { _class as class };
</script>

<a
  {href}
  target={`${newTab ? '_blank' : ''}`}
  rel={`${newTab ? 'noopener noreferrer' : ''}`}
  class={_class}>
  <slot />
</a>
