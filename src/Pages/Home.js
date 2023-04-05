import React, { useState } from 'react';
import styles from '../Styles/home.module.css';
import API from '../Utils';
import { Card, Loader } from '../Components';
const Home = () => {
	const [input, setInput] = useState('');
	const [recipies, setRecipies] = useState([]);
	const [loading, setLoading] = useState(false);
	const getRecipies = async () => {
		try {
			const config = {
				method: 'GET',
				redirect: 'follow',
			};
			const response = await fetch(
				`${
					API.ROOT_URL
				}/api/recipes/v2?type=public&beta=true&q=${input.toLowerCase()}&app_id=${
					API.APP_ID
				}&app_key=${API.APP_KEY}`,
				config
			);
			const data = await response.json();
			if (data.hits) {
				return {
					data: data,
					success: true,
				};
			}
			throw new Error(data.message);
		} catch (error) {
			console.error(error.message);
			return {
				message: error.message,
				success: false,
			};
		}
	};
	const fetchRecipies = async () => {
		const response = await getRecipies();
		if (response.success) {
			setRecipies(response.data.hits);
		}
		// console.log(response);
		setLoading(false);
	};
	if (loading) return <Loader />;
	return (
		<div>
			<h1>Recipe Search</h1>
			<input
				type='search'
				placeholder='Search a recipe'
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyPress={(e) => {
					if (e.key === 'Enter') {
						setLoading(true);
						fetchRecipies();
					}
				}}
				className={styles.search}
			/>
			<div className={styles.list}>
				{
					recipies.map((recipe) => {
						// console.log({
						//   title: recipe.recipe.label,
						//   image: recipe.recipe.image,
						//   url: recipe.recipe.url
						// });
						return (
							<Card
								recipe={{
									title: recipe.recipe.label,
									image: recipe.recipe.image,
									url: recipe.recipe.url,
								}}
							/>
						);
					})
					/* <Card /> */
				}
			</div>
		</div>
	);
};

export default Home;
