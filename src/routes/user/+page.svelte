<script lang="ts">


</script>

<svelte:head>
	<title>Create User</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<form  class="form" method="POST">
		<input type="text" placeholder="Username" name="username" />
		<input type="email" placeholder="Email" name="email" />
		<button type="submit">Create User</button>
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
</style>
