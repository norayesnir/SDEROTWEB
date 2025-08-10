export interface Content {
	subtitle?: string | null;
	heading?: Heading;
	text?: {
		root: {
			type: string;
			children: {
				type: string;
				version: number;
				[k: string]: unknown;
			}[];
			direction: ("ltr" | "rtl") | null;
			format:
				| "left"
				| "start"
				| "center"
				| "right"
				| "end"
				| "justify"
				| "";
			indent: number;
			version: number;
		};
		[k: string]: unknown;
	} | null;
	buttons?: (number | Button)[] | null;
}
