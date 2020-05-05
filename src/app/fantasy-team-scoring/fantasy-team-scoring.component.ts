import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-fantasy-team-scoring',
	templateUrl: './fantasy-team-scoring.component.html',
	styleUrls: ['./fantasy-team-scoring.component.css'],
})
export class FantasyTeamScoringComponent implements OnInit {
	defaultValues = {};

	constructor() {}

	updateScoringRules(value: any) {
		console.log(value);
	}
	ngOnInit() {
		this.defaultValues = {
			'blocked-punt-pat-fg': 2,
			'defense-special-teams-td': 3,
			'extra-point-made': 1,
			'fg-39-less-yds': 3,
			'fg-39-less-yds-missed': -2,
			'fg-40-49-yds': 4,
			'fg-40-49-yds-missed': -1,
			'fg-50-yds-plus': 5,
			'fumble-lost': -2,
			'fumble-recovery': 2,
			'intercepted-pass': -2,
			interception: 2,
			'kick-punt-return-td': 6,
			'passing-25-yds': 1,
			'passing-2-pt-conversion': 2,
			'passing-td': 4,
			'passing-td-40-yds-plus': 2,
			'return-recover-fb-td': 6,
			'rushing-passing-receiving-2-pt-conversion': 2,
			'rushing-receiving-10-yds': 1,
			'rushing-receiving-2-pt-conversion': 2,
			'rushing-receiving-40-yds-plus': 2,
			'rushing-receiving-td': 6,
			sack: 1,
			safety: 2,
		};
	}
}
