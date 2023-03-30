<script lang="ts">
  import type { Tailwindest } from 'tailwindest';
  export let margin:
    | Tailwindest['margin']
    | Tailwindest['marginX']
    | Tailwindest['marginY']
    | Tailwindest['marginTop']
    | Tailwindest['marginBottom']
    | Tailwindest['marginLeft']
    | Tailwindest['marginRight'] = 'm-0';
</script>

<div class={`${margin}`}>
  <slot />
</div>
