import styles from "./ProgressBar.module.css";

// Komponent paska postępu — pokazuje ile zadań zostało ukończonych (np. 3/5 = 60%)

export function ProgressBar({ doneCount, totalCount }) {
  // Obliczamy procent zrobionych zadań (0–100)
  const percentDone =
    totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

  // Ustalamy klasę koloru paska — inna dla niskiego, średniego i wysokiego progressu
  let colorClass = "low"; // domyślnie czerwony (słabo)
  if (percentDone >= 80) colorClass = "high"; // zielony
  else if (percentDone >= 50) colorClass = "medium"; // żółty

  return (
    <>
      {/* Tekst nad paskiem — np. "Ukończono: 3/5 (60%)" */}
      <p className={styles.text}>
        Ukończono: {doneCount}/{totalCount} ({percentDone}%)
      </p>

      {/* Pojemnik na pasek */}
      <div className={styles.bar}>
        {/* Pasek wypełnienia — kolor + szerokość w zależności od progresu */}
        <div
          className={`${styles.fill} ${styles[colorClass]}`}
          style={{ "--width": `${percentDone}%` }} // <-- custom property do użycia w CSS
        />
      </div>
    </>
  );
}
