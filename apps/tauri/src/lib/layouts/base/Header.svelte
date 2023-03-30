<script lang="ts">
  import { ThemeToggle, Link, LinkIcon, ButtonIcon } from '@jet-black/ui';

  import { faXmark, faWindowMinimize } from '@fortawesome/free-solid-svg-icons';
  import { faGithub } from '@fortawesome/free-brands-svg-icons';
  import { appWindow } from '@tauri-apps/api/window';
  import { theme } from '$lib/stores/theme';
  import LinkImg from '@jet-black/ui/components/links/LinkImg.svelte';
</script>

<div
  data-tauri-drag-region
  class="bg-base-200 flex h-12 items-center justify-between px-2 shadow-lg">
  <LinkImg src={'/logo.png'} href="/#" class="w-12 py-1 dark:invert" />

  <nav>
    <ul class="flex gap-x-4 text-lg font-bold">
      <li>
        <Link href={'#/'}>Home</Link>
      </li>
      <li>
        <Link href={'#/versions'}>Versions</Link>
      </li>
    </ul>
  </nav>

  <div class="flex h-full gap-x-2">
    <button on:click={theme.toggleTheme}>
      <ThemeToggle theme={$theme} />
    </button>
    <LinkIcon
      newTab={true}
      class="self-center"
      size={'lg'}
      href="https://github.com/azure-blade/jet-black"
      icon={faGithub} />
    <ButtonIcon icon={faWindowMinimize} onClick={appWindow.minimize} />
    <ButtonIcon icon={faXmark} onClick={appWindow.close} />
  </div>
</div>
