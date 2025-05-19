import React, { createContext, useContext, useReducer } from "react";

// Crear contexto global
export const Context = createContext(null);
export const useGlobalContext = () => useContext(Context);

// Store y acciones
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getState = ({ getStore, setStore }) => ({
	store: {
		people: [],
		planets: [],
		vehicles: [],
		favorites: [],
		todos: [
			{ id: 1, title: "Learn React", background: "#ffffff" },
			{ id: 2, title: "Use Context", background: "#ffffff" },
			{ id: 3, title: "Build Star Wars app", background: "#ffffff" }
		]
	},
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

		updateColor: (id, color) => {
			const store = getStore();
			const updated = store.todos.map(todo =>
				todo.id === id ? { ...todo, background: color } : todo
			);
			setStore({ todos: updated });
		}
	}
});

// Función para obtener datos con control de velocidad y caché
const fetchData = async (type) => {
	const cacheKey = `swapi_cache_${type}`;
	const cached = localStorage.getItem(cacheKey);

	if (cached) {
		setStoreFromOutside({ [type]: JSON.parse(cached) });
		return;
	}

	try {
		const res = await fetch(`https://www.swapi.tech/api/${type}`);
		if (!res.ok) throw new Error("Too many requests or failed");

		const data = await res.json();
		const shortList = data.results.slice(0, 10);

		const items = [];

		for (const item of shortList) {
			await delay(200); // Espera entre peticiones
			const resDetail = await fetch(item.url);
			const detail = await resDetail.json();
			items.push(detail.result);
		}

		setStoreFromOutside({ [type]: items });
		localStorage.setItem(cacheKey, JSON.stringify(items));
	} catch (err) {
		console.error(`Error fetching ${type}:`, err);
	}
};

// Este setter se redefine en StoreProvider
let setStoreFromOutside = () => {};

// Proveedor del store
export const StoreProvider = ({ children }) => {
	const stateData = getState({
		getStore: () => state.store,
		setStore: (updated) => dispatch({ type: "SET_STORE", payload: updated })
	});

	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case "SET_STORE":
				return { ...state, store: { ...state.store, ...action.payload } };
			default:
				return state;
		}
	}, stateData);

	// Permite que fetchData pueda usar setStore
	setStoreFromOutside = (newStore) => {
		dispatch({ type: "SET_STORE", payload: newStore });
	};

	return (
		<Context.Provider value={{ store: state.store, actions: stateData.actions }}>
			{children}
		</Context.Provider>
	);
};
