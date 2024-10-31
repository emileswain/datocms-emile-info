<script lang="ts">
  import { Head, querySubscription, StructuredText } from '@datocms/svelte';
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
  import type { PageData } from './$types';

  export let data: PageData;
  $: subscription = querySubscription(data.subscription);
  $: page = $subscription.data?.homepage;
</script>

{#if page}
  <!--
      The <Head> component provided by @datocms/svelte automates the creation of
      meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.
    -->
  <Head data={page._seoMetaTags} />

  <!--  <h1>{page.title}</h1>-->

  <!--
      Structured Text is a JSON format similar to HTML, but with the advantage
      of a significantly reduced and tailored set of possible tags
      for editorial content, along with the capability to create hyperlinks
      to other DatoCMS records and embed custom DatoCMS blocks.
    -->
  <div class="homepage">
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
  <!--<footer>Published at {page._firstPublishedAt}</footer>-->
{/if}

<style>
  :global(p) {
    margin: 0;
    padding: 0;
    margin-bottom: 1rem;
  }
  :global(figure) {
    margin: 0;
    padding: 0;
    margin-bottom: 1rem;
  }
  :global(figure > picture > img) {
    margin: 0;
    margin-left: auto;
    margin-right: auto;
    padding: 0;
    max-height: 200px;
    width: auto !important;
  }
  :global(figure) {
    text-align: start;
  }

  :global(.container div:last-of-type > figure) {
    text-align: center;
  }
</style>
