### Set up for creation of new react app
1. First check Node js is installed on system or not 
```terminal
node -v
or
node --version
```
What does Node JS do?
It is a **runtime environment** that allows you to run JavaScript **outside the browser**.

👉 Without Node.js:

- JavaScript runs only inside the browser
- You cannot build servers with JS

👉 With Node.js:

- JS runs on your machine (like Python, Java)
- You can build backend (APIs, servers, tools)

2. Now check npm installed or not
```bash
npm -v
```
npm is a **package manager**.

That means:  
👉 It handles **external code (libraries)** for you.

---

## Brutal reality: Why you actually need npm

Without npm, every time you build something:

### You would have to:

- Manually download React from GitHub
- Download dependencies one by one
- Track versions yourself
- Fix compatibility issues manually
- Copy-paste files into your project

👉 That’s not development — that’s chaos.

## What npm actually does (no fluff)

### 1. Installs libraries

```bash
npm install react
```


👉 Downloads React and stores it in `node_modules`

---

### 2. Manages dependencies (THIS is the real power)

In `package.json`:

```bash
"dependencies": {  
  "react": "^18.2.0"  
}
```

👉 npm ensures:

- Correct version
- Compatible packages
- Easy reinstall anywhere

---

### 3. Runs scripts (you’re using this blindly)

npm run dev

👉 This executes commands defined in:

```bash
"scripts": {  
  "dev": "vite"  
}
```

You think you're “running React”  
👉 You're actually running **Vite via npm via Node.js**


## **npx = a tool that runs Node packages without installing them globally**


## Creating first react app

1. using 
```bash
npx create-react-app myapp

npm run start // go to package.json and search for script then use npm run start to run 
```

2. using
```bash
npm install -g create-react-app ## This is used to install create-react-app utility and now create-react-app is used for creating new react app but this create-react-app utility may get outdated thats why we use above npx becuase npx only download the create-react-app locally on system 
create-react-app myapp
```

3. using
```bash
npm create vite@latest myapp

npm install // for installing node package like react script dependency

npm run dev // go to package.json and search for script  then use npm run start to run 
```

