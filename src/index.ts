import {
	clusterApiUrl,
	Connection,
	Keypair,
	LAMPORTS_PER_SOL,
	PublicKey,
	sendAndConfirmTransaction,
	SystemProgram,
	Transaction,
	TransactionInstruction,
} from "@solana/web3.js";
import dotenv from "dotenv";

dotenv.config();

const PROGRAM_ADDRESS = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const PROGRAM_DATA_ADDRESS = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";
const PERSONAL_ADDRESS = "GsuyNHX76ZGXwisQ2qSyP6nNUgx2DxNtCQXESVswzC6F";

async function main() {
	const payer = initializeKeypair();
	const connection = new Connection(clusterApiUrl("devnet"));
	console.log(await connection.getBalance(payer.publicKey));
	await connection.requestAirdrop(payer.publicKey, LAMPORTS_PER_SOL * 1);
	await pingProgram(connection, payer);
	await transferSol(connection, payer, new PublicKey(PERSONAL_ADDRESS), 0.01);
}

function initializeKeypair(): Keypair {
	const secret = JSON.parse(process.env.PRIVATE_KEY ?? "") as number[];
	const secretKey = Uint8Array.from(secret);
	const keypairFromSecretKey = Keypair.fromSecretKey(secretKey);
	return keypairFromSecretKey;
}

async function pingProgram(connection: Connection, payer: Keypair) {
	const transaction = new Transaction();
	const programId = new PublicKey(PROGRAM_ADDRESS);
	const programDataPubKey = new PublicKey(PROGRAM_DATA_ADDRESS);

	const instruction = new TransactionInstruction({
		keys: [
			{
				pubkey: programDataPubKey,
				isSigner: false,
				isWritable: true,
			},
		],
		programId,
	});

	transaction.add(instruction);

	const sig = await sendAndConfirmTransaction(connection, transaction, [payer]);
	console.log(
		`You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${sig}?cluster=devnet`
	);
}

async function transferSol(
	connection: Connection,
	payer: Keypair,
	receiver: PublicKey,
	amount: number
) {
	const txn = new Transaction();

	const instruction = SystemProgram.transfer({
		fromPubkey: payer.publicKey,
		toPubkey: receiver,
		lamports: amount * LAMPORTS_PER_SOL,
	});

	txn.add(instruction);

	const sig = await sendAndConfirmTransaction(connection, txn, [payer]);
	console.log(
		`You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${sig}?cluster=devnet`
	);
}

main()
	.then(() => {
		console.log("✅ Finished successfully.");
	})
	.catch((error) => {
		console.error(error);
	});
