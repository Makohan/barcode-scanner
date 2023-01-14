<script lang="ts" context="module">
	let audioOk: HTMLAudioElement;
	let audioError: HTMLAudioElement;

	export const playAudioOk = () => audioOk.play();
	export const playAudioError = () => audioError.play();
</script>

<audio bind:this={audioOk}>
	<source src="./audio/ok.mp3" type="audio/mp3" />
</audio>

<audio bind:this={audioError}>
	<source src="./audio/error.mp3" type="audio/mp3" />
</audio>
