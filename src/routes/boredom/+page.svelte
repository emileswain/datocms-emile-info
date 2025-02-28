<script lang="ts">

  import type {PageData} from './$types';
  import PageBloc from "../../lib/components/PageBloc/index.svelte";
  import TopNav from "../../lib/components/TopNav/index.svelte";
  import Icon from "../../lib/components/Icon/index.svelte";
  import LayoutBloc from "../../lib/components/LayoutBloc/index.svelte";
  import ContentBloc from "../../lib/components/BlockLayout/ContentBloc/index.svelte";
  import BlockLayout from "../../lib/components/BlockLayout/index.svelte";


  interface Props {

  }

  let {}: Props = $props();
  let delay = (0);;

  function getDelay() {
    delay += 150;
    return delay;
  }

  let messages = [`There is
no time for
boredom
`,
    `Add a little
nothing into
your day`];

</script>


<!--
    The <Head> component provided by @datocms/svelte automates the creation of
    meta tags based on the `_seoMetaTags` present in a DatoCMS GraphQL query.
  -->
<!--    <Head data={page._seoMetaTags}>-->
<!--        <title></title>-->
<!--    </Head>-->
<div class="boredom-page">
    <div class="infinity-scroll">
        {#each messages as message, i}

            <div class="infinity-block">
                <p class="boredom-text">
                    {#each message.split("\n") as line, l}
                        {#each line.split(" ") as word, w}
                            <span style="animation-delay: {getDelay()}ms;">{word}</span>&nbsp;
                        {/each}
                        <br/>
                    {/each}
                </p>
            </div>
        {/each}
    </div>
</div>


<style lang="css">

    .boredom-page {
        display: flex;
        /*@formatter:off*/
        /*noinspection CssInvalidPropertyValue*/
        min-height: 100 dvh;
        /*@formatter:on*/
        background-color: #242424;
    }

    /*
        A column of content that scrolls infinitely
        Contains a list of .infinity-blocks(s)
        Each block will represent a max view dimension?
        or
        a centered square
    */
    .infinity-scroll {
        display: flex;
        flex-direction: column;
        margin-left: auto;
        margin-right: auto;
    }

    /*
        A single block unit of the infinity scroll.

     */
    .infinity-block {
        /*@formatter:off*/
        /*noinspection CssInvalidPropertyValue*/
        width: 1024px;
        /*noinspection CssInvalidPropertyValue*/
        min-height: 100dvh;
        height: 100dvh;
        /*@formatter:on*/
        display: flex;
        flex-direction: column;
        align-self: center;
        justify-content: center;
    }

    .boredom-text {
        font-size: 42px;
        color: #f8f8f8;
        line-height: 42px;
        letter-spacing: 42px;
    }

    .boredom-text > span {
        display: inline-block;
        margin-left: 0;
        opacity: 0;
        animation: fadeIn 1s forwards;
        /*animation-delay: 0ms;*/
    }

    /*.boredom-text > span:nth-child(1) {*/
    /*    animation-delay: 100ms*/
    /*}*/

    /*.boredom-text > span:nth-child(2) {*/
    /*    animation-delay: 200ms*/
    /*}*/

    /*.boredom-text > span:nth-child(3) {*/
    /*    animation-delay: 300ms*/
    /*}*/

    /*.boredom-text > span:nth-child(4) {*/
    /*    animation-delay: 400ms*/
    /*}*/

    /*.boredom-text > span:nth-child(5) {*/
    /*    animation-delay: 500ms*/
    /*}*/

    /*.boredom-text > span:nth-child(6) {*/
    /*    animation-delay: 600ms*/
    /*}*/

    /*.boredom-text > span:nth-child(7) {*/
    /*    animation-delay: 800ms*/
    /*}*/

    /*.boredom-text > span:nth-child(8) {*/
    /*    animation-delay: 900ms*/
    /*}*/

    @keyframes fadeIn {
        0% {
            opacity: 0;
            margin-left: 20px;
        }
        100% {
            opacity: 1;
            margin-left: 0px;
        }
    }

</style>
