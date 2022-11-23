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

**WORKING FUNCTIONALITIES**

|  Functionality | Status   |  Reason/Details |
|-------|----------|-----------------|
| `Auth`   | `working` |  Able to  `login`, `logout`, `secure route` |
| `Register Scholar`  | `working`  | Able to Register Scholar  |
| `List Scholar`  | `working`  | Able to view all  Registered Scholar  |

