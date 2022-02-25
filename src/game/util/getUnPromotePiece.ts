import { HU, KYO, KEI, GIN, HI, KAKU, TO, N_KYO, N_KEI, N_GIN, UMA, RYU } from '../constant';

export default function (piece: number): number {
	switch (piece) {
		case TO:
			return HU;
		case N_KYO:
			return KYO;
		case N_KEI:
			return KEI;
		case N_GIN:
			return GIN;
		case UMA:
			return KAKU;
		case RYU:
			return HI;
	}
	return piece;
}
