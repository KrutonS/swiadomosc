import { gql } from '@apollo/client';
import DescTitle from 'components/title-desc';
import Layout from 'components/layout';
import PostItem from 'components/blog/post-item';
import Select from 'components/select';
import dato, {
	contactFragment,
	responsiveImageFragment,
	SEOFragment,
} from 'lib/datocms';
import { NextPage, GetStaticProps } from 'next';
import { useState } from 'react';
import styles from 'styles/blog/Blog.module.scss';
import { Category, Contact, Post, SeoData } from 'types';

interface Data extends Contact {
	allPosts: Pick<Post, 'title' | 'author' | 'category' | 'slug' | 'picture'>[];
	allCategories: Category[];
	blogPage: SeoData;
}
const Blog: NextPage<Data> = ({
	allCategories,
	allPosts,
	contact,
	blogPage: { seoMetaTags },
}) => {
	const [filter, setFilter] = useState<string | null>(null);
	// TODO optimize
	const filters = allCategories.map<string>(c => c.name);
	let posts = allPosts;
	if (filter)
		posts = allPosts.filter(({ category }) => category?.name === filter);
	const postsNodes = posts.map(p => <PostItem post={p} key={p.title} />);
	return (
		<Layout contact={contact} seoData={seoMetaTags}>
			<main className={styles.main}>
				<DescTitle
					title="Blog"
					desc="Co tam u nas?"
					className={styles['desc-title']}
				/>
				{filter && <h4 className={styles['applied-filter']}>{filter}</h4>}
				<Select
					options={filters}
					label="Kategoria"
					active={filter}
					setActive={setFilter}
					className={styles.filters}
					onRight
				/>
				<section className={styles.posts}>{postsNodes}</section>
			</main>
		</Layout>
	);
};
export default Blog;

export const getStaticProps: GetStaticProps = async () => {
	const allPostsFragment = `
	allPosts(orderBy: _firstPublishedAt_DESC) {
		title
		slug
		author {
			avatar {
				responsiveImage(imgixParams: { fm: jpg, fit: crop, w: 40, h: 40 }) {
					${responsiveImageFragment}
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
				${responsiveImageFragment}
			}
		}
	}
	`;
	const allCategoriesFragment = `
	allCategories {
		id
		name
	}
	`;
	const blogFragment = `blogPage{${SEOFragment}}`;
	const mainQuery = gql`
		query BlogPosts {
			${blogFragment}
			${allPostsFragment}
			${allCategoriesFragment}
			${contactFragment}
		}
	`;

	const { data } = await dato<Data>({
		query: mainQuery,
	});

	return { props: data };
};
