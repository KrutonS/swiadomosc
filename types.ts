import { ButtonHTMLAttributes } from 'react';
import { ResponsiveImageType, StructuredTextDocument } from 'react-datocms';

export type UArray = Array<unknown>;
export type FArgs<P extends UArray> = (...args: P) => void;

export interface DatoImg {
	responsiveImage: ResponsiveImageType;
	title?: string;
	alt?: string;
}

export interface Author {
	avatar: DatoImg;
	id: string;
	name: string;
}
export interface Category {
	id: string;
	name: string;
}
export interface Video {
	url: string;
}
export interface Post {
	title: string;
	author?: Author;
	category?: Category;
	picture?: DatoImg;
	showcasedVideo?: Video;
}

export type ButtonTypes = ButtonHTMLAttributes<HTMLButtonElement>['type'];

export type AddressType = {
	city: string;
	street: string;
	zip: string;
};

export interface Meeting {
	id: string;
	name: string;
	startTime: string;
	length: number;
	weekly: boolean;
}
export interface DatoColor {
	hex: string;
}
export interface TextListRecord {
	__typename: 'TextListRecord';
	id: string;
	title: string;
	title2?: string;
	list?: { text: string; id: string }[];
	text?: StructuredTextDocument;
}
export interface TextImageRecord {
	__typename: 'TextImageRecord';
	id: string;
	fixed: boolean;
	title: string;
	text?: StructuredTextDocument;
	image?: DatoImg;
	backgroundColor?: DatoColor;
}
export interface LinkRecord {
	__typename: 'LinkRecord';
	id: string;
	href: string;
	text: string;
	background?: DatoImg;
}
export type AboutContentType = (
	| TextListRecord
	| TextImageRecord
	| LinkRecord
)[];

/*
"__typename": "TextListRecord
"__typename": "TextImageRecord
"__typename": "LinkRecord
{
 {
          "__typename": "TextListRecord",
          "list": [
            {
              "text": "Use absolutely no pressure. We don't have to be concerned about it."
            },
            {
              "text": "We'll have a super time. Let's make a nice big leafy tree."
            },
            {
              "text": "We don't really know where this goes - and I'm not sure we really care"
            },
            {
              "text": "Lorem ipsum"
            }
          ]
        },
        {
          "fixed": true,
          "title": "Na czym polegaja spotkania?",
          "__typename": "TextImageRecord",
          "image": {
            "responsiveImage": {
              "srcSet": "https://www.datocms-assets.com/59749/1640812842-greek.jpg?dpr=0.25 171w,https://www.datocms-assets.com/59749/1640812842-greek.jpg?dpr=0.5 342w,https://www.datocms-assets.com/59749/1640812842-greek.jpg?dpr=0.75 513w,https://www.datocms-assets.com/59749/1640812842-greek.jpg 685w",
              "webpSrcSet": "https://www.datocms-assets.com/59749/1640812842-greek.jpg?dpr=0.25&fm=webp 171w,https://www.datocms-assets.com/59749/1640812842-greek.jpg?dpr=0.5&fm=webp 342w,https://www.datocms-assets.com/59749/1640812842-greek.jpg?dpr=0.75&fm=webp 513w,https://www.datocms-assets.com/59749/1640812842-greek.jpg?fm=webp 685w",
              "sizes": "(max-width: 685px) 100vw, 685px",
              "src": "https://www.datocms-assets.com/59749/1640812842-greek.jpg",
              "width": 685,
              "height": 678,
              "aspectRatio": 1.0103244837758112,
              "alt": null,
              "title": null,
              "bgColor": "#bab9b5",
              "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoICA8VFQoLDhgQDhUSFRUVFhETGR8lJCIWJSomHysjGikoKS0iMDU9KC0vMjIyGSU4PTcwPCsxMjsBCgsLCw0OFRALHDspIhwvLy8vLzsvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABgAGAMBIgACEQEDEQH/xAAZAAEBAAMBAAAAAAAAAAAAAAAABQQGBwH/xAAlEAABAgMHBQAAAAAAAAAAAAAAAQIDBAUGERIUISJhEzJBUbH/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABURAQEAAAAAAAAAAAAAAAAAAAAR/9oADAMBAAIRAxEAPwDlc1SYkGK3D2quvBvlA0lmpwS56C111xUo+2GiAS7aNVZJ13hU+gyrSQsxLOZ7QEom5nrORC3T9rEAKPKgmNtwAA//2Q=="
            }
          }
        },
        {
          "href": "spotkania",
          "__typename": "LinkRecord",
          "background": {
            "responsiveImage": {
              "srcSet": "https://www.datocms-assets.com/59749/1640871666-books.jpg?dpr=0.25 1296w,https://www.datocms-assets.com/59749/1640871666-books.jpg?dpr=0.5 2592w,https://www.datocms-assets.com/59749/1640871666-books.jpg?dpr=0.75 3888w,https://www.datocms-assets.com/59749/1640871666-books.jpg 5184w",
              "webpSrcSet": "https://www.datocms-assets.com/59749/1640871666-books.jpg?dpr=0.25&fm=webp 1296w,https://www.datocms-assets.com/59749/1640871666-books.jpg?dpr=0.5&fm=webp 2592w,https://www.datocms-assets.com/59749/1640871666-books.jpg?dpr=0.75&fm=webp 3888w,https://www.datocms-assets.com/59749/1640871666-books.jpg?fm=webp 5184w",
              "sizes": "(max-width: 5184px) 100vw, 5184px",
              "src": "https://www.datocms-assets.com/59749/1640871666-books.jpg",
              "width": 5184,
              "height": 3456,
              "aspectRatio": 1.5,
              "alt": null,
              "title": null,
              "bgColor": "#b7484d",
              "base64": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHBwgHBgoKEQ0LBwcHDA0QDgYHDREJFhENFx8ZGCIVFhUaHysjGh0oHRUWJDUlKC0vMjIyGSI4PTcwPCsxMi8BCgsLDg0OEA0NEC8cFh0vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL//AABEIABAAGAMBIgACEQEDEQH/xAAYAAACAwAAAAAAAAAAAAAAAAACAwAEB//EABoQAAMAAwEAAAAAAAAAAAAAAAABAwIRIQT/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AMnrlwXLPbLVIpoGfnSEBJ8IMc9IgH//2Q=="
            }
          }
        }
*/

type DeepKeys2<O> = { [K in keyof O]?: DeepKeys2<NonNullable<O[K]>> } | keyof O;
type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
	U[keyof U];
type ExcludeEmpty<T> = T extends AtLeastOne<T> ? T : never;
export type SliceObject<O, T extends DeepKeys2<O>> = O extends never
	? never
	: {
			[K in Extract<keyof Extract<T, object> | T, keyof O>]: K extends T
				? NonNullable<O[K]>
				: NonNullable<ExcludeEmpty<SliceObject<O[K], Extract<T, object>[K]>>>;
	  };
