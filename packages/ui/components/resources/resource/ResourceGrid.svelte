<script lang="ts">
  import type { Resource } from '@jet-black/types';
  import Card_v1 from '../../cards/Card_v1.svelte';

  export let resources: Resource[];
</script>

<ul class="flex flex-wrap justify-center gap-5">
  {#each resources as resource, i (resource.id)}
    <li>
      <Card_v1 {resource} href={`/anime/content/${resource.id}`} />
    </li>
  {/each}
</ul>
