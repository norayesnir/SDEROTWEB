import type { UseSeoMetaInput } from "@unhead/vue";
import type { Page } from "#payload/types";
import { GetPageBySlugDocument } from "@/graphql";
import { useGlobalsStore } from "@/stores/globals";

interface PageQueryResult {
  Pages: {
    docs: Page[];
  };
}

export default async function (slug: string) {
  const nuxtApp = useNuxtApp();
  const config = useRuntimeConfig();
  const globalsStore = useGlobalsStore();

  const doc = ref<Page | null>(null);

  const { data } = await useAsyncQuery<PageQueryResult>(GetPageBySlugDocument, {
    slug,
  });

  console.log(data.value?.Pages?.docs)

  if (data.value?.Pages?.docs.length) {
    doc.value = data.value.Pages?.docs[0];

    const docMeta = doc.value!.meta;
    const seoMeta: UseSeoMetaInput = { title: doc.value!.template };

    seoMeta.title = docMeta?.title || seoMeta.title;

    seoMeta.ogTitle = seoMeta.twitterTitle = `${seoMeta.title} | ${
      globalsStore.settings?.siteTitle || config.public.siteName
    }`;

    if (docMeta?.description) {
      seoMeta.description =
        seoMeta.ogDescription =
        seoMeta.twitterDescription =
          docMeta.description;
    }

    if (docMeta?.image) {
      // @ts-expect-error - sizes doesn't exist on image
      const ogImage = docMeta.image?.sizes.sm.url.replace(
        "https://localhost:3001/_ipx/", // TODO: fix _ipx so that i don't have to cut the url string
        "",
      );
      seoMeta.ogImageUrl = ogImage;
      seoMeta.twitterImage = ogImage;
      seoMeta.twitterCard = "summary_large_image";
    }

    nuxtApp.runWithContext(() => useSeoMeta(seoMeta));
  } else {
    console.error("(404) NOT FOUND: Page data missing.");
    // throw createError({
    //   statusCode: 404,
    //   message: "Page data missing.",
    // });
  }

  return doc;
}
