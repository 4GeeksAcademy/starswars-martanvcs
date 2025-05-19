export const getState = ({ getStore, getActions, setStore }) => ({
	store: {
		favorites: [],
		people: [],
		planets: [],
		vehicles: []
	},
	actions: {
		loadData: async () => {
			const fetchData = async (type) => {
				const res = await fetch(`https://www.swapi.tech/api/${type}`);
				const data = await res.json();
				const items = await Promise.all(
					data.results.map(async (item) => {
						const resDetail = await fetch(item.url);
						const detail = await resDetail.json();
						return { ...detail.result };
					})
				);
				setStore({ [type]: items });
			};

			await Promise.all(["people", "planets", "vehicles"].map(fetchData));
		},
		toggleFavorite: (item) => {
			const store = getStore();
			const exists = store.favorites.some(fav => fav.uid === item.uid && fav.type === item.type);
			const updatedFavorites = exists
				? store.favorites.filter(fav => !(fav.uid === item.uid && fav.type === item.type))
				: [...store.favorites, item];
			setStore({ favorites: updatedFavorites });
		}
	}
});
