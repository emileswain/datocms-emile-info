<script lang="ts">

    import {onMount,} from 'svelte';

    interface Props {
        flush?: boolean;
        title?: string;
        children?: import('svelte').Snippet;
    }

    let {
        flush = false,
        title = "",
        children
    }: Props = $props();

    let loaded = $state(false);
    onMount(() => loaded = true);
</script>
<div class="section-bloc">
    {#if title}
        <h1>{title}</h1>
    {/if}
    {@render children?.()}
</div>


<style>
    /* set default margins of content.*/
    .section-bloc {
        display: flex;
        flex-direction: column;
        flex: 1 1 0;
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
    }


    /*!* remove page padding so elements sit flush with edges of page. *!*/
    /*.flush {*/
    /*    margin-left: 0;*/
    /*    margin-right: 0;*/
    /*}*/

    /*@media ( min-width: 500px) {*/
    /*    .section-maxWidth {*/

    /*    }*/
    /*}*/

    /*@media (min-width: 768px) {*/
    /*    .section-maxWidth {*/
    /*        max-width: var(--page-max-section-width);*/
    /*    }*/
    /*}*/

    /*@media (min-width: 992px) {*/
    /*    .section-maxWidth {*/
    /*        max-width: var(--page-max-section-width);*/
    /*    }*/
    /*}*/

    /*@media (min-width: 1200px) {*/
    /*    .section-maxWidth {*/
    /*        max-width: var(--page-max-section-width);*/
    /*    }*/
    /*}*/
</style>
