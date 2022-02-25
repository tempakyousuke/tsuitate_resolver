import { HU, KYO, KEI, GIN, HI, KAKU, BLACK, WHITE, BLACK_AREA, WHITE_AREA } from '../constant';

// 成る事が可能かどうかの判定
export default function (fromSquare: number, sq: number): boolean {
	const { koma, owner } = this.board[fromSquare];
	const pieces = [HU, KYO, KEI, GIN, KAKU, HI];
	if (!pieces.includes(koma)) {
		return false;
	}
	if (owner === BLACK) {
		return WHITE_AREA.includes(sq) || WHITE_AREA.includes(fromSquare);
	}
	if (owner === WHITE) {
		return BLACK_AREA.includes(sq) || BLACK_AREA.includes(fromSquare);
	}
	return false;
}
