import { ApolloClient, InMemoryCache } from '@apollo/client';
// TODO: Implement as next pages/api/*
const API_TOKEN = process.env.DATOCMS_API_TOKEN;
const preview = false;
const endpoint = preview
	? `https://graphql.datocms.com/preview`
	: 'https://graphql.datocms.com';
const client = new ApolloClient({
	uri: endpoint,
	cache: new InMemoryCache(),
	headers: { authorization: `Bearer ${API_TOKEN}` },
});
const dato: typeof client.query = options => client.query(options);
export default dato;

export const responsiveImageFragment = `
	srcSet
	webpSrcSet
	sizes
	src
	width
	height
	aspectRatio
	alt
	title
	bgColor
	base64
`;

export const contactFragment = `
	contact {
		zip
		street
		phone
		email
		city
	}
`;
