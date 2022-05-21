import { gql } from '@apollo/client';
import dato, {
	contactFragment,
	responsiveImageFragment,
	SEOFragment,
} from 'lib/datocms';
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from 'next';
import { FC } from 'react';
import { Image, StructuredText } from 'react-datocms';
import { Contact, IComment, Post } from 'types';
import styles from 'styles/post/Post.module.scss';
import Layout from 'components/pages/layout';
import YoutubeEmbed from 'components/video';
import PostInfo from 'components/postInfo';
import ErrorInfo from 'components/error-info';
import CommentsView from 'components/comments';
import getCommentByPost from 'utils/api/comments/getCommentsByPost';
import connectMongoDB from 'lib/mongo';
import useAppSWR from 'utils/apiClient/useAppSWR';

interface DatoResponse extends Contact {
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

interface ApiResponse {
	comments?: IComment[];
	error?: string | null;
}

type StaticProps = Partial<DatoResponse & ApiResponse>;

const PostPage: FC<StaticProps> = ({
	post,
	contact,
	comments: fallbackData = [],
	error,
}) => {
	const {
		isValidating,
		data: comments = [],
		error: commentsError,
		mutate,
	} = useAppSWR<IComment[]>(`/api/comments?postId=${post?.id}`, {
		fallbackData,
	});

	if (error || !post || !contact) {
		return <ErrorInfo>{error}</ErrorInfo>;
	}
	const { title, content, picture, seoMetaTags, ...postInfo } = post;
	const pictureData = picture?.responsiveImage;
	return (
		<Layout contact={contact} seoData={seoMetaTags}>
			<main className={styles.main}>
				<h1 className={styles.title}>{title}</h1>
				<PostInfo
					{...postInfo}
					className={styles.info}
					commentsCount={comments.length}
				/>
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
				<CommentsView
					postId={post.id}
					comments={comments}
					onRefresh={mutate}
					error={commentsError?.toString()}
					isValidating={isValidating}
				/>
			</main>
		</Layout>
	);
};

export default PostPage;

type Variables = { slug: string; id: string };
export const getStaticProps: GetStaticProps<StaticProps, Variables> = async ({
	params,
}) => {
	// eslint-disable-next-line @typescript-eslint/ban-types
	const initialProps: GetStaticPropsResult<{}> = {
		props: {},
		revalidate: 30,
	};

	if (!params)
		return {
			...initialProps,
			error: 'Coś poszło nie tak podczas generowania ścieżek :/',
		};

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
	const { data: postData, error: datoError } = await dato<
		DatoResponse,
		Variables
	>({
		query: gql`
			query PostBySlug($slug: String) {
				${postFragment}
				${contactFragment}
			}
		`,
		variables: params,
	});
	let apiError = null;
	let comments: IComment[] = [];
	try {
		await connectMongoDB();
		const docComments = await getCommentByPost(postData.post.id);
		comments = docComments.map(d => JSON.parse(JSON.stringify(d.toJSON())));
	} catch (e) {
		apiError = `${e}`;
	}
	return {
		...initialProps,
		props: {
			...postData,
			comments,
			error: apiError || `${datoError ?? ''}` || null,
		},
	};
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
