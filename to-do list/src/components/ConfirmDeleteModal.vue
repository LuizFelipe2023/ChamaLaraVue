<template>
  <div v-if="show" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5);">
    <div class="modal-dialog">
      <div class="modal-content shadow-lg">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title">Confirmar exclusão</h5>
          <button type="button" class="btn-close" @click="$emit('cancel')"></button>
        </div>
        <div class="modal-body">
          <p>Você tem certeza que deseja excluir o chamado <strong>{{ chamado.titulo }}</strong>?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Cancelar</button>
          <button type="button" class="btn btn-danger" @click="$emit('confirm')">Excluir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  chamado: Object
})
</script>
