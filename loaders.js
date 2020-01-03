import DataLoader from "dataloader";
import _ from "lodash";
import models from "./models";

export default {
  userLoader: new DataLoader(userIds =>
    models.User.find({ _id: { $in: userIds } }).then(users => {
      const usersById = _.keyBy(users, "_id");
      return userIds.map(bedId => usersById[bedId]);
    })
  ),
  boardLoader: new DataLoader(boardIds =>
    models.Board.find({ _id: { $in: boardIds } }).then(boards => {
      const boardsById = _.keyBy(boards, "_id");
      return boardIds.map(bedId => boardsById[bedId]);
    })
  )
};
