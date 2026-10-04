#### Initialize empty node application
```js
npm int // now handle all manually
npm init -y
```

#### Run a node file
```js
node index.js
// or
// In package.json -> script -> "start":"node index.js"
npm run start
```
#### Install library/package
```js
npm install express
```


# Production Mein Backend Deploy Karna — Hinglish README

## Overview

Is lecture mein ek basic **Node.js + Express backend** banaya gaya, pehle local machine par chalaya gaya, phir GitHub aur DigitalOcean App Platform ke through production mein deploy kiya gaya. Main focus tha deployment ka fear kam karna, environment variables ko samajhna, aur code changes ko live app tak pahunchana.

## 1. Requirements

- System par **Node.js** aur **npm** install hone chahiye. Video mein Node.js 18 ya 20 jaise recent versions use karne ka suggestion hai.
    
- Node.js install hone ke baad terminal mein `node -v` aur `npm -v` chala kar versions check kar sakte ho.
    

## 2. Project initialize karna

Project folder mein terminal open karke `npm init` chalao. Isse `package.json` create hoti hai, jisme project ka naam, version, entry file aur scripts jaise project details hoti hain.

Lecture ke example mein entry file `index.js` hai. `package.json` mein ek `start` script add ki jaati hai, jo app ko `node index.js` se run karti hai. Iske baad app ko `npm run start` se start kar sakte ho.

## 3. Express server banana

Express ek web framework hai jo incoming requests aur unke responses handle karne mein help karta hai. Express install karne ke liye:

bashCopy

```
npm install express
```

Lecture mein `express()` se app banayi jaati hai, aur `app.get()` se GET routes define kiye jaate hain. Har route mein request aane par response bhejne ke liye `res.send()` use hota hai.

Example routes:

- `/` — home route
    
- `/twitter` — Twitter-related response
    
- `/login` — login message
    
- `/youtube` — YouTube-related response
    

Route ke path mein starting slash `/` dena zaroori hai. Lecture mein in routes se text ya HTML response bhejne ke examples dikhaye gaye hain.

`app.listen()` server ko ek port par start karta hai, jahan woh requests ka wait karta rehta hai. Local machine par browser mein `localhost:PORT` open karke route test kar sakte ho.

## 4. Code change ke baad server restart karna

Lecture ke example mein code change karne ke baad server ko stop karke dobara start karna padta hai; tabhi updated route ya response load hota hai. Bar-bar manually restart karna annoying ho sakta hai, isliye speaker ne kaha ki aage ke videos mein iske solutions dekhenge.

## 5. Environment variables aur `.env`

Production mein secrets—jaise database credentials ya database URL—source code mein directly nahi rakhne chahiye. Local machine par available port bhi hosting server par free hoga, iski guarantee nahi hoti.

Lecture mein `dotenv` package install karke `.env` file mein configuration rakhne ka example hai:

envCopy

```
PORT=3000
```

App mein `dotenv.config()` se `.env` load karo, phir port ko `process.env.PORT` se access karo. Isi pattern se baad mein database URL jaise environment variables bhi read kiye ja sakte hain.

## 6. `.gitignore` aur GitHub par code push karna

GitHub par code push karne se pehle `.gitignore` file banao. Ismein kam-se-kam ye entries rakho:

gitignoreCopy

```
node_modules
.env
```

`node_modules` ko dependencies install karke dobara generate kiya ja sakta hai. `.env` ko ignore karna important hai, kyunki usmein sensitive configuration ho sakti hai.

Phir Git repository initialize karke files add aur commit karo, branch aur remote repository set karo, aur code GitHub par push karo. Lecture mein GitHub repository ko deployment platform se connect karne ke liye tayyar kiya gaya hai.

## 7. Hosting provider choose karna

Lecture mein AWS, DigitalOcean, Heroku, Railway, Render aur [cyclic.sh](http://cyclic.sh/) jaise hosting options ka zikr hai. Pricing aur free-tier availability providers ke hisaab se alag hoti hai aur waqt ke saath badal sakti hai; deploy karne se pehle current pricing check karna.

> **Cost reminder:** Lecture ke DigitalOcean walkthrough mein paid plan choose kiya gaya tha. App ka kaam ho jaane ke baad us resource ko destroy karna yaad rakho, warna charges lag sakte hain.

## 8. DigitalOcean par deploy karna

Lecture ke walkthrough ka high-level process:

1. **App create karo** aur source provider ke roop mein GitHub select karo.
    
2. **Repository aur branch select karo** jahan deploy karne layak code maujood ho.
    
3. **Plan/resources choose karo.** App ki needs ke hisaab se hosting plan select karna hota hai.
    
4. **Environment variables configure karo.** `.env` GitHub par push nahi hoti, isliye production values hosting provider ke settings mein add karni hoti hain.
    
5. **App create karke build/deploy logs check karo.** Platform repository se app build karta hai aur successful deploy ke baad live URL deta hai.
    
6. **Live routes test karo.** URL par `/`, `/twitter` ya `/youtube` jaise routes open karke responses verify kiye ja sakte hain.
    

### Production port ka dhyan

Hosting provider apna port de sakta hai ya configured port ko override kar sakta hai. Isliye app ko hard-coded port par depend nahi karna chahiye; provider se milne wale environment variable ko use karna chahiye.

## 9. JSON response aur API data

Express route se sirf text/HTML hi nahi, JSON data bhi bhej sakte ho. Lecture mein `res.json()` ka example diya gaya hai, jisse client ek URL se API response le sakta hai.

Is tarah ka live endpoint frontend—jaise React app—se consume kiya ja sakta hai. Lecture ka example basic hai; database se actual data fetch karna aage seekhne wale topics mein rakha gaya hai.

## 10. App update karna

Agar deployment branch mein naya code push karte ho aur auto-deploy enabled hai, to platform naya build/deployment chala sakta hai. Lecture mein code push karne ke baad naye feature ka live hone ka example dikhaya gaya hai.

Provider dashboard mein start command, build command, environment variables, domain, deployments aur app usage jaise settings/insights bhi mil sakte hain.

## Deployment ka short flow

**Node.js app banao → Express routes likho → local par test karo → `.env` aur `.gitignore` set karo → GitHub par push karo → provider mein repository/branch configure karo → environment variables add karo → deploy karo → live URL test karo.**

## Is lecture ke baad kya seekhna hai?

Yeh ek deliberately basic backend demo tha. Aage ke logical topics hain: requests se data lena, response ko detail mein samajhna, database se securely connect karna, user input process karna, aur data ko database ya cloud services tak bhejna.