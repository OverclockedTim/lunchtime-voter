/*
 * Angular 2 decorators and services
 */
import {Directive, Component, ElementRef} from 'angular2/angular2';
import {RouteConfig, Router} from 'angular2/router';
import {Http, Headers} from 'angular2/http';

/*
 * Angular Directives
 */
import {ROUTER_DIRECTIVES} from 'angular2/router';


/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'app', // <app></app>
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ ROUTER_DIRECTIVES ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [`
    .title {
      font-family: Arial, Helvetica, sans-serif;
    }
    main {
      padding: 1em;
    }
  `],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: `
  <nav class="top-nav">
    <div class="container">
      <div class="nav-wrapper">Lunchtime Voter</div>

    </div>
  </nav>

  <div class="container">
    <br/>
    <div>Add your suggestion or vote on other people's suggestions until 11:30.  At 11:30, voting stops and a spot is chosen!</div>
    <h4>Add a Lunch Option</h4>
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <input placeholder="Thai Siam" id="title" type="text" class="validate">
          <label for="title">Title</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input placeholder="It's awesome and I love it." id="description" type="text" class="validate">
          <label for="description">Description / Selling It</label>
        </div>
      </div>
    </form>

    <div class="right-align">
      <a class="waves-effect waves-light btn"><i class="material-icons left">library_add</i>add</a>
    </div>

    <h4>Rate other people's suggestions</h4>
    <table class="bordered">
        <thead>
          <tr>
              <th data-field="id">Place</th>
              <th data-field="name">Description</th>
              <th data-field="price">My Rating</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Thai Siam</td>
            <td>The best Thai Food In the World</td>
            <td>
              <i style="color: #f5f5f5" class="material-icons dp48">star</i>
              <i style="color: #f5f5f5" class="material-icons dp48">star</i>
              <i style="color: #f5f5f5" class="material-icons dp48">star</i>
              <i style="color: #f5f5f5" class="material-icons dp48">star</i>
            </td>
          </tr>
          <tr>
            <td>Not Thai Siam</td>
            <td>Bad Thai Food</td>
            <td>
              <i style="color: #f5f5f5" class="material-icons dp48">star</i>
              <i style="color: #f5f5f5" class="material-icons dp48">star</i>
              <i style="color: #f5f5f5" class="material-icons dp48">star</i>
              <i style="color: #f5f5f5" class="material-icons dp48">star</i>
            </td>
          </tr>
        </tbody>
      </table>
  </div>

  <footer class="page-footer white-text">
    <div class="container">
      LunchtimeVoter is an open source project, fork your own at <a class="white-text" style="text-decoration: underline" href="https://github.com/OverclockedTim/lunchtime-voter">Github</a>
    </div>
  </footer>
  `
})
export class App {
  // These are member type
  title: string;
  data: Array<any> = []; // default data
  // TypeScript public modifiers
  constructor() {
    this.title = 'Thai Siam';
  }
}

