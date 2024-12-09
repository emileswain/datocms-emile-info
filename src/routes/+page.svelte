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
  import PageBloc from '../lib/components/PageBloc/index.svelte';
  import LayoutBloc from '../lib/components/LayoutBloc/index.svelte';
  import ContentBloc from '../lib/components/BlockLayout/ContentBloc/index.svelte';
  import TopNav from '../lib/components/TopNav/index.svelte';
  import Link from '../lib/components/Link/index.svelte';
  import SectionBlock from '../lib/components/BlockLayout/SectionBlock/index.svelte';
  import { onMount } from 'svelte';
  import Inview from '../lib/components/Inview/index.svelte';

  interface Props {
    data: PageData;
    isBrowser: bool;
  }

  let { data, isBrowser }: Props = $props();
  let subscription = $derived(querySubscription(data.subscription));
  let homepage = $derived($subscription.data?.homepage);
  let projects = $derived($subscription.data?.homepage.projects);
  let pages = $derived([{ title: 'work' }, { title: 'projects' }, { title: 'other' }]);

  onMount(() => {
    if (isBrowser) {
      console.log('This code is running in the browser.');
    } else {
      console.log('This code is running on the server.');
    }
  });
</script>

{#if homepage}
  <!--
            The <Head> component provided by @datocms/svelte automates the creation of
            meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.
          -->
  <!--    <Head data={homepage._seoMetaTags}></Head>-->

  <TopNav>Emile swain</TopNav>
  <PageBloc class="home-page">
    <LayoutBloc>
      <LayoutBloc direction="row" collapseRow="true">
        <ContentBloc numberWang="0" useMaxWidth="true">
          <img
            class="profile-image fade-in"
            src={homepage.profileImage.responsiveImage.src}
            alt={homepage.profileImage.alt ?? 'profile image'}
          />
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
            ]}
          />
        </ContentBloc>
      </LayoutBloc>
      <SectionBlock title="Work">
        <LayoutBloc>
          {#if projects}
            {#each projects as project, i}
              <LayoutBloc direction="row" alternateDirection="true" collapseRow="true">
                <ContentBloc numberWang={i + 1}>
                  <img
                    class="project-image"
                    src={project.heroImage.responsiveImage.src}
                    alt={project.heroImage.alt ?? 'image of project'}
                  />
                </ContentBloc>
                <ContentBloc numberWang={i + 1} useMaxWidth="true">
                  <h1>{project.title}</h1>
                  <StructuredText data={project.shortDescription} />
                  <Link href="/project/{project.slug}" rel="no-prefetch">Explore</Link>
                </ContentBloc>
              </LayoutBloc>
            {/each}
          {:else}
            <p>Loading projects...</p>
          {/if}
        </LayoutBloc>
      </SectionBlock>
      <SectionBlock title="Side Projects">
        <LayoutBloc>
          {#each homepage.pages as page, i}
            <!--                        <a href="/page/{page.title}" rel="no-prefetch">{page.title}</a>-->
            <!--                    <li><a href="/page/{page.slug}" rel="no-prefetch">{page.title}</a></li>-->
            <ContentBloc>
              <h1>{page.title}</h1>
              <StructuredText data={page.shortDescription} />
              <Link href="/page/{page.slug}" rel="no-prefetch">Explore</Link>
            </ContentBloc>
          {/each}
        </LayoutBloc>
      </SectionBlock>
    </LayoutBloc>
  </PageBloc>
{/if}

<style lang="css">
  /* global required to override the class properties that are applied to the PageBloc */
  :global(.container) {
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

  .fade-in {
    opacity: 0;
    animation-name: fadeInOpacity;
    animation-iteration-count: 1;
    animation-timing-function: ease-in;
    animation-duration: 420ms;
    animation-delay: 0s;
    animation-fill-mode: forwards;
  }

  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .project-image {
    width: 100%;
    height: 263px;

    border-radius: 28px;
    border: 3px solid white;
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
