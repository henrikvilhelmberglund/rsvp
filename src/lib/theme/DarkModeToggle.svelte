<script>
	let darkMode = $state();
	$effect(() => {
		darkMode = localStorage.theme === "dark" ? true : false;

		if (localStorage.theme === "dark" || !("theme" in localStorage)) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	});

	function toggle() {
		darkMode = !darkMode;
		// Tailwind dark mode
		// On page load or when changing themes, best to add inline in `head` to avoid FOUC
		if (!darkMode) {
			// Whenever the user explicitly chooses light mode
			localStorage.theme = "light";
		}
		if (darkMode) {
			// Whenever the user explicitly chooses dark mode
			localStorage.theme = "dark";
		}

		if (localStorage.theme === "dark" || !("theme" in localStorage)) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}

		// Whenever the user explicitly chooses to respect the OS preference
		// localStorage.removeItem("theme");
	}
</script>

<button onclick={() => toggle()} class="i-carbon-sun dark:i-carbon-moon text-2xl dark:text-white">Dark mode togle</button>

<style>
</style>
