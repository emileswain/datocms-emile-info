<script lang="ts">
  import { Head, querySubscription } from '@datocms/svelte';
  import type { LayoutData } from './$types';
  import DraftModeToggler from '$lib/components/DraftModeToggler/index.svelte';

  export let data: LayoutData;
  $: subscription = querySubscription(data.subscription);
</script>

<svelte:head>
  <!--  <link-->
  <!--    rel="stylesheet"-->
  <!--    href="https://cdn.jsdelivr.net/gh/datocms/nextjs-starter-kit/src/app/global.css"-->
  <!--  />-->
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
</svelte:head>

<!--
  The <Head> component provided by @datocms/svelte automates the creation of
  meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.
-->
<Head data={$subscription.data?._site.faviconMetaTags} />

<header>
  <!--  <h1>DatoCMS + SvelteKit Starter Kit</h1>-->
  <nav>
    <!--    <DraftModeToggler />-->
  </nav>
</header>

<div class="container">
  <slot />
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

  * {
    font-family: 'Inter', Helvetica, Arial, serif;
  }
  :global(html) {
    margin: 0;
    padding: 0;
    height: 100%;
    width: auto;
    /*scrollbar-gutter: stable;*/
  }
  :global(body) {
    margin: 0;
    padding: 0;
    height: 100%;
    width: auto;
    display: flex;
  }

  .container {
    width: 100%;
    /*max-width: 1140px;*/
    margin-right: auto;
    margin-left: auto;
    padding-right: 15px;
    padding-left: 15px;
  }
  /*@media (min-width: 500px) {*/
  /*  .container {*/
  /*    max-width: 460px;*/
  /*  }*/
  /*}*/
  /*@media (min-width: 768px) {*/
  /*  .container {*/
  /*    max-width: 720px;*/
  /*  }*/
  /*}*/
  /*@media (min-width: 992px) {*/
  /*  .container {*/
  /*    max-width: 960px;*/
  /*  }*/
  /*}*/
  /*@media (min-width: 1200px) {*/
  /*  .container {*/
  /*    max-width: 1140px;*/
  /*  }*/
  /*}*/
</style>
