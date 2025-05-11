// Funkcja pomocnicza — zwraca tekst podtytułu w nagłówku, np. "5 zadań", "2 zadania", "1 zadanie", "Brak zadań"
// Czyli dba o gramatykę / odmianę rzeczownika w zależności od liczby

export function getSubheading(numberOfTasks) {
  switch (true) {
    case numberOfTasks > 4:
      return `${numberOfTasks} zadań`; // np. 5 zadań, 12 zadań (liczby > 4)

    case numberOfTasks > 1:
      return `${numberOfTasks} zadania`; // 2 zadania, 3 zadania, 4 zadania

    case numberOfTasks === 1:
      return "1 zadanie"; // pojedyncze

    case numberOfTasks === 0:
    default:
      return "Brak zadań"; // albo gdy coś pójdzie nie tak
  }
}
