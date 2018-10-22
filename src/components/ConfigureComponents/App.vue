<template>
  <div>
    <h5>App</h5>
    <label for="navbarVariant">Navbar variant:</label>
    <b-form-select id="navbarVariant" v-model="config.app.navbarVariant" :options="navbarOptions" class="mb-3" />
    <label for="manifestUrl">manifestUrl</label>
    <b-form-input v-model="config.manifestUrl"
              type="text"
              id="manifestUrl"
              >
    </b-form-input>
  </div>
</template>

<style></style>

<script>
export default {
  props: ['config'],
  data() {
    return {
      navbarOptions: ['primary', 'secondary', 'info', 'warning', 'danger'],
    };
  },
  methods: {

  },
};
</script>
