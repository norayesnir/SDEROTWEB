<script setup lang="ts">
import type { GlobalSettings } from "#payload/types";

const { data } = await useGlobal<GlobalSettings>('global-settings');

// Get current year
const currentYear = new Date().getFullYear();

const mailToLink = computed(() => data.value?.contactInformation?.email ? `mailto:${data.value.contactInformation.email}` : '');
</script>

<template>
    <footer class="relative py-20 bg-black">
        <div class="container @container text-white">
            <div class="flex flex-col grid-cols-12 gap-6 @3xl:grid">
                <div class="flex flex-col col-span-4 gap-4 mb-4">
                    <h1 class="text-[30px] leading-none font-bold">
                        {{ data?.siteTitle }}
                    </h1>

                    <address class="not-italic">
                        <div class="flex items-center gap-1 py-1 rounded w-fit">
                            <Icon name="material-symbols:mail-outline" />
                            <a :href="mailToLink" class="text-xs underline">
                                {{ data?.contactInformation.email }}
                                <span class="sr-only">{{ data?.contactInformation.email }} Mailto
                                    Link</span>
                            </a>
                        </div>
                    </address>

                    <div class="relative not-italic -translate-x-2">
                        <div class="absolute h-8 bg-black z-10 p-2 top-1 rounded-full">
                            <Icon name="material-symbols:account-balance-outline" />
                        </div>
                        <div class="py-2 px-4 ml-4 w-fit border border-white rounded-lg">
                            <p>NL56RABO0314093583</p>
                            <p class="text-neutral-400 text-xs">
                                Ter name van: <br>
                                STICHTING SDEROT NEDERLAND
                            </p>
                        </div>
                    </div>
                </div>

                <div class="col-span-3 mt-auto">
                    <p class="text-white flex justify-between">
                        <span class="text-sm text-neutral-100">KVK:</span>
                        <span class="font-bold">93938365</span>
                    </p>
                    <p class="text-white flex justify-between">
                        <span class="text-sm text-neutral-100">Fiscaal / RDIN nr:</span>
                        <span class="font-bold">866580323</span>
                    </p>
                    <p class="text-white flex justify-between">
                        <span class="text-sm text-neutral-100">ANBI status sinds:</span>
                        <span class="font-bold">23 Oct 2024</span>
                    </p>
                </div>

                <MoleculesButtons v-if="data?.legal?.extraButtons?.length" :buttons="data?.legal?.extraButtons"
                    class="col-span-3 col-start-9 mt-auto flex flex-col gap-4" />

                <div class="flex flex-col-reverse col-span-12 @4xl:grid grid-cols-12 gap-6 @4xl:items-center">
                    <small class="col-span-4 text-xs">
                        &copy; {{ currentYear }} ·
                        {{ data?.legal.copyright?.companyName }} ·
                        {{ data?.legal.copyright?.allRightsReservedLabel }}
                    </small>

                    <MoleculesSocialMediaIcons class="col-span-4" />
                </div>
            </div>
        </div>
    </footer>
</template>
