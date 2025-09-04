import { ref, onMounted } from 'vue'
import axios from 'axios'

const tickets = ref([])

const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
  headers: { 'Content-Type': 'application/json' }
})

async function carregarTickets() {
  try {
    const response = await api.get('/tickets')
    tickets.value = response.data
  } catch (error) {
    console.error('Erro ao carregar tickets:', error)
  }
}

async function criarTicket(titulo, descricao, prioridade) {
  try {
    const response = await api.post('/tickets', { titulo, descricao, prioridade, status: 'Aberto' })
    tickets.value.push(response.data)
  } catch (error) {
    console.error('Erro ao criar ticket:', error)
  }
}

async function editarTicket(id, dados) {
  try {
    const response = await api.put(`/tickets/${id}`, dados)
    const index = tickets.value.findIndex(t => t.id === id)
    if (index !== -1) tickets.value[index] = response.data
  } catch (error) {
    console.error('Erro ao editar ticket:', error)
  }
}

async function removerTicket(id) {
  try {
    await api.delete(`/tickets/${id}`)
    tickets.value = tickets.value.filter(t => t.id !== id)
  } catch (error) {
    console.error('Erro ao remover ticket:', error)
  }
}

export function useTickets() {
  onMounted(carregarTickets) // carrega tickets ao montar o componente
  return { tickets, criarTicket, editarTicket, removerTicket }
}
