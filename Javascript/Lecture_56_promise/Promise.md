# 🔥 **What is a Promise in JS? (Simple Hinglish)**

**Promise = ek aisa object jo aane wale time me result dega.**  
Abhi nahi… thoda baad me.

JavaScript ke asynchronous kaam (jaise API call, setTimeout, DB read) finish hone ka **future result** store karta hai Promise.

---

# 💡 Real-Life Example

Tumne **Zomato pe order** kiya.

- Order placed → **Pending**
    
- Food arrived → **Resolved**
    
- Delivery cancelled → **Rejected**
    

Isi tarah Promise ke 3 states hote hain.

---

# 🟦 **Promise States**

1️⃣ **Pending**  
Waiting… result abhi nahi aaya.

2️⃣ **Resolved / Fulfilled**  
Success! Result mil gaya.

3️⃣ **Rejected**  
Error aagaya / fail ho gaya.

# 🔧 **Promise ka use kyu hota hai?**

### ✔ Asynchronous code handle karne ke liye

(jaise API calls, file read, timers)

### ✔ Callback Hell se bachne ke liye

(Promise se code clean hota hai)

### ✔ Future result ko handle karne ke liye


## JS Project for Simple File upload
```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            padding: 0rem;
            margin: 0rem;
            box-sizing: border-box;
        }
        .large_container{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .main_container{
            border: solid 0.1rem rgb(242, 242, 242);
            border-radius: 0.7rem;
            box-shadow:  black .01rem 0.008rem;
            min-height: 14.5rem;
            min-width: 17.5rem;
            display: flex;
            justify-content:center;
            align-items: center;
            cursor: pointer;
        }
        .container{
            display: flex;
            flex-direction: column;
            justify-content:space-around;
            align-items: center;
            gap: 1.25rem;
        }
        #upload{
            background-color: green;
            height: 1.8rem;
            font-weight: 700;
            cursor: pointer;
            border-radius: 0.5rem;
            width: 5rem;
            height: 2.25rem;
            font-size: 1.15rem;
            color: white;
        }

        #upload:disabled{
            background-color: grey;
            cursor: not-allowed;
        }

        .result{
            font-weight: 600;
            color: rgb(221, 221, 56);
        }


    </style>
</head>
<body>
    <div class="large_container">
        <div class="main_container">
            <div class="container">
                <h2 style="font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">Upload File</h2>
                <input type="file" name="" id="upload_file" style="padding-left: 2.8rem; display: inline;">
                <input type="button" value="Upload" id="upload">
                <div class="result">

                </div>
            </div>
        </div>
    </div>
<script>
    let upload=document.getElementById('upload');
    let status=document.querySelector('.result')
    let fileInput=document.querySelector('#upload_file')

    function FileUpload(file){
        return new Promise((resolve,reject)=>{
            setTimeout(()=>{
            if(file){
                resolve(file.name)
            }
            else{
                reject("No file Selected")
            }
            },3000);
        })
    }

    upload.addEventListener('click',()=>{
        status.innerText="Uploading..."
        upload.disabled=true;

        
        const file=fileInput.files[0];
        FileUpload(file)
            .then((fileName)=>{
                status.innerText=fileName +"  Uploaded";
            })
            .catch((err)=>{
                status.innerText='Failed Resson  '+err;
            })
            .finally(()=>{
                upload.disabled=false;
            })

    })
</script>
</body>
</html>
```

