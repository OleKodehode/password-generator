import { useState } from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";

const PasswordGenerator = () => {
  const [passwords, setPasswords] = useState([]);

  const generatePassword = () => {
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    const allChars = lowercase + uppercase + numbers + symbols;

    let generatedPassword = "";
    for (let i = 0; i < 12; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      generatedPassword += allChars[randomIndex];
    }

    return generatedPassword;
  };

  const handleGeneratePasswords = () => {
    const numPasswords = parseInt(prompt("Hvor mange passord vil du ha?"));
    if (!Number.isNaN(numPasswords) && numPasswords > 0) {
      const newPasswords = [];
      for (let i = 0; i < numPasswords; i++) {
        const name = prompt(`Hva skal det ${i + 1}. passordet være?`);
        const password = generatePassword();
        newPasswords.push({ name, password });
      }
      setPasswords(newPasswords);
    }
  };

  const handleDownloadPasswords = () => {
    let fileContent = "";
    passwords.forEach((pw) => {
      fileContent += `Sted: ${pw.name}\nPassord: ${pw.password}\n\n`;
    });

    const element = document.createElement("a");
    const file = new Blob([fileContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "passordByOleKoder.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
    <Head>
      <title>
        Passord generator laget av Ole
      </title>
    </Head>
      <div className={styles.passwordGeneratorContainer}>
        <h1>
          Passord generator
        </h1>
        <p
          className={styles.bodyText}
        >
          Her kan du velge hvor mange passord du vil ha, og gi alle passordene et unikt navn, slik at du kan ha oversikt over hvor dem skal brukes. Du kan også laste ned passordene dine med en .txt fil.
        </p>
        <button
          onClick={handleGeneratePasswords}
        >
          Generer dine nye passord
        </button>
        <div
          className={styles.passwordListContainer}
        >
          {passwords.map((pw) => (
            <div
              className={styles.passwordItem}
              key={pw.name}
            >
              <h3>
                {pw.name}
              </h3>
              <p>
                {pw.password}
              </p>
            </div>
          ))}
        </div>
        {passwords.length > 0 && (
          <button
            onClick={handleDownloadPasswords}
          >
            Last ned passordene dine
          </button>
        )}
      </div>
    </>
  );
};

export default PasswordGenerator;