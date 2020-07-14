<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" class="home">
        <font-awesome-icon :icon="['fas','home']"></font-awesome-icon>
      </router-link>
      <router-link to="/list" class="list">
        <font-awesome-icon :icon="['fas','plus-circle']"></font-awesome-icon>
      </router-link>
      <router-link to="/settings" class="settings">
        <font-awesome-icon :icon="['fas','cog']"></font-awesome-icon>
      </router-link>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>
