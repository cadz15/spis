**How to start**
First, you need to clone the repo

    git clone https://github.com/cadz15/spis.git

Then, go to the directory and install node modules

    cd spis
    npm install
**Make sure you have node installed.*

After that, start the environment

    npm start
   
   It should show like this
   

    Compiled successfully!
    
    You can now view spis in the browser.
    
    Local:            http://localhost:3000 
    On Your Network:  http://192.168.1.4:3000 
    
    webpack compiled successfully


***Note***
*The  laravel API server is set to slsu_spis.localtest. To setup this,

Goto laragon>Preferences>Hostname Template

    {name}.test //from
    {name}.localtest //to


|  Link | Status   |  Reason/Details |
|-------|----------|-----------------|
| `/`   | `working` |  Landing Page  |
| `/ForgotPassword`  | `Under Construction`  | Forgot Password recovery  |
|  `/admin` | `working`  | Dashboard for admin (with dummy data)  |
|  `/admin/event` | `Under Construction`  |  Unable to create events |
|  `/admin/smsblast` |  `Under Construction` | Unable to send smsblast (error on twillio API)  |
|  `/admin/scholarship` |  `Under Construction`  | Unable to create scholarship  |
| `/admin/register`  | `working`  | Register/Create Scholar  |
|  `/admin/list` | `working`  | List of Scholar from database  (Unable to search as of now)|
|  `/admin/query` | `Under Construction`  | Unable to create/reply query  |
|  `/admin/scholardocument` |  `Under Construction` | Unable to view document  |
|  `/admin/profile` | `working`  |  Able to view (Unable to update as of now) |
|  `/admin/logout` | `working`  |  Able to logout |
|  `/scholar/logout` | `working`  |  Able to logout |
|  `/scholar/dashboard` | `Under Construction`  |  Able to view |
|  `/scholar/event` | `Under Construction`  |  Unable to view specific event as of now|
|  `/scholar/scholardocument` | `Under Construction`  |  Unable to Upload |
|  `/scholar/profile` | `Under Construction`  |  `Unable to update details as of now` |
