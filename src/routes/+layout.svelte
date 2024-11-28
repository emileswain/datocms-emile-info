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

<!--<header>-->
<!--    &lt;!&ndash;  <h1>DatoCMS + SvelteKit Starter Kit</h1>&ndash;&gt;-->
<!--    <nav>-->
<!--        hello-->
<!--        &lt;!&ndash;    <DraftModeToggler />&ndash;&gt;-->
<!--    </nav>-->
<!--</header>-->

<div class="container">
    <slot/>
</div>

<style>
    /* ########################################################################################### */
    /* CSS Reset */
    /* global styling further down */
    /* ########################################################################################### */
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
        overscroll-behavior: none;
        /*scrollbar-gutter: stable;*/
    }

    :global(h1, h2, h3, h4, h5, h6, h7 ) {
        margin-bottom: 12px;

    }

    :global(img, picture, video, canvas, svg ) {
        display: block;
        /*max-width: 100%;*/
    }

    :global(button, input, select, textarea ) {
        font-family: inherit;
    }

    /* Remove default padding */
    :global(ul, ol) {
        padding: 0;
    }

    /*  */
    :global(img) {
        display: block;
    }

    /* Inherit fonts for inputs and buttons */
    :global(input, button, textarea, select) {
        font: inherit;
    }

    /* Remove all animations and transitions for people that prefer not to see them */
    @media (prefers-reduced-motion: reduce) {
        :global( *, *::before, *::after ) {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
        }
    }

    /* Why the marker sits outside disrespecting everyone's layout i dont know. what nasty will this do. */
    :global(li)
    {
        list-style-position: inside;
    }

    /* ########################################################################################### */
    /*  Global element styles */
    /* ########################################################################################### */

    :global(body) {
        --text-color: #000000;
        --bg-fill: #FFFFFF;
        --border-fill: #333333;

        /*--text-color: #FFFFFF;*/
        /*--bg-fill: #000000;*/
        /*--border-fill: #333333;*/

        /* colour is stroke colour */
        --icon-color: #000000;
        --icon-fill: #000000;

        /* Layout parameters */
        --page-max-content-width:300px;
        --page-margin: 18px;
        --bloc-margin-bottom: 18px;
        --page-border-thickness: 15px; /* used on project page.*/

        /* Button styling parameters
         */
        --btn-color-fill:rgba(0, 0, 0, 0.37);
        --btn-color-fill--hover:#cfe5d9;
        --btn-color-stroke:#fff;
        --btn-color-stroke--hover:#fff;
    }

    /* applied when over 540 */
    @media (min-width: 500px) {
        :global(body) {
            --page-max-content-width:460px;
            --page-margin: 32px;
            --bloc-margin-bottom: 32px;
            --page-border-thickness: 20px;  /* used on project page.*/
        }
    }

    /* applied when over 700 */
    @media (min-width: 700px) {
        :global(body) {
            --page-margin: 32px;
            --bloc-margin-bottom: 32px;
            --page-border-thickness: 20px;  /* used on project page.*/
        }
    }

    /*
        .container
        Child of <body> wraps all pages that use this layout.
        <body>
            <div style=".container">
                <div class="homepage|projectpage|blogpage|etc" />
    */
    .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        margin-right: auto;
        margin-left: auto;
    }

    /*
        figure
        use variables to style max, min widths.
    */
    :global(figure) {
        max-width: 460px;
        margin: 0;
        padding: 0;
        margin-bottom: 1rem;
    }

    /*
        h1
        use variables to style colour, font size, etc
    */
    :global(h1) {
        color: var(--text-color);
        text-decoration: none;
        font-family: 'Roboto Flex';
        font-weight: 100;
        margin-bottom: 1rem;
    }

    /*
        a links
        use variables to style colour, font size, etc
    */
    :global(a) {
        color: var(--text-color);
        text-decoration: none;
        font-weight: lighter;
        margin-bottom: 1rem;
    }

    /*
        P
        use variables to style colour, font size, etc
    */
    :global(p) {
        color: var(--text-color);
        /*margin-bottom: 16px;*/
        margin-bottom: 1rem;
        letter-spacing: 1px;
        font-weight: 100;
    }

    /* Styling utils used in say routes/project/slug/+page.svelte to fill space.*/
    :global(.remaining-space) {
        /* Bad solution doesn't work on chrome on ios. */
        /*flex: 1; !* Allow the container to grow and fill the remaining space *!*/
        /*display: flex;*/
        /*flex-direction: column;*/
        /*height: 1px; !* This fixes a weird behaviour, but breaks something else. *!*/

    }

    /*
        nav
    */
    :global(nav) {
        background-color: #333;
        color: #fff;
    }

    :global(nav a ){
        color: #fff;
        text-decoration: none;
    }

    :global(nav a:hover ){
        background-color: #575757;
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