<script lang="ts">
  import { Head, querySubscription, StructuredText } from '@datocms/svelte';
  import type { PageData } from './$types';
  import LayoutBloc from '../../../lib/components/LayoutBloc/index.svelte';
  import ContentBloc from '../../../lib/components/BlockLayout/ContentBloc/index.svelte';
  import PageBloc from '../../../lib/components/PageBloc/index.svelte';
  import Link from '../../../lib/components/Link/index.svelte';
  import TopNav from '../../../lib/components/TopNav/index.svelte';

  interface Props {
    data: PageData;
  }

  let { data }: Props = $props();
  let subscription = $derived(querySubscription(data.subscription));
  let page = $derived($subscription.data?.page);
</script>

{#if page}
  <!--
      The <Head> component provided by @datocms/svelte automates the creation of
      meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.
    -->
  <!--    <Head data={page._seoMetaTags}/>-->

  <PageBloc class="article-page">
    <TopNav></TopNav>
    <LayoutBloc>
      <ContentBloc>
        <h1>This is a header</h1>
        <p>
          I'm a versatile programmer and maker, primarily focused on building Flutter apps. I also
          enjoy exploring new dimensions with Unity 3D and other technologies, bringing a variety of
          digital projects to life. Whether it’s coding, designing, or experimenting with new tech,
          I’m always excited to create something new. Take a look at my projects to see the range of
          what I can do, and let’s get connected!
        </p>
      </ContentBloc>
      <LayoutBloc direction="row" collapseRow="true">
        <ContentBloc>
          <h1>This is a header</h1>
          <p>
            I'm a versatile programmer and maker, primarily focused on building Flutter apps. I also
            enjoy exploring new dimensions with Unity 3D and other technologies, bringing a variety
            of digital projects to life. Whether it’s coding, designing, or experimenting with new
            tech, I’m always excited to create something new. Take a look at my projects to see the
            range of what I can do, and let’s get connected!
          </p>
          <Link>Explore</Link>
        </ContentBloc>
        <ContentBloc>
          <h1>This is a header</h1>
          <p>
            I'm a versatile programmer and maker, primarily focused on building Flutter apps. I also
            enjoy exploring new dimensions with Unity 3D and other technologies, bringing a variety
            of digital projects to life. Whether it’s coding, designing, or experimenting with new
            tech, I’m always excited to create something new. Take a look at my projects to see the
            range of what I can do, and let’s get connected!
          </p>
          <Link>Explore</Link>
        </ContentBloc>
        <ContentBloc>
          <h1>This is a header</h1>
          <p>
            I'm a versatile programmer and maker, primarily focused on building Flutter apps. I also
            enjoy exploring new dimensions with Unity 3D and other technologies, bringing a variety
            of digital projects to life. Whether it’s coding, designing, or experimenting with new
            tech, I’m always excited to create something new. Take a look at my projects to see the
            range of what I can do, and let’s get connected!
          </p>
          <Link>Explore</Link>
        </ContentBloc>
      </LayoutBloc>
    </LayoutBloc>
  </PageBloc>
{/if}

<style lang="css">
</style>
