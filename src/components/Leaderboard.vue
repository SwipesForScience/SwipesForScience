<template name="leaderboard">
  <div class="page">
    <div class="page-title">
      <h1>Leaderboard</h1>
    </div>
    <div class="page__content grey-gradient-bg">
      <div class="page__content-container">
        <div class="leaderboard">
          <transition-group tag="div" name="list" class="leaderboard__rows">
            <div
              v-for="(user, index) in displayUsersList"
              v-bind:key="user.name"
              class="leaderboard__row"
            >
              <div class="leaderboard__row-container">
                <div class="leaderboard__cell user-index">{{ index + 1 }}</div>
                <div class="leaderboard__cell avatar">
                  <div class="avatar">
                    <img
                      src="../assets/kesh-profile-icon.svg"
                      alt="Swipes for Science logo"
                    />
                  </div>
                </div>
                <div class="leaderboard__cell username">{{ user.name }}</div>
                <div v-if="index === 0" class="leaderboard__cell crown">
                  <img src="../assets/leaderboard-crown.svg" alt="Medal" />
                </div>
                <div class="leaderboard__cell user-score">
                  <div>{{ user.score }}</div>
                </div>
              </div>
              <hr class="dashed-decorative-line" />
            </div>
          </transition-group>
          <button
            @click="showMore()"
            id="leaderboard__showMore"
            class="full-size-desktop"
            v-if="displayLimit < sortedUsersList.length"
          >
            Load more
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.leaderboard {
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  font-weight: 600;
}
/* Leaderboard row */
.leaderboard__rows {
  margin-bottom: 1.25em;
}
.leaderboard__row {
  width: 100%;
  border-radius: 0.5em;
}
.leaderboard__row-container {
  padding: 1.25em;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/* Leaderboard top score row */
.leaderboard__row:first-of-type .leaderboard__row-container {
  background-color: hsl(253, 44%, 47%);
  color: hsl(0, 0%, 100%);
  border-radius: 8px;
  margin-bottom: 1.25em;
}
/* Leaderboard cell */
.leaderboard__cell {
  text-align: left;
  margin-right: 1em;
}
.leaderboard__cell:first-of-type,
.leaderboard__cell:last-of-type {
  margin: 0;
}

.leaderboard__cell.user-index {
  width: calc(20% - 1em);
}
.leaderboard__cell.avatar {
  margin-right: 0.5em;
  width: 2.5em;
}
.leaderboard__cell.username {
  flex-grow: 1;
  font-size: 0.875em;
}
.leaderboard__cell.crown {
  width: 2em;
}
.leaderboard__cell.user-score {
  position: relative;
  font-weight: 700;
  width: 2.5em;
  padding-left: 1em;
}
.leaderboard__cell.user-score:before {
  font: normal normal normal 14px/1 FontAwesome;
  content: "\F005";
  color: hsl(43, 97%, 55%);
  position: absolute;
  left: 0px;
}

.dashed-decorative-line {
  border: 0;
  background-repeat: repeat-x;
  width: 80%;
  height: 3px;
  background-image: linear-gradient(
    90deg,
    hsl(253, 44%, 47%),
    hsl(253, 44%, 47%) 60%,
    transparent 60%,
    transparent 100%
  );
  background-size: 15px 1px;
  margin: 0;
  margin-left: auto;
}
@media (min-width: 30em) {
  .leaderboard__cell.user-index {
    width: calc(10% - 1em);
  }
  .leaderboard__cell.crown {
    flex-grow: 1;
  }
  .leaderboard__cell.crown img {
    width: 50px;
  }
  .leaderboard__cell.username {
    padding-left: 1.25em;
  }
  .leaderboard__cell.user-score:before {
    left: -10px;
  }
  .dashed-decorative-line {
    width: 90%;
  }
}
@media (min-width: 65em) {
  .page__content-container {
    background-color: white;
    padding: 1.25em 4em;
    border-radius: 20px;
  }
}
</style>

<script>
import { ref, get, getDatabase } from "firebase/database";
/**
 * The leaderboard component for the route `/leaderboard`. It displays the
 * rank, badge, player username, and score. You can sort based on the score.
 */

export default {
  name: "leaderboard",
  props: {
    /**
     * the various levels, the points need to reach the levels,
     * and the badges (colored and greyed out) to display
     */
    levels: {
      type: Object,
      required: true,
    },
  },
  mounted() {
    get(ref(getDatabase(), "users")).then((snapshot) => {
      if (snapshot.exists()) {
        this.allUsers = snapshot.val();
      }
    });
  },
  computed: {
    sortedUsersList() {
      /* Removes '.key' property present on allUsers data */
      let allUsernames = Object.keys(this.allUsers).filter(
        (userName) => userName !== ".key"
      );
      // eslint-disable-next-line
      allUsernames = allUsernames.map((userName) => {
        return { name: userName, score: this.allUsers[userName].score };
      });
      /* Sort descending by score */
      allUsernames.sort((a, b) => b.score - a.score);
      return allUsernames;
    },
    displayUsersList() {
      return this.sortedUsersList.slice(0, this.displayLimit);
    },
  },
  data() {
    return {
      allUsers: {},
      /**
       * Tell the table component to sort by the score.
       */
      sortBy: "score",
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
        "rank",
        "badge",
        {
          key: ".key",
          label: "Player",
          sortable: false,
        },
        {
          key: "score",
          label: "Score",
          sortable: true,
        },
      ],
      displayLimit: 10,
    };
  },
  methods: {
    showMore() {
      // Show 10 more users at a time until maximum number of users reached
      this.displayLimit =
        this.displayLimit < this.sortedUsersList.length
          ? Math.min(this.displayLimit + 10, this.sortedUsersList.length)
          : this.displayLimit;
    },
  },
};
</script>
