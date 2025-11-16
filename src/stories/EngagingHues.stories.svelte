<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
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
      actions: new Array(20).fill(0).map((_, i) => ({ key: "add", id: i })),
      randomSequenceStart: new Array(20).fill(0.5),
    },
  });
</script>

<Story name="add start" args={{ randomSequenceStart: new Array(20).fill(0) }} />
<Story
  name="add middle"
  args={{ randomSequenceStart: new Array(20).fill(0.5) }}
/>
<Story
  name="add end"
  args={{ randomSequenceStart: new Array(20).fill(0.9999) }}
/>
