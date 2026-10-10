## Middlewares

```js
import multer from "multer";

  

const storage = multer.diskStorage({

  destination: function (req, file, cb) {

    cb(null, '../../public/temp')

  },

  filename: function (req, file, cb) {

    cb(null,file.originalname)

  }

})

  

export const upload=multer({storage:storage})
```

Let's break the code down.

```
import multer from "multer";
```

`multer` is middleware for handling:

```
multipart/form-data
```

So when frontend sends:

```
name → Aditya
video → lecture.mp4
image → thumbnail.jpg
```

Multer processes the file parts.

---

# 1. `multer.diskStorage()`

```
const storage = multer.diskStorage({
```

Here you're telling Multer:

> "I want uploaded files to be stored on my server's disk."

`diskStorage()` allows you to control **two things**:

```
Where should the file be saved?
        ↓
destination

What should the saved file be called?
        ↓
filename
```

---

# 2. `destination`

```
destination: function (req, file, cb) {
    cb(null, '../../public/temp')
}
```

This function decides:

> **Where should Multer save the uploaded file?**

Suppose your project looks like:

```
project/
│
├── public/
│   └── temp/
│
├── src/
│   ├── controllers/
│   └── middleware/
│
└── package.json
```

Then Multer will save the uploaded file in:

```
public/temp/
```

### What are these three parameters?

```
function (req, file, cb)
```

#### `req`

The incoming Express request.

For example:

```
req.body
```

can contain normal form fields.

#### `file`

Information about the uploaded file.

For example:

```
file.originalname
file.mimetype
file.size
```

etc.

#### `cb`

Callback function.

You're telling Multer:

> "I've decided where the file should go."

```
cb(null, '../../public/temp')
```

The callback convention is:

```
cb(error, destination)
```

So:

```
cb(null, "../../public/temp")
```

means:

```
error       → null → no error
destination → ../../public/temp
```

---

# 3. `filename`

Now:

```
filename: function (req, file, cb) {
    cb(null, file.originalname)
}
```

This decides:

> **What name should the file have after being saved?**

Suppose user uploads:

```
myVideo.mp4
```

Then:

```
file.originalname
```

is:

```
myVideo.mp4
```

So Multer saves:

```
public/temp/myVideo.mp4
```

---

# 4. Complete flow

Suppose frontend sends:

```
video = lecture.mp4
```

Request:

```
multipart/form-data
       ↓
Express
       ↓
Multer
       ↓
diskStorage
       ↓
destination()
       ↓
../../public/temp
       ↓
filename()
       ↓
lecture.mp4
```

Final:

```
public/
└── temp/
    └── lecture.mp4
```

---

# 5. Then this line

```
export const upload = multer({ storage: storage })
```

creates your **Multer middleware**.

So:

```
upload
```

is now something you can put in an Express route.

For example, one file:

```
router.post(
    "/upload",
    upload.single("avatar"),
    controller
);
```

Frontend:

```
formData.append("avatar", imageFile);
```

Multer sees:

```
field name = avatar
```

and:

```
upload.single("avatar")
```

says:

> "There should be one file whose field name is `avatar`."

After Multer processes it:

```
req.file
```

contains information about the uploaded file.

For example:

```
{
    fieldname: "avatar",
    originalname: "photo.jpg",
    mimetype: "image/jpeg",
    destination: "../../public/temp",
    filename: "photo.jpg",
    path: "../../public/temp/photo.jpg",
    size: 245678
}
```

---

# 6. Multiple files

If frontend sends:

```
video
thumbnail
```

you can configure:

```
upload.fields([
    { name: "video", maxCount: 1 },
    { name: "thumbnail", maxCount: 1 }
])
```

Then:

```
req.files.video[0]
req.files.thumbnail[0]
```

---

# 7. Why are we saving locally at all?

This connects directly to what you were learning about Cloudinary.

The architecture is:

```
React
  │
  │ image/video
  ▼
Express
  │
  ▼
Multer
  │
  │ temporarily saves
  ▼
public/temp/
  │
  │ localFilePath
  ▼
Cloudinary
  │
  ▼
Cloudinary URL
  │
  ▼
MongoDB
```

So Multer is **not the final storage** here.

It's basically a bridge:

> **HTTP multipart file → temporary local file → Cloudinary**

Then after successful Cloudinary upload, you can delete the temporary local file with:

```
fs.unlinkSync(localFilePath);
```

---

## One thing I'd change in your code

This:

```
filename: function (req, file, cb) {
    cb(null, file.originalname)
}
```

can cause **filename collisions**.

Imagine two users upload:

```
profile.jpg
```

Both could end up trying to create:

```
public/temp/profile.jpg
```

A safer approach is to generate a unique filename, for example:

```
import crypto from "crypto";

filename: function (req, file, cb) {
    const uniqueName =
        crypto.randomBytes(16).toString("hex") +
        "-" +
        file.originalname;

    cb(null, uniqueName);
}
```

Then:

```
profile.jpg
        ↓
a8f72c91...-profile.jpg
```

This avoids accidental overwriting.

### The core idea to remember

```
multer()
    ↓
handles multipart/form-data

diskStorage()
    ↓
save uploaded file to disk

destination()
    ↓
WHERE?

filename()
    ↓
WHAT NAME?

req.file / req.files
    ↓
information about the saved file
```