import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators';
import store from '../index';
import { getPeople } from '../../services/people';
import { People } from '../models';

@Module({
  dynamic: true,
  store,
  name: 'people',
  namespaced: true,
})
class PeopleModule extends VuexModule {
  private people: People[] = [];
  private page: number = 1;
  private sortBy: string = 'popular';

  @Action({commit: 'changePage'})
  public incrementPage(): number {
    return this.page + 1;
  }

  @Action({commit: 'addPeople'})
  public async  fetchPeople() {
    const response: any = await getPeople(this.page, this.sortBy);
    const { results } = response.data;
    const people = results.map((person: any) => {
      return {
        id: person.id,
        name: person.name,
        profile_path: person.profile_path,
        known_for_department: person.known_for_department,
      };
    });
    return people;
  }

  @Mutation
  private addPeople(people: People[]) {
    this.people.push(...people);
  }

  @Mutation
  private changePage(page: number) {
    this.page = page;
  }

  get peopleList(): People[] {
    return this.people;
  }
}

export default getModule(PeopleModule);
