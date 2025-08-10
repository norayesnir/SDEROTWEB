import type { Image } from "#payload/types";

export interface AtomsImageProps {
	image: string | Image | Null | undefined;
	lazy?: boolean;
	sizes?: SrcsetSizes;
}
