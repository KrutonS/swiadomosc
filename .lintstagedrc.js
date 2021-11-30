// {
// 	'**/*.{js,ts,tsx}?(x)': (filenames) =>
//     `next lint --fix --file ${filenames
//       .map((file) => file.split(process.cwd())[1])
//       .join(' --file ')}`,
// 	"*.{css,scss}":[
// 		"prettier --config .prettierrc --write",
// 		'npx stylelint --fix',
// 	]
// }
module.exports = {
	'**/*.{js,ts,tsx}?(x)': filenames =>
		`next lint --fix --file ${filenames
			.map(file => file.split(process.cwd())[1])
			.join(' --file ')}`,
	'*.{css,scss}': [
		'prettier --config .prettierrc --write',
		'npx stylelint --fix',
	],
};
