<template name="leaderboard">
  <div class="container" id="leaderboard">
    <h1>Leaderboard</h1>
    <b-table striped hover :items="allUsersList" :fields="fields"
    :sort-desc.sync="sortDesc" :sortBy.sync="sortBy">
    <template slot="rank" slot-scope="data">
      {{data.index + 1}}
    </template>
    <template slot="badge" slot-scope="data">
      <img class="avatar" :src="levels[data.item.level].img" />
    </template>
    </b-table>
  </div>
</template>

<style>
#leaderboard {
  min-height: 100vh;
}

.avatar {
  width: 15px;
}
</style>

<script>
/**
 * Leaderboard
 */
  import _ from 'lodash';

  export default {
    name: 'leaderboard',
    props: {
      /**
       * the various levels, the points need to reach the levels,
       * and the badges (colored and greyed out) to display
       */
      levels: {
        type: Object,
        required: true,
      },
      /**
       * TODO: fill this in.
       */
      allUsers: {
        type: Object,
        required: true,
      },
    },
    computed: {
      /**
       * TODO: fill this in.
       */
      allUsersList() {
        // eslint-disable-next-line
        return _.filter(_.map(this.allUsers, (value, key) => {
          return { ...value, '.key': key };
        }), v => v['.key'] !== '.key');
      },
    },
    data() {
      return {
        /**
         * TODO: fill this in.
         */
        sortBy: 'score',
        /**
         * TODO: fill this in.
         */
        sortDesc: true,
        /**
         * TODO: fill this in.
         */
        fields: [
          'rank',
          'badge',
          {
            key: '.key',
            label: 'Player',
            sortable: false,
          },
          {
            key: 'score',
            label: 'Score',
            sortable: true,
          },
        ],
      };
    },
  };
</script>
