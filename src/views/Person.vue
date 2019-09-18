<template>
  <div class="container" v-if="person">
    <h1>{{person.name}}</h1>
    <div class="card">
      <div class="card__image" :style="{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${person.profile_path})`}"></div>
      <div class="card__description">
        <p>Name: {{person.name}}</p>
        <p>Know for department: {{person.known_for_department}}</p>
        <p>Birthday: {{person.birthday}}</p>
        <p>Place of birth: {{person.place_of_birth}}</p>
        <p>{{person.biography}}</p>
      </div>
    </div>
    <div v-if="credits" class="credits">
      <div class="credits__list">
        <div v-for="(person, index) in credits.cast" :key="index" class="person">
          <div class="person__image" :style="{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${person.poster_path})`}"></div>
          <router-link :to="{ name: 'movie', params: {id: person.id } }" class="person__name">{{person.title}}</router-link>
          <div class="person__role">as {{person.character}}</div>
        </div>
      </div>
      <div class="credits__list">
        <div v-for="(person, index) in credits.crew" :key="index" class="person">
          <div class="person__image" :style="{backgroundImage: `url(https://image.tmdb.org/t/p/w500/${person.profile_path})`}"></div>
          <router-link :to="{ name: 'movie', params: {id: person.id } }" class="person__name">{{person.title}}</router-link>
          <div class="person__role">as ({{person.department}})</div>
        </div>
      </div>
    </div>
    <button v-if="!credits && !loading" @click="getCrewById">Pokaż listę filmów</button>
    <font-awesome-icon v-if="loading" class="fa-spin" icon="spinner" rotate />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getPerson, getCredits } from '../services/people';

@Component
export default class Person extends Vue {
  private person: any = null;
  private credits: any = null;
  private loading: boolean = false;
  private created(): void {
    this.getPersonById();
  }
  private async getPersonById() {
    try {
      const person: any = await getPerson(parseInt(this.$route.params.id, 10));
      this.person = person.data;
    } catch (error) {
      this.person = null;
    }
  }
  private async getCrewById() {
    this.loading = true;
    try {
      const credits: any = await getCredits(parseInt(this.$route.params.id, 10));
      this.credits = credits.data;
      this.loading = false;
    } catch (error) {
      this.person = null;
      this.loading = false;
    }
  }
}
</script>

<style lang="scss" scoped>
  .credits {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    margin-top: 35px;
    margin-bottom: 30px;
    &__list {
      width: 50%;
      .person {
        width: 100%;
        display: flex;
        border-bottom: 1px solid #e1b12c;
        &__image {
          background-size: cover;
          background-position: center;
          width: 75px;
          height: 75px;
          margin-right: 25px;
        }
        &__name, &__role {
          padding: 10px;
          box-sizing: border-box;
          box-sizing: border-box;
          display: flex;
          align-items: center;
        }
        &:nth-child(odd) {
          background-color: rgba(0,0,0,.1);
        }
      }
    }
  }
  .container {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 35px;
    h1 {
      width: 100%;
    }
    .card {
      display: flex;
      width: 100%;
      &__image {
        width: 40%;
        height: 500px;
        background-size: cover;
        background-position: center;
      }
      &__description {
        width: 60%;
        box-sizing: border-box;
        padding: 50px;
        font-size: 1.2rem;
        p {
          font-weight: bold;
          &:last-child {
            font-weight: normal;
          }
        }
      }
    }
  }
  button  {
    height: 40px;
    width: 300px;
    color: black;
    text-transform: uppercase;
    font-weight: bold;
    background: #e1b12c;
    border: none;
    outline: none;
    margin-top: 35px;
    cursor: pointer;
    margin-bottom: 30px;
    margin-left: auto;
    margin-right: auto;
    display: block;
    transition: .1s;
    font-size: 1rem;
    &:hover {
      background: black;
      color: #e1b12c;
    }
  }
  .fa-spin {
    color: #e1b12c;
    font-size: 3rem;
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-top: 35px;
    margin-bottom: 30px;
  }
</style>