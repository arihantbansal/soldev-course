import {
	Connection,
	LAMPORTS_PER_SOL,
	clusterApiUrl,
	Keypair,
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

(async () => {
	const keypair = Keypair.generate();

	const airdropSignature = await connection.requestAirdrop(
		keypair.publicKey,
		LAMPORTS_PER_SOL
	);

	const latestBlockHash = await connection.getLatestBlockhash();

	const txn = await connection.confirmTransaction({
		blockhash: latestBlockHash.blockhash,
		lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
		signature: airdropSignature,
	});

	console.log({
		publicKey: keypair.publicKey,
		privateKey: keypair.secretKey,
		signature: airdropSignature,
		txn,
	});
})();
