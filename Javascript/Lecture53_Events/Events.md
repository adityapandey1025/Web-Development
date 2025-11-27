# ⭐ JavaScript Events (Hinglish Explanation)

## 🚀 Event kya hota hai?

**Event = koi action / activity jo browser me hoti hai.**

Jaise:

- Button click karna
    
- Keyboard dabana
    
- Mouse move karna
    
- Page load hona
    
- Input box me type karna
    

Jab ye actions hote hain, JavaScript unhe **detect** kar sakti hai aur uske basis par **koi kaam** kar sakti hai
Bilkul waise hi jaise:

- Doorbell bajti hai (event)
    
- Tum jaake door kholo (response)
# ⭐ Common JavaScript Events

|Event|Meaning|
|---|---|
|`click`|Jab koi button ya element click ho|
|`mouseover`|Mouse pointer upar aaye|
|`mouseout`|Mouse pointer bahar jaye|
|`keyup`|Keyboard se key chhodi|
|`keydown`|Keyboard se key dabayi|
|`load`|Page load ho gaya|
|`input`|Input box me value change hoi|
# ⭐ Event Listener kia hota hai?

Event listener = JavaScript ko batana ki  
"bhai, agar ye event ho jaye, to ye function chala dena."

Example:
```js
document.getElementById("btn").addEventListener("click", function() {    
	 alert("Button clicked!"); 
```
