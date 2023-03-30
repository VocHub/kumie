<script lang="ts">
  import type { Tailwindest } from 'tailwindest';
  export let padding:
    | Tailwindest['padding']
    | Tailwindest['paddingX']
    | Tailwindest['paddingY']
    | Tailwindest['paddingTop']
    | Tailwindest['paddingBottom']
    | Tailwindest['paddingLeft']
    | Tailwindest['paddingRight'] = 'p-0';
</script>

<div class={`${padding}`}>
  <slot />
</div>
