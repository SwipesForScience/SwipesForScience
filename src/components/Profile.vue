<template>
  <div class="frame frame--game">
    <div class="profile">
      <div class="profile__content">
        <h1 class="heading">Profile</h1>
        <div class="profile__tiles">
          <div class="profile__tile">
            <span>Score</span>
            <img
              src="@/assets/profile/score.svg"
              alt="Grade card"
              class="profile__tile-icon"
            />
            {{ userData.cumulativeScore }} points
          </div>
          <div class="profile__tile">
            <span>Time / response</span>
            <img
              src="@/assets/profile/hourglass.svg"
              alt="Hourglass"
              class="profile__tile-icon"
            />
            10 seconds
          </div>
        </div>
        <BadgesCarousel
          :badgeUnlockScores="config.badgeUnlockScores"
          :cumulativeScore="userData.cumulativeScore"
        />
      </div>
      <div class="buttons">
        <router-link :to="{ name: 'Play' }">
          <button class="btn-game--primary-solid btn-full-size">Back</button>
        </router-link>
        <router-link :to="{ name: 'Home' }" class="game__link"
          ><button class="btn-game-transparent btn-full-size">Home</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * The profile component that's shown on the /profile route.
 * It displays the number of points a user has earned
 * It shows the badges they've earned and greys out the ones they still need to earn
 * It shows a chats section, which are the discussions this user has participated in
 * if the user hasn't said anything, then it shows a blank image,
 * defined in config.profile.blankImage
 * @author Anisha Keshavan
 * @license Apache 2.0
 */
import BadgesCarousel from "./BadgesCarousel.vue";

export default {
  name: "profile",
  components: { BadgesCarousel },
  props: {
    /**
     * the computed user data object based on userInfo
     */
    userData: {
      type: Object,
      required: true,
    },
    /**
     * The config object that is loaded from src/config.js.
     * It defines how the app is configured, including
     * any content that needs to be displayed (app title, images, etc)
     * and also the type of widget and where to update pointers to data
     */
    config: {
      type: Object,
      required: true,
    },
  },
  setup() {},
};
</script>
<style lang="scss" scoped>
.profile {
  height: 100%;
  text-align: center;
  @include centralize-children;
}
.profile__content {
  width: 100%;
}

h2 {
  @include font-size("s");
  font-weight: $semibold;
  margin-bottom: space(3);
}
.profile__tiles {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 9vh;
  @include media("≥tablet") {
    padding: 0 5%;
    align-items: center;
  }
}
.profile__tile {
  width: calc(50% - 0.5rem);
  padding: space(3) space(0);
  border-radius: $border-radius-sm;
  border: 2px solid $amethyst-smoke;
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  font-weight: $semibold;
  @include media("≥tablet") {
    width: calc(50% - 1rem);
  }
}
.profile__tile-icon {
  width: 2.6rem;
  max-height: 2.8rem;
  margin: space(3) 0;
}
.buttons {
  width: 100%;
}
</style>
