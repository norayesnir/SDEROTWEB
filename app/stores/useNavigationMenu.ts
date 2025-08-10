import { defineStore } from "pinia";

export const useNavigationMenuStore = defineStore("NavigationMenu", {
	state: () => ({
		state: false,
	}),
	actions: {
		toggle() {
			this.state = !this.state;
		},
		close() {
			this.state = false;
		},
	},
});
