<script lang="ts">
  import { getImage } from '../game/image';
  export let sq: number;
  export let squareWidth: number;
  export let squareHeight: number;
  export let square: GAME.Square;
  export let edgeHeight: number;
  export let edgeWidth: number;
  export let reverse: boolean;

  const calcSq = reverse ? 80 - sq : sq;
  const row = calcSq % 9;
  const column = Math.floor(calcSq / 9);
  const top = squareHeight * row + edgeHeight;
  const left = squareWidth * (8 - column) + edgeWidth;
  const style =
    `top:${top}px;` +
    `left:${left}px;` +
    `width:${squareWidth}px;` +
    `height:${squareHeight}px` +
    `padding:2px ${squareHeight * 0.05}px`;
  const { koma, owner } = square;
  const image = getImage(koma, owner, reverse);
</script>

{#if koma}
  <div class="absolute z-20" {style}>
    <img src={image} width={100} height={100} alt="駒" />
  </div>
{/if}
