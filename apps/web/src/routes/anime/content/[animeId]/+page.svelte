<script lang="ts">
  import { Button, BloomImage, ResourceContentGrid } from '@jet-black/ui';
  import type { PageData } from './$types';

  export let data: PageData;

  export let subSection: 'content' | 'wiki' | 'comments' = 'content';
</script>

<section class="my-4 flex h-full flex-col items-center justify-center gap-4 ">
  <h1 class="text-center text-3xl font-bold text-black dark:text-white">
    {data.resourceInfo.info.title}
  </h1>
  <BloomImage
    class="!h-96 !w-auto md:!h-[32rem]"
    src={data.resourceInfo.info.image} />
  <div class="btn-group ">
    <Button class="btn-sm md:btn-md" active={subSection === 'content'}
      >Episodes</Button>
    <Button
      class="btn-sm md:btn-md"
      disabled={true}
      active={subSection === 'comments'}>Comments</Button>
    <Button
      class="btn-sm md:btn-md"
      disabled={true}
      active={subSection === 'wiki'}>Wiki</Button>
  </div>
  <section class="max-w-xs md:max-w-md ">
    {#if subSection === 'content'}
      <ResourceContentGrid
        content={data.resourceInfo.info.episodes}
        linkPrefix={`/anime/content/${data.resourceInfo.info.id}`} />
    {:else if subSection === 'comments'}
      <!-- TODO -->
      <h2>Disabled</h2>
    {:else}
      <!-- TODO -->
      <h2>Disabled</h2>
    {/if}
  </section>
</section>
