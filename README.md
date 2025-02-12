# react-pert

<img src="public/cover.jpg" />

[![-](https://img.shields.io/github/stars/ucfx/react-pert?style=for-the-badge&colorA=000000&colorB=6868ff)](https://github.com/ucfx/react-pert/stargazers)
[![-](https://img.shields.io/npm/v/react-pert?style=for-the-badge&colorA=000000&colorB=6868ff)](https://www.npmjs.com/package/react-pert)
[![Build Size](https://img.shields.io/bundlephobia/minzip/react-pert?label=bundle%20size&style=for-the-badge&colorA=000000&colorB=6868ff)](https://bundlephobia.com/result?p=react-pert)
[![Downloads](https://img.shields.io/npm/dt/react-pert.svg?style=for-the-badge&colorA=000000&colorB=6868ff)](https://www.npmjs.com/package/react-pert)

## :star2: Overview

This package provides tools to calculate and visualize a PERT (Program Evaluation and Review Technique) diagram. It includes the following components and utilities:

- **`Pert`**: A component to render the PERT diagram.
- **`usePert`**: A custom hook to retrieve PERT results.
- **Chart Interaction**: Allows interaction with the diagram, enabling the selection of tasks and displaying only the path related to the selected task.

### :rocket: Progress

- :white_check_mark: **PERT Calculator**: Fully functional.
- :white_check_mark: **PERT Diagram**: Fully functional.

### :computer: Demo

Check out the live demo [here](https://ucfx.github.io/react-pert/).

---

## :clipboard: Installation

Install the package via npm:

```bash
npm install react-pert
```

---

## :book: Usage

### Using `Pert` Component

```jsx
import { Pert, type TaskInput } from "react-pert";

const App = () => {
  const tasks: TaskInput[] = [
    { key: "1", duration: 5, text: "A" },
    { key: "2", duration: 4, text: "B" },
    { key: "3", duration: 2, text: "C", dependsOn: ["1"] },
    { key: "4", duration: 3, text: "D", dependsOn: ["2"] },
    //...
  ];

  return <Pert tasks={tasks} />;
};
```

### Using `usePert` Hook

You need to wrap your application with `PertProvider` to use the `usePert` hook. Here is an example of how you can use it:

- **Note**: You should put the `Pert` component and `usePert` hook in the same `PertProvider` to ensure that the PERT data is available to both.

```jsx
import { PertProvider, usePert, type TaskInput } from "react-pert";

const App = () => {
  const tasks: TaskInput[] = [
    { key: "1", duration: 5, text: "A" },
    { key: "2", duration: 4, text: "B" },
    { key: "3", duration: 2, text: "C", dependsOn: ["1"] },
    { key: "4", duration: 3, text: "D", dependsOn: ["2"] },
    //...
  ];
  return (
    <PertProvider>
      <Pert tasks={tasks} />
      <PertDetails />
    </PertProvider>
  );
};
```

```jsx
import { usePert } from "react-pert";

const PertDetails = () => {
  const { projectDuration, criticalPaths } = usePert();

  return (
    <div>
      <h3>Project Duration : {projectDuration}</h3>
      <h3>Critical Paths:</h3>
      <div>
        {criticalPaths.map((cp, index) => (
          <div key={index}>
            {cp.map((p, i) => (
              <span key={i}>
                {p.text}
                {i < cp.length - 1 && " → "}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## :bulb: Examples

- ### setSelectedTask

You can use the `setSelectedTask` function to select a task in the PERT diagram. This function is available when you import `setSelectedTask` from `react-pert`.

```typescript
setSelectedTask: (taskKey: string | null) => void;
```

```jsx
import { Pert, PertProvider, setSelectedTask } from "react-pert";

const App = () => {
  const tasks = [
    { key: "1", duration: 5, text: "A" },
    //...
  ];

  const handleClick = () => {
    setSelectedTask("1");
  };
  const handleClear = () => {
    setSelectedTask(null);
  };

  return (
    // PertProvider is optional if you are using only setSelectedTask
    <PertProvider>
      <Pert tasks={tasks} />
      <button onClick={handleClick}>Select Task 1</button>
      <button onClick={handleClear}>Clear Selection</button>
    </PertProvider>
  );
};
```

- ### onSelect

You can use the `onSelect` prop to get the selected task when a task is selected in the PERT diagram.

```typescript
onSelect?: (task: Task) => void;
```

```jsx
import { Pert } from "react-pert";

const App = () => {
  const tasks = [/*...*/];
  const handleSelect = (task) => {
    console.log("Selected Task:", task);
  };

  return <Pert tasks={tasks} onSelect={handleSelect} />;
};
```

- ### `usePert` with `PertOptions`

You can pass options to the `usePert` hook to customize the output data.

```typescript
const results = usePert({ bounds: true });
```
- Default: `true`

The `usePert` hook can be customized using the `bounds` option to include or exclude boundary tasks (Start and Finish) in the returned tasks.

#### Input

```jsx
const input: TaskInput[] = [
  { key: "1", duration: 5, text: "A" },
  { key: "2", duration: 4, text: "B", dependsOn: ["1"] },
  { key: "3", duration: 2, text: "C", dependsOn: ["2"] },
];
```

#### Output with `bounds = true`

When `bounds` is set to `true`, the Start and Finish tasks are included:

```jsx
const output: Task[] = [
  { key: "Start", text: "Start", duration: 0, dependsOn: [] },
  { key: "1", text: "A", duration: 5, dependsOn: ["Start"], ...rest /* other properties */ },
  { key: "2", text: "B", duration: 4, dependsOn: ["1"], ...rest /* other properties */ },
  { key: "3", text: "C", duration: 2, dependsOn: ["2"], ...rest /* other properties */ },
  { key: "Finish", text: "Finish", duration: 0, dependsOn: ["3"] },
];
```

#### Output with `bounds = false`

When `bounds` is set to `false`, the Start and Finish tasks are excluded:

```jsx
const output: Task[] = [
  { key: "1", text: "A", duration: 5, dependsOn: [], ...rest /* other properties */,},
  { key: "2", text: "B", duration: 4, dependsOn: ["1"], ...rest /* other properties */ },
  { key: "3", text: "C", duration: 2, dependsOn: ["2"], ...rest /* other properties */ },
];
```

## :books: API Reference

### `PertProps`

| Attribute   | Type                        | Description                                                     |
| ----------- | --------------------------- | --------------------------------------------------------------- |
| `tasks`     | [`TaskInput[]`](#taskinput) | Array of tasks to be used for the calculation and PERT diagram. |
| `styles?`   | [`PertStyles`](#pertstyles) | Optional styles configuration for the PERT chart.               |
| `onSelect?` | `(task: `[`Task`](#task)`) => void`      | Optional callback invoked when a task is selected.              |

### `Pert`

A visual representation of the PERT diagram (currently in development).

---

### `usePert`

#### Options:

### `PertOptions`

| Attribute | Type      | Description                                                                                                        |
| --------- | --------- | ------------------------------------------------------------------------------------------------------------------ |
| `bounds`  | `boolean` | Determines whether the boundary tasks (Start and Finish) should be included in the returned tasks. Default: `true` |

- If `true`, the Start and Finish tasks will be included.
- If `false`, the Start and Finish tasks will be excluded.
- Default: `true`

#### Returns:

- **`PertDataType`**: Contains all PERT data including tasks, levels, links, critical paths, and project duration.

### `PertDataType`

| Attribute         | Type                              | Description                                                 |
| ----------------- | --------------------------------- | ----------------------------------------------------------- |
| `tasks`           | [`Task[]`](#task)                 | Array of tasks with PERT calculation results.               |
| `levels`          | [`LevelType`](#leveltype)         | Mapping of task keys to their respective levels.            |
| `links`           | [`LinkType[]`](#linktype)         | Array of links representing the dependencies between tasks. |
| `criticalPaths`   | [`CriticalPath[]`](#criticalpath) | Array of critical paths in the project.                     |
| `projectDuration` | `number`                          | Total duration of the project.                              |
| `error?`          | `string \| null`                  | Current error message, if any.                              |

### `TaskInput`

Represents a task with input data for PERT calculation.

| Attribute    | Type       | Description                                                     |
| ------------ | ---------- | --------------------------------------------------------------- |
| `key`        | `string`   | Unique identifier for the task.                                 |
| `text`       | `string`   | Description or name of the task.                                |
| `duration`   | `number`   | Duration of the task in some unit (e.g., days).                 |
| `dependsOn?` | `string[]` | Array of task keys that the current task depends on (optional). |

### `Task`

Represents a task with PERT calculation results.

| Attribute     | Type       | Description                                  |
| ------------- | ---------- | -------------------------------------------- |
| `key`         | `string`   | Unique identifier for the task.              |
| `text`        | `string`   | Description or name of the task.             |
| `duration`    | `number`   | Duration of the task.                        |
| `dependsOn?`  | `string[]` | Array of task keys the task depends on.      |
| `earlyStart`  | `number`   | The earliest start time for the task.        |
| `earlyFinish` | `number`   | The earliest finish time for the task.       |
| `lateStart`   | `number`   | The latest start time for the task.          |
| `lateFinish`  | `number`   | The latest finish time for the task.         |
| `level`       | `number`   | The level of the task in the PERT diagram.   |
| `critical`    | `boolean`  | Indicates if the task is on a critical path. |
| `freeFloat`   | `number`   | The free float time of the task.             |
| `totalFloat`  | `number`   | The total float time of the task.            |
| `index`       | `number`   | Index of the task in the sequence.           |

### `PertStyles`

Styles configuration for the PERT chart.

| Attribute              | Type                         | Description                                              |
| ---------------------- | ---------------------------- | -------------------------------------------------------- |
| `disableGrid?`         | `boolean`                    | Whether to disable grid lines in the chart.              |
| `taskSize?`            | `number`                     | Size of the task node in pixels.                         |
| `fontFamily?`          | `string`                     | Font family for the text in the task nodes.              |
| `fontSize?`            | [`FontSize`](#fontsize)      | Font size for the text in the task nodes.                |
| `textColor?`           | `string`                     | Color of the text inside the task nodes.                 |
| `chartBackground?`     | `string`                     | Background color of the entire chart.                    |
| `taskBackground?`      | `string`                     | Background color of the task nodes.                      |
| `gridColor?`           | `string`                     | Color of the grid lines in the chart.                    |
| `borderWidth?`         | `number`                     | Width of the border for task nodes.                      |
| `selectedBorderWidth?` | `number`                     | Width of the border for selected task nodes.             |
| `hoverBorderWidth?`    | `number`                     | Width of the border when hovering over task nodes.       |
| `borderColor?`         | `string`                     | Color of the border for task nodes.                      |
| `selectedBorderColor?` | `string`                     | Color of the border for selected task nodes.             |
| `criticalColor?`       | `string`                     | Color for critical path elements (e.g., tasks or links). |
| `arrowColor?`          | `string`                     | Color of the arrows (links) between task nodes.          |
| `arrowWidth?`          | `number`                     | Width of the arrows (links) between task nodes.          |
| `gap?`                 | `{ x?: number; y?: number }` | Gap between task nodes in the chart.                     |

### `FontSize`

| Type                                                                      | Description                                   |
| ------------------------------------------------------------------------- | --------------------------------------------- |
| `"sm"`, `"md"`, `"lg"`, `"xl"`, `"2xl"`, `"3xl"`, `string & {}`, `number` | Font size options for text in the task nodes. |

### `LevelType`

Represents a mapping of task keys to their respective levels in the PERT diagram.

| Attribute | Type       | Description                               |
| --------- | ---------- | ----------------------------------------- |
| `key`     | `number`   | The level number in the PERT diagram.     |
| `value`   | `string[]` | Array of task keys at the specific level. |

### `LinkType`

Represents a link between two tasks in the PERT diagram.

| Attribute  | Type      | Description                                       |
| ---------- | --------- | ------------------------------------------------- |
| `from`     | `string`  | The task key from which the link originates.      |
| `to`       | `string`  | The task key to which the link leads.             |
| `critical` | `boolean` | Indicates if the link is part of a critical path. |

### `CriticalPath`

Represents a critical path in the PERT diagram.

|                | Type                       | Description                                                               |
| -------------- | -------------------------- | ------------------------------------------------------------------------- |
| `CriticalPath` | [`PathItem[]`](#pathitem)  | An array of tasks (`PathItem`) forming the critical path.                 |

### `PathItem`

| Attribute | Type     | Description                        |
| --------- | -------- | ---------------------------------- |
| `text`    | `string` | Description or name of the task.   |
| `key`     | `string` | Task key identifier.               |

---

## :handshake: Contributing

We welcome contributions! If you encounter any bugs or have feature requests, please open an issue or submit a pull request.

---

## :page_with_curl: License

This package is open-source and licensed under the [MIT License](LICENSE.md).

Enjoy building with **PERT Diagram**! :relaxed:
