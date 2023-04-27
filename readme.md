# GlowGetter

## App Description

GlowGetter is an app developed with newbies to skincare in mind. Getting glowy skin starts with using the right skincare products for your skin. GlowGetter allows users to find out their skin type with our Skin Type Analyser which contains 10 simple yes/no questions. After determining their skin type, users will receive customised product recommendations suitable for their skin type. They can then browse and read about products and add products to their wishlist.

## App Screenshots

<p align="center"><img src="https://files.slack.com/files-tmb/T0351JZQ0-F0553GZTY13-fd9bb1c359/screenshot_2023-04-27_at_3.47.39_pm_720.png" width="50%" height="50%"> </p>
 <p align="center">[Home Screen]</p>

<p align="center"><img src="https://files.slack.com/files-tmb/T0351JZQ0-F0556FBVAPL-792c8cdf3a/screenshot_2023-04-27_at_3.46.42_pm_720.png" width="50%" height="50%"> </p>
 <p align="center">[Skin Type Analyser]</p>

<p align="center"><img src="https://files.slack.com/files-tmb/T0351JZQ0-F054ZSVSEPQ-4d06035e36/screenshot_2023-04-27_at_3.47.06_pm_720.png" width="50%" height="50%"> </p>
 <p align="center">[Skin type and recommendations]</p>

 <p align="center"><img src="https://files.slack.com/files-tmb/T0351JZQ0-F055W674QSU-1c8ad058c2/screenshot_2023-04-27_at_3.46.14_pm_720.png" width="50%" height="50%"> </p>
 <p align="center">[Wishlist]</p>

## Data Model

<p align="center"><img src="https://files.slack.com/files-pri/T0351JZQ0-F05566XAEBD/screenshot_2023-04-27_at_3.15.44_pm.png" width="50%" height="50%"> </p>
 <p align="center">[Data Model]</p>
 <br>
 The data model consist of 4 collections 
 -User
 -Product
 -Analyser
 -Skintype

## CRUD Functionalities

### Create

- User
- Wishlist
- Quiz Response

### Read

- User
- Products
- Analyser, analyser results, recomendations
- Wishlist

### Update

- User name
- Wishlist
- Analyser result

### Delete

- Items from wishlist

## Technologies Used

1. JavaScript
2. Git and GitHub
3. Daisy UI
4. Tailwind CSS
5. Formik
6. Yup
7. MongoDB
8. Express.js
9. Reacts
10. Node.js

## Key Development Considerations

### 1. Mobile Responsiveness

<p align="center"><img src="https://files.slack.com/files-pri/T0351JZQ0-F0556AS6S90/screenshot_20230427_114540_chrome.jpg" width="50%" height="50%"> </p>
 <p align="center">[Website on mobile browser]</p>

### 2. scalability

Scalability was taken into consideration during development of project. For instance instead of setting value for quiz as "Yes" and "No", numbers are used instead to allow for easily adding more question options in the future.

```javascript
    analyserResponse: [
      {
        question: {
          type: Schema.Types.ObjectId,
          ref: "Analyser",
        },
        answer: {
          type: Number,
          required: true,
          enum: ["0", "1"],
        },
      },
    ],

```

### 2. Improvements from project 3

- More efficient styling
- Backend search function
- Loading icon when content renders
- Trying to set up log in
- Using of libraries like Yup and Formik
- Creating a wishlist tagged to user which I've not tried before.

## Challenges

- Planning of data models
- Standardising application of tailwind classes
- Setting up login
- Planning vs Execution, managing expectations vs realities of implementing the project

## Future Enhancements and Developments

- Adding admin controls to manage products
- Adding a stockist feature to allow users to see where products are stocked
- Adding a review/forum feature to make it a more community based platform
- "Cleaning up" code to make code more efficient and readable, especially more consistency in terms of use of tailwind classes.

### References/Sorces

The following assets used in the project do not belong to me. All rights belong to the original artists and creators.

- [Product Images](https://www.sephora.sg/)
- [Home page background](https://www.pexels.com/@shvets-production/)
- [Login background](https://www.pexels.com/@cottonbro/)
