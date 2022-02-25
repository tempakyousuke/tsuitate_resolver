<script lang="ts">
	import Cap from './Cap.svelte';
	import { createEventDispatcher } from 'svelte';
	import CapFill from './CapFill.svelte';

	export let owner: number;
	export let cap: GAME.Cap;
	export let selectingCap: GAME.SelectingCap | null = null;
	export let squareWidth: number;
	export let squareHeight: number;
	export let className = '';
	export let ref: any = null;
	export let fillSquare = false;
	export let lastHistory: any;
	export let reverse: boolean;

	const dispatch = createEventDispatcher();

	const handleAreaClick = (evt) => {
		evt.stopPropagation();
		dispatch('area', owner);
	};

	const handleCapClick = (evt) => {
		dispatch('cap', {
			koma: evt.detail,
			owner: owner
		});
	};

	const style = `height:${squareWidth}px;`;
</script>

<div class="relative mx-auto overflow-hidden cap {className}" on:click={handleAreaClick} {style}>
	<img class="absolute" alt="cap" src="/img/board/japanese-chess-bg.jpg" />
	<div class="relative z-10 w-11/12 h-full mx-auto top-1" bind:this={ref}>
		{#each Object.keys(cap) as koma}
			<Cap
				count={cap[koma]}
				{owner}
				koma={parseInt(koma)}
				{selectingCap}
				width={squareWidth}
				height={squareHeight}
				on:click={handleCapClick}
				{reverse}
			/>
		{/each}
		{#if fillSquare && lastHistory.before === 81 && lastHistory.koma && lastHistory.is_faul === true && lastHistory.turn === owner}
			<CapFill koma={lastHistory.koma} width={squareWidth} height={squareHeight} />
		{/if}
	</div>
</div>
