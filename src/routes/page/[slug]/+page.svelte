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
    import LayoutBloc from "../../../lib/components/LayoutBloc/index.svelte";
    import ContentBloc from "../../../lib/components/ContentBloc/index.svelte";
    import PageBloc from "../../../lib/components/PageBloc/index.svelte";
    import Link from "../../../lib/components/Link/index.svelte";
    import TopNav from "../../../lib/components/TopNav/index.svelte";
    import Icon from "../../../lib/components/Icon/index.svelte";

    export let data: PageData;
    $: subscription = querySubscription(data.subscription);
    $: page = $subscription.data?.page;
</script>

{#if page}
    <!--
      The <Head> component provided by @datocms/svelte automates the creation of
      meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.
    -->
    <Head data={page._seoMetaTags}>
        <title></title>
    </Head>

    <PageBloc class="article-page">
        <TopNav>
            <a href="/" rel="no-prefetch" aria-label="home">
                <Icon type="home"/>
            </a>
        </TopNav>
        <LayoutBloc>
            <ContentBloc>
                <h1>{page.title}</h1>
                <p>{page.shortDescription}</p>
            </ContentBloc>
            <LayoutBloc direction="column">
                {#each page.content as content, i}
                    <ContentBloc>
                        <h1>{content.header}</h1>
                        <StructuredText
                                data={content.content}
                                components={[
                        [isCode, Code],
                        [isHeading, HeadingWithAnchorLink],
                        [isBlock, Block],
                        [isInlineItem, InlineItem],
                        [isItemLink, ItemLink],
                      ]}/>
                    </ContentBloc>
                {/each}
            </LayoutBloc>
        </LayoutBloc>
    </PageBloc>
    <!--    <div class="project-nav">-->
    <!--        <a href="/project/{prevProjectSlug}" rel="no-prefetch" aria-label="prev">-->
    <!--            <Icon type="back"/>-->
    <!--        </a>-->
    <!--        <a href="/" aria-label="home">-->
    <!--            <Icon type="home"/>-->
    <!--        </a>-->
    <!--        <a href="/project/{nextProjectSlug}" rel="no-prefetch" aria-label="next">-->
    <!--            <Icon type="next"/>-->
    <!--        </a>-->
    <!--    </div>-->
{/if}

<style lang="css">

</style>

