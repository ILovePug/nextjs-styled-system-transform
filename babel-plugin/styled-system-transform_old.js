
const consoleLog = (t, message)=>{
    return t.expressionStatement(
        t.callExpression(t.memberExpression(t.identifier('console'), t.identifier('log')), 
        [
            t.stringLiteral('function: '),
            t.identifier('customTransform'),
        ]),
    );
}

module.exports = function(babel) {
	const { types: t } = babel;
	let customTransformImported = false;
	return {
		name: 'ast-transform', // not required
		visitor: {
            Program(path, state){
                const consoleLog = t.expressionStatement(
                    t.callExpression(t.memberExpression(t.identifier('console'), t.identifier('log')), 
                    [
                        t.stringLiteral('visited file: ' + state.file.opts.filename),
                        //t.identifier('path'),
                    ]),
                );
                path.unshiftContainer('body', consoleLog);
              },
			Identifier(path) {
				if (
					!customTransformImported &&
					path.parent.type === 'ImportSpecifier' &&
					path.parentPath.parent.source.value === '@styled-system/core' &&
					path.parentPath.parent.specifiers.some(
						node => node.imported.loc.identifierName === 'system',
					)
				) {
					const importDeclaration = t.importDeclaration(
						[t.importSpecifier(t.identifier('customTransform'), t.identifier('customTransform'))],
						t.stringLiteral(__dirname.replace('babel-plugin', '') + 'customTransform'),
					);
					const consoleLog = t.expressionStatement(
                        t.callExpression(t.memberExpression(t.identifier('console'), t.identifier('log')), 
                        [
                            t.stringLiteral('function: '),
							t.identifier('customTransform'),
						]),
					);
					path.parentPath.parentPath.insertAfter(consoleLog);

					path.parentPath.parentPath.insertAfter(importDeclaration);
					//path.scope.path.unshiftContainer('body', importDeclaration);
					customTransformImported = true;
				}

				if (
					customTransformImported &&
					path.listKey === 'arguments' &&
					path.parent.type === 'CallExpression' &&
					path.parent.callee.name === 'system' &&
					path.node.type === 'Identifier'
				) {
					const callWithCustomTransfrom = t.callExpression(t.identifier('customTransform'), [
						path.node,
					]);
					path.replaceWith(callWithCustomTransfrom);
				}
			},
		},
	};
};
