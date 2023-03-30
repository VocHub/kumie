<script lang="ts">
  import type { Tailwindest } from 'tailwindest';

  export let alt = '';
  export let src: string;
  export let href: string;
  export let newTab = false;
  let _class = '';
  export { _class as class };
  export let style: Tailwindest['objectFit'] = 'object-contain';
</script>

<a
  {href}
  target={`${newTab ? '_blank' : ''}`}
  rel={`${newTab ? 'noopener noreferrer' : ''}`}
  class={_class + ' h-12'}>
  <img {src} {alt} class={`h-full w-full ${style}`} />
</a>
