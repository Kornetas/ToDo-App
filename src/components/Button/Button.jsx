import styles from "./Button.module.css";

// Komponent przycisku używany wszędzie zamiast zwykłego <button>
// Dzięki temu mamy spójny wygląd i styl w całej aplikacji

export function Button({ children, onClick, disabled }) {
  return (
    // Nasz własny <button>
    // - disabled: blokuje kliknięcie (np. gdy input za krótki)
    // - className: pobieramy style z modułu CSS
    // - onClick: funkcja przekazana z zewnątrz (np. zaznacz "zrobione")
    <button disabled={disabled} className={styles.button} onClick={onClick}>
      {children} {/* Treść przycisku, np. "Dodaj", "Usuń", "Zapisz" */}
    </button>
  );
}
