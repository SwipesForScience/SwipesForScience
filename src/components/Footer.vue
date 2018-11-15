<template>
  <div class="">
    <div class="footer bg-dark pr-3 pl-3">
      <div class="container">
        <div class="align-middle text-right text-white configureButton">
          <b-button variant="info" @click="openConfig">
            <i class="fa fa-wrench" aria-hidden="true"></i> Configure
          </b-button>
        </div>

        <table style="height: 200px; width: 100%;">
        <tbody>
          <tr>

          </tr>
          <tr>
            <td class="align-middle text-center text-white">
              <router-link to="/about" class="text-white">About</router-link>
              <br>
            </td>

          </tr>
          <tr>
            <td class="align-middle text-center text-white">
            icons on this site are from <a :href="config.iconAttribute.url">{{config.iconAttribute.name}}</a>
            and illustrations are from <a href="https://undraw.co">undraw.co</a>
            </td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  </div>
</template>
<script>
  /**
    Footer component with useful links and stuff.
  */
  export default {
    name: 'Footer',
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
    },
    data() {
      return {

      };
    },
    methods: {
      /**
      * The method to tell the parent component (App.vue) to open the config panel.
      */
      openConfig(e) {
        e.preventDefault();
        this.$emit('openConfig');
      },
    },
  };
</script>
<style scoped>

.configureButton {
    display: block;
    position: absolute;
    bottom: 5px;
    right: 5px;
}
.footer {
  position: relative;
  height: 200px;
}
  /*footer*/
  .col_white_amrc { color:#FFF;}
  footer { width:100%; background-color:#263238; min-height:250px; padding:10px 0px 25px 0px ;}
  .pt2 { padding-top:40px ; margin-bottom:20px ;}
  footer p { font-size:13px; color:#CCC; padding-bottom:0px; margin-bottom:8px;}
  .mb10 { padding-bottom:15px ;}
  .footer_ul_amrc { margin:0px ; list-style-type:none ; font-size:14px; padding:0px 0px 10px 0px ; }
  .footer_ul_amrc li {padding:0px 0px 5px 0px;}
  .footer_ul_amrc li a{ color:#CCC;}
  .footer_ul_amrc li a:hover{ color:#fff; text-decoration:none;}
  .fleft { float:left;}
  .padding-right { padding-right:10px; }

  .footer_ul2_amrc {margin:0px; list-style-type:none; padding:0px;}
  .footer_ul2_amrc li p { display:table; }
  .footer_ul2_amrc li a:hover { text-decoration:none;}
  .footer_ul2_amrc li i { margin-top:5px;}

  .bottom_border { border-bottom:1px solid #323f45; padding-bottom:20px;}
  .foote_bottom_ul_amrc {
  	list-style-type:none;
  	padding:0px;
  	display:table;
  	margin-top: 10px;
  	margin-right: auto;
  	margin-bottom: 10px;
  	margin-left: auto;
  }
  .foote_bottom_ul_amrc li { display:inline;}
  .foote_bottom_ul_amrc li a { color:#999; margin:0 12px;}

  .social_footer_ul { display:table; margin:15px auto 0 auto; list-style-type:none;  }
  .social_footer_ul li { padding-left:20px; padding-top:10px; float:left; }
  .social_footer_ul li a { color:#CCC; border:1px solid #CCC; padding:8px;border-radius:50%;}
  .social_footer_ul li i {  width:20px; height:20px; text-align:center;}
</style>
