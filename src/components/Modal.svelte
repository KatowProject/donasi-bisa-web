<script>
    export let open = false;
    export let showBackdrop = true;
    export let onClosed;
  
    const modalClose = () => {
      open = false;
      if (onClosed) {
        onClosed();
      }
    }
</script>

{#if open}
  <div class="modal" id="sampleModal" tabindex="-1"
    role="dialog" aria-labelledby="sampleModalLabel" aria-hidden={false}
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="sampleModalLabel">
            <slot name="title">Modal title</slot>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"
            on:click={modalClose}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot name="body">...</slot>
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" on:click={modalClose}>Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </slot>
        </div>
      </div>
    </div>
  </div>
  {#if showBackdrop}
    <div class="modal-backdrop show" />
  {/if}
{/if}

<style>
  .modal {
    display: block;
  }
</style>