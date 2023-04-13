<g id="hd-grid">
	{#each Array.from({ length: 20 }) as _, idx (`${idx}`)}
		<line
			y1="0"
			x1={idx * 25}
			y2="1200"
			x2={idx * 25}
			stroke="white"
			stroke-width={idx % 10 === 0 ? 3 : idx % 5 === 0 ? 1 : 0.5}
		/>
		<line
			y1="0"
			x1={-idx * 25}
			y2="1200"
			x2={-idx * 25}
			stroke="white"
			stroke-width={idx % 10 === 0 ? 3 : idx % 5 === 0 ? 1 : 0.5}
		/>
	{/each}
	{#each Array.from({ length: 48 }) as _, idx (`${idx}`)}
		<line
			x1="-500"
			x2="500"
			y1={idx * 25}
			y2={idx * 25}
			stroke="white"
			stroke-width={idx % 10 === 0 ? 3 : idx % 5 === 0 ? 1 : 0.5}
		/>
	{/each}
</g>
