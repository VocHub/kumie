<script lang="ts">
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';

  let query = '';
  $: {
    if (browser) goto(`/anime/search/${query}`, { keepFocus: true });
  }
</script>

<form
  class="my-8"
  on:submit|preventDefault={() => {
    goto(`/anime/search/${query}`, { keepFocus: true });
  }}
  action="">
  <label for="filter">Search</label>
  <input
    data-sveltekit-keepfocus={true}
    bind:value={query}
    name="filter"
    type="text"
    class="input input-bordered w-full" />
</form>
<slot />
