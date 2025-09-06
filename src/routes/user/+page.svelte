<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';

	let loading = false;
</script>

<svelte:head>
	<title>Create User</title>
	<meta name="description" content="Create a new user account" />
</svelte:head>

<section>
	<form 
		class="form" 
		method="POST" 
		action="?/saveuser"
		use:enhance={() => {
			loading = true;
			return async ({ update }) => {
				loading = false;
				await update();
			};
		}}
	>
		<h2>Create User Account</h2>
		
		{#if $page.form?.error}
			<div class="error-message">
				{$page.form.error}
			</div>
		{/if}

		{#if $page.form?.success}
			<div class="success-message">
				{$page.form.message}
			</div>
		{/if}

		<input 
			type="text" 
			placeholder="Username" 
			name="username" 
			value={$page.form?.username || ''}
			required
		/>
		<input 
			type="email" 
			placeholder="Email" 
			name="email" 
			value={$page.form?.email || ''}
			required
		/>
		<button type="submit" disabled={loading}>
			{loading ? 'Creating User...' : 'Create User'}
		</button>
	</form>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
		background-color: white;
        padding: 30px
	}

	.form {
		margin-top: 100px;
		border-radius: 8px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	input{
		border: black 1px solid;
		border-radius: 8px;
		padding: 5px;
	}

	button {
		border: none;
		background-color: #4CAF50;
		color: white;
		padding: 10px 20px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		border-radius: 8px;
		cursor: pointer;
	}

	button:disabled {
		background-color: #cccccc;
		cursor: not-allowed;
	}

	.error-message {
		background-color: #f8d7da;
		color: #721c24;
		padding: 10px;
		border: 1px solid #f5c6cb;
		border-radius: 8px;
		margin-bottom: 10px;
	}

	.success-message {
		background-color: #d1edff;
		color: #0c5460;
		padding: 10px;
		border: 1px solid #bee5eb;
		border-radius: 8px;
		margin-bottom: 10px;
	}

	h2 {
		text-align: center;
		color: #333;
		margin-bottom: 20px;
	}
</style>
