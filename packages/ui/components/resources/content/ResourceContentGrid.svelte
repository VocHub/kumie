<script lang="ts">
  import Fa from 'svelte-fa';
  import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
  import type { ResourceContent } from '@jet-black/types';

  export let reverseOrder = false;
  export let linkPrefix: string;
  export let content: ResourceContent[];

  export let filter = '';
  let contentOrdered = [...content];
  let contentReversed = [...content].reverse();

  // TODO: Move this filtering into util file
  // TODO: Filter using fuzzy search instead of regex since it doesn't always work
  $: {
    if (filter) {
      const reg = new RegExp(`${filter}`);
      contentOrdered = content.filter(
        rc => rc.number.toString().search(reg) !== -1
      );
      contentReversed = [...contentOrdered].reverse();
    } else {
      contentOrdered = [...content];
      contentReversed = [...content].reverse();
    }
  }
</script>

<div class="flex items-center justify-center gap-x-8">
  <button
    class="transition-all duration-500 "
    class:rotate-180={reverseOrder}
    on:click={() => (reverseOrder = !reverseOrder)}>
    <Fa icon={faArrowDown} size="2x" />
  </button>
  <div class="form-control ">
    <div class="input-group">
      <input
        bind:value={filter}
        type="number"
        placeholder="Filter…"
        class="input input-bordered input-sm " />
    </div>
  </div>
</div>

<ul class="flex w-full flex-wrap justify-center gap-4 pt-4">
  {#each reverseOrder ? contentOrdered : contentReversed as { id, number }, i (id)}
    <li>
      <a
        href={`${linkPrefix}/${id}`}
        class="display bg-base-300 link link-hover hover:link-primary 
                flex h-10 w-16 items-center justify-center rounded-md text-center transition-all duration-500 
                hover:scale-125 md:h-8 md:w-12">
        {number}
      </a>
    </li>
  {:else}
    <p>
      Sorry... no results for filter: <span class="text-primary">
        {filter}</span>
    </p>
  {/each}
</ul>
