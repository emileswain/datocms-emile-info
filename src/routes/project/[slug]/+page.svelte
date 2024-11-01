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

    export let data: ProjectData;
    $: subscription = querySubscription(data.subscription);
    $: project = $subscription.data?.project;
</script>

{#if project}
    <!--
      The <Head> component provided by @datocms/svelte automates the creation of
      meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.
    -->
    <Head data={project._seoMetaTags}/>

    <!--  <h1>{page.title}</h1>-->
    <div class="project">
        <figure>
            <ResponsiveImage data={project.heroImage.responsiveImage}/>
            <!--        <ResponsiveImage data={project.heroImage.responsiveImage}/>-->
        </figure>
        <h1>{project.title} </h1>
        <div class="content">
            <StructuredText
                    data={project.content}
                    components={[
              // Although the component knows how to convert all "standard" elements
              // (headings, bullet lists, etc.) into HTML, it's possible to customize
              // the rendering of each node:
              [isCode, Code],
              [isHeading, HeadingWithAnchorLink],
              [isBlock, Block],
              [isInlineItem, InlineItem],
              [isItemLink, ItemLink],
            ]}
          />
        </div>
        <div class="title">NIKE</div>
    </div>

  <!--<footer>Published at {page._firstPublishedAt}</footer>-->
{/if}


<style lang="css">
   .project{
        padding: 120px;
   }
   .project :global(a){
            color: #FFF;
            text-decoration: none;
            font-family: 'Roboto';
            font-weight: light;
        }
   .project :global(p){
            color: #FFF;
        }

    .content{
        display: flex;
        flex-direction: column;
        align-items: start;
        max-width: 350px;
    }
    .title{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(30deg);
        font-size: 50vw;
        color: #040404;
        font-weight: bold;
        font-family: 'Arial';
        z-index: -1;
    }

    figure {
        display: flex;
    }
    :global(figure > picture:first-child > img) {
        width: 100% !important;
        height: unset !important;
        filter: unset !important;
        margin-left: unset !important;
        mask-image: linear-gradient(to right,
            black 0%,
            black 60%,
            transparent 60%,
            transparent 65%,
            black 65%,
            black 80%,
            transparent 80%,
            transparent 85%,
            black 85%,
            black 100%);
        mask-size: 100%
    }

    :global(body) {
        box-sizing: border-box;
        border-width: 20px;
        border-style: solid;
       border-color: #FFF;
       background-color: #000;
       overflow: hidden;
    }
    :global(figure)
    {
        width: 460px;
        margin: 0;
        padding: 0;
    }
</style>
