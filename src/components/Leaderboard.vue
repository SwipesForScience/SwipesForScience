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
  import _ from 'lodash';

  export default {
    name: 'leaderboard',
    props: ['allUsers', 'levels'],
    computed: {
      allUsersList() {
        // eslint-disable-next-line
        return _.filter(_.map(this.allUsers, (value, key) => {
          return { ...value, '.key': key };
        }), v => v['.key'] !== '.key');
      },
    },
    data() {
      return {
        sortBy: 'score',
        sortDesc: true,
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
