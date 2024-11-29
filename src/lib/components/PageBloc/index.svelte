<script lang="ts">
    export  let direction = 'column';

</script>

<div class="page-bloc {direction}">
    <slot></slot>
</div>

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
    }

    .column {
        flex-direction: column;
    }
    .row {
        flex-direction: row;
    }


    @media ( min-width: 500px) {
      .page-bloc {
        max-width: 460px;
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
