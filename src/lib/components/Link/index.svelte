<script lang="ts">
    export let href:string = '';
</script>

<a class="link" href={href} {...$$restProps}>
    <slot></slot>
</a>

<style>

    .link {
        display: inline-block;
        padding: 10px 20px;
        border-radius: 25px; /* Adjust for more or less rounded corners */
        background-color: var(--btn-color-fill); /* Fill color */
        border: 4px solid var(--btn-color-stroke); /* Border color */
        color: white; /* Text color */
        text-align: center;
        text-decoration: none; /* Remove underline */
        font-size: 16px; /* Adjust font size as needed */
        font-weight: 400;
        transition: background-color 0.3s, border-color 0.3s; /* Smooth transition for hover effects */
        justify-self: flex-start;
        /*margin-top: auto; !* push item to bottom of flex column*!*/
    }

    .link:hover {
        background-color: var(--btn-color-fill--hover); /* Darker fill color on hover */
        border-color: var(--btn-color-stroke--hover); /* Darker border color on hover */
        color: #2e3330
    }
</style>
