<script lang="ts">
  import { getImage } from '../game/image';
  import { createEventDispatcher } from 'svelte';

  export let width: number;
  export let height: number;
  export let koma: number;
  export let owner: number;
  export let count: number;
  export let selectingCap!: GAME.SelectingCap;
  export let reverse: boolean;

  const image = getImage(koma, owner, reverse);
  const dispatch = createEventDispatcher();

  const style =
    `width: ${width}px;` +
    `left: ${width * (koma - 1)}px;` +
    `padding: 0 ${height * 0.1}px;`;

  let imageClass = '';
  if (selectingCap) {
    if (selectingCap.koma === koma && selectingCap.owner === owner) {
      imageClass = 'opacity-50';
    }
  }

  const handleClick = (evt) => {
    evt.stopPropagation;
    dispatch('click', koma);
  };

  const countStyle = `font-size:${height * 0.2}px`;
</script>

{#if count !== 0}
  <div class="absolute z-2" {style} on:click={handleClick}>
    <img src={image} class={imageClass} alt="駒" />
    <span class="absolute cap-count" style={countStyle}>{count}</span>
  </div>
{/if}
