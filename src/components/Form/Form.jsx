import { useState } from "react";
import { Button } from "../Button/Button";
import styles from "./Form.module.css";

// Komponent formularza dodawania nowego zadania
// onFormSubmit — funkcja z App.jsx która faktycznie dodaje taska do listy
export function Form({ onFormSubmit }) {
  // Stan na treść wpisaną przez usera (pole tekstowe)
  const [inputValue, setInputValue] = useState("");

  // Domyślnie ustawiamy tag na "Inne"
  // To zmienia się w <select> dropdownie
  const [selectedTag, setSelectedTag] = useState("Inne");

  // Obsługa submitu formularza (kliknięcie Dodaj lub Enter)
  const handleSubmit = (event) => {
    event.preventDefault(); // zatrzymujemy przeładowanie strony

    const trimmed = inputValue.trim(); // usuwamy spacje przed/po
    if (trimmed.length < 3) return; // nie dodawaj śmieci krótszych niż 3 znaki

    // Przekazujemy dane w górę do App.jsx (treść + wybrany tag)
    onFormSubmit(trimmed, selectedTag);

    // Czyścimy pole inputa i resetujemy tag po dodaniu
    setInputValue("");
    setSelectedTag("Inne");
  };

  return (
    // cały formularz — obsługuje submit
    <form onSubmit={handleSubmit} className={styles.form}>
      {/* Pole tekstowe do wpisania zadania */}
      <input
        name="todo" // <- żeby przeglądarka wiedziała co to za pole
        value={inputValue} // <- wartość pochodzi ze stanu
        onChange={(e) => setInputValue(e.target.value)} // <- aktualizacja stanu
        className={styles.input}
        type="text"
        placeholder="Wpisz zadanie..." // tekst szary w środku pola
      />

      {/* Dropdown z wyborem taga — kategoria zadania */}
      <select
        name="tag-select" // <- żeby przeglądarka i lintery nie marudziły
        value={selectedTag} // <- aktualna wartość z useState
        onChange={(e) => setSelectedTag(e.target.value)} // <- zmiana taga
        className={styles.select}
      >
        <option value="Praca">Praca</option>
        <option value="Dom">Dom</option>
        <option value="Zakupy">Zakupy</option>
        <option value="Inne">Inne</option>
      </select>

      {/* Przycisk dodawania zadania — blokowany jeśli za krótki tekst */}
      <Button disabled={inputValue.trim().length < 3}>Dodaj</Button>
    </form>
  );
}
