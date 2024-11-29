<script lang="ts">
    export let flush = false;

</script>

<div class="content-bloc {flush ?? 'flush'}">
    <slot></slot>
</div>

<style>
    /* set default margins of content.*/
    .content-bloc {
        display: block;
        margin-left: var(--page-margin);
        margin-right: var(--page-margin);
        margin-bottom: var(--bloc-margin-bottom);
        width:auto;
        height:fit-content;
    }

    /* remove page padding so elements sit flush with edges of page. */
    .flush{
        margin-left:0;
        margin-right:0;
    }
</style>
