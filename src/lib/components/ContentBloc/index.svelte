<script lang="ts">
    export let flush = false;
    export let useMaxWidth=false;
    export let align="top";
</script>

<div class="content-bloc {flush ? 'flush' : ''} {useMaxWidth ? 'content-maxWidth' : ''}  {align === 'bottom' ? 'content-align-bottom' : 'content-align-top'}" >
    <slot></slot>
</div>


<!--
   Wraps visible content elements such as h1, p, a, elements.
-->
<style>
    /* set default margins of content.*/
    .content-bloc {
        display: block;
        margin: 0 var(--page-margin)  var(--page-margin) var(--bloc-margin-bottom) ;
        width:auto;
        height:fit-content;
    }

    .content-maxWidth{
        max-width: var(--page-max-content-width);
    }

    .content-align-bottom{
        align-content: flex-end;
        height:100%;
    }

    .content-align-top{

    }

    /* remove page padding so elements sit flush with edges of page. */
    .flush{
        margin-left:0;
        margin-right:0;
    }
</style>
