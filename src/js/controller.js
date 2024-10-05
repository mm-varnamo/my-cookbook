const recipeContainer = document.querySelector('.recipe');

console.log('hello world');

const showRecipe = async function () {
	try {
		const res = await fetch(
			'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
		);
		const data = await res.json();

		if (!res.ok) throw new Error(`${data.message} (${res.status})`);

		let { recipe } = data.data;
		recipe = {
			id: recipe.id,
			title: recipe.title,
			published: recipe.publisher,
			sourceUrl: recipe.source_url,
			image: recipe.image_url,
			servings: recipe.servings,
			cookingTime: recipe.cooking_time,
			ingredients: recipe.ingredients,
		};
		console.log(recipe);
	} catch (error) {
		alert(err);
	}
};

showRecipe();
