<script>
	import DarkModeToggle from "$lib/theme/DarkModeToggle.svelte";

	let { data } = $props();
	let i = $state(0);
	let currentWord = $state("");
	let intervalTime = $state(200);
	let intervalRef = $state(0);

	function startInterval() {
		i = 0;
		intervalRef = setInterval(() => {
			if (data.text.split(/\s+/)[i]) {
				currentWord = data.text.split(/\s+/)[i];
				i++;
			}
			if (i > data.text.split(/\s+/).length - 1) {
				stopInterval();
				startInterval();
			}
		}, intervalTime);
	}

	function stopInterval() {
		clearInterval(intervalRef);
		i = 0;
		currentWord = "";
	}

	startInterval();
</script>

<aside class="absolute right-4 top-4">
	<DarkModeToggle />
</aside>

<main class="flex h-screen w-full flex-col items-center justify-center bg-white text-black dark:bg-black dark:text-white">
	<p class="text-center text-6xl">{currentWord}</p>
	<p class="text-6xl text-transparent">a</p>
</main>
