import models from "../models";

export const createGameRoute = "/create-game";

function insertRow(x, { _id: board }, promiseArray) {
  for (let y = 0; y < 10; y++) {
    promiseArray.push(models.Square.create({ x, y, board }));
  }
}

function createBoardSquares(board, res) {
  const promiseArray = [];
  for (let i = 0; i < 10; i++) {
    insertRow(i, board, promiseArray);
  }
  Promise.all(promiseArray).then(() => res.send("OK"));
}

export const createGameHandler = async (
  { body: { homeTeam, awayTeam } },
  res
) => {
  const newGame = await models.Game.create({ homeTeam, awayTeam });
  const board = await models.Board.create({ game: newGame._id });
  createBoardSquares(board, res);
};
