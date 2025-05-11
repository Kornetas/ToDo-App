import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import styles from "./App.module.css";
import { Form } from "./components/Form/Form";
import { TodoItem } from "./components/TodoItem/TodoItem";
import { getSubheading } from "./utils/getSubheading";
import { ProgressBar } from "./components/ProgressBar/ProgressBar";
import { TodoFilterBar } from "./components/TodoFilterBar/TodoFilterBar";

// Główny komponent aplikacji — trzyma całą logikę i renderuje wszystko
function App() {
  // Czy pokazać formularz dodawania zadania (po kliknięciu +)
  const [isFormShown, setIsFormShown] = useState(false);

  // Aktualny filtr statusu: "all" | "active" | "done"
  const [filter, setFilter] = useState("all");

  // Wpisany tekst w wyszukiwarce (do filtrowania po nazwie)
  const [searchQuery, setSearchQuery] = useState("");

  // Lista zadań — stan główny aplikacji
  // Wczytywana z localStorage tylko przy pierwszym renderze
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      if (!saved) return [];

      const parsed = JSON.parse(saved);
      // Uzupełniamy brakujące tagi (np. stare dane bez tego pola)
      return parsed.map((todo) => ({
        ...todo,
        tag: todo.tag || "Inne",
      }));
    } catch (e) {
      console.error("Błąd przy parsowaniu localStorage", e);
      return [];
    }
  });

  // Zapisuj listę zadań do localStorage przy każdej zmianie
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Dodanie nowego zadania
  function addItem(newTodoName, selectedTag) {
    const newTodo = {
      name: newTodoName,
      done: false,
      id: uuid(), // generujemy unikalne id
      tag: selectedTag || "Inne",
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setIsFormShown(false); // chowamy formularz po dodaniu
  }

  // Usunięcie zadania po id
  function deleteItem(id) {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }

  // Zaznaczenie jako zrobione (albo cofnięcie)
  function finishItem(id) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  // Przesunięcie zadania w górę listy
  function moveItemUp(id) {
    setTodos((prevTodos) => {
      const index = prevTodos.findIndex((todo) => todo.id === id);
      if (index <= 0) return prevTodos; // jeśli pierwsze — nic nie rób

      const newTodos = [...prevTodos];
      const temp = newTodos[index - 1];
      newTodos[index - 1] = newTodos[index];
      newTodos[index] = temp;
      return newTodos;
    });
  }

  // Przesunięcie zadania w dół listy
  function moveItemDown(id) {
    setTodos((prevTodos) => {
      const index = prevTodos.findIndex((todo) => todo.id === id);
      if (index === -1 || index === prevTodos.length - 1) return prevTodos;

      const newTodos = [...prevTodos];
      const temp = newTodos[index + 1];
      newTodos[index + 1] = newTodos[index];
      newTodos[index] = temp;
      return newTodos;
    });
  }

  // Aktualizacja nazwy zadania (po edycji)
  function updateItem(id, newName) {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, name: newName } : todo
      )
    );
  }

  // Przefiltrowane zadania — według statusu + tekstu wyszukiwania
  const filteredTodos = todos.filter((todo) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "active" && !todo.done) ||
      (filter === "done" && todo.done);

    const matchesSearch = todo.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1>Do zrobienia</h1>
          {/* Liczba zadań z odmianą (np. "3 zadania", "Brak zadań") */}
          <h2>{getSubheading(todos.length)}</h2>

          {/* Pasek postępu zadań */}
          <ProgressBar
            doneCount={todos.filter((t) => t.done).length}
            totalCount={todos.length}
          />
        </div>

        {/* Przycisk "+" pokazuje formularz dodawania zadania */}
        {!isFormShown && (
          <button
            onClick={() => setIsFormShown(true)}
            className={styles.button}
          >
            +
          </button>
        )}
      </header>

      {/* Formularz dodawania nowego zadania */}
      {isFormShown && <Form onFormSubmit={addItem} />}

      {/* Pasek filtrów i pole szukania */}
      <TodoFilterBar
        filter={filter}
        onFilterChange={setFilter}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Lista zadań (już przefiltrowanych) */}
      <ul>
        {filteredTodos.map(({ id, name, done, tag }, index) => (
          <TodoItem
            key={id}
            name={name}
            done={done}
            tag={tag}
            onDeleteButtonClick={() => deleteItem(id)}
            onDoneButtonClick={() => finishItem(id)}
            onMoveUp={() => moveItemUp(id)}
            onMoveDown={() => moveItemDown(id)}
            onUpdate={(newName) => updateItem(id, newName)}
            isFirst={index === 0}
            isLast={index === filteredTodos.length - 1}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
