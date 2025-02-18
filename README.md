# Information for Developers

## This project is hosted on render as a test
To view the demo of the project [click me](https://abra-front-end.onrender.com) or visit [https://abra-front-end.onrender.com](https://abra-front-end.onrender.com)

## Technologies Used for the project are
`Note: Backend is powered by Django (a python framework)`

Tech stack:
- [Next.js 15](https://nextjs.org/docs/getting-started)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS (for css)](https://tailwindcss.com/)
- [ShadCDN (primary)](https://ui.shadcn.com/)
- [Tailwind Variants (with tw)](https://tailwind-variants.org)
- [NextUI v2 (some components)](https://nextui.org/)
- [Yup](https://www.npmjs.com/package/yup)
- [React Hook Form(with yup)](https://react-hook-form.com/)
- [React icons](https://react-icons.github.io/react-icons/)
- [axios](https://axios-http.com/docs/intro)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [eslint(for type checks and code check)](https://eslint.org/)

## Installation

### Preinstallation setup and requirements
- VSCode or any code editor
- NodeJS >= __v18.18__
- Recommended node verion is __v22.12.0__
- [Git](https://git-scm.com/downloads) >= __2.43.0__ *(for version control)*
- Browser (Recommended latest version).


### To install the application you will require its backend also which you will get at
```bash
git clone https://github.com/itssaurabh/core.git
```
### For our frontend application you can get it here.
Lets begin the installation:
```bash
git clone https://github.com/itssauraj/src.git
```

#### Install dependencies

```bash
npm install
```
#### Update environment varaible
Create a copy of `.env.sample` named as `.env` and then update the values according to your system

#### Run the development server

```bash
npm run dev
```

## Creating a build

Note: before creating build you will need to have file `.env.production` containing the values required for the production. You can simply keep the same values as `.env` if you are planning to run the build on your local machine.

* __Mannual build using npm__

  Once you are done with the appication update you can create a build of the application using
  ```bash
  npm run build
  ```
  *When you create a build you will might get errors related to your typing so please take a look at you code and update the changes wherever required and hinted by the eslint*

  Once the build is sucessfully build you can run it using
  ```bash
  npm run start
  ```

* __Buidling a docker image__

  This project supports docker build you can create a docker image build usng the below command
  ```bash
  docker buidx build -t abra-fe .
  ```
  *Runnng the container after the build*
  ```bash
  docker run -d -p 8080:80 abra-fe
  ```
  __*Note `-d` is `optional`*__

  <hr/>
  
  This project can also be run using a `docker-compose` just run.
  ```bash
  docker compose up --build
  ```
  *Note this will build a docker image named as `abraweb` and then run it in a container `(abraweb)`*

### Viewing the project live on local (production/development)
This link for development is same and also the production link on the local machine is same. *Once the `development` or the `production` server is running visit `localhost:3000` or click here [localhost:3000](http://localhost:3000)

## License
Licensed under the MIT license


# Lets begin with what the project is?
### Overview
This project is a comprehensive platform for managing trainees, courses, and assessments while facilitating effective communication and collaboration among trainees, mentors, and administrators. It focuses on tracking course progress, conducting evaluations, and providing feedback.

### Roles and Features
  
  * __Roles__

    - Admin
    - Trainee
    - Mentor

  * __Features__

    *Trainee related features that are implemented follows:*
    - __Course Management/Assessment:__ 
      - View assigned collectoin with details (title, time, progress).
      - Can view Collection and course details.
      - Can start the course and the need to manually check mark as learned each module the users learns. *Note videos are not beign available they will be provided manually to them.*

    - __Performance/Corurse Tracking:__
      - Track time spent on each course (daily logs and cumulative total).
      - Highlight excessive time taken to complete courses in reports.

    - __Examination:__
      - View exams scheduled for them.
      - Exam basic details are available to the trainee but the notes of the exam which containe the details like questions are available after the time has hit the examination date and time.

    - __Notifications:__
      - Alerts for upcoming exams.

    *Admin related features that are implemented follows:*

      - __Course Management:__
        - Add, import, View and delete courses.
        - Create collection of courses which will be assigned to the trainees. Need to have at least 1 defualt course and collection to create a trainee.
        - Courses can be directly imported from the folder structure you have it will by default take the videos files also recursively read and map the folder you select. *(This feature might not work on all the browsers.)*

      - __Trainee Management:__
        - Add new trainees and generate login credentials.
        - Assign tasks, courses, and mentors to trainees.
        - View and analyze reports for each trainee.
        - Add extra collections/courses to them if required.

      - __Exam and Feedback Management:__
        - Schedule and assign mentors for exams.
        - Alert/Notificaiton will be sent to the trainee on their profile and also on the email.
        
      - __Advanced Analytics:__
        - Generate detailed reports on trainee performance and course trends.
        - Monitor average course completion times and overdue tasks.

      - __Notifications and Alerts:__
        - Alerts for new course starts or completions by trainees.
        - Alerts related to collection complete will be sent via email also.

    *Mentor related features that are implemented follows:*

    __*With regret this panel has not being implemented yet*__


