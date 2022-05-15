import { gql } from '@apollo/client';
import dato, {
	contactFragment,
	responsiveImageFragment,
	SEOFragment,
} from 'lib/datocms';
import { GetStaticPaths, GetStaticProps } from 'next';
import { FC } from 'react';
import { Image, StructuredText } from 'react-datocms';
import { Contact, Post } from 'types';
import styles from 'styles/post/Post.module.scss';
import Layout from 'components/pages/layout';
import YoutubeEmbed from 'components/video';
import PostInfo from 'components/postInfo';

interface Response extends Contact {
	post: Pick<
		Post,
		| 'title'
		| 'author'
		| 'category'
		| 'content'
		| 'picture'
		| 'seoMetaTags'
		| 'id'
	>;
}
const PostPage: FC<Response> = ({ post, contact }) => {
	const { title, content, picture, seoMetaTags, ...postInfo } = post;
	const pictureData = picture?.responsiveImage;
	return (
		<Layout contact={contact} seoData={seoMetaTags}>
			<main className={styles.main}>
				<h1 className={styles.title}>{title}</h1>
				<PostInfo {...postInfo} className={styles.info} />
				{pictureData && <Image data={pictureData} />}
				<StructuredText
					data={content}
					renderBlock={({ record }) => {
						// eslint-disable-next-line no-underscore-dangle
						switch (record.__typename) {
							case 'VideoBlockRecord':
								return <YoutubeEmbed {...record.video} />;

							case 'ImageBlockRecord':
								return <Image data={record.image.responsiveImage} />;

							default:
								return null;
						}
					}}
				/>
			</main>
		</Layout>
	);
};

export default PostPage;

type Variables = { slug: string };
export const getStaticProps: GetStaticProps<Response, Variables> = async ({
	params,
}) => {
	const postFragment = `
	post(filter: { slug: { eq: $slug } }) {
		id
		title
		category {
			name
		}
		${SEOFragment}
		picture {
      responsiveImage{
				${responsiveImageFragment}
			}
    }
		content {
			value
			blocks {
				... on ImageBlockRecord {
					__typename
					id
					image {
						responsiveImage {
							${responsiveImageFragment}
						}
					}
				}
				... on VideoBlockRecord {
					__typename
					id
					video {
						providerUid
						title
						width
						height
					}
				}
			}
		}
		author {
			name
			avatar {
				responsiveImage {
					${responsiveImageFragment}
				}
			}
		}
	}
	`;
	const { data } = await dato<Response, Variables>({
		query: gql`
			query PostBySlug($slug: String) {
				${postFragment}
				${contactFragment}
			}
		`,
		variables: params,
	});

	return { props: data, revalidate: 60 };
};

export const getStaticPaths: GetStaticPaths = async () => {
	type PathsResponse = { allPosts: { slug: string }[] };
	const { data } = await dato<PathsResponse>({
		query: gql`
			query PostSlugs {
				allPosts {
					slug
				}
			}
		`,
	});
	return {
		paths: data.allPosts.map(postData => ({ params: postData })),
		fallback: false,
	};
};
