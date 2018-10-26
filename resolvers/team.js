export default {
  Query: {
    getAllTeams: async (_, __, { models }) => models.Team.find({}),
    getTeamByID: async (_, { id: _id }, { models }) => models.Team.find({ _id })
  },
  Mutation: {
    createTeam: async (_, args, { models }) => {
      try {
        const team = models.Team.create(args);
        return {
          ok: true,
          team
        };
      } catch (err) {
        console.log(err);
        return { ok: false };
      }
    }
  }
};
