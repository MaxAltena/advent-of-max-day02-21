<img
  src="/images/backgrounds/top-right.svg"
  class="background background--top-right"
  alt="Background illustration"
/>
<img
  src="/images/backgrounds/bottom-right.svg"
  class="background background--bottom-right"
  alt="Background illustration"
/>
<img
  src="/images/backgrounds/left.svg"
  class="background background--left"
  alt="Background illustration"
/>

<style scoped>
  .background {
    position: fixed;
    pointer-events: none;
    z-index: 0;
    user-select: none;
    -webkit-user-drag: none;
  }

  .background--left {
    inset-inline-start: 0;
    inset-block: 50%;
    transform: translateY(-50%);
    max-height: 100%;
		max-width: 27.5vw;
  }

  .background--top-right {
    inset-inline-end: 0;
    inset-block-start: 0;
    max-height: 35%;
    max-width: 50vw;
  }

  .background--bottom-right {
    inset-block-end: 0;
    inset-inline-end: 0;
    max-height: 65%;
    max-width: 55vw;
  }
</style>
