import {
	HU,
	KYO,
	KEI,
	BLACK,
	SQ11,
	SQ12,
	SQ18,
	SQ19,
	SQ21,
	SQ22,
	SQ28,
	SQ29,
	SQ31,
	SQ32,
	SQ38,
	SQ39,
	SQ41,
	SQ42,
	SQ48,
	SQ49,
	SQ51,
	SQ52,
	SQ58,
	SQ59,
	SQ61,
	SQ62,
	SQ68,
	SQ69,
	SQ71,
	SQ72,
	SQ78,
	SQ79,
	SQ81,
	SQ82,
	SQ88,
	SQ89,
	SQ91,
	SQ92,
	SQ98,
	SQ99
} from '../constant';
const FIRST_ROW = [SQ11, SQ21, SQ31, SQ41, SQ51, SQ61, SQ71, SQ81, SQ91];
const SECOND_ROW = [SQ12, SQ22, SQ32, SQ42, SQ52, SQ62, SQ72, SQ82, SQ92];
const EIGHTH_ROW = [SQ18, SQ28, SQ38, SQ48, SQ58, SQ68, SQ78, SQ88, SQ98];
const FINAL_ROW = [SQ19, SQ29, SQ39, SQ49, SQ59, SQ69, SQ79, SQ89, SQ99];
// 本将棋的に持ち駒をおけるかチェックする関数
export default function (sq: number, owner: number, piece: number): boolean {
	switch (piece) {
		case HU:
			if (owner === BLACK) {
				if (FIRST_ROW.includes(sq)) {
					return false;
				}
			} else if (FINAL_ROW.includes(sq)) {
				return false;
			}
			if (this.alreadyExistHu(sq)) {
				return false;
			}
			return true;
		case KYO:
			if (owner === BLACK) {
				return !FIRST_ROW.includes(sq);
			} else {
				return !FINAL_ROW.includes(sq);
			}
		case KEI:
			if (owner === BLACK) {
				return !FIRST_ROW.includes(sq) && !SECOND_ROW.includes(sq);
			} else {
				return !EIGHTH_ROW.includes(sq) && !FINAL_ROW.includes(sq);
			}
	}
	return true;
}
