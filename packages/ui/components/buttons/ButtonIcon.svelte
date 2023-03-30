<script lang="ts">
  import Fa from 'svelte-fa';
  import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

  export let icon: IconDefinition;
  export let onClick = () => console.log('Button unbound');

  export let disabled = false;
  export let active = false;

  let _class = '';
  export { _class as class };

  export let size:
    | 'xs'
    | 'sm'
    | 'lg'
    | '1x'
    | '2x'
    | '3x'
    | '4x'
    | '5x'
    | '6x'
    | '7x'
    | '8x'
    | '9x'
    | '10x'
    | `${number}x` = 'lg';
</script>

<button
  on:click={onClick}
  class:btn-disabled={disabled}
  class:btn-active={active}
  class={_class}>
  <Fa {icon} {size} />
</button>
