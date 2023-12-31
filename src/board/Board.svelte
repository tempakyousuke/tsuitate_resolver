<script lang="ts">
  import type { Game } from "../game/game";
  import Caps from "./Caps.svelte";
  import BoardPiece from "./BoardPiece.svelte";
  import PickupKoma from "./PickupKoma.svelte";
  import { WHITE, BLACK } from "../game/constant";
  import { createEventDispatcher } from "svelte";
  import SquareFill from "./SquareFill.svelte";

  export let game: Game;
  export let className = "";
  export let selectingCap: GAME.SelectingCap | null = null;
  export let selectingSquare: number | null = null;
  export let showPickup = false;
  export let showMovable = false;
  export let fillSquare = false;
  export let reverse = false;

  let capRef: Caps;
  let boardRef: HTMLDivElement;
  let boardWidth: number;
  let boardHeight: number;

  const dispatch = createEventDispatcher();

  $: size = {
    squareWidth,
    squareHeight,
    edgeWidth,
    edgeHeight,
  };

  $: rect = boardRef?.getBoundingClientRect();

  $: edgeWidth = boardWidth * 0.01;
  $: edgeHeight = boardHeight * 0.01;
  $: squareWidth = (boardWidth - edgeWidth * 2) / 9;
  $: squareHeight = (boardHeight - edgeHeight * 2) / 9;
  $: oldSquareWidth = squareWidth ?? 0;
  $: boardPositionX = rect?.left + window.pageXOffset;
  $: boardPositionY =
    rect?.top + window.pageYOffset + squareWidth - oldSquareWidth;

  const onBoardClick = (evt: PointerEvent) => {
    evt.stopPropagation();
    const offsetX = evt.pageX - boardPositionX - edgeWidth;
    const offsetY = evt.pageY - boardPositionY - edgeHeight;

    let column = 0;
    let row = 0;

    for (let i = 0; i < 9; i++) {
      if (i * squareWidth <= offsetX && offsetX < (i + 1) * squareWidth) {
        column = 8 - i;
        break;
      }
    }
    for (let i = 0; i < 9; i++) {
      if (i * squareHeight <= offsetY && offsetY < (i + 1) * squareHeight) {
        row = i;
        break;
      }
    }
    const sq = column * 9 + row;
    if (isNaN(sq)) {
      return;
    }
    const calcSq = reverse ? 80 - sq : sq;
    dispatch("board", calcSq);
  };

  const upperCapProps = {
    owner: reverse ? BLACK : WHITE,
    cap: reverse ? game.cap[BLACK] : game.cap[WHITE],
    selectingCap,
    fillSquare,
    reverse,
    lastHistory: game.lastHistory,
  };

  const underCapProps = {
    owner: reverse ? WHITE : BLACK,
    cap: reverse ? game.cap[WHITE] : game.cap[BLACK],
    selectingCap,
    fillSquare,
    reverse,
    lastHistory: game.lastHistory,
  };
</script>

<div class={className}>
  {#key boardHeight}
    <Caps
      {...upperCapProps}
      {squareHeight}
      {squareWidth}
      bind:ref={capRef}
      on:area
      on:cap
      {reverse}
    />
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      class="relative mx-auto mt-1"
      bind:this={boardRef}
      on:click={onBoardClick}
      bind:clientWidth={boardWidth}
      bind:clientHeight={boardHeight}
    >
      <img
        alt="board"
        src="/img/board/japanese-chess-b03.jpg"
        width={1000}
        height={1000}
      />
      {#each Object.keys(game.board) as sq}
        <BoardPiece
          sq={parseInt(sq)}
          square={game.board[sq]}
          {...size}
          {reverse}
        />
      {/each}
      {#if selectingSquare !== null}
        <SquareFill sq={selectingSquare} {...size} {reverse} />
        {#if showPickup}
          <PickupKoma {squareWidth} {selectingSquare} {game} on:pick />
        {/if}
      {/if}
      {#if showMovable && selectingSquare !== null}
        {#each game.getPieceMovableArea(selectingSquare) as sq}
          <SquareFill {sq} {...size} colorClass="bg-red-500" {reverse} />
        {/each}
      {/if}
      {#if fillSquare && !game.isLastHistoryFaul}
        <SquareFill sq={game.lastHistory.after} {...size} {reverse} />
      {/if}
      {#if fillSquare && game.isLastHistoryFaul && game.lastHistory.before !== 81}
        <SquareFill sq={game.lastHistory.before} {...size} {reverse} />
        <SquareFill
          sq={game.lastHistory.after}
          {...size}
          colorClass="bg-red-500"
          {reverse}
        />
      {/if}
      {#if fillSquare && game.isLastHistoryFaul && game.lastHistory.before === 81}
        <SquareFill
          sq={game.lastHistory.after}
          {...size}
          colorClass="bg-red-500"
          {reverse}
        />
      {/if}
    </div>
    <Caps
      {...underCapProps}
      {squareHeight}
      {squareWidth}
      className="mt-1"
      on:area
      on:cap
      {reverse}
    />
  {/key}
</div>

<style>
  :global(.cap-count) {
    bottom: 0;
    right: 0.2rem;
  }
</style>
