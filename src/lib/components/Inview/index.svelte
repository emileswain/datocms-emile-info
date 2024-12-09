<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { writable } from 'svelte/store';

  interface Props {
    fadeIn?: boolean;
    slideUp?: boolean;
    sticky?: boolean;
    children?: import('svelte').Snippet;
  }

  let isVisible = writable(false);
  let { sticky = false, fadeIn = true, slideUp = true, children }: Props = $props();
  let element;

  function checkVisibility(element) {
    const rect = element.getBoundingClientRect();
    const isAboveViewport = rect.bottom < 0;
    const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (isInViewport || isAboveViewport) {
      isVisible.set(true);
      if (sticky) {
        observer.disconnect();
      }
    } else {
      isVisible.set(false);
    }
  }

  onMount(() => {
    let observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible.set(entry.isIntersecting);
          if (entry.isIntersecting == true && sticky) {
            observer.disconnect();
          }
        });
      },
      { threshold: 0 },
    );

    observer.observe(element);

    checkVisibility(element);

    onDestroy(() => {
      observer.disconnect();
    });
  });
</script>

<div
  bind:this={element}
  class:slide-up={slideUp}
  class:fade-in={fadeIn}
  class:visible={$isVisible}
  style="animation-name: {fadeIn && $isVisible ? 'fadeIn' : ''}, {slideUp && $isVisible
    ? 'slideUp'
    : ''}; animation-duration: 0.5s; animation-fill-mode: forwards;"
>
  <!--<div bind:this={element} class:slide-up={slideUp} class:fade-in={fadeIn} class:visible={$isVisible} >-->
  {@render children?.()}
</div>

<style>
  @keyframes -global-fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .fade-in {
    opacity: 0;
  }

  @keyframes -global-slideUp {
    from {
      transform: translateY(20px);
    }
    to {
      transform: translateY(0);
    }
  }

  .slide-up {
    transform: translateY(20px);
  }
</style>
