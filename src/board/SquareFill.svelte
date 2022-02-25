<script lang="ts">
	export let sq: number;
	export let squareHeight: number;
	export let squareWidth: number;
	export let edgeHeight: number;
	export let edgeWidth: number;
	export let colorClass = 'bg-lime-500';
	export let reverse = false;

	const calcSq = reverse ? 80 - sq : sq;
	const row = calcSq % 9;
	const column = Math.floor(calcSq / 9);
	const top = squareHeight * row + edgeHeight;
	const left = squareWidth * (8 - column) + edgeWidth;
	const style =
		`width:${squareWidth}px;` + `height:${squareHeight}px;` + `top:${top}px;` + `left:${left}px;`;
</script>

{#if 0 < calcSq && calcSq < 81}
	<div class="absolute z-10 opacity-50 {colorClass}" {style} />
{/if}
