# My Car - *The car talk app*

[View code here](https://github.com/belovedpearl/mycar_frontend)

![Responsiveness]()

[View site responsiveness here]()

---


**Table of Contents:**

---
---
 * [Scope](#scope)  
 * [Background](#background)
 * [Target Audience](#target-audience)
 * [Wireframes](#wireframes)
    * [Wireframe 1](#wireframe-1-the-landing-page)
    * [Wireframe 2](#wireframe-2-the-post-detail-page)
    * [Wireframe 2](#wireframe-2-the-profile-page)
* [User Stories](#user-stories)
    * [Admin User Story](#admin-user-story)
    * [General User User Story](#general-user-user-story)
    * [Unregistered users User Story](#unregistered-user-user-story)
    * [Registered users User Story](#registered-user-user-story)


---
# Scope

This the readme for the mycar project's frontend. To know more about the backend, please visit this [link](https://github.com/belovedpearl/mycar_drfapi).

MyCar is a specialized social networking platform tailored for car enthusiasts. It's name was derived from its core objective: fostering discussions and serving as a comprehensive guide for individuals passionate about automobiles. Through MyCar, users can engage in vibrant conversations, share their experiences with specific cars, and access valuable insights to enhance their automotive journey.

The interactive platform of MyCar empowers users to initiate discussions by adding their own posts, inviting others to contribute their reviews and insights on specific car topics. Through the platform, users can engage in dynamic conversations, expressing their opinions by upvoting or downvoting posts to stimulate dialogue about various car topics. Additionally, users have the ability to connect and establish friendships by following other users, further enhancing the collaborative environment of the platform.

The platform renders differently depending on the authentication state of the user. Non-authenticated users can view all posts, posts details, perform search and filter registered users posts, upvotes and downvotes. They are also able to register using the signup link on the navbar. In addition, Authenticated users can add post, add reviews, upvote and downvote posts. They can also follow another user and also unfollow them.
 
[View the live project here]().

---

# Background

---

This project is inspired by the Code Institute's 'Moment' walkthrough project. As a passionate car owner, I've often considered the idea of a dedicated community for fellow car enthusiasts. A place where individuals can share their experiences, insights, and opinions about the cars they own or have driven. This community would serve as a valuable resource, providing a wealth of knowledge and guidance for those considering the same car or seeking advice on its usage and maintenance.

For novice car owners especially, having access to a pool of information about their vehicle can be invaluable. From understanding the details of its operation to estimating maintenance costs and uncovering tips for optimal performance, there's a wealth of information waiting to be shared.

This project aims to be the ultimate hub for car enthusiasts, offering a platform where users can explore, learn, and engage with others who share their passion for automobiles. Whether it's discussing the latest models, sharing driving experiences, or delving into the finer details of car mechanics, this community strives to be the go-to destination for all things automotive.

---
# Target Audience

---

This project is tailored for a car the following set of people;

* Car Enthusiasts who seek to connect with people of like minds.
* New car owners seeking for guidance, tips, and advice on their car.
* Aspiring Car Owners seeking insights from real users.
* Automotive Professionals use the platform to stay updated on industry trends, share technical knowledge, and engage with enthusiasts to understand consumer preferences and feedback.
* Auto Bloggers, Journalists and Content creators specializing in automotive topics.

---

# Wireframes

---

While conceiving the project the following were the wireframes were used to represent the home, profile and details page.

All wireframes are made with Balsamiq.

[Link for the wireframe pictures can be found here]()

# Wireframes 1: The Landing Page

### Desktop and Laptop

![Desktop and Laptop]()

### Mobile

![Mobile]()

---

# Wireframe 2: The Post Details Page

### Desktop and Laptop

![Desktop and Laptop]()


### Mobile

![Mobile]()

---

# Wireframe 3: The Profile Page

### Desktop and Laptop

![Desktop and Laptop]()


### Mobile

![Mobile]()

---
# User's Story

## Navigation and Authentication

* As a User, I can view a uniform navbar on every page so that I can understand and navigate easily between the app's pages.

* As a User, I can navigate through pages so that I can view content seemlessly without page refresh.

* As a User, I can register to create a new account so that I can access all features for signed up users.

* As a User, I can sign in to the app so that I can the full features of the app.

* As a User, I can see that I am signed in so that I can know when to sign in

* As a User, I can maintain my signed in status until I choose to logout so that I can fully enjoy my time on the app

* As a Signed out user, I can the sign in/out options so that I can decide what to do from there.

* As a User, I can see the user's display picture so that I can identify the users of the application.

## Posts

* As a User, I can add post to the platform so that I can share my posts for other users to share their views and opinions

* As a User, I can view the details of a single post so that I can access more information about the post.

* As a User, I can view posts in descending order of creation so that I can be up to date with new posts from other users.

* As a User, I can continue to scroll through posts on the application so that I can continue to see contents without having to use the next button

* As a Logged in user, I can view posts from users I follow so that I can know about the latest content from the people I follow.
* As a User, I can see time the post was created so that I can know how long it was the post has been made.

## Post Page

* As a User, I can view the details of a single post so that I can access more information about the post.

* As a Logged in user, I can update my posts so that I can make corrections after creating it.

* As a logged in user, I can delete my posts so that I can remove my contents from the application.

* As a logged in user, I can add reviews so that I can contribute my knowledge about the specific car to the platform.

* As a user, I can see the display picture and name of the review author so that I can know who made the contribution.

* As a user, I can see when the review was posted so that I can know how old the review is.

* As a User, I can delete reviews I created so that I can remove my reviews from the post and the application.

* As a logged in user, I can update my review on my post so that I can correct wrong information on the review. 


# Bugs
Access to XMLHttpRequest at 'https://mycardrfapi-d64556077ed4.herokuapp.com/dj-rest-auth/registration/' from origin 'https://3000-belovedpear-mycarfronte-xe7q5mhm7wg.ws-eu107.gitpod.io' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.

sigin link not displaying - style on the font icon made it not visible

