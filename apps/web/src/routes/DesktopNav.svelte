<script lang="ts">
  import { theme } from '$lib/stores/theme';
  import { faGithub } from '@fortawesome/free-brands-svg-icons';
  import { LinkIcon, LinkImg, Link, ThemeToggle } from '@jet-black/ui';
</script>

<nav
  class="fixed bottom-0 left-12 z-50 hidden flex-col items-center gap-y-4 text-3xl 
     font-extrabold text-black dark:text-white md:flex ">
  <Link
    class="hover:text-primary px-2 py-1 hover:scale-150"
    href="/anime/latest">A</Link>
  <Link
    class="hover:text-primary btn-disabled px-2 py-1 hover:scale-150"
    href="/manga/latest">M</Link>
  <Link
    class="hover:text-primary btn-disabled px-2 py-1 hover:scale-150"
    href="/fiction/latest">F</Link>
  <div class="bg-base-content/70 h-20 w-[1px] rounded-t-md" />
</nav>

<div
  class="fixed bottom-0 right-12 z-50 hidden flex-col items-center space-y-4
     text-black dark:text-white md:flex">
  <LinkImg
    href={'/'}
    src={$theme === 'dark' ? '/favicon-light.png' : '/favicon-dark.png'} />
  <LinkIcon
    href={'https://github.com/Azure-Blade/Jet-Black'}
    newTab={true}
    icon={faGithub}
    size="2x" />
  <ThemeToggle onClick={theme.toggleTheme} theme={$theme} />
  <div class="bg-base-content/70 h-20 w-[1px] rounded-t-md" />
</div>
