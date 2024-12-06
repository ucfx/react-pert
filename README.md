<h1 align="center">pert-react</h1>

## :star2: Overview

This package provides tools to calculate and visualize a PERT (Program Evaluation and Review Technique) diagram. It includes the following components and utilities:

- **`PertProvider`**: A context provider for managing and accessing PERT data.
- **`Pert`**: A component to render the PERT diagram (currently under development).
- **`usePertData`**: A custom hook to retrieve PERT results.

### :rocket: Progress

- :white_check_mark: **PERT Calculator**: Fully functional.
- :construction: **PERT Diagram**: Currently under development.

---

## :clipboard: Installation

Install the package via npm:

```bash
npm install react-pert
```

---

## :book: Usage

### Setup with `PertProvider`

Wrap your application or a specific part of it with `PertProvider` to provide context for managing PERT data:

> **Note**: The `Pert` component is under development and may not be fully functional yet.

```jsx
import { Pert, PertProvider, type TaskType } from "react-pert";

const App = () => {
  const tasks: TaskType[] = [
    { key: "1", duration: 5, text: "A" },
    { key: "2", duration: 4, text: "B" },
    { key: "3", duration: 2, text: "C", dependsOn: ["1"] },
    { key: "4", duration: 3, text: "D", dependsOn: ["2"] },
    ...
  ];

  return (
    <PertProvider>
      <Pert tasks={tasks} /> /* PERT diagram currently under development */
      <PertDetails />
    </PertProvider>
  );
};
```

---

### Using `usePertData` Hook

The `usePertData` hook allows you to calculate and retrieve PERT results. Here's how you can use it:

```jsx
import { usePertData } from "react-pert";

const PertDetails = () => {
  const { tasks, criticalPaths } = usePertData();

  return (
    <div>
      <h3>Project Duration : {tasks[tasks.length - 1]?.lateStart}</h3>
      <h3>Critical Paths:</h3>
      <div>
        {criticalPaths.map((cp, index) => (
          <div key={index}>
            {cp.map((p, i) => (
              <label key={i}>
                <span>{p.text}</span>
                {i !== cp.length - 1 && <span> {"→"}</span>}
              </label>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## :books: API Reference

### `PertProps`

| Attribute | Type                      | Description                                                     |
| --------- | ------------------------- | --------------------------------------------------------------- |
| `tasks`   | [`TaskType[]`](#TaskType) | Array of tasks to be used for the calculation and PERT diagram. |

### `Pert`

A visual representation of the PERT diagram (currently in development).

---

### `usePertData`

#### Returns:

- **`PertDataType`**: Contains all PERT data including tasks, levels, links, and critical paths.

### `PertDataType`

| Attribute       | Type                                      | Description                                                 |
| --------------- | ----------------------------------------- | ----------------------------------------------------------- |
| `tasks`         | [`TaskResultType[]`](#TaskResultType)     | Array of tasks with PERT calculation results.               |
| `levels`        | [`LevelType`](#LevelType)                 | Mapping of task keys to their respective levels.            |
| `links`         | [`LinkType[]`](#LinkType)                 | Array of links representing the dependencies between tasks. |
| `criticalPaths` | [`CriticalPathType[]`](#CriticalPathType) | Array of critical paths in the project.                     |

### `TaskType`

| Attribute    | Type       | Description                                                     |
| ------------ | ---------- | --------------------------------------------------------------- |
| `key`        | `string`   | Unique identifier for the task.                                 |
| `text`       | `string`   | Description or name of the task.                                |
| `duration`   | `number`   | Duration of the task in some unit (e.g., days).                 |
| `dependsOn?` | `string[]` | Array of task keys that the current task depends on (optional). |

### `TaskResultType`

| Attribute     | Type      | Description                                  |
| ------------- | --------- | -------------------------------------------- |
| `earlyStart`  | `number`  | The earliest start time for the task.        |
| `earlyFinish` | `number`  | The earliest finish time for the task.       |
| `lateStart`   | `number`  | The latest start time for the task.          |
| `lateFinish`  | `number`  | The latest finish time for the task.         |
| `level`       | `number`  | The level of the task in the PERT diagram.   |
| `critical`    | `boolean` | Indicates if the task is on a critical path. |
| `freeFloat`   | `number`  | The free float time of the task.             |
| `totalFloat`  | `number`  | The total float time of the task.            |
| `index`       | `number`  | Index of the task in the sequence.           |

### `LevelType`

| Attribute | Type       | Description                               |
| --------- | ---------- | ----------------------------------------- |
| `key`     | `string`   | The task key.                             |
| `value`   | `string[]` | Array of task keys at the specific level. |

### `LinkType`

| Attribute  | Type      | Description                                       |
| ---------- | --------- | ------------------------------------------------- |
| `from`     | `string`  | The task key from which the link originates.      |
| `to`       | `string`  | The task key to which the link leads.             |
| `critical` | `boolean` | Indicates if the link is part of a critical path. |

### `PathItemType`

| Attribute | Type     | Description                                        |
| --------- | -------- | -------------------------------------------------- |
| `text`    | `string` | Text description of the task on the critical path. |
| `key`     | `string` | The key of the task on the critical path.          |

### `CriticalPathType`

|                    | Type             | Description                                                                                                     |
| ------------------ | ---------------- | --------------------------------------------------------------------------------------------------------------- |
| `CriticalPathType` | `PathItemType[]` | An array of tasks (`PathItemType`) forming the critical path. Each element contains the task's `text` and `key` |

---

## :handshake: Contributing

We welcome contributions! If you encounter any bugs or have feature requests, please open an issue or submit a pull request.

---

## :page_with_curl: License

This package is open-source and licensed under the [MIT License](LICENSE.md).

Enjoy building with **PERT Diagram**! :relaxed:
