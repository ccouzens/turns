<script module>
import { defineMeta } from "@storybook/addon-svelte-csf";
import { fn } from "storybook/test";
import EngagingHues from "./EngagingHues.svelte";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const { Story } = defineMeta({
	title: "Engaging Hues",
	component: EngagingHues,
	tags: ["autodocs"],
	argTypes: {
		randomSequenceStart: { control: "object" },
		actions: { control: "object" },
	},
	args: {
		actions: [
			{ key: "add", id: 1 },
			{ key: "add", id: 2 },
			{ key: "add", id: 3 },
			{ key: "add", id: 4 },
			{ key: "add", id: 5 },
			{ key: "add", id: 6 },
			{ key: "add", id: 7 },
			{ key: "add", id: 8 },
		],
		randomSequenceStart: new Array(20).fill(0.5),
	},
});
</script>

<Story name="add start" args={{randomSequenceStart: new Array(20).fill(0)}} />
<Story name="add middle" args={{randomSequenceStart: new Array(20).fill(0.5)}} />
<Story name="add end" args={{randomSequenceStart: new Array(20).fill(0.9999)}} />
