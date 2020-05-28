import * as Path from "path";
import { URI } from "vscode-uri";
import Parser from "web-tree-sitter";
import { IElmWorkspace } from "../../elmWorkspace";
import { Forest, IForest } from "../../forest";
import { Imports } from "../../imports";

export const mockUri = Path.join(__dirname, "../sources/src/Test.elm");

export class MockElmWorkspace implements IElmWorkspace {
  private imports!: Imports;
  private forest: IForest = new Forest();

  constructor(sources: { [K: string]: string }, parser: Parser) {
    for (const key in sources) {
      if (sources.hasOwnProperty(key)) {
        const source = sources[key];

        const tree = parser.parse(source);
        this.forest.setTree(mockUri, true, true, tree, true);
        this.imports = new Imports(parser);
        this.imports.updateImports(mockUri, tree, this.forest);
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  init(progressCallback: (percent: number) => void): void {
    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasDocument(uri: URI): boolean {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hasPath(uri: URI): boolean {
    return false;
  }

  getForest(): Forest {
    return this.forest;
  }

  getImports(): Imports {
    return this.imports;
  }

  getRootPath(): URI {
    return URI.file(Path.join(__dirname, "sources"));
  }
}
