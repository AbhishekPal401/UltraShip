import { loadFiles } from "@graphql-tools/load-files";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = process.cwd();

export default async function buildSchema() {
  const typeDefs = await loadFiles(path.join(projectRoot, "src/**/*.graphql"), {
    useRequire: false,
    ignoreIndex: true,
  });

  const resolvers = await loadFiles(
    path.join(projectRoot, "src/**/*.resolvers.js"),
    {
      useRequire: false,
      ignoreIndex: true,
    }
  );

  if (typeDefs.length === 0) {
  }

  return makeExecutableSchema({
    typeDefs: mergeTypeDefs(typeDefs),
    resolvers: mergeResolvers(resolvers),
  });
}
