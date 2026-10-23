const {resolve, dirname, join} = require("path");
const {v4} = require('uuid');
const {compile} = require('sass');

const regexps = {
  sassFile: /([._\-A-Za-z0-9]+)\.s[ac]ss/g,
  sassExt: /\.s[ac]ss$/,
  currentFile: /([A-Za-z0-9]+)\.(t|j)s(x)?/g,
  currentFileExt: /\.(t|j)s(x)?/
};

const isImportDefaultSpecifier = (node) =>
  node.type === 'ImportDefaultSpecifier';

function transformScss(babel) {
  const {types: t} = babel;
  return {
    name: "babel-plugin-transform-scss",
    visitor: {
      ImportDeclaration(path, state) {
        if (!regexps.sassExt.test(path.node.source.value)) return;
        const sassFileNameMatch = path.node.source.value.match(regexps.sassFile);

        const sassFileName = sassFileNameMatch[0].replace(regexps.sassExt, "");
        const file = this.filename.match(regexps.currentFile);
        const filename = `${file[0].replace(regexps.currentFileExt, "")}_${sassFileName}_${v4()}`;

        const scssFileDirectory = resolve(dirname(state.file.opts.filename));
        const fullScssFilePath = join(scssFileDirectory, path.node.source.value);
        const projectRoot = process.env.PWD;
        const nodeModulesPath = join(projectRoot, "node_modules");

        const sassResult = compile(fullScssFilePath, {
          loadPaths: [nodeModulesPath, scssFileDirectory, projectRoot, ...(state.opts.include || [])],
          sourceMap: false,
        });
        const transpiledContent = sassResult.css || "";

        const defaultImportNode = path.node.specifiers.find(isImportDefaultSpecifier);
        if (!defaultImportNode) {
          path.replaceWith(
            t.callExpression(
              t.functionExpression(
                t.identifier(""),
                [],
                t.blockStatement(
                  [
                    t.ifStatement(
                      t.binaryExpression(
                        "===",
                        t.unaryExpression("typeof", t.identifier("document")),
                        t.stringLiteral("undefined")
                      ),
                      t.blockStatement([t.returnStatement()])
                    ),
                    t.variableDeclaration("const", [
                      t.variableDeclarator(t.identifier("styles"), t.stringLiteral(transpiledContent))
                    ]),
                    t.variableDeclaration("const", [
                      t.variableDeclarator(t.identifier("fileName"), t.stringLiteral(filename))
                    ]),
                    t.variableDeclaration("const", [
                      t.variableDeclarator(
                        t.identifier("element"),
                        t.callExpression(
                          t.memberExpression(t.identifier("document"), t.identifier("querySelector")),
                          [t.stringLiteral(`style[data-sass-component='${filename}']`)]
                        )
                      )
                    ]),
                    t.ifStatement(
                      t.unaryExpression("!", t.identifier("element"), true),
                      t.blockStatement([
                        t.variableDeclaration("const", [
                          t.variableDeclarator(
                            t.identifier("styleBlock"),
                            t.callExpression(
                              t.memberExpression(t.identifier("document"), t.identifier("createElement")),
                              [t.stringLiteral("style")]
                            )
                          )
                        ]),
                        t.expressionStatement(
                          t.assignmentExpression(
                            "=",
                            t.memberExpression(t.identifier("styleBlock"), t.identifier("innerHTML")),
                            t.identifier("styles")
                          )
                        ),
                        t.expressionStatement(
                          t.callExpression(
                            t.memberExpression(t.identifier("styleBlock"), t.identifier("setAttribute")),
                            [t.stringLiteral("data-sass-component"), t.identifier("fileName")]
                          )
                        ),
                        t.expressionStatement(
                          t.callExpression(
                            t.memberExpression(
                              t.memberExpression(t.identifier("document"), t.identifier("head"), false),
                              t.identifier("appendChild"),
                              false
                            ),
                            [t.identifier("styleBlock")]
                          )
                        )
                      ]),
                      t.blockStatement([
                        t.expressionStatement(
                          t.assignmentExpression(
                            "=",
                            t.memberExpression(t.identifier("element"), t.identifier("innerHTML")),
                            t.identifier("styles")
                          )
                        )
                      ])
                    )
                  ],
                  []
                ),
                false,
                false
              ),
              []
            )
          );
        } else {
          const defaultImportName = defaultImportNode.local.name;
          path.replaceWith(
            t.variableDeclaration('const', [
              t.variableDeclarator(t.identifier(defaultImportName), t.stringLiteral(transpiledContent)),
            ])
          );
        }
      }
    }
  };
}

module.exports = transformScss;
