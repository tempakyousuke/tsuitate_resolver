<script lang="ts">
	export let koma: number;
	export let height: number;
	export let width: number;
	export let colorClass = 'bg-blue-500';

	const style =
		`width: ${width}px;` +
		`height:${height}px;` +
		`left: ${width * (koma - 1)}px;` +
		`padding: 0 ${height * 0.1}px;`;
</script>

<div class="absolute z-1 opacity-50 {colorClass}" {style} />
