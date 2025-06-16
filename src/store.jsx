import React, { createContext, useContext, useReducer } from "react";

export const Context = createContext(null);
export const useGlobalContext = () => useContext(Context);

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let setStoreFromOutside = () => {};

export const initialStore = () => ({
	message: null,
	todos: [
		{ id: 1, title: "Make the bed", background: null },
		{ id: 2, title: "Do my homework", background: null },
	],
	favorites: [],
	people: [],
	planets: [],
	vehicles: [],
});

export default function storeReducer(store, action = {}) {
	switch (action.type) {
		case "add_task":
			const { id, color } = action.payload;
			return {
				...store,
				todos: store.todos.map((todo) =>
					todo.id === id ? { ...todo, background: color } : todo
				),
			};
		case "SET_STORE":
			return {
				...store,
				...action.payload,
			};
		default:
			throw Error("Unknown action.");
	}
}

const getState = ({ getStore, setStore }) => {
	const fetchData = async (type) => {
		const cacheKey = `swapi_cache_${type}`;
		const cached = localStorage.getItem(cacheKey);

		if (cached) {
			try {
				const parsed = JSON.parse(cached);
				setStoreFromOutside({ [type]: parsed });
				return;
			} catch (err) {}
		}

		try {
			let endpoint = `https://www.swapi.tech/api/${type}`;
			let dataKey = "results";

			if (type === "planets") {
				endpoint = "https://starwars-databank-server.vercel.app/api/v1/locations";
				dataKey = "data";
			} else if (type === "vehicles") {
				endpoint = "https://starwars-databank-server.vercel.app/api/v1/vehicles";
				dataKey = "data";
			}

			const res = await fetch(endpoint);
			if (!res.ok) throw new Error("Fetch failed");

			const data = await res.json();
			const list = data[dataKey];

			if (type === "planets" || type === "vehicles") {
				const withUid = list.map((item, index) => ({
					...item,
					uid: (index + 1).toString(),
				}));
				setStoreFromOutside({ [type]: withUid });
				localStorage.setItem(cacheKey, JSON.stringify(withUid));
				return;
			}

			const shortList = list.slice(0, 10);
			const items = [];

			for (const item of shortList) {
				await delay(200);
				const resDetail = await fetch(item.url);
				const detail = await resDetail.json();
				items.push(detail.result);
			}

			setStoreFromOutside({ [type]: items });
			localStorage.setItem(cacheKey, JSON.stringify(items));
		} catch (err) {}
	};

	return {
		store: initialStore(),
		actions: {
			loadData: async () => {
				await fetchData("people");
				await fetchData("planets");
				await fetchData("vehicles");
			},
			toggleFavorite: (item) => {
				const store = getStore();
				const exists = store.favorites.some(
					(fav) => fav.uid === item.uid && fav.type === item.type
				);
				const updatedFavorites = exists
					? store.favorites.filter(
							(fav) => !(fav.uid === item.uid && fav.type === item.type)
					  )
					: [...store.favorites, item];
				setStore({ favorites: updatedFavorites });
			},
			addTaskColor: (id, color) => {
				setStoreFromOutside((prev) => ({
					...prev,
					todos: prev.todos.map((todo) =>
						todo.id === id ? { ...todo, background: color } : todo
					),
				}));
			},
		},
	};
};

export const StoreProvider = ({ children }) => {
	const stateData = getState({
		getStore: () => state,
		setStore: (updated) => dispatch({ type: "SET_STORE", payload: updated }),
	});

	const [state, dispatch] = useReducer(storeReducer, stateData.store);

	setStoreFromOutside = (newStoreOrFn) => {
		if (typeof newStoreOrFn === "function") {
			const result = newStoreOrFn(state);
			dispatch({ type: "SET_STORE", payload: result });
		} else {
			dispatch({ type: "SET_STORE", payload: newStoreOrFn });
		}
	};

	return (
		<Context.Provider value={{ store: state, actions: stateData.actions }}>
			{children}
		</Context.Provider>
	);
};