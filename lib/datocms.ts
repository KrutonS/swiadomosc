import { GraphQLClient } from 'graphql-request';
// TODO: Implement as next pages/api/*
const API_TOKEN = process.env.DATOCMS_API_TOKEN;
// import {} from 'graph-request';
function datoReq<D, Variables>(
	query: string,
	variables?: Variables,
	preview?: boolean
) {
	const endpoint = preview
		? `https://graphql.datocms.com/preview`
		: 'https://graphql.datocms.com';
	const client = new GraphQLClient(endpoint, {
		headers: {
			authorization: `Bearer ${API_TOKEN}`,
		},
	});
	return client.request<D>(query, variables);
}

export default datoReq;
