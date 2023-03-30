<script lang="ts">
  import type { PageData } from './$types';
  import { ResourceGrid } from '@jet-black/ui';

  export let data: PageData;
</script>

<section>
  {#if data.resources.length}
    <ResourceGrid resources={data.resources} />
  {:else}
    <p class="text-center text-3xl font-extrabold ">
      Sorry, nothing found for - <span class="text-primary text-4xl"
        >{data.params.query}</span>
    </p>
  {/if}
</section>
