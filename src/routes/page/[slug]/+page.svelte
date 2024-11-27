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
        <div class="content">
            <StructuredText
                    data={page.structuredText}
                    components={[
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


{/if}


<style lang="css">

</style>