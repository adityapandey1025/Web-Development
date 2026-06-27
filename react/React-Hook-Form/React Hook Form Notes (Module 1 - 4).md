

## Module 1: useForm() & register()

### Problem

Without React Hook Form:

```jsx
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
```

Need state and handlers for every field.

### useForm()

```js
const { register } = useForm();
```

Creates a form manager and provides utilities.

### register()

```jsx
<input {...register("email")} />
```

Meaning:

- Register this field with React Hook Form.
    
- Track its value automatically.
    

### Data Flow

```text
Input
 ↓
register()
 ↓
useForm()
 ↓
Form State
```

### Interview One-Liner

useForm() manages the form, while register() connects inputs to React Hook Form.

---

## Module 2: handleSubmit()

### Purpose

Collects form data and executes submit logic.

### Syntax

```js
const { register, handleSubmit } = useForm();
```

```jsx
<form onSubmit={handleSubmit(onSubmit)}>
```

### Example

```js
const onSubmit = (data) => {
    console.log(data);
};
```

Input:

```text
email = abc@gmail.com
password = 12345
```

Output:

```js
{
    email: "abc@gmail.com",
    password: "12345"
}
```

### Flow

```text
Submit
 ↓
handleSubmit()
 ↓
Validation
 ↓
Collect Data
 ↓
onSubmit(data)
```

### Interview One-Liner

handleSubmit validates fields, gathers form data, and then executes the submit callback.

---

## Module 3: Validation

### Required Field

```jsx
<input
    {...register("email", {
        required: true
    })}
/>
```

### Better Style

```jsx
<input
    {...register("email", {
        required: "Email is required"
    })}
/>
```

### Multiple Rules

```jsx
<input
    {...register("password", {
        required: "Password required",
        minLength: 8
    })}
/>
```

### Common Rules

```js
required
minLength
maxLength
pattern
```

### Validation Flow

```text
Submit
 ↓
Validation
 ↓
Pass -> onSubmit()
Fail -> errors object
```

### Interview One-Liner

Validation rules are defined inside register(), and failed validations populate the errors object.

---

## Module 4: formState.errors

### Syntax

```js
const {
    register,
    handleSubmit,
    formState: { errors }
} = useForm();
```

### Example

```jsx
<input
    {...register("email", {
        required: "Email is required"
    })}
/>
```

If validation fails:

```js
errors = {
    email: {
        message: "Email is required"
    }
}
```

### Show Error

```jsx
{
    errors.email &&
    <p>{errors.email.message}</p>
}
```

### Flow

```text
register()
 ↓
Validation
 ↓
Fail
 ↓
errors
 ↓
Show Error Message
```

### Interview One-Liner

formState.errors stores validation errors and is used to display feedback to users.

---

# Quick Revision

## useForm()

Creates and manages form state.

## register()

Registers inputs with React Hook Form.

## handleSubmit()

Validates fields and passes collected data to the submit function.

## Validation

Rules such as required, minLength, maxLength, and pattern.

## errors

Stores validation failures and error messages.

---

# Memory Trick

```text
useForm()
    ↓
register()
    ↓
Validation
    ↓
errors
    ↓
handleSubmit()
    ↓
onSubmit(data)
```