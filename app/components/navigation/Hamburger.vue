<script setup lang="ts">
	import { useNavigationMenuStore } from "@/stores/useNavigationMenu";
	const navigationMenuStore = useNavigationMenuStore();

	const closeMenuOnResize = () => {
		if (window.innerWidth > 975) {
			navigationMenuStore.close();
		}
	};

	onMounted(() => {
		window.addEventListener("resize", closeMenuOnResize);
	});

	onUnmounted(() => {
		window.removeEventListener("resize", closeMenuOnResize);
	});
</script>

<template>
	<div class="py-2 pl-2 lg:hidden" @click="navigationMenuStore.toggle()">
		<Icon
			:name="
				navigationMenuStore.state
					? 'material-symbols:close'
					: 'material-symbols:menu'
			"
			class="w-8 h-8 cursor-pointer"
		/>
	</div>
</template>
