module.exports = function(babel) {
	const { types: t } = babel;
	let filePath = null;
	return {
		name: 'ast-transform', // not required
		visitor: {
			Program(path,state) {
                filePath = path;
                
                const consoleLog = t.expressionStatement(
                    t.callExpression(t.memberExpression(t.identifier('console'), t.identifier('log')), 
                    [
                        t.stringLiteral('visited file: ' + state.file.opts.filename),
                        //t.identifier('path'),
                    ]),
                );
                path.unshiftContainer('body', consoleLog);
			},
			FunctionExpression(path) {
				if (path.parent.type == 'VariableDeclarator' && path.parent.id.name == 'system') {
					const customExpression = t.expressionStatement(
						t.assignmentExpression(
							'=',
							t.identifier('args'),
							t.objectExpression([
								t.spreadElement(
									t.callExpression(t.identifier('customTransform'), [t.identifier('args')]),
								),
							]),
						),
					);

					path.get('body').unshiftContainer('body', customExpression);

					const importDeclaration = t.importDeclaration(
						[t.importSpecifier(t.identifier('customTransform'), t.identifier('customTransform'))],
						t.stringLiteral(__dirname + '/customTransform'),
					);
                    filePath.unshiftContainer('body', importDeclaration);
                    
				}
			},
		},
	};
};
