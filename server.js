import vite from 'vite';
import svelte from '@svitejs/vite-plugin-svelte';
import c from 'kleur';

async function main() {
	const server = await vite.createServer({
		plugins: [svelte()],
		clearScreen: false
	});

	try {
		const mod = await server.ssrLoadModule('/src/component.svelte');
		mod.default.render();
	} catch (e) {
		server.ssrFixStacktrace(e);
		console.log(`${c.bold().magenta('should point to line 2:')}\n${e.stack.split('\n')[1]}`);
	}

	try {
		const mod = await server.ssrLoadModule('/src/index.js');
		mod.foo();
	} catch (e) {
		server.ssrFixStacktrace(e);
		console.log(`${c.bold().magenta('should point to line 2:')}\n${e.stack.split('\n')[1]}`);
	}
}

main();