<script>
  import { theme } from '$lib/stores/theme';
  import { ThemeToggle, Link } from '@jet-black/ui';
</script>

<div
  class="bg-base-200 md:h-18 flex h-16 items-center justify-between px-2 shadow-lg delay-1000 duration-500 md:hidden lg:h-14">
  <div class="h-full ">
    <a href="/" class="block h-full py-2">
      <img src="/favicon-dark.png" alt="logo" class="h-full dark:invert " />
    </a>
  </div>

  <nav>
    <ul class="flex gap-x-4 text-xl">
      <li>
        <Link class="link link-hover " href="/anime">Anime</Link>
      </li>
      <li>
        <Link class="btn-disabled" href="/manga">Manga</Link>
      </li>
      <li>
        <Link class="btn-disabled" href="/fiction">Fiction</Link>
      </li>
    </ul>
  </nav>
  <div class="flex items-center space-x-4">
    <button on:click={theme.toggleTheme} class="grid">
      <ThemeToggle theme={$theme} />
    </button>
  </div>
</div>
