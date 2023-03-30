<script lang="ts">
  const bases = ['bg-base-100', 'bg-base-200', 'bg-base-300'];
</script>

<div class="flex flex-col gap-8">
  {#each bases as base}
    <div class={`${base} text-base-content border-primary rounded-md p-10`}>
      <slot />
    </div>
  {/each}
</div>
