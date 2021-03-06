// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require('element-ui/lib/theme-chalk/index.css')
require('../static/bootstrap_override.scss')
require('../static/fonts.css')
require('../static/scroll.css')
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'font-awesome/css/font-awesome.css'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueVirtualScroller from 'vue-virtual-scroller'
import store from './store'
require('vue-virtual-scroller/dist/vue-virtual-scroller.css')
import { provider as apolloProvider, install as apolloInit } from 'shared/providers/apolloProvider'
import { directive as onClickOutside } from 'vue-on-click-outside'
import filters from './filters';
import validators from './validators';
import momentSetUp from 'shared/providers/moment';
import vueResourceSetup from 'shared/providers/vueResource'
import authPlugin from 'shared/providers/authProvider'
import 'shared/initializers/facebookRedirectHashFixer'
import * as whatsAppCommunicator from '@/services/whatsAppCommunicator'
import VeeValidate from 'vee-validate'
import directives from './directives'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
locale.use(lang)

Vue.config.productionTip = false

Vue.use(vueResourceSetup)
Vue.use(authPlugin)
Vue.use(apolloInit)
Vue.use(momentSetUp)
Vue.use(BootstrapVue);
Vue.use(VueVirtualScroller);
Vue.use(VueGoogleMaps, {
  installComponents: true,
  load: {
    key: 'AIzaSyCI8i6KIO3fqbvT35LTQVsGAN4Je1mJTa0',
    libraries: 'places',
    language: 'he',
  }
});
Vue.use(VeeValidate)
Vue.directive('on-click-outside', onClickOutside);
whatsAppCommunicator.init(store)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  provide: apolloProvider.provide(),
  store,
  template: '<App/>',
  components: { App }
})


