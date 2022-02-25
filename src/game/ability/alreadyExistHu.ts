import { HU } from '../constant';

// 2歩チェック
export default function (sq: number): boolean {
	const column = Math.floor(sq / 9);
	const sqs = Array(9)
		.fill(0)
		.map((v, i) => column * 9 + i);
	const check = sqs.find((v) => {
		return this.board[v].owner === this.turn && this.board[v].koma === HU;
	});
	if (check) {
		return true;
	}
	return false;
}
