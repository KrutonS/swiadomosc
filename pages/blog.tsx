/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { gql } from '@apollo/client';
import DescTitle from 'components/desc-title';
import PostItem from 'components/post-item';
import dato from 'lib/datocms';
import { NextPage, GetStaticProps } from 'next';
import styles from 'styles/Blog.module.scss';
import { Category, Post } from 'types';

interface Data {
	allPosts: Post[];
	allCategories: Category[];
}

const Blog: NextPage<Data> = ({ allPosts, allCategories }) => {
	return (
		<main className={styles.main}>
			<DescTitle
				title="Blog"
				desc="Co tam u nas?"
				className={styles['desc-title']}
			/>
			<section className={styles.posts}>
				{allPosts.map(p => (
					<PostItem post={p} key={p.title} />
				))}
			</section>
		</main>
	);
};
export default Blog;

export const getStaticProps: GetStaticProps = async () => {
	// const focalQuery = gql`
	// 	query PostsFocal {
	// 		allPosts {
	// 			picture {
	// 				focalPoint {
	// 					x
	// 					y
	// 				}
	// 			}
	// 		}
	// 	}
	// `;
	// const {
	// 	data: {
	// 		allPosts: {
	// 			picture: {
	// 				focalPoint: { x, y },
	// 			},
	// 		},
	// 	},
	// } = await dato({ query: focalQuery });

	const mainQuery = gql`
		query BlogPosts {
			allPosts(orderBy: _firstPublishedAt_DESC) {
				title
				author {
					avatar {
						responsiveImage(imgixParams: { fm: jpg, fit: crop, w: 40, h: 40 }) {
							...responsiveImageFragment
						}
						title
					}
					id
					name
				}
				category {
					id
					name
				}
				picture {
					responsiveImage(
						imgixParams: {
							fm: jpg
							fit: crop
							w: 105
							h: 105
							crop: focalpoint
						}
					) {
						...responsiveImageFragment
					}
				}
			}
			allCategories {
				id
				name
			}
		}

		fragment responsiveImageFragment on ResponsiveImage {
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
		}
	`;

	const { data } = await dato<Data>({
		query: mainQuery,
	});

	return { props: data };
};
