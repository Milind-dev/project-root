# Matbook

This project have employee onboarding project. here employee filling details after filling details employee submit data. Here Title and Description of employee.

## Requirement 

In this project one of form created that have fields after filing that field like title,description , phone , fullname , dropdown are fill and submit then its store to database. after seeing  details route. there see all details which are fill from onboarding. 
phone , fullname and drodown that field come from database means validate against db.

 Techstack use - `nodejs`,`javascript`,`tanstack`,`express`,`mongodb`,`tailwindCSS`
## Frontend
### `Details`
On details router which are link. show in assignment when click first default data show to screen. that data are by default and show to screen.

### `Searching`
here input search value of large dataset whenever input hit it will find value. value find by title.
 
### `Sorting`
sorting value by asc and desc that value by createdBy.

### `pagination`
pagination are 1 to 20 limits. first page are default. if its user are on first page then back button are disabled. if its last page then next button are disabled.

## BACKEND

### `Node js & DB(MONGO DB) `
As requirement all frontend side input, label, select validate against db means its frontend side input type  select come from db.
here also title, description , select , fullname, phone are empty then its show required that validation are fully developed backend side.
get , post , sorting , which are show in frontend side are fully come from backend side.

### `validate errors only on phone , fullname,  select when empty `
validate all errors are perfectly fine in backend side. but frontend side i have only there errors show when empty


## install node_modules
  npm install 

## git 
here multiple branch 
main full code 

### command using
`git add .`
`git commit -m "comment"`
`git push` 
if you are in another branch then go main branch then pull branch
`git pull origin branch_name`

### Some data show (its exclude but to see if its not work on your side)
this is success data
`sort, page, limit`

`http://localhost:5000/api/empFormSchemaGetPages/empFormSchemaGetPages?page=1&limit=10&sort=asc` 
```
sorting,pagination,asc/desc
-----------
http://localhost:5000/api/empFormSchemaGetPages/empFormSchemaGetPages?page=1&limit=10&sort=asc

"{
    "message": "Fetched onboarding forms",
    "page": 1,
    "limit": 10,
    "total": 22,
    "totalPages": 3,
    "count": 10,
    "sortOrder": 1,
    "data": [
        {
            "_id": "692c3318188e1bf003cfe2f1",
            "title": "chip and tale",
            "description": "Construction",
            "fields": [
                {
                    "label": "Full name",
                    "type": "text",
                    "placeholder": "Enter full name",
                    "validation": {
                        "required": true,
                        "minLength": 3,
                        "maxLength": 50
                    }
                },
                {
                    "label": "Phone",
                    "type": "text",
                    "validation": {
                        "required": true
                    },
                },
                {
                    "label": "Role",
                    "type": "select",
                    "options": [
                        "dev",
                        "qa",
                        "pm"
                    ],
                    "validation": {
                        "required": true
                    }
                }
            ],
            "createdAt": "2025-11-30T12:05:44.643Z",
            "updatedAt": "2025-11-30T12:05:44.643Z",
            "__v": 0
        },"
```
`http://localhost:5000/api/empFormSchemaCreate` 

```

url = http://localhost:5000/api/empFormSchemaCreate

create form data
-----------------
{
    "title": "L&TConstruction",
    "description": "Construction",
    "fields": [
      {
        "label": "FullName",
        "type": "text",
        "placeholder": "Enter full name",
        "validation": { "required": true, "minLength": 3, "maxLength": 50 }
      },
      {
        "label": "Phone",
        "type": "text",
        "phone": "+919876543210",
        "validation": { "required": true }
      },
      {
        "label": "Role",
        "type": "select",
        "options": ["dev","qa","pm"],
        "validation": { "required": true }
      }
    ]
  }

```
`http://localhost:5000/api/empFormSchemaGetPages/empFormSchemaGetPages`
```
All details fetch
------------------

url = http://localhost:5000/api/empFormSchemaGetPages/empFormSchemaGetPages

{
    "message": "Fetched onboarding forms",
    "page": 1,
    "limit": 10,
    "total": 28,
    "totalPages": 3,
    "count": 10,
    "sortOrder": -1,
    "data": [
        {
            "_id": "692ca0c49f431cc25ac7f554",
            "title": "L&dsdddd",
            "description": "Constructiondd",
            "fields": [
                {
                    "label": "FullName",
                    "type": "text",
                    "placeholder": "Enter full name",
                    "validation": {
                        "required": true,
                        "minLength": 3,
                        "maxLength": 50
                    }
                },
                {
                    "label": "Phone",
                    "type": "text",
                    "validation": {
                        "required": true
                    }
                },
                {
                    "label": "Role",
                    "type": "select",
                    "options": [
                        "dev",
                        "qa",
                        "pm"
                    ],
                    "validation": {
                        "required": true
                    }
                }
            ],
            "createdAt": "2025-11-30T19:53:40.403Z",
            "updatedAt": "2025-11-30T19:53:40.403Z",
            "__v": 0
        }
}

```

## Deploy

i try to deploy this on vercel some problem come so i am not deploy i put some images on assest folder in frontend folder. i have recorded  video but i have not  any mail or link to share that recorded project video. if its possible to give me then  i share it. but i share images which is in assests folder.
```https://github.com/Milind-dev/project-root```
[project-root](https://github.com/Milind-dev/project-root)



