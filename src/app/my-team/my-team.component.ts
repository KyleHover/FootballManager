import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-my-team',
	templateUrl: './my-team.component.html',
	styleUrls: ['./my-team.component.css'],
})
export class MyTeamComponent implements OnInit {
	myTeam: Observable<any[]>;
	db: AngularFirestore;
	constructor(db: AngularFirestore) {
		// this.db = db;
		// this.myTeam = this.db
		// 	.collection('MyTeam', (ref) => {
		// 		let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
		// 		return query;
		// 	})
		// 	.valueChanges();

		// console.log(this.myTeam);
	}

	saveChange(value: any) {
		console.log(value.id);
	}

	ngOnInit() {}

	viewPlayer(event) {
		let clickedElement = event.target;
		let id = clickedElement.classList[0];
		let playerView: HTMLDivElement = document.querySelector('div.player');
		let playerData = this.savedPlayers[id];

		let stats = `<p>${playerData.name}</p>`;
		playerData.passing.forEach((stat: { statistic: any; value: any }) => {
			stats += `<p>${stat.statistic}: ${stat.value}</p>`;
		});

		playerView.innerHTML = stats;
	}

	updateMyTeam(value: any) {
		let rows = document.querySelectorAll('.player-row');
		rows.forEach((row) => {
			row.querySelector('.player-name');
		});
		console.log(value);
		this.savedPlayers.push(value.players);
	}

	saveChanges(value: any) {
		console.log(value);
	}

	editTeam() {
		let buttons: NodeListOf<HTMLButtonElement> = document.querySelectorAll('div.my-team>button');
		buttons.forEach((button) => {
			button.disabled = true;
		});
		let forms: NodeListOf<HTMLFormElement> = document.querySelectorAll('div.my-team>button>form');
		forms.forEach((form) => {
			form.style.display = 'block';
		});
	}

	editTable() {
		let rows = document.querySelectorAll('.player-row');
		rows.forEach((row) => {
			let playerName = row.querySelector('.player-name');
			let options = '';
			this.players.forEach((player: { name: any }) => {
				options += `
        <option>
        ${player.name}
        </option>`;
			});
			playerName.innerHTML = `
      <select>
      ${options}
      </select>
      `;
		});
	}

	savedPlayers: any = [
		{
			id: 0,
			name: 'Case Cookus',
			passing: [
				{
					statistic: 'Passing Attempts',
					value: 1,
				},
				{
					statistic: 'Passing Completions',
					value: 1,
				},
				{
					statistic: 'Passing Interceptions',
					value: 1,
				},
				{
					statistic: 'Passing Touchdowns',
					value: 1,
				},
				{
					statistic: 'Passing Two Point Attempts',
					value: 1,
				},
				{
					statistic: 'Passing Two Point Makes',
					value: 1,
				},
				{
					statistic: 'Passing Yards',
					value: 1,
				},
			],
		},
		{
			id: 1,
			name: 'Daniel Jones',
			passing: [
				{
					statistic: 'Passing Attempts',
					value: 1,
				},
				{
					statistic: 'Passing Completions',
					value: 1,
				},
				{
					statistic: 'Passing Interceptions',
					value: 1,
				},
				{
					statistic: 'Passing Touchdowns',
					value: 1,
				},
				{
					statistic: 'Passing Two Point Attempts',
					value: 1,
				},
				{
					statistic: 'Passing Two Point Makes',
					value: 1,
				},
				{
					statistic: 'Passing Yards',
					value: 1,
				},
			],
		},
		{
			id: 2,
			name: 'Colt McCoy',
			passing: [
				{
					statistic: 'Passing Attempts',
					value: 1,
				},
				{
					statistic: 'Passing Completions',
					value: 1,
				},
				{
					statistic: 'Passing Interceptions',
					value: 1,
				},
				{
					statistic: 'Passing Touchdowns',
					value: 1,
				},
				{
					statistic: 'Passing Two Point Attempts',
					value: 1,
				},
				{
					statistic: 'Passing Two Point Makes',
					value: 1,
				},
				{
					statistic: 'Passing Yards',
					value: 1,
				},
			],
		},
		{
			id: 3,
			name: 'Cooper Rush',
			passing: [
				{
					statistic: 'Passing Attempts',
					value: 1,
				},
				{
					statistic: 'Passing Completions',
					value: 1,
				},
				{
					statistic: 'Passing Interceptions',
					value: 1,
				},
				{
					statistic: 'Passing Touchdowns',
					value: 1,
				},
				{
					statistic: 'Passing Two Point Attempts',
					value: 1,
				},
				{
					statistic: 'Passing Two Point Makes',
					value: 1,
				},
				{
					statistic: 'Passing Yards',
					value: 1,
				},
			],
		},
	];

	players: any = this.savedPlayers;
}
