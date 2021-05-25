const graphql = require("graphql");
const _ = require("lodash");

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

const celebirtyList = [
  { id: "1", name: "Rajinikanth", rating: "5", Etype: "Private" },
  { id: "2", name: "kamal", rating: "5", Etype: "Private" },
  { id: "3", name: "vijay", rating: "4", Etype: "Private" },
  { id: "4", name: "Ajith", rating: "4", Etype: "Private" },
  { id: "5", name: "Dinesh karthik", rating: "3", Etype: "Public" },
  { id: "6", name: "Ashwin", rating: "3", Etype: "Public" },
];

const eventList = [
  { id: "e1", name: "Birthday function", place: "Chennai", Etype: "Private" },
  { id: "e2", name: "Marraige function", place: "chennai", Etype: "Private" },
  { id: "e3", name: "Textile shop opening", place: "Madurai", Etype: "Public" },
  { id: "e4", name: "Temple festival", place: "salem", Etype: "Public" },
];
const Celebirty = new GraphQLObjectType({
  name: "celebirty",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    rating: { type: GraphQLString },
    event: {
      type: new graphql.GraphQLList(Event),
      resolve(parent, args) {
        return _.filter(eventList, { Etype: parent.Etype });
      },
    },
  }),
});

const Event = new GraphQLObjectType({
  name: "event",
  fields: () => ({
    name: { type: GraphQLString },
    place: { type: GraphQLString },
    id: { type: GraphQLID },
    availableCelebirty: {
      type: new graphql.GraphQLList(Celebirty),
      resolve(parent, args) {
        return celebirtyList.filter((x) => x.Etype == parent.Etype);
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "celebirtyType",
  fields: {
    celebirty: {
      type: Celebirty,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return celebirtyList.find((x) => x.id == args.id);
      },
    },
    event: {
      type: Event,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return eventList.find((x) => x.id == args.id);
      },
    },
    celebirties: {
      type: new graphql.GraphQLList(Celebirty),
      resolve(parent, args) {
        return celebirtyList;
      },
    },
    events: {
      type: new graphql.GraphQLList(Event),
      resolve(parent, args) {
        return eventList;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
