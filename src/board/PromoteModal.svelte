<script lang="ts">
	import Modal from '$lib/modal/Modal.svelte';
	import Button from '$lib/button/Button.svelte';
	import { createEventDispatcher } from 'svelte';

	export let open = false;
	const dispatch = createEventDispatcher();
</script>

<Modal title="成りますか？" bind:open hideOk hideCancel>
	<div class="grid grid-cols-2 gap-5 mt-10">
		<Button
			className="col-span-1"
			block
			on:click={() => {
				dispatch('promote', true);
			}}>成る</Button
		>
		<Button
			className="col-span-1"
			block
			bgColorClass="bg-orange-500"
			on:click={() => {
				dispatch('promote', false);
			}}>成らない</Button
		>
	</div>
	<div class="flex mt-10">
		<div class="flex-grow" />
		<Button
			className="w-30"
			block
			bgColorClass="bg-gray-300 hover:bg-gray-200"
			buttonClass="text-gray-800"
			on:click={() => {
				dispatch('cancel');
			}}>キャンセル</Button
		>
	</div>
</Modal>
