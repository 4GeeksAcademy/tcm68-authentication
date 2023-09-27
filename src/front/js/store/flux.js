const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
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

			syncTokenFromSessionStore: () => {
				const token = sessionStorage.getItem("token");
				console.log("application just loaded, syncing the session storage token");
				if(token && token !="" && token != undefined) setStore({ token: token});
			},

			logout: () => {
				const token = sessionStorage.removeItem("token");
				console.log("Loging out");
				setStore({ token: null});
			},
			
		login: async (email, password) => {
			const opts = {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					"email": "test",
					"password": "test"
				})
			};
			try{
			const resp = await fetch('https://solid-dollop-6j5x9767pjp3rr97-3001.app.github.dev/api/token', opts)
			if (resp.status !== 200){
				alert("There has been some error");
				return false;
			}
			
			const data = await resp.json();
			console.log("This came from the backend", data);
			sessionStorage.setItem("token", data.access_token);
			setStore({ token: data.access_token});
			return true;
			}
			catch(error){
				console.error("There has been an error loging in")
			}
		},







		getMessage: async () => {
			const store = getStore();
			const opts = {
			  headers: {
				"Authorization": "Bearer " + store.token // Added a space after "Bearer"
			  }
			};
			fetch(process.env.BACKEND_URL + "/api/hello",  opts)
			  .then(resp => resp.json())
			  .then(data => setStore({ message: data.message }))
			  .catch(error => console.log("Error loading message from backend", error));
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
			}
		}
	};
};

export default getState;
