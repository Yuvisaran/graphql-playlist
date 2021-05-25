const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

const celebirtyList = [
    {id: '1', name: 'Rajinikanth', rating: '5'},
    {id:'2', name:'kamal', rating:"5"},
    {id:'3', name :'vijay', rating:'4'},
    {id:'4', name: 'Ajith', rating: '4'},
    {id:'5', name: 'Dinesh karthik', rating: '3'},
    {id:'6', name: 'Ashwin', rating: '3'}
]
const Celebirty = new GraphQLObjectType({
  name: "celebirty",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    rating: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "celebirtyType",
  fields: {
    celebirty: {
      type: Celebirty,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return celebirtyList.find(x => x.id == args.id)
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
