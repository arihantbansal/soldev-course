import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
	PublicKey,
	Transaction,
	TransactionInstruction,
} from "@solana/web3.js";
import { FC, useState } from "react";
import styles from "../styles/PingButton.module.css";

const PROGRAM_ID = "ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa";
const DATA_ACCOUNT_PUBKEY = "Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod";

export const PingButton: FC = () => {
	const { connection } = useConnection();
	const { publicKey, sendTransaction } = useWallet();

	const onClick = () => {
		if (!connection || !publicKey) {
			return;
		}

		const programId = new PublicKey(PROGRAM_ID);
		const programDataAccount = new PublicKey(DATA_ACCOUNT_PUBKEY);
		const transaction = new Transaction();

		const instruction = new TransactionInstruction({
			keys: [
				{
					pubkey: programDataAccount,
					isSigner: false,
					isWritable: true,
				},
			],
			programId,
		});

		transaction.add(instruction);
		sendTransaction(transaction, connection).then((sig) => {
			console.log(sig);
		});
	};

	return (
		<div className={styles.buttonContainer} onClick={onClick}>
			{connection && <button className={styles.button}>Ping!</button>}
		</div>
	);
};

