<script lang="ts">
  import { Player_v1, QualitySelect_v1, LinkButton } from '@jet-black/ui';
  import { afterNavigate } from '$app/navigation';
  import { browser } from '$app/environment';

  import type { PageData } from './$types';
  export let data: PageData;

  let selectedStreamUrl: string;
  let selectedQualityIdx: number;

  const defaultStreamQuality = () => {
    selectedQualityIdx = data.sources.findIndex(
      source => source.quality === '1080p'
    );
    if (selectedQualityIdx === -1) selectedQualityIdx = 0;
  };
  afterNavigate(defaultStreamQuality);
  defaultStreamQuality();

  $: selectedStreamUrl = data.sources[selectedQualityIdx].url;

  let nextEpUrl: string | null = null;
  let prevEpUrl: string | null = null;

  let currentEpIndex: number;
  $: {
    currentEpIndex = data.resourceInfo.info.episodes.findIndex(
      ep => ep.id === data.epId
    );
    if (currentEpIndex > 0)
      prevEpUrl = `/anime/content/${data.resourceInfo.info.id}/${
        data.resourceInfo.info.episodes[currentEpIndex - 1].id
      }`;
    else prevEpUrl = null;
    if (currentEpIndex < data.resourceInfo.info.episodes.length - 1)
      nextEpUrl = `/anime/content/${data.resourceInfo.info.id}/${
        data.resourceInfo.info.episodes[currentEpIndex + 1].id
      }`;
    else nextEpUrl = null;
  }

  let currentEpNumber: number;
  $: currentEpNumber = data.resourceInfo.info.episodes[currentEpIndex].number;
</script>

<section class="flex h-full flex-col items-center justify-center gap-y-8">
  <div class=" top-10" />
  <h1 class="text-3xl font-extrabold text-black dark:text-white ">
    <a href={`/anime/content/${data.resourceInfo.info.id}`}>
      {data.resourceInfo.info.title} - EP
    </a>
    <span class="text-primary"> {currentEpNumber}</span>
  </h1>
  <Player_v1
    src={'https://jb-proxy.app.jet-black.xyz/' + selectedStreamUrl}
    {browser} />
  <div class="flex flex-col items-center space-y-4">
    <ul class="flex flex-wrap items-center justify-center gap-4">
      <QualitySelect_v1
        bind:selectedQualityIdx
        qualities={data.sources.map(source => source.quality)} />
    </ul>
  </div>

  <ul class="flex w-full justify-center gap-x-4">
    <li>
      <LinkButton
        class="w-32"
        disabled={prevEpUrl ? false : true}
        replaceState={true}
        href={prevEpUrl ? prevEpUrl : '/'}>
        Previous
      </LinkButton>
    </li>
    <li>
      <LinkButton
        class="w-32"
        disabled={nextEpUrl ? false : true}
        replaceState={true}
        href={nextEpUrl ? nextEpUrl : '/'}>Next</LinkButton>
    </li>
  </ul>
</section>
