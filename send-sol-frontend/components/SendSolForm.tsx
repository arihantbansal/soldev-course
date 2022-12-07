import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
	LAMPORTS_PER_SOL,
	PublicKey,
	SystemProgram,
	Transaction,
} from "@solana/web3.js";
import { FC, useState } from "react";
import styles from "../styles/Home.module.css";

export const SendSolForm: FC = () => {
	const [recipient, setRecipient] = useState("");
	const [amount, setAmount] = useState(0);

	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

	const handleRecipient = (e: any) => {
		setRecipient(e.target.value);
	};

	const handleAmount = (e: any) => {
		setAmount(e.target.value);
	};

	const sendSol = (event: any) => {
		event.preventDefault();
		if (!connection || !publicKey) {
			return;
		}

		const transaction = new Transaction();

		const instruction = SystemProgram.transfer({
			toPubkey: new PublicKey(recipient),
			fromPubkey: publicKey,
			lamports: LAMPORTS_PER_SOL * amount,
		});

		transaction.add(instruction);

		sendTransaction(transaction, connection).then((sig) => {
			console.log(
				`You can view your transaction on the Solana Explorer at:\nhttps://explorer.solana.com/tx/${sig}?cluster=devnet`
			);
			alert("Transaction successful!");
		});

		console.log(
			`Send ${event.target.amount.value} SOL to ${event.target.recipient.value}`
		);
	};

	return (
		<div>
			<form onSubmit={sendSol} className={styles.form}>
				<label htmlFor="amount">Amount (in SOL) to send:</label>
				<input
					id="amount"
					type="number"
					value={amount}
					onChange={(e) => handleAmount(e)}
					className={styles.formField}
					placeholder="e.g. 0.1"
					required
				/>
				<br />
				<label htmlFor="recipient">Send SOL to:</label>
				<input
					id="recipient"
					type="text"
					value={recipient}
					onChange={(e) => handleRecipient(e)}
					className={styles.formField}
					placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA"
					required
				/>
				<button type="submit" className={styles.formButton}>
					Send
				</button>
			</form>
		</div>
	);
};

