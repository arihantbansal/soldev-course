import { clusterApiUrl } from "@solana/web3.js";

async function getBalanceUsingJSONRPC(address: string): Promise<number> {
	const url = clusterApiUrl("devnet");
	console.log(url);
	return fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			jsonrpc: "2.0",
			id: 1,
			method: "getBalance",
			params: [address],
		}),
	})
		.then((res) => res.json())
		.then((json) => {
			if (json.error) {
				throw json.error;
			}
			return json["result"]["value"] as number;
		})
		.catch((error) => {
			throw error;
		});
}
