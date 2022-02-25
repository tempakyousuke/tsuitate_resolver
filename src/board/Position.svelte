<script lang="ts">
  import Board from './Board.svelte';
  import { WHITE } from '../game/constant';
  import type { Game } from '../game/game';
  import { klona } from 'klona';
  import getUnPromotePiece from '../game/util/getUnPromotePiece';

  export let game: Game;
  export let className = '';

  let selectingCap: GAME.SelectingCap | null = null;
  let selectingSquare: number | null = null;

  const onAreaClick = (evt) => {
    const owner = evt.detail;
    if (selectingCap !== null) {
      if (selectingCap.owner !== owner) {
        game.addToCap(selectingCap.koma, owner);
        game.remFromCap(selectingCap.koma, selectingCap.owner);
      }
      selectingCap = null;
      return;
    }
    if (selectingSquare !== null) {
      putPieceToCap(selectingSquare, owner);
    }
  };

  const onCapClick = (evt) => {
    const { koma, owner } = evt.detail;
    if (selectingCap === null) {
      if (selectingSquare !== null) {
        putPieceToCap(selectingSquare, owner);
        return;
      }
      selectingCap = {
        koma,
        owner,
      };
      return;
    }
    if (selectingCap.owner === owner) {
      if (selectingCap.koma === koma) {
        selectingCap = null;
        return;
      }
      selectingCap = {
        koma,
        owner,
      };
    }
  };
  const onBoardClick = (evt) => {
    const sq = evt.detail;
    if (selectingCap) {
      putCapToBoard(sq);
      return;
    }
    if (selectingSquare !== null) {
      if (selectingSquare === sq) {
        selectingSquare = null;
        return;
      }
      if (game.board[sq].owner !== 0) {
        selectingSquare = sq;
      } else {
        changePosition(sq);
      }
      return;
    }
    if (game.board[sq].owner !== 0) {
      selectingSquare = sq;
    }
  };

  const putPieceToCap = (sq: number, owner: number): void => {
    const piece = getUnPromotePiece(game.board[sq].koma);
    game.board[sq] = {
      koma: 0,
      owner: 0,
    };
    game.cap[owner][piece]++;
    selectingSquare = null;
  };

  const putCapToBoard = (sq: number): void => {
    const before = game.board[sq].koma;
    if (before) {
      game.addToCap(before, WHITE);
    }
    game.board[sq] = {
      koma: selectingCap.koma,
      owner: selectingCap.owner,
    };
    game.remFromCap(selectingCap.koma, selectingCap.owner);
    selectingCap = null;
    return;
  };

  const changePosition = (sq: number): void => {
    game.board[sq] = klona(game.board[selectingSquare]);
    game.board[selectingSquare] = {
      koma: 0,
      owner: 0,
    };
    selectingSquare = null;
  };

  const onPickupClick = (evt) => {
    const { promote, owner } = evt.detail;
    const now = game.board[selectingSquare].koma;
    const koma = promote ? game.getPromotePiece(now) : getUnPromotePiece(now);
    game.board[selectingSquare] = {
      koma,
      owner,
    };
    selectingSquare = null;
  };
</script>

{#key selectingCap}
  {#key selectingSquare}
    <Board
      {game}
      {className}
      {selectingCap}
      {selectingSquare}
      showPickup={true}
      on:area={onAreaClick}
      on:cap={onCapClick}
      on:board={onBoardClick}
      on:pick={onPickupClick}
    />
  {/key}
{/key}
