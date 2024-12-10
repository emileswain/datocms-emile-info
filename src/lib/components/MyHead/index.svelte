<script lang="ts" context="module">
  export interface TitleMetaLinkTag {
    /** the tag for the meta information */
    tag: string;
    /** the inner content of the meta tag */
    content?: string | null | undefined;
    /** the HTML attributes to attach to the meta tag */
    attributes?: Record<string, string> | null | undefined;
  }

  export interface SeoTitleTag {
    tag: 'title';
    content: string | null;
    attributes?: null;
  }

  export interface RegularMetaAttributes {
    name: string;
    content: string;
  }

  export interface OgMetaAttributes {
    property: string;
    content: string;
  }

  export interface SeoMetaTag {
    tag: 'meta';
    content?: null;
    attributes: RegularMetaAttributes | OgMetaAttributes;
  }

  export interface FaviconAttributes {
    sizes: string;
    type: string;
    rel: string;
    href: string;
  }

  export interface AppleTouchIconAttributes {
    sizes: string;
    rel: 'apple-touch-icon';
    href: string;
  }

  export interface SeoLinkTag {
    tag: 'link';
    content?: null;
    attributes: FaviconAttributes | AppleTouchIconAttributes;
  }

  export type SeoTag = SeoTitleTag | SeoMetaTag;
  export type FaviconTag = SeoMetaTag | SeoLinkTag;
  export type SeoOrFaviconTag = SeoTag | FaviconTag;
</script>

<script lang="ts">
  export let data: Array<TitleMetaLinkTag | SeoOrFaviconTag> = [];
  // let { tag, attributes, content } = data;
  // console.log("content ", content)
  function sortByNullContent(arr) {
    return arr.sort((a, b) => {
      if (a.content === null && b.content !== null) {
        return -1;
      }
      if (a.content !== null && b.content === null) {
        return 1;
      }
      return 0;
    });
  }

  function filterOutContent(arr) {
    return arr.filter((item) => item.content === null || item.content === '');
  }

  let sortedData = filterOutContent(data);
</script>

{#snippet MetaContent(tag, attributes, content)}
  <svelte:element this={tag} {...attributes}>c{content}</svelte:element>
{/snippet}

{#snippet MetaNoContent(tag, attributes)}
  <svelte:element this={tag} {...attributes} />
{/snippet}

<svelte:head>
  {#each sortedData as { tag, attributes, content }}
    {#if content}
      {@render MetaContent(tag, attributes, content)}
    {:else}
      {@render MetaNoContent(tag, attributes)}
    {/if}
  {/each}
</svelte:head>
