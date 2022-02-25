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
	RYU
} from '../constant';

export default function (koma: number): string {
	switch (koma) {
		case HU:
			return '歩';
		case KYO:
			return '香';
		case KEI:
			return '桂';
		case GIN:
			return '銀';
		case KIN:
			return '金';
		case KAKU:
			return '角';
		case HI:
			return '飛車';
		case TO:
			return 'と金';
		case N_KYO:
			return '成香';
		case N_KEI:
			return '成桂';
		case N_GIN:
			return '成銀';
		case UMA:
			return '馬';
		case RYU:
			return '龍';
		case OU:
			return '玉';
		default:
			return '';
	}
}
