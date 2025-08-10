<script setup lang="ts">
	import type { NavigationMenu } from "#payload/types";
	import { useNavigationMenuStore } from "~/stores/useNavigationMenu";

    const { data } = useGlobal<NavigationMenu>('navigation-menu', { depth: 4 })

	const navigationMenuStore = useNavigationMenuStore();
</script>

<template>
	<nav
		class="sticky top-0 z-50 w-full transition-all bg-white"
		:class="navigationMenuStore.state ? 'h-screen' : 'h-[72px]'"
	>
		<div class="container">
			<div
				class="grid items-center justify-between w-full grid-cols-[1fr_50px] grid-rows-[48px_auto_auto_1fr] py-3 mx-auto lg:flex"
				:class="navigationMenuStore.state ? 'h-full gap-8' : 'h-fit'"
			>
				<NuxtLink
					v-if="data?.logo"
					to="/"
					class="w-fit"
					@click="navigationMenuStore.close()"
				>
					<AtomsImage
						:image="data?.logo"
						class="object-contain object-left w-full h-full max-h-12"
					/>
					<span class="sr-only">Site Logo</span>
				</NuxtLink>

				<NavigationHamburger v-if="data?.routes" />

				<div
					v-if="data?.routes"
					class="items-center justify-end gap-8 lg:flex"
					:class="navigationMenuStore.state ? 'col-span-2' : 'hidden'"
				>
					<NavigationRoutes
						v-if="data?.routes"
						:routes="data?.routes"
					/>

					<AtomsButton
						v-if="data?.button && data?.button.id"
						:id="data?.button.id"
						@click="navigationMenuStore.close()"
					/>
				</div>
			</div>
		</div>
	</nav>
</template>
