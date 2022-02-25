import getPieceChar from './getPieceChar';
import getUnPromotePiece from './getUnPromotePiece';

export default function (piece: number) {
	return getPieceChar(getUnPromotePiece(piece));
}
