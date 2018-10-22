<template>
  <div>
    <h5 class="mt3 pt-3">Tutorial</h5>

    <div class="form-check">
      <input class="form-check-input" type="checkbox" v-model="config.needsTutorial" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
        Needs a tutorial?
      </label>
    </div>

  </div>
</template>
<script>
  export default {
    props: ['config'],
  };
</script>
<style></style>
