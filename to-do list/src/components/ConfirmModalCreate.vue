<template>
  <div v-if="show" class="modal-backdrop d-flex justify-content-center align-items-center">
    <div class="card shadow-lg" style="max-width: 600px;">
      <div class="card-header bg-warning text-dark text-center">
        <h5>{{ title }}</h5>
      </div>
      <div class="card-body">
        <div v-if="errors.length" class="alert alert-danger">
          <ul class="mb-0">
            <li v-for="(err, idx) in errors" :key="idx">{{ err }}</li>
          </ul>
        </div>

        <form v-else>
          <div class="row mb-3">
            <div class="col-md-6">
              <label class="form-label"><strong>Título:</strong></label>
              <input type="text" class="form-control" :value="formData.titulo" disabled />
            </div>
            <div class="col-md-6">
              <label class="form-label"><strong>Prioridade:</strong></label>
              <input type="text" class="form-control" :value="formData.prioridade" disabled />
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-12">
              <label class="form-label"><strong>Descrição:</strong></label>
              <textarea class="form-control" rows="4" :value="formData.descricao" disabled></textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="card-footer d-flex justify-content-between">
        <button class="btn btn-secondary" @click="cancel">Cancelar</button>
        <button class="btn btn-success" :disabled="errors.length" @click="confirm">Confirmar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  show: Boolean,
  title: { type: String, default: 'Confirmação' },
  formData: { type: Object, default: () => ({}) },
  errors: { type: Array, default: () => [] }
})

const emit = defineEmits(['confirm', 'cancel'])

function confirm() { emit('confirm') }
function cancel() { emit('cancel') }
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 1050;
}
</style>
