<script lang="ts">
    import {Head, querySubscription, StructuredText} from '@datocms/svelte';
    import {
        isBlock,
        isCode,
        isHeading,
        isInlineItem,
        isItemLink,
    } from 'datocms-structured-text-utils';
    import HeadingWithAnchorLink from '$lib/components/HeadingWithAnchorLink/index.svelte';
    import Block from '$lib/components/Block/index.svelte';
    import InlineItem from '$lib/components/InlineItem/index.svelte';
    import ItemLink from '$lib/components/ItemLink/index.svelte';
    import Code from '$lib/components/Code/index.svelte';
    import type {ProjectData} from './$types';
    import ResponsiveImage from "$lib/components/ResponsiveImage/index.svelte";
    import {onMount} from 'svelte';
    import {ColorUtils} from '$lib/colorUtils';

    export let data: ProjectData;
    $: subscription = querySubscription(data.subscription);
    $: project = $subscription.data?.project;


    onMount(() => {
        if (project) {
            let root = document.querySelector("body")
            root.style.setProperty('--bg-fill', project.bgFill.hex);
            root.style.setProperty('--border-fill', project.bgBorder.hex);
            root.style.setProperty('--text-fill', project.clientTextFill.hex);

            let themeMode = ColorUtils.getContrastTheme(project.bgFill.hex);

            root.style.setProperty('--text-color', themeMode == 'light' ? "#FFF" : "#000");
        }
    });

    let size = 70;
    let barWidth = 2;
    // function up() {
    //     size += 5;
    // }
    //
    // function down() {
    //     size -= 5;
    //
    // }
    // function upBar() {
    //     barWidth += 2;
    // }
    //
    // function downBar() {
    //     barWidth -= 2;
    // }
</script>

{#if project}

    <!--
      The <Head> component provided by @datocms/svelte automates the creation of
      meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.
    -->
    <Head data={project._seoMetaTags}/>
    <!--    <button on:click={up}>up</button>-->
    <!--    <button on:click={down}>down</button>-->
    <!--    <button on:click={upBar}>up Bar</button>-->
    <!--    <button on:click={downBar}>down Bar</button>-->
    <!--    <div class="client-title">NIKE</div>-->

    <div class="title-wrapper">
        <div class="client-title">{project.client}</div>
    </div>
    <!--  <h1>{page.title}</h1>-->
    <div class="project" style="--bar-start:{size}; --blur-start:{100-size}; --bar-width:{barWidth}">
        <div class="headline">
            <figure class="heroImageContainer">
                <ResponsiveImage data={project.heroImage.responsiveImage}/>
                <div class="blurBox">
                </div>
            </figure>
            <h1>{project.title} </h1>
        </div>
        <div class="remaining-space">
            <div class="content">
                <StructuredText
                        data={project.content}
                        components={[
              [isCode, Code],
              [isHeading, HeadingWithAnchorLink],
              [isBlock, Block],
              [isInlineItem, InlineItem],
              [isItemLink, ItemLink],
            ]}
                />
            </div>
        </div>

    </div>

    <!--<footer>Published at {page._firstPublishedAt}</footer>-->
{/if}


<style lang="css">

    :global(body) {
        --text-color: var(--text-color);
        background-color: var(--bg-fill);
        border-width: 20px;
        border-style: solid;
        border-color: var(--border-fill);
        background-color: var(--bg-fill);
    }

    :global(figure) {
        width: 460px;
        margin: 0;
        padding: 0;
        margin-bottom: 16px;
    }

    :global(h1) {
        color: var(--text-color);
        text-decoration: none;
        font-family: 'Roboto Flex';
        font-weight: 100;
        margin-bottom: 12px;
    }

    :global(a) {
        color: var(--text-color);
        text-decoration: none;
        font-weight: lighter;
        margin-bottom: 16px;
    }

    :global(p) {
        color: var(--text-color);
        margin-bottom: 16px;
        letter-spacing: 0.5px;
        font-weight: 100;
    }

    :global(.container) {
        display: flex;
        height: 100%;
    }


    /*
    Page specific.
    */
    .project {
        display: flex;
        flex-direction: column;
        flex: 1;
        width: 100%;
        position: relative;
        padding-top: 120px;
        padding-left: 120px;
        padding-right: 120px;
        overflow: hidden;
        z-index: 2;
    }

    .headline {
        flex-shrink: 0;
    }

    .remaining-space {
        flex: 1; /* Allow the container to grow and fill the remaining space */
        display: flex;
        flex-direction: column;
        height: 1px; /* This fixes a weird behaviour.*/

    }

    .content {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: start;
        align-content: flex-start;
        /*max-width: 350px;*/
        z-index: 2;
        height: 100%;
        column-gap: 16px;
    }

    /*:global(.content  h3) {*/
    /*    clear: both;*/
    /*}*/

    :global(.content *) {
        max-width: 350px;
    }

    .title-wrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        /*height: 100vh;*/
        /*width: 100vh;*/
        overflow: hidden;
        pointer-events: none;
    }

    .client-title {
        text-transform: uppercase;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(20deg);
        font-size: 50vw;
        color: var(--text-fill);
        font-weight: bold;
        font-family: 'Arial';
        z-index: 1;
        /*height: 100vh;*/
        white-space: nowrap;
    }

    figure {
        display: flex;
    }

    .heroImageContainer {
        display: flex;
        position: relative;
    }

    .blurBox {
        position: absolute;
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(4px);
        left: calc(var(--bar-start) * 1%);
        right: 0;
        top: 0;
        bottom: 0;
        --blur-width: calc(var(--bar-width) / (var(--blur-start) / 100.0));
        mask-image: repeating-linear-gradient(
                to right,
                transparent 0,
                transparent calc(var(--blur-width) * 1%),
                black calc(var(--blur-width) * 1%),
                black calc((var(--blur-width) * 2) * 1%)
        );
    }

    :global(.heroImageContainer > picture:first-child > img) {
        width: 100% !important;
        height: unset !important;
        filter: unset !important;
        margin-left: unset !important;
        /*--bar-width: 4;
        --bar-start: 60;*/
        mask-image: linear-gradient(
                to right,
                black 0%,
                black calc(var(--bar-start) * 1%),
                transparent calc(var(--bar-start) * 1%),
                transparent 100%
        ), repeating-linear-gradient(
                to right,
                transparent calc(var(--bar-start) * 1%),
                transparent calc((var(--bar-start) + var(--bar-width)) * 1%),
                black calc((var(--bar-start) + var(--bar-width)) * 1%),
                black calc((var(--bar-start) + var(--bar-width) * 2) * 1%)
        );
        mask-size: 100%
    }

</style>
