<script lang="ts">
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import Position from './board/Position.svelte';
  import { Game } from './game/game';
  import { invoke } from '@tauri-apps/api/tauri';

  const game = new Game();
  game.tsumeInitialize();

  const resolve = async () => {
    const res = await invoke('resolve', {
      blackCap: game.rustInputBlackCap,
      whiteCap: game.rustInputWhiteCap,
      board: game.rustInputBoard,
    });
    console.log(res);
  };
</script>

<main>
  <button>配置設定</button>
  <button on:click={resolve}>解く</button>
  <div class="max-w-lg">
    <Position {game} />
  </div>
</main>

<SvelteToast />
