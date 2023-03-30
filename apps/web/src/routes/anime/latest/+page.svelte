<script lang="ts">
  import { ResourceGrid } from '@jet-black/ui';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<ResourceGrid resources={data.resources} />
