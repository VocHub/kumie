<script lang="ts">
  import Fa from 'svelte-fa';
  import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

  export let icon: IconDefinition;
  export let href: string;
  export let newTab = false;
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

<a
  {href}
  target={`${newTab ? '_blank' : ''}`}
  rel={`${newTab ? 'noopener noreferrer' : ''}`}
  class={_class}>
  <Fa {icon} {size} />
</a>
