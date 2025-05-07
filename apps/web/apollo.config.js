module.exports = {
  client: {
    excludes: ["**/generated/**/*",'**/*.gql'],
    service: {
      name: "full-stack",
      localSchemaFile: "./apps/api/src/schema.gql",
      // url: "http://localhost:5444/graphql",
    },
  },
};
