<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { WHITE, BLACK } from '../game/constant';
  import { getImage } from '../game/image';
  import type { Game } from '../game/game';
  import getUnPromotePiece from '../game/util/getUnPromotePiece';

  export let game: Game;
  export let selectingSquare: number;
  export let squareWidth: number;

  const width = squareWidth * 0.8;

  const dispatch = createEventDispatcher();
  const top = selectingSquare % 9 >= 5 ? 3 : null;
  const bottom = selectingSquare % 9 < 5 ? 3 : null;
  const right = selectingSquare >= 45 ? 3 : null;
  const left = selectingSquare < 45 ? 3 : null;
  let style = ``;
  style += top ? `top:${top}px;` : '';
  style += bottom ? `bottom:${bottom}px;` : '';
  style += right ? `right:${right}px;` : '';
  style += left ? `left:${left}px;` : '';

  const koma = game.board[selectingSquare].koma;

  const piece = getUnPromotePiece(koma);
  const promotePiece = game.getPromotePiece(koma);

  const piece1 = getImage(piece, BLACK);
  const piece2 = getImage(piece, WHITE);
  const piece3 = getImage(promotePiece, BLACK);
  const piece4 = getImage(promotePiece, WHITE);

  const onClick = (promote: boolean, owner: number) => {
    return (evt) => {
      evt.stopPropagation();
      dispatch('pick', { promote, owner });
    };
  };
</script>

<div class="absolute z-50 p-2 bg-white" {style}>
  <img
    src={piece1}
    {width}
    height={width}
    on:click={onClick(false, BLACK)}
    alt="1"
  />
  <img
    src={piece2}
    {width}
    height={width}
    on:click={onClick(false, WHITE)}
    alt="2"
    class="mt-2"
  />
  {#if piece3}
    <img
      src={piece3}
      {width}
      height={width}
      on:click={onClick(true, BLACK)}
      alt="3"
      class="mt-2"
    />
  {/if}
  {#if piece4}
    <img
      src={piece4}
      {width}
      height={width}
      on:click={onClick(true, WHITE)}
      alt="4"
      class="mt-2"
    />
  {/if}
</div>
