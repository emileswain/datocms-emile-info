<script lang="ts">
    import ResponsiveImage from '$lib/components/ResponsiveImage/index.svelte';
    import {type FragmentOf, readFragment} from '$lib/datocms/graphql';
    import {ImageBlockFragment} from './fragments';

    export let data: FragmentOf<typeof ImageBlockFragment>;

    $: unmaskedData = readFragment(ImageBlockFragment, data);
</script>

<figure>
    <!-- Display responsive image -->
    <ResponsiveImage data={unmaskedData.asset.responsiveImage}/>

    <ResponsiveImage data={unmaskedData.asset.responsiveImage}/>
    <ResponsiveImage data={unmaskedData.asset.responsiveImage}/>
    <!-- Display image title -->
    <!--  <figcaption>{unmaskedData.asset.title}</figcaption>-->
</figure>

<style>
    figure {
        display: flex;
    }
    :global(figure > picture:first-child > img) {
        width: 100% !important;
        height: unset !important;
        filter: unset !important;
        margin-left: unset !important;
    }
    :global(figure > picture > img) {
        width: 30px !important;
        height: 100% !important;
        object-fit: cover !important;
        margin-left: 20px;
        filter: blur(4px);
    }


</style>

