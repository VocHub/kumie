<script lang="ts">
  import type { Resource } from '@jet-black/types';

  export let resource: Resource;
  export let href: string;

  export let hovered = false;
</script>

<div
  class="relative aspect-[4/5] h-48 select-none transition-all duration-300 lg:h-80"
  on:mouseenter={() => (hovered = true)}
  on:mouseleave={() => (hovered = false)}>
  <!-- Absolute link -->
  <a {href}>
    <!-- Image -->
    <img
      class="h-full w-full rounded-md object-cover"
      alt="card"
      src={resource.image} />
  </a>

  <!-- Shadow -->
  <div
    class="pointer-events-none absolute inset-0 transition-all duration-500"
    class:shadow-[inset_0px_0px_30px_10px_rgba(0,0,0,0.9)]={hovered} />

  <!-- Secondary resource.title -->

  <div
    class="pointer-events-none absolute bottom-0 flex w-full flex-col
    overflow-hidden bg-gradient-to-t from-black via-black/75 px-2 pt-12">
    <div class="flex h-min justify-between pb-2 text-white ">
      <!-- Main resource.title -->
      <h3 class="line-clamp-2 text-2xl duration-500">
        {resource.title}
      </h3>
    </div>
  </div>
</div>
