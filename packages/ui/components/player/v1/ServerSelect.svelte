<script lang="ts">
  import type { VideoServers } from '@jet-black/types';
  import Button from '../../buttons/Button.svelte';

  export let servers: VideoServers[];
  export let selectedServerIdx = 0; // <- Bind to this
</script>

{#each servers as { name }, i (name)}
  <li>
    <Button
      onClick={() => (selectedServerIdx = i)}
      active={selectedServerIdx === i}
      class="btn-sm">
      {name}
    </Button>
  </li>
{/each}
