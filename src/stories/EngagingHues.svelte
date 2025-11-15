<style>
	.hueLine {
	--min-size: 50px;
	display: flex;
	}
	.hue {
		min-width: var(--min-size);
		min-height: var(--min-size);
		background-color: lch(50% 100% var(--hue));
		flex-grow: 1;
	}
</style>
<script lang="ts">
import { EngagingHues } from "../EngagingHues";

interface Props {
	randomSequenceStart: number[];
	actions: { key: "add" | "remove"; id: number }[];
}

const { randomSequenceStart, actions }: Props = $props();

const engagingHues = $derived.by(() => {
	const randomSequence: Iterator<number> = (function* () {
		yield* randomSequenceStart;
		while (true) {
			yield 0;
		}
	})();
	const engagingHues = new EngagingHues(randomSequence);
	for (const action of actions) {
		if (action.key === "add") {
			engagingHues.add(action.id);
		} else if (action.key === "remove") {
			engagingHues.remove(action.id);
		}
	}
	return [...engagingHues.assignments];
});
</script>

<div class="hueLine">
	{#each engagingHues as [identifier, hue] (identifier)}
		<div class="hue" style:--hue={hue}></div>
	{/each}
</div>
