const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: '',
			userData: {},
			loggedIn: false,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			login: async (email, password) => {
				const resp = await fetch(`${process.env.BACKEND_URL}api/login`, {
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						email: email,
						password: password
					}),
					method: 'POST'
				})
				try {
					if (!resp.ok) {
						console.error(await resp.json())
						return false
					}
					const data = await resp.json()
					setStore(data)
					console.log("Token:", getStore().token)
					return true
				} catch (error) {
					console.error("Error: ", error)
					return false
				}
			},
			signup: async (email, password) => {
				try {
					const resp = await fetch(`${process.env.BACKEND_URL}api/signup`, {
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email: email,
							password: password
						}),
						method: 'POST'
					})
					if (!resp.ok) {
						console.error(await resp.json())
						return false
					}
					console.log("User successfully created! Logging you in now!")
					return await getActions().login(email, password)
				} catch (error) {
					console.error("Error: ", error)
					return false
				}
			},
			getUserData: () => {
				if (Object.keys(getStore().userData).length > 0) setStore({userData: {}})
       			fetch(`${process.env.BACKEND_URL}api/private`, {
       			    method: 'GET',
       			    headers: {
       			      Authorization: `Bearer ${getStore().token}`
       			    }
       			})
       			.then(resp => resp.json())
       			.then(data => setStore({userData: data}))
				console.log(getStore().userData)
			},
			logout: () => {
				console.log("Logging Out")
				setStore({userData: {}})
				setStore({token: ''})
			}
		}
	};
};

export default getState;
