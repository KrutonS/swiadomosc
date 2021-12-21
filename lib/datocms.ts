import { ApolloClient, InMemoryCache } from '@apollo/client';
// TODO: Implement as next pages/api/*
const API_TOKEN = process.env.DATOCMS_API_TOKEN;
const preview = false;
const endpoint = preview
	? `https://graphql.datocms.com/preview`
	: 'https://graphql.datocms.com';
const dato = new ApolloClient({
	uri: endpoint,
	cache: new InMemoryCache(),
	headers: { authorization: `Bearer ${API_TOKEN}` },
});
export default dato;
