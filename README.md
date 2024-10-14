# hooks-master

A collection of custom React hooks to enhance your development experience. This package includes `useFetch`, `useDebounce`, `useThrottle`, `useToggle` which can be useful in fetching data from APIs effortlessly, to debounce a value preventing updates until a specified delay has passed, limits the rate at which a function can fire and also provides a simple way to toggle a boolean state.

## Table of Contents

- [Installation](#installation)

- [Usage](#usage)

- [useFetch](#usefetch)

- [API Reference](#api-reference)

- [License](#license)

## Installation

To install the `hook-master` package, run the following command:

```bash

npm install hook-master

```

### Usage

#### useFetch

The useFetch hook allows you to fetch data from a provided URL. It manages loading state, error handling, and response data.

```jsx
import React from "react";
import { useFetch } from "hook-master";

const DataDisplay = () => {
  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/todos/1"
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>Status: {data.completed ? "Completed" : "Pending"}</p>
    </div>
  );
};

export default DataDisplay;
```

#### Parameters

- `url` (string): The URL to fetch data from. This is a required parameter.
- `options` (object): Optional. Fetch options such as method, headers, body, etc.

#### Return Value

The `useFetch` hook returns an object with the following properties:

- `data`: The fetched data (or `null` if still loading).
- `loading`: A boolean indicating if the request is in progress.
- `error`: A string containing error messages if the fetch fails (or `null` if there’s no error).

Example with options

```jsx
import React from "react";
import { useFetch } from "hook-master";

const PostCreator = () => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: "New Post", body: "This is a new post." }),
  };

  const { data, loading, error } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
    options
  );

  if (loading) {
    return <div>Creating post...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Post Created!</h1>
      <p>{data.title}</p>
    </div>
  );
};

export default PostCreator;
```

### useDebounce

The `useDebounce` hook is used to debounce a value, preventing updates until a specified delay has passed.

#### Example

```jsx
import React, { useState } from 'react';
import { useDebounce } from 'hook-master';

const SearchInput = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500); // 500ms debounce

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <p>Debounced Value: {debouncedQuery}</p>
    </div>
  );
};

export default SearchInput;`
```

#### Parameters

- `value`: The value to debounce.
- `delay` (number): The debounce delay in milliseconds.

#### Return Value

Returns the debounced value.

### useThrottle

The `useThrottle` hook limits the rate at which a function can fire. This is useful for performance optimization.

#### Example

```jsx
import React, { useState } from 'react';
import { useThrottle } from 'hook-master';

const ThrottledButton = () => {
  const [count, setCount] = useState(0);
  const throttledCount = useThrottle(count, 1000); // 1 second throttle

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div>
      <button onClick={handleClick}>Click Me</button>
      <p>Throttled Count: {throttledCount}</p>
    </div>
  );
};

export default ThrottledButton;`
```

#### Parameters

- `value`: The value to throttle.
- `delay` (number): The throttle delay in milliseconds.

#### Return Value

Returns the throttled value.

### useToggle

The `useToggle` hook provides a simple way to toggle a boolean state.

#### Example

```jsx
import React from 'react';
import { useToggle } from 'hook-master';

const ToggleComponent = () => {
  const [isToggled, toggle] = useToggle();

  return (
    <div>
      <p>The toggle is {isToggled ? 'ON' : 'OFF'}</p>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
};

export default ToggleComponent;`
```

#### Return Value

Returns an array with the current state and a toggle function.

## API Reference

### `useFetch(url, options)`

- **Parameters**:
  - `url`: The endpoint to fetch data from.
  - `options`: An optional object containing options like method, headers, etc.
- **Returns**:
  - `data`: Fetched data from the API.
  - `loading`: Boolean indicating if the request is in progress.
  - `error`: Any error that occurred during the fetch.

### `useDebounce(value, delay)`

- **Parameters**:
  - `value`: The value to debounce.
  - `delay`: The debounce delay in milliseconds.
- **Returns**:
  - The debounced value.

### `useThrottle(value, delay)`

- **Parameters**:
  - `value`: The value to throttle.
  - `delay`: The throttle delay in milliseconds.
- **Returns**:
  - The throttled value.

### `useToggle()`

- **Returns**:
  - An array containing the current boolean state and a function to toggle it.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

### Instructions for Use

- **Installation**: Easily install the package using npm.
- **Usage**: Clear usage examples for the hooks, both for basic and advanced use cases.
- **API Reference**: This section describes the function parameters and return values, making it easy for developers to understand how to use the hook.
