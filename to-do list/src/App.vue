<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="/">Sistema de Chamados</a>
        <div>
          <router-link class="btn btn-light me-2" to="/">Home</router-link>
          <router-link class="btn btn-light" to="/novo">Novo Chamado</router-link>
        </div>
      </div>
    </nav>

    <main class="flex-fill">
      <router-view></router-view>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Footer from './components/Footer.vue'
</script>
