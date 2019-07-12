const MiniHtmlWebpackPlugin = require('./index');
const compiler = require('@webpack-contrib/test-utils');

const getConfig = (options, config = {}) =>
	Object.assign(
		{
			entry: ['./index.js'],
			plugins: [new MiniHtmlWebpackPlugin(options)],
		},
		config
	);

test('default options', () => {
	return compiler({}, getConfig()).then(result => {
		expect(result.compilation.assets['index.html']._value).toMatchSnapshot();
	});
});

test('custom title', () => {
	return compiler({}, getConfig({ context: { title: 'Pizza' } })).then(
		result => {
			expect(result.compilation.assets['index.html']._value).toMatchSnapshot();
		}
	);
});

test('custom lang', () => {
	return compiler(
		{},
		getConfig({ context: { htmlAttributes: { lang: 'ru' } } })
	).then(result => {
		expect(result.compilation.assets['index.html']._value).toMatchSnapshot();
	});
});

test('custom js attribute', () => {
	return compiler(
		{},
		getConfig({ context: { jsAttributes: { defer: 'defer' } } })
	).then(result => {
		expect(result.compilation.assets['index.html']._value).toMatchSnapshot();
	});
});

test('custom template', () => {
	return compiler(
		{},
		getConfig({
			context: { title: 'Pizza', htmlAttributes: { lang: 'it' } },
			template: ({ title }) => `<div>${title}</div>`,
		})
	).then(result => {
		expect(result.compilation.assets['index.html']._value).toMatchSnapshot();
	});
});

test('custom filename', () => {
	const filename = 'pizza.html';
	return compiler({}, getConfig({ filename })).then(result => {
		expect(result.compilation.assets[filename]._value).toMatchSnapshot();
	});
});

test('custom publicPath', () => {
	return compiler({}, getConfig({ publicPath: 'pizza/' })).then(result => {
		expect(result.compilation.assets['index.html']._value).toMatchSnapshot();
	});
});
