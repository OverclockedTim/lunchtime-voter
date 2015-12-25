/**
 * Created by @OverclockedTim on 12/24/15.
 */

declare var $: any

import {Component} from 'angular2/core';

@Component({
    selector: 'app-settings',
    template: `
    <a (click)="onClick()">Settings</a>
    <!-- Modal Structure -->
    <div id="appSettingsModal" class="modal modal-fixed-footer">
      <div class="modal-content" style="color: #0f0f0f">
        <h4>App Settings</h4>
        <ul>
          <li>Set the current vote to finished</li><br/>
          <li>Reset the current vote and start a new one.</li><br/>
          <li>Change explanatory text</li><br/>
        </ul>
      </div>
      <div class="modal-footer">
        <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
      </div>
    </div>
    `
})
export class AppSettingsComponent {

    onClick= function(){
        console.log('Trying to open app settings modal.');
        $('#appSettingsModal').openModal();
    }
}