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

    <header>
    </header>

    <div class="home-page" data-sveltekit-preload-data="tap">
        <div class="home-header">
            <ul>
                <li>
                    <p>Emile Swain</p>
                </li>
                <li class="expand"></li>
                <!--{#each pages as page, i}-->
                <!--    <li>-->
                <!--        &lt;!&ndash;                        <a href="/page/{page.title}" rel="no-prefetch">{page.title}</a>&ndash;&gt;-->
                <!--        <a href="/" rel="no-prefetch">{page.title}</a>-->
                <!--    </li>-->
                <!--{/each}-->
            </ul>
        </div>
        <div class="content-wrapper-bloc">
            <div class="layout-bloc-row profile-bloc">
                <div class="content-bloc">
                    <img class="profile-image" src={homepage.profileImage.responsiveImage.src} alt={homepage.profileImage.alt?? "profile image"}/>
                </div>
                <div class="content-bloc blurb-bloc">
                    <StructuredText
                            data={homepage.structuredText}
                            components={[
                        [isCode, Code],
                        [isHeading, HeadingWithAnchorLink],
                        [isBlock, Block],
                        [isInlineItem, InlineItem],
                        [isItemLink, ItemLink],
                      ]}/>
                </div>
            </div>

            <div class="layout-bloc-column">
                <div class="content-bloc profile-nav section-header">
                    <h1>Projects</h1>
                </div>
            </div>
            <div class="layout-bloc-column project-links-bloc">
                {#if projects }
                    {#each projects as project, i}
                        <div class="content-bloc layout-bloc-row project-bloc">
                            <div class="content-bloc project-image-bloc">
                                <img class="project-image" src={project.heroImage.responsiveImage.src} alt={project.heroImage.alt?? "profile image"}/>
                            </div>
                            <div class="content-bloc project-blurb">
                                <h1>{project.title}</h1>
                                <StructuredText data={project.shortDescription}/>
                                <a class="button-link" href="/project/{project.slug}" rel="no-prefetch">Explore</a>
                            </div>
                        </div>
                    {/each}
                {:else}
                    <p>Loading projects...</p>
                {/if}

            </div>

            <div class="layout-bloc-column">
                <div class="content-bloc profile-nav section-header">
                    <h1>Side projects</h1>
                </div>
            </div>
            <div class="layout-bloc-column side-project-links-bloc">
                <div class="content-bloc profile-nav">
                    <ul>
                    {#each homepage.pages as page, i}
                        <!--                        <a href="/page/{page.title}" rel="no-prefetch">{page.title}</a>-->
                        <li><a href="/page/{page.slug}" rel="no-prefetch">{page.title}</a></li>
                    {/each}
                    </ul>
                </div>
            </div>

        </div>
    </div>
    <!-- End homepage -->
{/if}

<style lang="css">
    .section-header h1{
        font-size: 4rem;
        margin-bottom: unset;
    }
    .home-page {
        /*width: auto;*/
        height: 100%;
        /*min-height: auto;*/
        /*min-width: 100%;*/
        overflow-y: auto;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background: radial-gradient(circle at top left, white, rgb(176, 196, 185));
    }

    .content-wrapper-bloc {
        display: flex;
        flex-direction: column;
    }

    .content-bloc {
        display: flex;
        justify-content: center; /* Centers the image horizontally */
        align-items: center; /* Centers the image vertically */
        z-index: 2;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0;
        box-sizing: border-box;
        margin-bottom: var(--bloc-margin-bottom);
    }

    .layout-bloc-column {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0;
        box-sizing: border-box;
        padding-left: var(--page-margin);
        padding-right: var(--page-margin);
    }

    .layout-bloc-row {
        display: flex;
        flex-direction: row;
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0;
        box-sizing: border-box;
        padding-left: var(--page-margin);
        padding-right: var(--page-margin);
    }

    /*********************************************************** */
    /* CMS structured text copy */
    /*********************************************************** */
    .blurb-bloc {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-end;
        max-width: 512px;
    }

    /*********************************************************** */
    /* Project links bloc */
    /*********************************************************** */
    .project-links-bloc {
        flex-direction: column;
        align-items: flex-start;
    }

    /*********************************************************** */
    /* Profile Bloc */
    /*********************************************************** */
    .profile-bloc {
        flex-direction: column;
        max-width: 1024px;
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 16px;
    }


    @media (min-width: 700px) {
        .profile-bloc {
            flex-direction: row;
            margin-bottom: 32px;
        }

    }

    .profile-image {
        /*max-width: 512px;*/
        /*max-height: 512px;*/
        max-width: 100%;
        max-height: 100%;
    }

    /*********************************************************** */
    /* Header */
    /*********************************************************** */
    .project-bloc {
        flex-direction: column;
        width: 100%;
        margin-bottom: 16px;
        max-width: 1024px;
        margin-left: auto;
        margin-right: auto;
    }


    @media (min-width: 700px) {
        .project-bloc {
            flex-direction: row;
            margin-bottom: 32px;
        }

        .project-bloc:nth-child(odd) {
            align-items: flex-start; /* Default alignment */
        }

        .project-bloc:nth-child(even) {
            flex-direction: row-reverse; /* Reverse the order of child items */
            align-items: flex-start; /* Align to the right */
        }
    }

    .project-image-bloc {
        height: 100%;
        align-items: self-start;
    }

    .project-image {
        width: 460px;
        height: 263px;

        border-radius: 28px;
        border: 5px solid white;
        display: block;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        object-fit: cover;
    }

    .project-blurb {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        max-width: 512px;
        width: 100%;
        margin-left: 0;
        margin-right: 0;
        height: 100%;
    }

    .profile-nav {
        width: 100%;
        max-width: 1024px;
        margin-left: auto;
        margin-right: auto;
        padding-left: var(--page-margin);
        padding-right: var(--page-margin);
        display: flex;
        flex-direction: row;
        flex: 1 1 0;
        justify-content: flex-start;
        gap: 16px;
    }

    @media (min-width: 700px) {
        .project-image {
            /*max-width: 512px;*/
            /*max-height: 288px;*/
            /*max-width: 100%;*/
            /*max-height: 100%;*/
            /*min-width: 512px;*/
            /*min-height: 288px;*/
            width: 460px;
            height: 263px;
        }

        .project-blurb {
            margin-left: 20px;
            margin-right: 20px;
        }
    }

    /*********************************************************** */
    /* Header */
    /*********************************************************** */
    .home-header {
        padding: 10px;
        z-index: 10;
    }

    .home-header ul {
        display: flex;
        justify-content: space-between;
        align-items: center;
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .home-header ul li {

        flex: 0 1 auto;
        margin-right: 1rem;
    }

    .home-header ul li p {
        margin-bottom: 0;
    }

    .home-header ul li.expand {
        flex: 1 1 auto; /* This ensures the element expands to take up available space */
    }

    /*********************************************************** */
    /* Header */
    /*********************************************************** */
    .button-link {
        display: inline-block;
        padding: 10px 20px;
        border-radius: 25px; /* Adjust for more or less rounded corners */
        background-color: var(--btn-color-fill); /* Fill color */
        border: 4px solid var(--btn-color-stroke); /* Border color */
        color: white; /* Text color */
        text-align: center;
        text-decoration: none; /* Remove underline */
        font-size: 16px; /* Adjust font size as needed */
        font-weight: 400;
        transition: background-color 0.3s, border-color 0.3s; /* Smooth transition for hover effects */
        justify-self: flex-start;
        /*margin-top: auto; !* push item to bottom of flex column*!*/
    }

    .button-link:hover {
        background-color: var(--btn-color-fill--hover); /* Darker fill color on hover */
        border-color: var(--btn-color-stroke--hover); /* Darker border color on hover */
        color: #2e3330
    }

</style>

