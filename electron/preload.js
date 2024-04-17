const { contextBridge, ipcRenderer} = require("electron")
const { Octokit } = require("@octokit/rest");

let octokit;
contextBridge.exposeInMainWorld(
    "api", {
        created: (auth) => {
           octokit = new Octokit({
                baseUrl: "https://github.pie.apple.com/api/v3",
                auth: auth
            });
        },
        send: async () => {
        	const {data: { name }} = await octokit.request("GET /user");
            return name;
        }
        
    }
);

