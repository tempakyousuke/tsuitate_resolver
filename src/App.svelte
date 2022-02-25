<script lang="ts">
  import { SvelteToast } from '@zerodevx/svelte-toast';
  import Position from './board/Position.svelte';
  import { Game } from './game/game';

  const game = new Game();
  game.tsumeInitialize();
</script>

<main>
  <button>配置設定</button>
  <Position {game} />
</main>

<SvelteToast />
