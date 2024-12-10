<script lang="ts">
  import { Head, querySubscription } from '@datocms/svelte';

  import type { PageData } from './$types';
  import LayoutBloc from '../../../lib/components/LayoutBloc/index.svelte';
  import ContentBloc from '../../../lib/components/BlockLayout/ContentBloc/index.svelte';
  import PageBloc from '../../../lib/components/PageBloc/index.svelte';
  import TopNav from '../../../lib/components/TopNav/index.svelte';
  import Icon from '../../../lib/components/Icon/index.svelte';
  import BlockLayout from '../../../lib/components/BlockLayout/index.svelte';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <script
    type="text/javascript"
    src="https://rawgit.com/patriciogonzalezvivo/glslCanvas/master/dist/GlslCanvas.js"
  ></script>
</svelte:head>

<PageBloc class="shader-page full-view">
  <TopNav>
    <a href="/" rel="no-prefetch" aria-label="home">
      <Icon type="home" />
    </a>
  </TopNav>
  <div>
    <h1>Shader</h1>
    <p>Simple shader example</p>
    <canvas class="glslCanvas" data-fragment-url="/shader.frag" width="500" height="500"></canvas>
  </div>
</PageBloc>

<style lang="css">
  :global(.full-view) {
    min-width: -webkit-fill-available;
    min-height: -webkit-fill-available;
  }
</style>
