const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: '',
			userData: {}
		},
		actions: {
			// Use getActions to call a function within a fuction			
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
