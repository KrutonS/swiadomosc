import type { GetStaticProps, NextPage } from 'next';
import { gql } from '@apollo/client';
import dato, {
	contactFragment,
	responsiveImageFragment,
	SEOFragment,
} from 'lib/datocms';
import aboutContent from 'utils/about-page-content';
import Hero from 'components/pages/about/hero';
import LastPost from 'components/pages/about/last-post';
import {
	SliceObject,
	Post,
	DatoImg,
	AboutContentType,
	Contact,
	SeoData,
} from 'types';
import styles from 'styles/about/About.module.scss';
import Layout from 'components/pages/layout';
import SignUp from 'components/user-inputs/sign-up';

interface AboutPage extends SeoData {
	heroImg: DatoImg;
	content?: AboutContentType;
}

interface Data extends Contact {
	post?: SliceObject<Post, 'title' | 'author' | 'showcasedVideo'>;
	aboutPage: AboutPage;
}

const Home: NextPage<Data> = ({ post, aboutPage, contact }) => {
	const {
		heroImg: { responsiveImage: heroImageData },
		content,
		seoMetaTags,
	} = aboutPage;

	return (
		<Layout contact={contact} seoData={seoMetaTags}>
			<main className={styles.main}>
				<Hero imageData={heroImageData} />
				{content && aboutContent(content as AboutContentType)}
				{post && <LastPost title="Ostatni video post" post={post} />}
				<SignUp />
			</main>
		</Layout>
	);
};

export default Home;

export const getStaticProps: GetStaticProps<Data> = async () => {
	const postFragment = `
		post(filter: {showcasedVideo: {exists: "true"}}, orderBy: _firstPublishedAt_DESC) {
			title
			showcasedVideo {
				providerUid
				title
				width
				height
			}
			author {
				name
				id
				avatar{
					responsiveImage(imgixParams:{fm:jpg, fit:crop, w:40, h:40}){
						${responsiveImageFragment}
					}
				}
			}
		}
	`;
	const aboutPageFragment = `
		aboutPage {
			${SEOFragment}
			heroImg {
				responsiveImage(imgixParams: {fm:jpg, fit:crop, crop:focalpoint, w:1920	, h:2500 }) {
					${responsiveImageFragment.replace(/(base64|bgColor)/g, '')}
				}
			}
			content {
				... on LinkRecord {
					__typename
					id
					href
					text
					background {
						responsiveImage(imgixParams: {fm:jpg, w:1920, h:255, fit:crop, crop:focalpoint}) {
							${responsiveImageFragment}
						}
					}
				}
				... on TextImageRecord {
					__typename
					id
					fixed
					title
					text{
						value
					}
					backgroundColor{
						hex
					}
					image {
						responsiveImage {
							${responsiveImageFragment}
						}
					}
				}
				... on TextListRecord {
					__typename
					id
					text{
						value
					}
					title
					title2
					list {
						id
						text
					}
				}
			}
		}
	`;
	const query = gql`
		query About {
			${postFragment}	
			${aboutPageFragment}
			${contactFragment}
			}
	`;

	const { data } = await dato<Data>({ query });
	return { props: data };
};
