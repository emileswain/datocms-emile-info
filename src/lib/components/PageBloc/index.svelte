<script lang="ts">
    export  let direction = 'column';

</script>

<div class="page-bloc {$$restProps.class} direction-{direction} ">
    <slot></slot>
</div>

<!--
    Fill page
-->
<style>

    .page-bloc {
        display: flex;
        flex: 1 1 0;
        gap:0;
        margin-left: auto;
        margin-right: auto;
        padding: 0;
        width:auto;
        height:max-content;
        /*Added to fix mobile x scroll issue when child content wider than page.*/
        max-width: 100vw;
    }

    .direction-column {
        flex-direction: column;
    }
    .direction-row {
        flex-direction: row;
    }


    @media ( min-width: 500px) {
      .page-bloc {
        max-width: 100%;
      }
    }
    @media (min-width: 768px) {
      .page-bloc {
        max-width: 720px;
      }
    }
    @media (min-width: 992px) {
      .page-bloc {
        max-width: 960px;
      }
    }
    @media (min-width: 1200px) {
      .page-bloc {
        max-width: 1140px;
      }
    }
</style>
