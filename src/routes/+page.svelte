<script lang="ts">
	import { compressString } from "$lib/utils.js";
	import DarkModeToggle from "$lib/theme/DarkModeToggle.svelte";
	import { fade } from "svelte/transition";
	import { page } from "$app/stores";
	import LinkToGithub from "$lib/theme/LinkToGithub.svelte";

	let { data } = $props();
	let textareaRef: HTMLTextAreaElement;
	let message = $state("");
	let messageColor = $state("");
	let i = $state(0);
	let currentWord = $state("");
	let intervalTime = $state(200);
	let intervalRef = $state(0);

	function copyLinkToClipboard(input: string) {
		console.log(input);
		const output = compressString(input);
		if (output) {
			navigator.clipboard.writeText(`${$page.url}view/${output}`);
			return true;
		} else {
			return false;
		}
	}

	function startInterval() {
		i = 0;
		intervalRef = setInterval(() => {
			if (data.defaultText.split(/\s+/)[i]) {
				currentWord = data.defaultText.split(/\s+/)[i];
				i++;
			}
		}, intervalTime);
	}

	function stopInterval() {
		clearInterval(intervalRef);
		i = 0;
		currentWord = "";
	}
</script>

<aside class="absolute right-4 top-4">
	<DarkModeToggle />
  <LinkToGithub/>
</aside>

<main class="flex h-screen w-full justify-center bg-white text-black dark:bg-black dark:text-white">
	<div class="flex flex-col gap-4 p-2">
		<textarea bind:this={textareaRef} class="sm:h-[400px] h-[800px] w-64 sm:w-[600px] text-black dark:bg-black dark:text-white">{data.defaultText}</textarea>
		<button
			onclick={() => {
				if (copyLinkToClipboard(textareaRef.value)) {
					message = "Successfully copied link to clipboard!";
					messageColor = "text-green-500 border-green-500";
				} else {
					message = "Error: could not save link to clipboard";
					messageColor = "text-red-500 border-red-500";
				}
				setTimeout(() => {
					message = "";
					messageColor = "";
				}, 700);
			}}
			class="rounded-md border border-black px-6 py-4 font-semibold dark:border-white">Copy link to clipboard</button>
		<button onclick={() => (i ? stopInterval() : startInterval())} class="rounded-md border border-black px-6 py-4 font-semibold dark:border-white"
			>{i ? "Stop" : "Start"} preview</button>
		{#if message}
			<p transition:fade class="{messageColor} w-48">{message}</p>
		{/if}
		<p class="text-center text-4xl sm:text-6xl">{currentWord}</p>
	</div>
</main>
