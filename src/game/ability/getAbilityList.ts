import {
	HU,
	KYO,
	KEI,
	GIN,
	HI,
	KAKU,
	KIN,
	OU,
	TO,
	N_KYO,
	N_KEI,
	N_GIN,
	UMA,
	RYU,
	WHITE,
	UP,
	UP_RI,
	RI,
	DO_RI,
	DO,
	DO_LE,
	LE,
	UP_LE,
	INF_UP,
	INF_UP_RI,
	INF_RI,
	INF_DO_RI,
	INF_DO,
	INF_DO_LE,
	INF_LE,
	INF_UP_LE,
	UP2_RI,
	UP2_LE
} from '../constant';

export default function (koma: number, owner: number) {
	let ability: number[];
	switch (koma) {
		case HU:
			ability = [UP];
			break;
		case KYO:
			ability = [INF_UP];
			break;
		case KEI:
			ability = [UP2_RI, UP2_LE];
			break;
		case GIN:
			ability = [UP, UP_RI, DO_RI, DO_LE, UP_LE];
			break;
		case KIN:
		case TO:
		case N_KYO:
		case N_KEI:
		case N_GIN:
			ability = [UP, UP_RI, RI, DO, LE, UP_LE];
			break;
		case KAKU:
			ability = [INF_UP_RI, INF_DO_RI, INF_DO_LE, INF_UP_LE];
			break;
		case HI:
			ability = [INF_UP, INF_RI, INF_DO, INF_LE];
			break;
		case UMA:
			ability = [UP, RI, DO, LE, INF_UP_RI, INF_DO_RI, INF_DO_LE, INF_UP_LE];
			break;
		case RYU:
			ability = [UP_RI, DO_RI, DO_LE, UP_LE, INF_UP, INF_RI, INF_DO, INF_LE];
			break;
		case OU:
			ability = [UP, UP_RI, RI, DO_RI, DO, DO_LE, LE, UP_LE];
			break;
		default:
			ability = [];
	}
	if (owner === WHITE) {
		return ability.map(function (element) {
			return element * -1;
		});
	} else {
		return ability;
	}
}
