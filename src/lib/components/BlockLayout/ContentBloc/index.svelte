<svelte:window bind:scrollY bind:innerHeight/>
<script lang="ts">
    import {fade} from 'svelte/transition';

    import {onMount,} from 'svelte';

   interface Props {
      flush?: boolean;
      useMaxWidth?: boolean;
      align?: string;
      numberWang?: number;
      children?: import('svelte').Snippet;
   }

   let {
      flush = false,
      useMaxWidth = false,
      align = "top",
      numberWang = 0,
      children
   }: Props = $props();

    // WIP - animate when in view.
    let innerHeight = $state();
    let element = $state();
    let elementHeight = $state();
    let scrollY = $state();

    let offset = ($derived(element && element.offsetTop))
    let height = $derived(scrollY / (offset + elementHeight) * 100);
    let innerHeightCalc = $derived(offset - scrollY < innerHeight * 0.9);
    // end WIP.
    let loaded = $state(false);
    onMount(() => loaded = true);

//     <!-- Investigate SSR approach for animations. -->
//
//     <!--{#key numberWang}-->
//     <!--    <div in:fade={{delay: 500 * key, duration: 500}} class="content-bloc {flush ? 'flush' : ''} {useMaxWidth ? 'content-maxWidth' : ''}  {align === 'bottom' ? 'content-align-bottom' : 'content-align-top'}">-->
//     <!--        <slot></slot>-->
// <!--    </div>-->
//     <!--{/key}-->
</script>

{#if loaded}
        <div bind:this={element} bind:clientHeight="{elementHeight}" in:fade={{delay: (500  * numberWang), duration: 500}} class="content-bloc {flush ? 'flush' : ''} {useMaxWidth ? 'content-maxWidth' : ''}  {align === 'bottom' ? 'content-align-bottom' : 'content-align-top'}">
            {@render children?.()}
        </div>
{:else}
    <div class="content-bloc {flush ? 'flush' : ''} {useMaxWidth ? 'content-maxWidth' : ''}  {align === 'bottom' ? 'content-align-bottom' : 'content-align-top'}">
        {@render children?.()}
    </div>
{/if}

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
