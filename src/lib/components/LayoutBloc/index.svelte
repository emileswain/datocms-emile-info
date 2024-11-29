<script lang="ts">
    export  let direction = 'column';
    export let collapseRow = false; /* set true if row elements should convert to column layout when width is too small. */

</script>

<div class="layout-bloc {direction} {collapseRow ? 'wrap-settings':''} " {...$$restProps}>
    <slot></slot>
</div>

<style>
    .layout-bloc {
        display: flex;
        flex: 1 1 0;
        gap: var(--page-gap);
        margin: 0;
        padding: 0;
        width:100%;
        height:100%;
    }

    .column {
        flex-direction: column;
    }

    .row {
        flex-direction: row;
    }

    /**
    On mobile, we can define if we want row elements to switch to column when not enough space.
     */
    .wrap-settings {
        flex-direction: column;
    }
    @media (min-width: 500px) {
        .wrap-settings {
            flex-direction: column;
        }
    }
    @media (min-width: 768px) {
        .wrap-settings {
            flex-direction: column;
        }
    }
    @media (min-width: 992px) {
        .wrap-settings {
            flex-direction: row;
        }
    }
    @media (min-width: 1200px) {
        .wrap-settings {
            flex-direction: row;
        }
    }

</style>

