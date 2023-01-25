const { projects, clients } = require("../sampleData");

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = require("graphql");

const Project = require("../models/Project");
const Client = require("../models/Client");

//Making Types

//1.Client type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

//1.Project type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    // client: {
    //   type: ClientType,
    //   resolve(parent, args) {
    //     return clients.find((client) => client.id === parent.clientId);
    //   },
    // },
    client: {
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      },
    },
  }),
});

//Creating query "RootQuery" to get clients by id

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //Get all projects
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        // return projects
        return Project.find();
      },
    },
    //Get particular project
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return projects.find((project) => project.id === args.id);
        return Project.findById(args.id);
      },
    },
    //Get all clients
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        // return Client
        return Client.find();
      },
    },
    //Get particular client
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // return clients.find((client) => client.id === args.id);
        return Client.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
