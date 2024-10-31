<script lang="ts">
  import ResponsiveImage from '$lib/components/ResponsiveImage/index.svelte';
  import { type FragmentOf, readFragment } from '$lib/datocms/graphql';
  import { ImageByTextBlockFragment } from './fragments';

  export let data: FragmentOf<typeof ImageByTextBlockFragment>;

  $: unmaskedData = readFragment(ImageByTextBlockFragment, data);
</script>

<div class="image-by-text {unmaskedData.isAlignedRight ? 'reverse' : ''}">
  <figure>
    <!-- Display responsive image -->
    <ResponsiveImage data={unmaskedData.asset.responsiveImage} />
    <!-- Display image title -->
    <!--  <figcaption>{unmaskedData.asset.title}</figcaption>-->
  </figure>
  <div class="text">
    <p>{unmaskedData.copy}</p>
  </div>
</div>

<style>
  .image-by-text .text {
    text-align: left;
    font-size: xx-large;
    margin-right: 1rem;
    margin-left: 1rem;
  }
  :global(.image-by-text.reverse .text) {
    text-align: right !important;
  }

  :global(.image-by-text img) {
    border-radius: 12px;
  }
  .image-by-text {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0 0 64px 0;
    align-items: center;
  }
  .image-by-text.reverse {
    flex-direction: row-reverse;
  }
  :global(.image-by-text > figure > picture > img) {
    /*max-width: 300px;*/
    max-height: 300px;
  }

  @media (max-width: 768px) {
    .text {
      text-align: left !important;
      font-size: xx-large !important;
      margin-left: 0 !important;
      margin-right: 0 !important;
    }
    .image-by-text {
      flex-direction: column;
    }
    .image-by-text.reverse {
      flex-direction: column;
    }
    :global(.image-by-text > figure) {
      margin: 0;
      padding: 0;
    }
    :global(.image-by-text > figure > picture > img) {
      width: 100% !important;
      height: auto !important;
      max-height: none;
    }
  }
</style>
