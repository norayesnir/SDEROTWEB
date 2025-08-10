import type { Image } from "#payload/types";

export const useSrcset = (image: Ref<Image | null>) => {
    return computed(() => {
        const srcset: string[] = [];

        if (image.value?.sizes) {
            Object.values(image.value.sizes).forEach((size) => {
                if (size.url) {
                    srcset.push(`${size.url} ${size.width}w`);
                }
            });
        }

        return srcset.join(", ");
    });
};
