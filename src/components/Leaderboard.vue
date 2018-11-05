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
 * The leaderboard component for the route `/leaderboard`. It displays the
 * rank, badge, player username, and score. You can sort based on the score.
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
       * This is an object that looks like:
       ```
       {
        username: {
          level:
          score:
          taken_tutorial:
          consent:
          admin:
        }
      }
       ```
       * it comes directly from the `/users` document in Firebase.
       */
      allUsers: {
        type: Object,
        required: true,
      },
    },
    computed: {
      /**
       * Convert the allUsers prop to a list from an Object.
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
         * Tell the table component to sort by the score.
         */
        sortBy: 'score',
        /**
         * Tell the table component to sort descending.
         */
        sortDesc: true,
        /**
         * The fields specification for the table component. Tell the table
         * how to display the column names, and whether or not the column can be
         * sorted.
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
