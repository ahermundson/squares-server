import DataLoader from "dataloader";
import _ from "lodash";
import models from "./models";

export default {
  userLoader: new DataLoader(userIds =>
    models.User.find({ _id: { $in: userIds } }).then(users => {
      const usersById = _.keyBy(users, "_id");
      return userIds.map(bedId => usersById[bedId]);
    })
  )
};
