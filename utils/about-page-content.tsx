import { AboutContentType } from 'types';
import CallToAction from 'components/call-to-action';
import TextImage from 'components/about/text-image';
import TextList from 'components/about/text-list';

const aboutContent = (content: AboutContentType) => {
	const elements = content.map(item => {
		// eslint-disable-next-line no-underscore-dangle
		switch (item.__typename) {
			case 'LinkRecord': {
				const { href, background, text, id } = item;
				return (
					<CallToAction
						key={id}
						href={`/${href}`}
						imageData={background?.responsiveImage}
					>
						{text}
					</CallToAction>
				);
			}
			case 'TextImageRecord': {
				const { backgroundColor, id, ...passProps } = item;
				const { hex = 'black' } = backgroundColor ?? {};
				return <TextImage key={id} backgroundColor={hex} {...passProps} />;
			}
			case 'TextListRecord': {
				const { list, title, title2, text, id } = item;
				return (
					<TextList
						key={id}
						listItems={list}
						title={title}
						title2={title2}
						text={text}
					/>
				);
			}
			default: {
				throw new Error(
					`Brak takiego elementu\n${JSON.stringify(item, null, 2)}`
				);
			}
		}
	});
	return elements;
};

export default aboutContent;
