<script lang="ts">
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import Position from './board/Position.svelte';
  import { Game } from './game/game';
  import { invoke } from '@tauri-apps/api/tauri';

  const game = new Game();
  game.tsumeInitialize();

  const resolve = async () => {
    game.cap;
    game.board;
    const res = await invoke('resolve', {
      blackCap: game.cap[1],
      whiteCap: game.cap[2],
      board: game.board,
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
