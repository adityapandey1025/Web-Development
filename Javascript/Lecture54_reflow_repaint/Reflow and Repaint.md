# ⭐ Reflow & Repaint in Browser (Hinglish Explanation)

When you change something on a web page, browser ko decide karna padta hai ki **kitna redraw** karna hai.

---

# 🎯 1. What is **Reflow**?

### 👉 Reflow = Page ki **layout calculation** dobara karna.

Jab bhi tum CSS/JS se **size, position, margin, padding, width, height, display** jaisi cheeze change karte ho,  
to browser ko **poora layout dobara calculate** karna padta hai.

### Hinglish Example:

- Tumne ek box ko left se right move kar diya →  
    Browser bolega: “Arre iski wajah se saare neighbouring boxes ki position change hogi… chalo naya layout calculate karo.”
    

### ❗ Reflow is **slow** (costly process).

Agar bar-bar hota hai to page slow / jank lagta hai.

---

# 🎯 2. What is **Repaint**?

### 👉 Repaint = Sirf **appearance / looks** badalne par redraw.

Jab tum **color, background, shadow, visibility** jaisi properties change karte ho  
**without changing layout**, to browser sirf _redraw_ karta hai, layout nahi banata.

### Hinglish Example:

- Tumne text ka color red kiya →  
    Browser bolega: “Layout same hai, bas color change hai, sirf paint kar do.”
    

### Repaint = Reflow se **lightweight**

Faster hota hai.