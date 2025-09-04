<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: Boolean,
  formData: Object,  
  errors: Array
})

const emit = defineEmits(['confirm', 'cancel'])
</script>

<template>
  <div v-if="show" class="modal fade show d-block" tabindex="-1" style="background: rgba(0,0,0,0.5);">
    <div class="modal-dialog">
      <div class="modal-content shadow-lg">
        <div class="modal-header bg-warning text-dark">
          <h5 class="modal-title">Confirme a edição do chamado</h5>
          <button type="button" class="btn-close" @click="$emit('cancel')"></button>
        </div>
        <div class="modal-body">
          <!-- Mostra erros se houver -->
          <div v-if="errors && errors.length" class="alert alert-danger">
            <ul class="mb-0">
              <li v-for="(e, i) in errors" :key="i">{{ e }}</li>
            </ul>
          </div>

          <form>
            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label"><strong>Título</strong></label>
                <input type="text" class="form-control" :value="formData.titulo" disabled />
              </div>
              <div class="col-md-6">
                <label class="form-label"><strong>Prioridade</strong></label>
                <input type="text" class="form-control" :value="formData.prioridade" disabled />
              </div>
            </div>

            <div class="row mb-3">
              <div class="col-md-6">
                <label class="form-label"><strong>Status</strong></label>
                <input type="text" class="form-control" :value="formData.status" disabled />
              </div>
              <div class="col-md-6">
                <label class="form-label"><strong>Data de Edição</strong></label>
                <input type="text" class="form-control" :value="new Date().toLocaleString()" disabled />
              </div>
            </div>

            <div class="mb-3">
              <label class="form-label"><strong>Descrição</strong></label>
              <textarea class="form-control" :value="formData.descricao" rows="5" disabled></textarea>
            </div>
          </form>

          <p class="mt-3">Deseja confirmar a atualização deste chamado?</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="$emit('cancel')">Cancelar</button>
          <button type="button" class="btn btn-success" @click="$emit('confirm')">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>