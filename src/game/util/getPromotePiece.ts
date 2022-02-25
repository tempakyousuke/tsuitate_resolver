import { HU, KYO, KEI, GIN, HI, KAKU, TO, N_KYO, N_KEI, N_GIN, UMA, RYU, NONE } from '../constant';
import getUnPromotePiece from './getUnPromotePiece';

// 成った後の駒を取得
export default function (piece: number): number {
	const unPromotePiece = getUnPromotePiece(piece);
	switch (unPromotePiece) {
		case HU:
			return TO;
		case KYO:
			return N_KYO;
		case KEI:
			return N_KEI;
		case GIN:
			return N_GIN;
		case KAKU:
			return UMA;
		case HI:
			return RYU;
	}
	return NONE;
}
