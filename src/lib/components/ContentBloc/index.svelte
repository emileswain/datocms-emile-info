<svelte:window bind:scrollY bind:innerHeight/>
<script lang="ts">
    import {fade} from 'svelte/transition';

    export let flush = false;
    export let useMaxWidth = false;
    export let align = "top";
    import {onMount,} from 'svelte';

    export let numberWang: number = 0;

    // WIP - animate when in view.
    let element;
    let height;
    let scrollY;
    let innerHeight;

    $: offset = (element && element.offsetTop)
    $: result = scrollY / (offset + height) * 100
    $: inView = offset - scrollY < innerHeight * 0.9;
    // end WIP.

    let loaded = false;
    onMount(() => loaded = true);
</script>
<!-- Investigate SSR approach for animations. -->

<!--{#key numberWang}-->
<!--    <div in:fade={{delay: 500 * key, duration: 500}} class="content-bloc {flush ? 'flush' : ''} {useMaxWidth ? 'content-maxWidth' : ''}  {align === 'bottom' ? 'content-align-bottom' : 'content-align-top'}">-->
<!--        <slot></slot>-->
<!--    </div>-->
<!--{/key}-->
{#if loaded}
        <div bind:this="{element}" bind:clientHeight="{height}" in:fade={{delay: (500  * numberWang), duration: 500}} class="content-bloc {flush ? 'flush' : ''} {useMaxWidth ? 'content-maxWidth' : ''}  {align === 'bottom' ? 'content-align-bottom' : 'content-align-top'}">
            <slot></slot>
        </div>
{:else}
    <div class="content-bloc {flush ? 'flush' : ''} {useMaxWidth ? 'content-maxWidth' : ''}  {align === 'bottom' ? 'content-align-bottom' : 'content-align-top'}">
        <slot></slot>
    </div>
{/if}

<!--
   Wraps visible content elements such as h1, p, a, elements.
-->
<style>
    /* set default margins of content.*/
    .content-bloc {
        display: block;
        margin: 0 var(--page-margin) var(--page-margin) var(--bloc-margin-bottom);
        width: auto;
        height: fit-content;
        flex: 1 1 0;

        /*Added to avoid scroll behaviour on parent element. (on page/slug )*/
        overflow-x: clip;
        max-width: 100vw;
    }

    .content-maxWidth {

    }

    .content-align-bottom {
        align-content: flex-end;
        height: 100%;
    }

    .content-align-top {

    }

    /* remove page padding so elements sit flush with edges of page. */
    .flush {
        margin-left: 0;
        margin-right: 0;
    }

    @media ( min-width: 500px) {
        .content-maxWidth {

        }
    }

    @media (min-width: 768px) {
        .content-maxWidth {
            max-width: var(--page-max-content-width);
        }
    }

    @media (min-width: 992px) {
        .content-maxWidth {
            max-width: var(--page-max-content-width);
        }
    }

    @media (min-width: 1200px) {
        .content-maxWidth {
            max-width: var(--page-max-content-width);
        }
    }
</style>
