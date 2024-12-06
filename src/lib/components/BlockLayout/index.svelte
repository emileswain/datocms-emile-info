<script lang="ts">
    import {readFragment, type FragmentOf} from '$lib/datocms/graphql';
    import {BlockLayoutFragment} from './fragments';
    import ContentBloc from "./ContentBloc/index.svelte";
    import SectionBlock from "./SectionBlock/index.svelte";
    import {StructuredText} from "@datocms/svelte";
    import {
        isBlock,
        isCode,
        isHeading,
        isInlineItem,
        isItemLink,
    } from 'datocms-structured-text-utils';
    import Code from "$lib/components/Code/index.svelte";
    import HeadingWithAnchorLink from "$lib/components/HeadingWithAnchorLink/index.svelte";
    import Block from "$lib/components/Block/index.svelte";
    import InlineItem from "$lib/components/InlineItem/index.svelte";
    import ItemLink from "$lib/components/ItemLink/index.svelte";

    export let data: FragmentOf<typeof BlockLayoutFragment>;

    $: unmaskedBlock = readFragment(BlockLayoutFragment, data);


    // console.log(`BlockLayoutIndex: ${JSON.stringify(data, null, 4)}`);

</script>

<!--{#snippet  figure(content)}-->
<!--<h1>{content.header}</h1>-->
<!--<StructuredText-->
<!--        data={content.structuredText}-->
<!--        components={[-->
<!--                        [isCode, Code],-->
<!--                        [isHeading, HeadingWithAnchorLink],-->
<!--                        [isBlock, Block],-->
<!--                        [isInlineItem, InlineItem],-->
<!--                        [isItemLink, ItemLink],-->
<!--                      ]}/>-->
<!--{/snippet}-->

{#if unmaskedBlock.__typename === 'SectionBlockRecord'}
    <SectionBlock data={unmaskedBlock}>
        {#each unmaskedBlock.blocs as sectionBloc , i}
            <ContentBloc data={sectionBloc}>
                <h1>{sectionBloc.header}</h1>
                <StructuredText
                        data={sectionBloc.structuredText}
                        components={[
                        [isCode, Code],
                        [isHeading, HeadingWithAnchorLink],
                        [isBlock, Block],
                        [isInlineItem, InlineItem],
                        [isItemLink, ItemLink],
                      ]}/>
            </ContentBloc>
        {/each}
    </SectionBlock>
{:else if unmaskedBlock.__typename === 'ContentBlocRecord'}
    <ContentBloc data={unmaskedBlock}>
        <h1>{unmaskedBlock.header}</h1>
        <StructuredText
                data={unmaskedBlock.structuredText}
                components={[
                        [isCode, Code],
                        [isHeading, HeadingWithAnchorLink],
                        [isBlock, Block],
                        [isInlineItem, InlineItem],
                        [isItemLink, ItemLink],
                      ]}/>
    </ContentBloc>
{/if}

