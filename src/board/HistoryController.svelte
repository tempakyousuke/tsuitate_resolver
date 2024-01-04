<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Fa from "svelte-fa";
  import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
  const dispatch = createEventDispatcher();
  export let className = "";
</script>

<div class="flex {className}">
  <div
    class="icon"
    on:click={() => {
      dispatch("back");
    }}
  >
    <Fa icon={faAngleLeft} size="2x" color="#78350F" fw pull="left" scale={1} />
  </div>
  <div
    class="icon"
    on:click={() => {
      dispatch("go");
    }}
  >
    <Fa
      icon={faAngleRight}
      size="2x"
      color="#78350F"
      fw
      pull="left"
      scale={1}
    />
  </div>
</div>

<style lang="postcss">
  .icon {
    @apply border bg-white border-amber-900 hover:bg-gray-100;
  }
</style>
