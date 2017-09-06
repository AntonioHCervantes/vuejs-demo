
Vue.component('game-header', {
  template: '<h1> {{ titleHeader | uppercase }}</h1>',
  data: function(){
    return{
      titleHeader: 'Video Gamesss'
    }
  },
  filters: {
    uppercase: function (data) {
      return data && data.toUpperCase();
    }
  }
});

Vue.component('game-add', {
  template: `
    <div>
      <input type="text" v-model="titleGame" placeholder="title" />
      <input type="text" v-model="yearGame" placeholder="year" />
      <button @click="emitNewGame">Añadir</button>
    </div>
  `,
  data: function () {
    return {
      titleGame: null,
      yearGame: null
    }
  },
  methods: {
    emitNewGame: function () {
      if (this.titleGame) {
        this.$emit('new', { title: this.titleGame, year: this.yearGame });
        this.titleGame = null;
        this.yearGame = null;
      }
    }
  },
});

Vue.component('game-list', {
  props: ['games'],
  template: `
  <ol>
    <game-item v-for="item in games" :game="item" :key="item.id"></game-item>
  </ol>
  `
});

Vue.component('game-item', {
  props: ['game'],
  template: '<li>{{ game.title }} ({{ game.year }})</li>'
});

Vue.component('login-form', {
  template: `
    <div>
      <div class="error-container" v-if="errors.length !== 0">
          <div v-for="error in errors">{{ error }}</div>
      </div>
      <form v-on:submit.prevent="loginAccess">
        <input name="username" type="text" v-model="user.name">
        <input name="password" type="password" v-model="user.password">
        <button type="submit" :disabled="isFormEmpty">Entrar</button>
      </form>
    </div>

  `,
  data: function(){
    return{
      errors: [],
      user: { name: null, password: null }
    }
  },
  computed:{
    isFormEmpty: function(){
      return !(this.user.name && this.user.password);
    }
  },
  methods: {
    loginAccess: function(){
      this.errors = [];
      console.log('entra');
      if(this.user.name.length < 6){
        this.errors.push('Error, el name tiene que ser mayor k 6');
      }

      if(this.user.password.length < 6){
        this.errors.push('Error, el name tiene que ser mayor k 6');
      }
    }
  }

});


const app = new Vue({
  el: '#app',
  template: `
            <div class="view">
              <game-header></game-header>
              <game-add @new="addNewGame"></game-add>
              <game-list v-bind:games="games"></game-list>

              <login-form></login-form>
            </div>
            `,
  data: {
    games: [
      { title: 'Pro Evolution Soccer', year: '1983' },
      { title: 'FIFA 2012', year: '2983' },
      { title: 'NBA 2K18', year: '2018' }
    ]
  },
  methods: {
    addNewGame: function (game){
      this.games.push(game);
    }
  }

});
