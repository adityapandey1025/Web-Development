# Understand the Subscription Schema

**Course:** Chai aur Backend — Hitesh Choudhary  
**Topic:** MongoDB Data Modeling — Subscription Schema  
**Video:** [Watch on YouTube](https://www.youtube.com/watch?v=4_Ge2QEcT8k&list=PLu71SKxNbfoBGh_8p_NS-ZAh6v7HhYqHW&index=19)

## 1. What Is a Subscription Schema?

A subscription schema represents the relationship between two users when one user subscribes to another user's channel.

For example:

- Aditya subscribes to Nikhil.
    
- Nikhil gains one subscriber.
    
- Aditya's subscriptions increase by one.
    

This relationship is commonly represented using a separate MongoDB collection.

## 2. Why Do We Need a Separate Collection?

A user can subscribe to many channels, and a channel can have many subscribers.

A separate collection makes it easier to:

- Track who subscribes to whom.
    
- Count subscribers and subscriptions.
    
- Check whether a user has subscribed to a particular channel.
    
- Prevent duplicate subscriptions.
    
- Query subscription relationships efficiently.
    

## 3. Subscription Schema

```
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
    {
        subscriber: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

export const Subscription = mongoose.model(
    "Subscription",
    subscriptionSchema
);
```

### Field Explanation

|Field|Meaning|
|---|---|
|`subscriber`|User who subscribes to another user|
|`channel`|User whose channel is subscribed to|
|`ObjectId`|Stores the referenced user's MongoDB ID|
|`ref: "User"`|References the User model|
|`timestamps`|Automatically adds `createdAt` and `updatedAt`|

## 4. Example Document

```
{
    subscriber: ObjectId("USER_A_ID"),
    channel: ObjectId("USER_B_ID")
}
```

This means User A subscribes to User B.

**Remember:** `subscriber` is the person performing the action, whereas `channel` is the person receiving the subscription.

## 5. Relationship Diagram

```
User A
  |
  | subscribes to
  v
Subscription Collection
  |
  | channel
  v
User B
```

A single subscription document represents one subscriber-to-channel relationship.

## 6. Counting Subscribers

To count the number of subscribers for a particular channel:

```
const subscriberCount = await Subscription.countDocuments({
    channel: channelId
});
```

To count how many channels a user has subscribed to:

```
const subscriptionCount = await Subscription.countDocuments({
    subscriber: userId
});
```

## 7. Checking Whether a User Is Subscribed

```
const isSubscribed = await Subscription.exists({
    subscriber: userId,
    channel: channelId
});
```

If a matching document exists, the user is subscribed to that channel.

## 8. Preventing Duplicate Subscriptions

A compound unique index ensures that the same user cannot subscribe to the same channel more than once.

```
subscriptionSchema.index(
    { subscriber: 1, channel: 1 },
    { unique: true }
);
```

This index also supports efficient queries using both fields.

## 9. Important Points for Revision

- A subscription represents a relationship between two users.
    
- `subscriber` identifies the user subscribing.
    
- `channel` identifies the user being subscribed to.
    
- Both fields reference the User collection through ObjectIds.
    
- A separate collection is useful for many-to-many relationships.
    
- `countDocuments()` can count subscribers and subscriptions.
    
- `exists()` can check whether a subscription exists.
    
- A compound unique index prevents duplicate relationships.
    
- The subscription document stores the relationship; user details can be retrieved using Mongoose `populate()` when needed.
    

**Revision shortcut:** Subscriber = who subscribes; Channel = whom they subscribe to.