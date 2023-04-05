import styles from '../Styles/card.module.css';
const Card = (recipe) => {
	recipe = recipe.recipe;
	return (
		<div className={styles.card}>
			<div className={styles.badg}>
				<img
					src={recipe.image}
					alt={recipe.title}
					className={styles.img}
				/>
			</div>
			<div>
				<a href='props.url'>
					<h2>{recipe.title}</h2>
				</a>
				<a href={recipe.url} className={styles.btn}>
					<button>See More...</button>
				</a>
			</div>
		</div>
	);
};

export default Card;
