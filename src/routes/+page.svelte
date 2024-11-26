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
    $: homepage = $subscription.data?.homepage;
    $: projects = $subscription.data?.allProjects;

</script>

{#if homepage}
    <!--
        The <Head> component provided by @datocms/svelte automates the creation of
        meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.
      -->
    <Head data={homepage._seoMetaTags}></Head>

    <header>
        <!--  <h1>DatoCMS + SvelteKit Starter Kit</h1>-->
        <!--        <nav>-->
        <!--            <Icon type="home"/>-->
        <!--            &lt;!&ndash;    <DraftModeToggler />&ndash;&gt;-->
        <!--        </nav>-->
    </header>
    <!--
        Structured Text is a JSON format similar to HTML, but with the advantage
        of a significantly reduced and tailored set of possible tags
        for editorial content, along with the capability to create hyperlinks
        to other DatoCMS records and embed custom DatoCMS blocks.
      -->
    <div class="home-page" data-sveltekit-preload-data="tap">
        <StructuredText
                data={homepage.structuredText}
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

    {#if projects }
   <ul> {#each projects as project, i}
    <li>
        <a href="/project/{project.slug}" rel="no-prefetch">{project.title}</a>
    </li>
     {/each}
     </ul>
  {:else}
   <p>Loading projects...</p>
   {/if}
  </div>

{/if}

<style>


</style>
