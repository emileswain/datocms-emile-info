<script lang="ts">
  import { type FragmentOf, readFragment } from '$lib/datocms/graphql';
  import { VideoPlayer } from '@datocms/svelte';
  import type { ComponentProps } from 'svelte';
  import { VideoPlayerFragment } from './fragments';

  type $$Props = Omit<ComponentProps<VideoPlayer>, 'data'> & {
    data: FragmentOf<typeof VideoPlayerFragment>;
  };

  interface Props {
    data: $$Props['data'];
    [key: string]: any;
  }

  let { data, ...rest }: Props = $props();

  let unmaskedData = $derived(readFragment(VideoPlayerFragment, data));
</script>

<!--
  This component is a wrapper for the <VideoPlayer />` component provided by
  @datocms/svelte, optimized for use with graphql.tada. We define the necessary
  GraphQL fragment for this component to function only once, then reuse it
  wherever needed.
-->

<VideoPlayer {...rest} data={unmaskedData.video} accentColor="var(--color-accent)" />
