<script lang="ts">
    import {Head, querySubscription} from '@datocms/svelte';
    import type {LayoutData} from './$types';
    import DraftModeToggler from '$lib/components/DraftModeToggler/index.svelte';

    export let data: LayoutData;
    $: subscription = querySubscription(data.subscription);
</script>

<svelte:head>
    <!--  <link-->
    <!--    rel="stylesheet"-->
    <!--    href="https://cdn.jsdelivr.net/gh/datocms/nextjs-starter-kit/src/app/global.css"-->
    <!--  />-->
    <!--  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap" rel="stylesheet">
</svelte:head>

<!--
  The <Head> component provided by @datocms/svelte automates the creation of
  meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.
-->
<Head data={$subscription.data?._site.faviconMetaTags}/>

<header>
    <!--  <h1>DatoCMS + SvelteKit Starter Kit</h1>-->
    <nav>
        <!--    <DraftModeToggler />-->
    </nav>
</header>

<div class="container">
    <slot/>
</div>

<style > /* CSS Reset */
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');


:global(*, *::before, *::after) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

:global(html, body) {
    height: 100%;
    width: 100%;
    font-family: 'Roboto Flex', 'Inter', Helvetica, Arial, serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    /*scrollbar-gutter: stable;*/
}

:global(img, picture, video, canvas, svg ){
    display: block;
    max-width: 100%;
}

:global(button, input, select, textarea ){
    font-family: inherit;
}

/* Remove default padding */
:global(ul, ol) {
    padding: 0;
}

/* Make images easier to work with */
:global(img) {
    max-width: 100%;
    display: block;
}

/* Inherit fonts for inputs and buttons */
:global(input, button, textarea, select){
    font: inherit;
}

/* Remove all animations and transitions for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
    :global( *, *::before, *::after ){
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}

.container {
    width: 100%;
    /*max-width: 1140px;*/
    margin-right: auto;
    margin-left: auto;
}


/*@media ( min-width: 500px) {*/
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