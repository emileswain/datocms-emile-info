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
    import PageBloc from "../lib/components/PageBloc/index.svelte";
    import LayoutBloc from "../lib/components/LayoutBloc/index.svelte";
    import ContentBloc from "../lib/components/ContentBloc/index.svelte";
    import TopNav from "../lib/components/TopNav/index.svelte";
    import Link from "../lib/components/Link/index.svelte";

    export let data: PageData;
    $: subscription = querySubscription(data.subscription);
    $: homepage = $subscription.data?.homepage;
    // $: projects = $subscription.data?.allProjects;

    $: projects = $subscription.data?.homepage.projects;

    $: pages = [{title: "work"}, {title: "projects"}, {title: "other"}]
</script>

{#if homepage}
    <!--
        The <Head> component provided by @datocms/svelte automates the creation of
        meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.
      -->
    <Head data={homepage._seoMetaTags}></Head>

    <TopNav>Emile swain</TopNav>
    <PageBloc class="home-page">
        <LayoutBloc>
            <LayoutBloc direction="row" collapseRow="true">
                <ContentBloc numberWang="0"  useMaxWidth="true">
                    <img class="profile-image" src={homepage.profileImage.responsiveImage.src} alt={homepage.profileImage.alt?? "profile image"}/>
                </ContentBloc>
                <ContentBloc numberWang="0" useMaxWidth="true" align="bottom">
                    <StructuredText
                            data={homepage.structuredText}
                            components={[
                        [isCode, Code],
                        [isHeading, HeadingWithAnchorLink],
                        [isBlock, Block],
                        [isInlineItem, InlineItem],
                        [isItemLink, ItemLink],
                      ]}/>
                </ContentBloc>
            </LayoutBloc>

            <LayoutBloc>
                <ContentBloc>
                    <h1 class="section-header">Projects</h1>
                </ContentBloc>
            </LayoutBloc>

            <LayoutBloc>
                {#if projects }
                    {#each projects as project, i}
                        <LayoutBloc direction="row" alternateDirection="true" collapseRow="true">
                            <ContentBloc numberWang="{i+1}">
                                <img class="project-image" src={project.heroImage.responsiveImage.src} alt={project.heroImage.alt?? "image of project"}/>
                            </ContentBloc>
                            <ContentBloc numberWang="{i+1}" useMaxWidth="true">
                                <h1>{project.title}</h1>
                                <StructuredText data={project.shortDescription}/>
                                <Link  href="/project/{project.slug}" rel="no-prefetch">Explore</Link>
                            </ContentBloc>
                        </LayoutBloc>
                    {/each}
                {:else}
                    <p>Loading projects...</p>
                {/if}
            </LayoutBloc>

            <LayoutBloc>
                <ContentBloc>
                    <h1 class="section-header">Side Projects</h1>
                </ContentBloc>
            </LayoutBloc>

            <LayoutBloc>
                {#each homepage.pages as page, i}
                    <!--                        <a href="/page/{page.title}" rel="no-prefetch">{page.title}</a>-->
<!--                    <li><a href="/page/{page.slug}" rel="no-prefetch">{page.title}</a></li>-->
                    <ContentBloc>
                        <h1>{page.title}</h1>
                        <StructuredText data={page.shortDescription}/>
                        <Link  href="/page/{page.slug}" rel="no-prefetch">Explore</Link>
                    </ContentBloc>
                {/each}
            </LayoutBloc>

        </LayoutBloc>
    </PageBloc>

{/if}

<style lang="css">
    /*.section-header {*/
    /*    font-size: 4rem;*/
    /*    margin-bottom: unset;*/
    /*}*/

    /* global required to override the class properties that are applied to the PageBloc */
    :global(.container){
        /*height: 100%;*/
        /*overflow-y: auto;*/
        /*min-height: 100vh;*/
        /*display: flex;*/
        /*flex-direction: column;*/
        background: radial-gradient(circle at top left, white, rgb(176, 196, 185));
    }

    .profile-image {
        /*max-width: 512px;*/
        /*max-height: 512px;*/
        max-width: 100%;
        max-height: 100%;
    }


    .project-image {
        width: 100%;
        height: 263px;

        border-radius: 28px;
        border: 5px solid white;
        display: block;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        object-fit: cover;
    }

    /*:global(.flush) > img*/
    /*{*/
    /*    border:unset;*/
    /*    border-radius: 0;*/
    /*}*/

    @media (min-width: 700px) {
        .project-image {
            width: 460px;
            height: 263px;
        }
    }

</style>

