import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

async function getBalanceUsingWeb3(address: PublicKey): Promise<number> {
	const connection = new Connection(clusterApiUrl("devnet"));
	return connection.getBalance(address);
}
