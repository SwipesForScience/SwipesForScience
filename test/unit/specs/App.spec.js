// import Vue from 'vue';
// import _ from 'lodash';
// import config from '@/config';
// import App from '@/App';
// // import router from '@/router/index';
//
// describe('App.vue', () => {
//   it('should have correct brandName', () => {
//     const Constructor = Vue.extend(App);
//     const vm = new Constructor({ }).$mount();
//     expect(vm.$el.querySelector('#brandName').textContent).to.equal(config.home.title);
//   });
//
//   it('should have the correct nav links', () => {
//     const Constructor = Vue.extend(App);
//     const vm = new Constructor({ }).$mount();
//     expect(vm.$el.querySelector('#navLinks').textContent)
//       .to.equal('Home Leaderboard Play Chats Tutorial ');
//   });
//
//   const computedKeys = {
//     firebaseKeys: config.firebaseKeys,
//     brandName: config.home.title,
//     betaMode: config.betaMode,
//     needsTutorial: config.needsTutorial,
//     navbarVariant: config.app.navbarVariant,
//   };
//
//   _.map(computedKeys, (val, key) => {
//     it(`should have the correct computed component: ${key}`, () => {
//       const Constructor = Vue.extend(App);
//       const vm = new Constructor({ }).$mount();
//       expect(vm[key]).to.equal(val);
//     });
//   });
//
//   it('should show the configuration pane when asked', () => {
//     const Constructor = Vue.extend(App);
//     const vm = new Constructor({ }).$mount();
//     vm.openConfig({ preventDefault() {} });
//     expect(vm.showConfig).to.equal(true);
//     Vue.nextTick(() => {
//       expect(vm.$refs.configurationPane.querySelector('p .lead').textContent)
//         .to.equal('Configuration');
//       // eslint-disable-next-line
//       done();
//     });
//   });
// });
