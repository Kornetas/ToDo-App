import styles from "./TodoFilterBar.module.css";

// Pasek filtrów — przyciski: Wszystkie / Aktywne / Zrobione
// oraz pole do wyszukiwania zadania po tekście

export function TodoFilterBar({
  filter, // aktualnie wybrany filtr ("all", "active", "done")
  onFilterChange, // funkcja z App.jsx, zmienia stan filtra
  searchQuery, // tekst wpisany w pole wyszukiwania
  onSearchChange, // funkcja do aktualizacji zapytania szukania
}) {
  return (
    <div className={styles.filterBar}>
      {/* Sekcja z trzema przyciskami filtra statusu */}
      <div className={styles.buttons}>
        {/* Każdy przycisk ustawia inny filtr.
            Jeśli kliknięty, dodajemy klasę 'active' (wyróżnienie kolorem) */}
        <button
          className={filter === "all" ? styles.active : ""}
          onClick={() => onFilterChange("all")}
        >
          Wszystkie
        </button>
        <button
          className={filter === "active" ? styles.active : ""}
          onClick={() => onFilterChange("active")}
        >
          Aktywne
        </button>
        <button
          className={filter === "done" ? styles.active : ""}
          onClick={() => onFilterChange("done")}
        >
          Zrobione
        </button>
      </div>

      {/* Sekcja wyszukiwania po nazwie zadania */}
      <div className={styles.search}>
        {/* Label tylko dla screen readerów — dla lepszej dostępności */}
        <label htmlFor="search" className={styles.visuallyHidden}>
          Szukaj
        </label>

        {/* Input tekstowy do wyszukiwania zadań po nazwie */}
        <input
          id="search" // label go "widzi"
          name="search" // dobre praktyki/form autofill
          type="text"
          value={searchQuery} // wartość z Reactowego stanu
          onChange={(e) => onSearchChange(e.target.value)} // zmiana -> aktualizuje stan
          placeholder="Szukaj zadania..." // podpowiedź w środku inputa
        />
      </div>
    </div>
  );
}
