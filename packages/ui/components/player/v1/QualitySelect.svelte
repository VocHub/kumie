<script lang="ts">
  import ButtonAccent from '../../buttons/ButtonAccent.svelte';

  export let qualities: string[];

  export let selectedQualityIdx = 0; // <- Bind to this
</script>

{#each qualities as quality, i}
  <li>
    <ButtonAccent
      active={selectedQualityIdx === i}
      onClick={() => (selectedQualityIdx = i)}
      class="btn-sm">
      {quality}
    </ButtonAccent>
  </li>
{/each}
