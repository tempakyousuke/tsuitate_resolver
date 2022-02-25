<script lang="ts">
  import Board from './Board.svelte';
  import { NONE } from '../game/constant';
  import type { Game } from '../game/game';
  import HistoryController from './HistoryController.svelte';
  import { toast } from '../modules/toast';
  import PromoteModal from './game/PromoteModal.svelte';
  import History from './History.svelte';

  export let game: Game;
  export let className = '';

  let selectingCap: GAME.SelectingCap | null = null;
  let selectingSquare: number | null = null;
  let openPromote = false;
  let holdSq = 81;
  let updateKey = 1;

  const onCapClick = (evt) => {
    const { koma, owner } = evt.detail;
    if (game.turn !== owner) {
      return;
    }
    if (selectingCap) {
      // もう選択済みなら選択キャンセル
      if (selectingCap.koma === koma) {
        selectingCap = null;
        return;
      }
      selectingCap.koma = koma;
      return;
    }
    selectingSquare = null;
    selectingCap = { koma, owner };
  };
  const onBoardClick = (evt) => {
    const sq = evt.detail;
    if (selectingCap) {
      // 持ち駒を選択している場合
      capToBoard(sq);
    } else {
      // 持ち駒を選択していない場合
      if (selectingSquare !== null) {
        if (selectingSquare === sq) {
          selectingSquare = null;
          return;
        }
        if (game.board[selectingSquare].owner === game.board[sq].owner) {
          selectingSquare = sq;
          return;
        }
        boardToBoard(sq);
      } else {
        const owner = game.board[sq].owner;
        if (game.turn === owner) {
          selectingSquare = sq;
        }
      }
    }
  };

  const capToBoard = (sq: number) => {
    if (!game.isPutable(sq, game.turn, selectingCap.koma)) {
      // 桂馬を一段目に打とうとした場合などキャンセル
      return;
    }
    // 駒がもうそこにある場合
    if (game.board[sq].koma !== NONE) {
      // 駒の選択状態を持ち駒から盤上の駒に変更
      if (game.turn === game.board[sq].owner) {
        selectingSquare = sq;
        selectingCap = null;
      } else {
        // 反則を記入
        const his = {
          koma: selectingCap.koma,
          before: 81,
          after: sq,
          is_promote: false,
          is_faul: true,
          get: NONE,
          checking: false,
        };
        game.addHistory(his);
        selectingCap = null;
        selectingSquare = null;
        toast.info('反則を記録しました');
      }
      return;
    }
    // 駒を設置
    if (!game.putFromCap(selectingCap.koma, sq)) {
      toast.info('反則を記録しました');
      selectingCap = null;
      return;
    }
    selectingCap = null;
  };

  const boardToBoard = (sq: number) => {
    // 移動できる場所をクリックした場合
    if (game.isMovable(selectingSquare, sq)) {
      if (game.isPromotable(selectingSquare, sq)) {
        if (game.mustPromote(selectingSquare, sq)) {
          if (game.putFromBoard(selectingSquare, sq, true)) {
            toast.info('反則を記録しました');
          }
          selectingSquare = null;
        } else {
          openPromote = true;
          holdSq = sq;
          return;
        }
      } else {
        if (game.putFromBoard(selectingSquare, sq, false)) {
          toast.info('反則を記録しました');
        }
        selectingSquare = null;
      }
    }
  };

  const promote = (evt) => {
    const isPromote = evt.detail;
    if (game.putFromBoard(selectingSquare, holdSq, isPromote)) {
      toast.info('反則を記録しました');
    }
    openPromote = false;
    selectingSquare = null;
  };
  const cancelPromote = () => {
    selectingSquare = null;
    openPromote = false;
  };

  const historyGo = () => {
    game.historyGo();
    selectingCap = null;
    selectingSquare = null;
    updateKey++;
  };

  const historyBack = () => {
    game.historyBack();
    selectingCap = null;
    selectingSquare = null;
    updateKey++;
  };
</script>

{#key updateKey}
  {#key selectingCap}
    {#key selectingSquare}
      <Board
        {game}
        {className}
        {selectingCap}
        {selectingSquare}
        fillSquare={true}
        showMovable={true}
        on:cap={onCapClick}
        on:board={onBoardClick}
      />
      <PromoteModal
        bind:open={openPromote}
        on:promote={promote}
        on:cancel={cancelPromote}
      />
    {/key}
  {/key}
{/key}
<HistoryController on:go={historyGo} on:back={historyBack} className="mt-10" />
{#key selectingCap}
  {#key selectingSquare}
    <div class="mt-5">
      手数:{game.turnCount}
      反則数:{game.faulCount}
    </div>
  {/key}
{/key}
{#key updateKey}
  {#key selectingCap}
    {#key selectingSquare}
      <History
        histories={game.historyTexts}
        comment={[]}
        turnNumber={game.turn_number}
        className="mt-10"
      />
    {/key}
  {/key}
{/key}
