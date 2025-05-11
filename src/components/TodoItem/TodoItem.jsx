import { useState } from "react";
import { Button } from "../Button/Button";
import styles from "./TodoItem.module.css";

// Komponent pojedynczego zadania (element listy <li>)
// Obsługuje wyświetlanie, edycję, oznaczenie jako zrobione, usunięcie itd.

export function TodoItem({
  name, // tekst zadania
  done, // czy zadanie ukończone (true/false)
  tag, // kategoria/tag (np. "Praca", "Dom", ...)
  onDeleteButtonClick, // callback do usuwania
  onDoneButtonClick, // callback do oznaczenia jako zrobione
  onMoveUp, // callback do przesunięcia w górę
  onMoveDown, // callback do przesunięcia w dół
  isFirst, // czy to pierwszy element na liście (żeby nie pokazywać strzałki w górę)
  isLast, // czy to ostatni (żeby nie pokazywać strzałki w dół)
  onUpdate, // callback do zapisania edycji
}) {
  // Stan: czy jesteśmy w trybie edycji (true po kliknięciu "Edytuj")
  const [isEditing, setIsEditing] = useState(false);

  // Stan: aktualna wartość pola input przy edycji
  const [editValue, setEditValue] = useState(name);

  // Funkcja do zapisania zmian po edycji
  const handleSave = () => {
    const trimmed = editValue.trim();
    if (trimmed.length >= 3) {
      onUpdate(trimmed); // przekazujemy nową nazwę do App.jsx
      setIsEditing(false); // wyłączamy tryb edycji
    }
  };

  return (
    <li className={styles.item}>
      {/* Jeśli edytujemy: pokaż input i przyciski "Zapisz / Anuluj" */}
      {isEditing ? (
        <>
          <input
            name="edit-todo" // <- dla dostępności i linterów
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className={styles.input}
          />
          <div className={styles.buttons}>
            {/* Zapisz aktywny tylko jeśli tekst >= 3 znaki */}
            <Button onClick={handleSave} disabled={editValue.trim().length < 3}>
              Zapisz
            </Button>
            <Button onClick={() => setIsEditing(false)}>Anuluj</Button>
          </div>
        </>
      ) : (
        <>
          {/* Wyświetlanie nazwy zadania (jeśli nie edytujemy) */}
          <span className={`${styles.name} ${done ? styles.done : ""}`}>
            {name}
          </span>

          {/* Znacznik/tag — z kolorem zależnym od kategorii */}
          <span
            className={`${styles.tagBadge} ${
              styles[`tag-${(tag || "inne").toLowerCase()}`]
            }`}
          >
            {tag || "Inne"}
          </span>

          {/* Przyciski akcji: Zrobione/Cofnij, Edytuj, strzałki, Usuń */}
          <div className={styles.buttons}>
            <Button onClick={onDoneButtonClick}>
              {done ? "Cofnij" : "Zrobione"}
            </Button>

            <Button onClick={() => setIsEditing(true)}>Edytuj</Button>

            {/* Strzałki pokazujemy tylko jeśli nie pierwszy/ostatni */}
            {!isFirst && <Button onClick={onMoveUp}>⬆️</Button>}
            {!isLast && <Button onClick={onMoveDown}>⬇️</Button>}

            <Button onClick={onDeleteButtonClick}>Usuń</Button>
          </div>
        </>
      )}
    </li>
  );
}
