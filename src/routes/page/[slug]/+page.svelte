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
    import type {PageData} from './$types';

    export let data: PageData;
    $: subscription = querySubscription(data.subscription);
    $: page = $subscription.data?.page;
</script>

{#if page}
    <!--
      The <Head> component provided by @datocms/svelte automates the creation of
      meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.
    -->
    <Head data={page._seoMetaTags}/>

    <!--  <h1>{page.title}</h1>-->
    <div class="page">
        <!--
          Structured Text is a JSON format similar to HTML, but with the advantage
          of a significantly reduced and tailored set of possible tags
          for editorial content, along with the capability to create hyperlinks
          to other DatoCMS records and embed custom DatoCMS blocks.
        -->
        <div class="content">
            <StructuredText
                    data={page.structuredText}
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

<style>
    .page{
        padding: 120px;
   }
   .page  :global(a){
            color: #FFF;
            text-decoration: none;
            font-family: 'Roboto';
            font-weight: light;
        }
   .page :global(p){
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
