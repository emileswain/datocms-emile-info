<script lang="ts">
  import { onMount } from 'svelte';

  interface Props {
    id?: string;
    flush?: boolean;
    title?: string;
    active?: boolean;
    showHeader?: boolean;
    children?: import('svelte').Snippet;
  }

  let {
    id,
    flush = false,
    showHeader = true,
    title = '',
    active = true,
    children,
  }: Props = $props();

  let loaded = $state(false);
  onMount(() => (loaded = true));
</script>

<div {id} class="section-bloc" class:inactive={!active}>
  {#if showHeader}
    {#if title}
      <h1>{title}</h1>
    {/if}
  {/if}
  {@render children?.()}
</div>

<style>
  /* set default margins of content.*/
  .section-bloc {
    display: flex;
    flex-direction: column;
    flex: 1 1 0;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }

  .inactive {
    display: none;
  }

  /*!* remove page padding so elements sit flush with edges of page. *!*/
  /*.flush {*/
  /*    margin-left: 0;*/
  /*    margin-right: 0;*/
  /*}*/

  /*@media ( min-width: 500px) {*/
  /*    .section-maxWidth {*/

  /*    }*/
  /*}*/

  /*@media (min-width: 768px) {*/
  /*    .section-maxWidth {*/
  /*        max-width: var(--page-max-section-width);*/
  /*    }*/
  /*}*/

  /*@media (min-width: 992px) {*/
  /*    .section-maxWidth {*/
  /*        max-width: var(--page-max-section-width);*/
  /*    }*/
  /*}*/

  /*@media (min-width: 1200px) {*/
  /*    .section-maxWidth {*/
  /*        max-width: var(--page-max-section-width);*/
  /*    }*/
  /*}*/
</style>
