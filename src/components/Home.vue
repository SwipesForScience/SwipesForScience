<template>
  <div class="home">
    <div class="frame">
      <div
        v-for="i in [0, 1, 2, 3, 4]"
        :key="`cloud-${i}`"
        :class="`cloud cloud-${i}`"
      ></div>
      <div class="frame__content">
        <header>
          <div class="swipes-for-science-logo">
            <Logo />
          </div>
          <h1 class="mt-4">{{ title }}</h1>
          <h2 class="mt-5">{{ tagline }}</h2>
        </header>
        <button
          ref="play"
          class="btn--landing-cta btn-full-size"
          @click="onPlay"
        >
          {{ userData?.currentGameId ? "Resume Game" : "Play" }}
        </button>
        <div class="disclaimer">
          {{ config.home.disclaimer }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "./Logo.vue";
import gsap from "gsap";

/**
 * The landing page, on the route `/`. This component displays a title, tagline,
 * and background image splash page that's defined on the config property.
 */

export default {
  name: "Home",
  components: { Logo },
  mounted() {
    gsap.from(".swipes-for-science-logo", {
      duration: 1,
      y: -40,
      opacity: 0,
      delay: 0.5,
      ease: "elastic.out(1.2, 0.45)",
    });
    gsap.from("h1", {
      duration: 1,
      opacity: 0,
      y: 20,
      delay: 0.8,
      ease: "elastic.out(1.2, 0.45)",
    });
    gsap.from("h2", {
      duration: 1,
      opacity: 0,
      y: -20,
      delay: 1.2,
      ease: "elastic.out(1.2, 0.45)",
    });

    gsap.from(this.$refs.play, {
      duration: 1.2,
      opacity: 0,
      scale: 0.8,
      ease: "elastic.out(1.2, 0.45)",
      delay: 1.4,
    });
    gsap.from(".disclaimer", {
      duration: 0.4,
      opacity: 0,
      y: 20,
      delay: 1.6,
      ease: "power4.out",
    });
    const clouds = document.querySelectorAll(".cloud");
    for (let i = 0; i < 5; i++) {
      let startPoint = 512 + clouds[i].scrollWidth;
      let endPoint = -clouds[i].scrollWidth;
      if (i % 2 === 1) {
        startPoint = -clouds[i].scrollWidth;
        endPoint = 512 + clouds[i].scrollWidth;
      }
      gsap
        .fromTo(
          `.cloud-${i}`,
          { x: startPoint },
          {
            duration: gsap.utils.random(10, 12),
            x: endPoint,
            repeat: -1,
            yoyo: true,
            delay: 5.5,
            ease: "none",
          }
        )
        .progress(Math.random());
    }
  },
  methods: {
    onPlay() {
      gsap
        .to(this.$refs.play, {
          duration: 0.5,
          scale: 1.1,
          ease: "elastic.out(1.2, 0.45)",
        })
        .then(() => {
          this.$router.push({ name: "Play" });
        });
    },
  },
  props: {
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
    routerQuery: {
      type: Object,
      required: true,
    },
    userData: {
      type: Object,
      required: false,
    },
    currentUser: {
      type: Object,
      required: false,
    },
  },
  computed: {
    /**
     * The title to display. Defined in `config.home.title`
     */
    title() {
      return this.config.home.title;
    },
    /**
     * The tagline to display. Defined in `config.home.tagline`
     */
    tagline() {
      return this.config.home.tagline;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  background: $landing-bg-color;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  .frame {
    background-image: $landing-primary-gradient;
  }
  .cloud {
    position: absolute;
    left: 0;
    height: 7vh;
    max-height: 3rem;
    padding: 10px 0 10px;
    border-radius: 3rem;
    background: $white;
    opacity: 0.1;
    &:nth-child(odd) {
      left: -10px;
    }
    &:nth-child(even) {
      right: -10px;
    }
    @for $i from 1 through 6 {
      &:nth-child(#{$i}) {
        top: #{(20% * ($i - 1)) + 5%};
        width: #{percentage(((random(50) + 20) / 100))};
      }
    }
  }
}
.frame__content {
  height: 100%;
  position: relative;
  @include centralize-children;
  header {
    @include centralize-children;
  }

  .swipes-for-science-logo {
    width: clamp(8rem, 20vw, 14rem);
    margin-top: 1rem;
  }
  h1 {
    position: relative;
    font-size: 1.2rem;
    font-weight: bold;
    text-align: center;
    &:before,
    &:after {
      content: "-";
      position: absolute;
      top: 0;
    }
    &:before {
      left: -0.75rem;
    }
    &:after {
      right: -0.75rem;
    }
  }
  h2 {
    margin-top: 2.5rem;
    text-align: center;
  }
  .disclaimer {
    @include font-size("xs");
  }
}
</style>
